import { DiscordClientIntegration } from "../discord/integration/discord-integration";
import { client } from "../../database/client";
export const filesService = {
    getQuery(query) {
        return typeof query === "string" ? query : void 1;
    },
    async getFiles(searchQuery) {
        const channelNameMap = new Map();
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
        return Promise.all(rawFiles.map(async (file) => {
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
        }));
    },
};
