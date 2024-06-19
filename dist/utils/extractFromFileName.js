export function extractFromFileName(fileName) {
    const splittedName = fileName.split(".");
    const ext = splittedName.pop() ?? "";
    const name = splittedName.join(".");
    return { name, ext };
}
