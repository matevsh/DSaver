import { DiscordClientIntegration } from "../integration/discord-integration";
import { route } from "../../../common/error-handling/route";
export const channelsController = {
    getUserTextChannels: route(async () => {
        const discordInstance = await DiscordClientIntegration.getInstance();
        const rawTextChannels = discordInstance.getTextChannels();
        const textChannels = rawTextChannels.map(({ id, name }) => ({ id, name }));
        return {
            success: true,
            data: textChannels,
        };
    }),
};
