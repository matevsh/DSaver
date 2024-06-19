import { splitFileIntoChunks } from "../../split-file/split-file-into-chunks";
import { DiscordClientIntegration } from "../discord/integration/discord-integration";
import { route } from "../../common/error-handling/route";
import { HTTP_RESPONSES } from "../../common/response/http-codes";
import { uploadFileBodySchema } from "./upload.schema";
export const uploadController = {
    uploadFile: route(async ({ req, session }) => {
        const discordClient = await DiscordClientIntegration.getInstance();
        const body = uploadFileBodySchema.parse(req.body);
        if (!req.file)
            return HTTP_RESPONSES.BAD_REQUEST;
        const { filename: genName, size } = req.file;
        const user = session.getOrThrow();
        const chunks = await splitFileIntoChunks(genName);
        await discordClient.saveFileToDiscord(user, body.name, genName, size, chunks);
        return HTTP_RESPONSES.OK;
    }),
};
