import path from "path";

export function getBaseFileName(fileName: string): string {
  return path.basename(fileName, path.extname(fileName));
}
