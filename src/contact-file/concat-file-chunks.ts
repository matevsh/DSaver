import * as fs from "node:fs/promises";
import * as path from "path";
import { BUFFERS_PATH, TARGET_DIR } from "../config";
import { times } from "../utils/times";
import { getBaseFileName } from "../utils/getBaseFileName";

export async function concatFileChunks(fileName: string) {
  const buffersDirPath = path.resolve(BUFFERS_PATH, fileName);

  const baseFileName = getBaseFileName(fileName);

  const chunks: Buffer[] = [];

  const files = await fs.readdir(buffersDirPath);

  await Promise.all(
    times(files.length).map(async (i) => {
      const chunkFileName = `chunk_${i}_${baseFileName}`;
      const chunkFilePath = path.join(buffersDirPath, chunkFileName);
      chunks[i] = await fs.readFile(chunkFilePath);
    })
  );

  const file = Buffer.concat(chunks);
  const targetFilePath = path.resolve(TARGET_DIR, fileName);
  return fs.writeFile(targetFilePath, file);
}
