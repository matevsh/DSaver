import { connectDiscordClient } from "./connect-discord-client";
import { client } from "../../../database/client";
import { extractFromFileName } from "../../../utils/extractFromFileName";
import { BUFFERS_PATH, SIZE_OF_FILE_IN_BYTES } from "../../../config";
import { writeFile } from "node:fs/promises";
import { concatFileChunks } from "../../../contact-file/concat-file-chunks";
import { ChannelTypeEnum } from "./channel-type-enum";
const CHANNEL_ID = "1215751953737453580";
export class DiscordClientIntegration {
    static async getInstance() {
        if (!this.instance) {
            const client = await connectDiscordClient();
            this.instance = new DiscordClientIntegration(client);
        }
        return this.instance;
    }
    constructor(client) {
        this.client = client;
    }
    async getChannelName(channelId) {
        const channel = await this.client.channels.fetch(channelId);
        if (channel && channel.isTextBased()) {
            return channel.name;
        }
        throw new Error("getChannelName: Invalid channel");
    }
    getTextChannels() {
        return [
            ...this.client.channels.cache
                .filter((channel) => channel.type === ChannelTypeEnum.GUILD_TEXT)
                .values(),
        ];
    }
    getTextChannel(channelId = CHANNEL_ID) {
        const channel = this.client.channels.cache.get(channelId);
        if (!channel || !channel.isTextBased)
            throw new Error("getTextChannel: Invalid channel");
        return channel;
    }
    async saveChunkToDiscord(channel, buff, index, fileId) {
        const message = await channel.send({ files: [buff] });
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
    async saveFileToDiscord(user, name, genName, fileSize, chunks) {
        const channel = this.getTextChannel();
        const { name: genNameWithoutExt, ext } = extractFromFileName(genName);
        const fileAggregator = await client.file.create({
            data: {
                name,
                genName: genNameWithoutExt,
                ext,
                chunkSize: SIZE_OF_FILE_IN_BYTES,
                size: fileSize,
                channelId: channel.id,
                userId: user.id,
            },
        });
        await Promise.all(chunks.map(async (chunk, index) => {
            return this.saveChunkToDiscord(channel, chunk, index, fileAggregator.id);
        }));
    }
    async readFileChunk(channel, messageId) {
        const message = await channel.messages.fetch(messageId);
        const attachment = message.attachments.first();
        if (!attachment)
            throw new Error("Attachment not found");
        const file = await fetch(attachment.url);
        if (!file.ok)
            throw new Error("Failed to fetch file");
        const fileBuffer = await file.arrayBuffer();
        await writeFile(`${BUFFERS_PATH}/${messageId}`, Buffer.from(fileBuffer));
        return Promise.resolve();
    }
    async getFileChunks(fileId) {
        const file = await client.file.findFirst({
            where: {
                id: fileId,
            },
            include: {
                fileChunk: true,
            },
        });
        if (!file)
            throw new Error("File not found");
        const fileChannel = this.getTextChannel(file.channelId);
        const chunks = await Promise.all(file.fileChunk.map(async (chunk) => {
            await this.readFileChunk(fileChannel, chunk.messageId);
            return {
                fileName: chunk.messageId,
                index: chunk.index,
            };
        }));
        return concatFileChunks(chunks, file.ext, file.name);
    }
}
