import { Request, Response } from "express";
import { DiscordClientIntegration } from "../integration/discord-integration";

async function getUserTextChannels(req: Request, res: Response) {
  const discordInstance = await DiscordClientIntegration.getInstance();

  const rawTextChannels = discordInstance.getTextChannels();
  const textChannels = rawTextChannels.map(({ id, name }) => ({ id, name }));

  res.status(200).json(textChannels);
}

export const channelsController = {
  getUserTextChannels,
};
