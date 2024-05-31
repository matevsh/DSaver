import { Request, Response } from "express";
import { DiscordClientIntegration } from "../discord/integration/discord-integration";

async function decodeFile(req: Request, res: Response) {
  const discordIntegration = await DiscordClientIntegration.getInstance();

  const file = await discordIntegration.getFileChunks(
    "clwncqoe50000gpkwthivsbo5"
  );

  res.status(200).download(file);
}

export const decodeController = {
  decodeFile,
};
