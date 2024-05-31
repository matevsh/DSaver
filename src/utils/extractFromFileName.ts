export function extractFromFileName(fileName: string) {
  const splittedName = fileName.split(".");

  const ext = splittedName.pop() ?? "";
  const name = splittedName.join(".");

  return { name, ext };
}
