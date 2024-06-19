import * as fs from "node:fs/promises";
import * as path from "path";
import { BUFFERS_PATH, TARGET_DIR } from "../config";
export async function concatFileChunks(fileChunks, extension, fileName) {
    const chunks = [];
    const sortedChunks = fileChunks.sort((a, b) => a.index - b.index);
    await Promise.all(sortedChunks.map(async ({ fileName, index }) => {
        chunks[index] = await fs.readFile(path.join(BUFFERS_PATH, fileName));
    }));
    const file = Buffer.concat(chunks);
    const targetFilePath = path.resolve(TARGET_DIR, `${fileName}.${extension}`);
    await fs.writeFile(targetFilePath, file);
    return targetFilePath;
}
