import * as path from "path";
import { SIZE_OF_FILE_IN_BYTES, TEMP_DIR_PATH } from "../config";
import { createReadStream } from "node:fs";

export function splitFileIntoChunks(fileName: string) {
  const oryginalFilePath = path.resolve(TEMP_DIR_PATH, fileName);

  return createReadStream(oryginalFilePath, {
    highWaterMark: SIZE_OF_FILE_IN_BYTES,
  });
}
