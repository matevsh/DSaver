export function objectToFormData<
  T extends PropertyKey,
  K extends string | Blob | File,
>(data: Record<T, K>) {
  const formData = new FormData();

  for (const key in data) {
    formData.append(key as string, data[key]);
  }

  return formData;
}
