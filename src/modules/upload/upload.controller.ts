import { Request, Response } from "express";
import { splitFileIntoChunks } from "../../split-file/split-file-into-chunks";
import { DiscordClientIntegration } from "../discord/integration/discord-integration";
import { z } from "zod";

const uploadFileBodySchema = z.object({
  name: z.string(),
});

async function uploadFile(req: Request, res: Response) {
  const discordClient = await DiscordClientIntegration.getInstance();
  try {
    const tryParseBody = uploadFileBodySchema.safeParse(req.body);
    if (!tryParseBody.success || !req.file) {
      res.status(400).send("Invalid body");
      return;
    }

    const { data } = tryParseBody;

    const genName = req.file.filename;
    const fileSize = req.file.size;
    const chunks = await splitFileIntoChunks(genName);
    await discordClient.saveFileToDiscord(data.name, genName, fileSize, chunks);
    res.status(200).json({ message: "OK" });
  } catch (e) {
    console.error(e);
    res.status(500).send(JSON.stringify(e));
  }
}

export const uploadController = {
  uploadFile,
};
