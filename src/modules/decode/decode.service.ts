import { DiscordClientIntegration } from "../discord/integration/discord-integration";

export const decodeService = {
  async decodeFile(fileId: string) {
    const discordIntegration = await DiscordClientIntegration.getInstance();

    return discordIntegration.getFileChunks(fileId);
  },
};
