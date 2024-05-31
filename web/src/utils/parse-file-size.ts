const SIZE_UNITS = ["B", "KB", "MB", "GB"];

export function parseFileSize(fileSize: number) {
  let size = fileSize;
  let unit = 0;

  while (size > 1024) {
    size /= 1024;
    unit++;
  }

  return `${size.toFixed(2)} ${SIZE_UNITS[unit]}`;
}
