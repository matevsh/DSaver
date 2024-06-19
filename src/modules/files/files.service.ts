import { DiscordClientIntegration } from "../discord/integration/discord-integration";
import { client } from "../../database/client";
import { HttpError } from "../../common/error-handling/errors";
import { HTTP_RESPONSES } from "../../common/response/http-codes";

export const filesService = {
  getQuery(query: unknown) {
    return typeof query === "string" ? query : void 1;
  },

  async getFiles(searchQuery: string | undefined) {
    const channelNameMap = new Map<string, string>();

    const discordInstance = await DiscordClientIntegration.getInstance();

    const rawFiles = await client.file.findMany({
      where: {
        name: {
          contains: searchQuery,
        },
      },
      include: {
        _count: true,
      },
    });

    return Promise.all(
      rawFiles.map(async (file) => {
        const { _count, channelId, ...rest } = file;

        let channelName = channelNameMap.get(channelId);
        if (!channelName) {
          channelName = await discordInstance.getChannelName(channelId);
          channelNameMap.set(channelId, channelName);
        }

        return {
          ...rest,
          chunksCount: _count.fileChunk,
          channelName,
        };
      })
    );
  },

  async getFile(fileId: string) {
    const discordInstance = await DiscordClientIntegration.getInstance();

    const file = await client.file.findUnique({
      where: {
        id: fileId,
      },
      include: {
        _count: true,
      },
    });

    if (!file) throw new HttpError(HTTP_RESPONSES.NOT_FOUND);

    const channelName = await discordInstance.getChannelName(file.channelId);

    return {
      ...file,
      chunksCount: file._count.fileChunk,
      channelName,
    };
  },
};
