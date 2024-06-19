import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher.ts";
import { fileSchema } from "@/shared/schema/file-schema.ts";
import { responseSchema } from "@/utils/response-schema.ts";

const fileResponseSchema = responseSchema(fileSchema);

export function useFileDetails(fileId: string | undefined) {
  return useQuery({
    queryKey: ["file", fileId],
    queryFn: () => fetcher(`/files/${fileId}`, fileResponseSchema),
    enabled: Boolean(fileId),
  });
}
