import express from "express"
import { env } from "./config/env";
import { upload } from "./config/multer";
import { z } from "zod";
import { splitFileIntoChunks } from "./split-file/split-file-into-chunks";
import { concatFileChunks } from "./contact-file/concat-file-chunks";
import * as fs from "fs";

const app = express();

app.use(express.json());

app.get("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }

    const fileName = req.file.filename;
    await splitFileIntoChunks(fileName);
    res.status(200).send(`File name: ${fileName}`);
  } catch (e) {
    console.error(e);
    res.status(500).send(JSON.stringify(e));
  }
});

const decodeBodySchema = z.object({
  fileName: z.string()
});

app.get("/decode", async (req, res) => {
  try {
    const tryParseBody = decodeBodySchema.safeParse(req.body);
    if (!tryParseBody.success) {
      res.status(400).send(`Invalid body: ${tryParseBody.error}`);
      return;
    }
    const { fileName } = tryParseBody.data;
    await concatFileChunks(fileName);
    res.status(200).send("OK");
  } catch (e) {
    console.error(e);
    res.status(500).send(JSON.stringify(e));
  }
});

app.get("/test", async (req, res) => {
    const stream = fs.createReadStream("temp/1fb98fd7-769c-4dd0-8dbd-7193fedb5343.mp4");
    const chunks: Buffer[] = [];
  stream.on("data", (chunk: Buffer) => {
    // console.log(chunk)
        chunks.push(chunk);
    });

  stream.on("end", () => {
        fs.writeFileSync("target/1fb98fd7-769c-4dd0-8dbd-7193fedb5343.mp4", Buffer.concat(chunks));
    );
    res.status(200).json({ message: "OK" });
  });
});

app.listen(env.PORT, () => {
  console.log(`Server is running on port http://localhost:${env.PORT}`);
});
