import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher.ts";
import { z } from "zod";
import { responseSchema } from "@/utils/response-schema.ts";
import { fileSchema } from "@/shared/schema/file-schema.ts";

const fileListResponse = responseSchema(z.array(fileSchema));

export function useFileList(search: string) {
  return useQuery({
    queryKey: ["files", search],
    queryFn: () => fetcher(`/files?search=${search}`, fileListResponse),
  });
}
