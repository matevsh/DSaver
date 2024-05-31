import * as fs from "fs/promises";
import * as path from "path";
import { BUFFERS_PATH, SIZE_OF_FILE_IN_BYTES, TEMP_DIR_PATH } from "../config";

function splitBuffer(buffer: Buffer, chunkSize: number): Buffer[] {
  const chunks: Buffer[] = [];
  let offset = 0;
  while (offset < buffer.length) {
    const chunk = buffer.subarray(offset, offset + chunkSize);
    chunks.push(chunk);
    offset += chunkSize;
  }
  return chunks;
}

export async function splitFileIntoChunks(fileName: string) {
  const buffersDirPath = path.resolve(BUFFERS_PATH, path.basename(fileName));
  await fs.mkdir(buffersDirPath);

  const oryginalFilePath = path.resolve(TEMP_DIR_PATH, fileName);
  const file = await fs.readFile(oryginalFilePath);

  const stat = await fs.stat(oryginalFilePath);
  console.log({ stat });

  return splitBuffer(file, SIZE_OF_FILE_IN_BYTES);
}
