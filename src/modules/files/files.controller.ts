import { Request, Response } from "express";
import { client } from "../../database/client";
import { DiscordClientIntegration } from "../discord/integration/discord-integration";

async function getFilesList(req: Request, res: Response) {
  const query = req.query?.search as string | undefined;

  const channelNameMap = new Map<string, string>();

  const discordInstance = await DiscordClientIntegration.getInstance();

  const rawFiles = await client.file.findMany({
    where: {
      name: {
        contains: query,
      },
    },
    include: {
      _count: true,
    },
  });

  const files = await Promise.all(
    rawFiles.map(async (file) => {
      const { _count, channelId, ...rest } = file;

      let channelName = channelNameMap.get(channelId);
      if (!channelName) {
        channelName = await discordInstance.getChannelName(channelId);
        channelNameMap.set(channelId, channelName);
      }

      return {
        ...rest,
        chunksCount: _count.FileChunk,
        channelName,
      };
    })
  );

  res.status(200).json(files);
}

export const filesController = {
  getFilesList,
};
