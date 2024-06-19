import { splitFileIntoChunks } from "../../split-file/split-file-into-chunks";
import { DiscordClientIntegration } from "../discord/integration/discord-integration";
import { route } from "../../common/error-handling/route";
import { HTTP_RESPONSES } from "../../common/response/http-codes";
import { uploadFileBodySchema } from "./upload.schema";
import { ReadStream } from "node:fs";
import { client } from "../../database/client";
import { SIZE_OF_FILE_IN_BYTES } from "../../config";
import { extractFromFileName } from "../../utils/extractFromFileName";

function resolveStream(stream: ReadStream) {
  return new Promise((res) => {
    stream.on("end", res);
  });
}

export const uploadController = {
  uploadFile: route(async ({ req, session }) => {
    const discordClient = await DiscordClientIntegration.getInstance();

    const { name, channel } = uploadFileBodySchema.parse(req.body);

    if (!req.file) return HTTP_RESPONSES.BAD_REQUEST;

    const { filename: genName, size } = req.file;

    const user = session.getOrThrow();

    const { name: genNameWithoutExt, ext } = extractFromFileName(genName);

    const fileAggregator = await client.file.create({
      data: {
        name,
        genName: genNameWithoutExt,
        ext,
        chunkSize: SIZE_OF_FILE_IN_BYTES,
        size,
        channelId: channel,
        userId: user.id,
      },
    });

    const chunks = splitFileIntoChunks(genName);

    let chunkIndex = 0;
    chunks.on("data", (data: Buffer) => {
      const localChunkIndex = chunkIndex;
      chunkIndex++;

      void discordClient.saveFileToDiscord(
        data,
        localChunkIndex,
        channel,
        fileAggregator.id
      );
    });

    await resolveStream(chunks);
    return HTTP_RESPONSES.OK;
  }),
};
