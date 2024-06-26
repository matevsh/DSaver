import { connectDiscordClient } from "./connect-discord-client";
import { Client, TextChannel } from "discord.js";
import { client } from "../../../database/client";
import { extractFromFileName } from "../../../utils/extractFromFileName";
import { BUFFERS_PATH, SIZE_OF_FILE_IN_BYTES } from "../../../config";
import { writeFile } from "node:fs/promises";
import { concatFileChunks } from "../../../contact-file/concat-file-chunks";
import { ChannelTypeEnum } from "./channel-type-enum";
import { User } from "@prisma/client";

const CHANNEL_ID = "1215751953737453580";

export class DiscordClientIntegration {
  private static instance: DiscordClientIntegration;

  public static async getInstance() {
    if (!this.instance) {
      const client = await connectDiscordClient();
      this.instance = new DiscordClientIntegration(client);
    }

    return this.instance;
  }

  constructor(private client: Client<true>) {}

  public async getChannelName(channelId: string) {
    const channel = await this.client.channels.fetch(channelId);

    if (channel && channel.isTextBased()) {
      return (channel as TextChannel).name;
    }

    throw new Error("getChannelName: Invalid channel");
  }

  public getTextChannels() {
    return [
      ...this.client.channels.cache
        .filter((channel) => channel.type === ChannelTypeEnum.GUILD_TEXT)
        .values(),
    ] as TextChannel[];
  }

  public getTextChannel(channelId: string = CHANNEL_ID) {
    console.log(channelId);

    const channel = this.client.channels.cache.get(channelId);
    if (!channel || !channel.isTextBased)
      throw new Error("getTextChannel: Invalid channel");
    return channel as TextChannel;
  }

  private async saveChunkToDiscord(
    channel: TextChannel,
    buff: Buffer,
    index: number,
    fileId: string
  ) {
    const message = await channel.send({
      files: [
        {
          attachment: buff,
          name: `${fileId}-${index}`,
        },
      ],
    });

    await client.fileChunk.create({
      data: {
        index,
        messageId: message.id,
        file: {
          connect: {
            id: fileId,
          },
        },
      },
    });
  }

  public async saveFileToDiscord(
    chunk: Buffer,
    index: number,
    channelId: string,
    fileAggregatorId: string
  ) {
    const channel = this.getTextChannel(channelId);

    return this.saveChunkToDiscord(channel, chunk, index, fileAggregatorId);
  }

  public async readFileChunk(channel: TextChannel, messageId: string) {
    const message = await channel.messages.fetch(messageId);

    const attachment = message.attachments.first();

    if (!attachment) throw new Error("Attachment not found");

    const file = await fetch(attachment.url);

    if (!file.ok) throw new Error("Failed to fetch file");

    const fileBuffer = await file.arrayBuffer();

    await writeFile(`${BUFFERS_PATH}/${messageId}`, Buffer.from(fileBuffer));

    return Promise.resolve();
  }

  public async getFileChunks(fileId: string) {
    const file = await client.file.findFirst({
      where: {
        id: fileId,
      },
      include: {
        fileChunk: true,
      },
    });

    if (!file) throw new Error("File not found");

    const fileChannel = this.getTextChannel(file.channelId);

    const chunks = await Promise.all(
      file.fileChunk.map(async (chunk) => {
        const fileBuff = await this.readFileChunk(fileChannel, chunk.messageId);
        return {
          fileName: chunk.messageId,
          index: chunk.index,
          fileBuff,
        };
      })
    );

    console.log(chunks);

    return concatFileChunks(chunks, file.ext, file.name);
  }
}
