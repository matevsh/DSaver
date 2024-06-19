import path from "path";
export function getBaseFileName(fileName) {
    return path.basename(fileName, path.extname(fileName));
}
