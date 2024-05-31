import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher.ts";
import { z } from "zod";

const fileListSchema = z.object({
  id: z.string(),
  name: z.string(),
  genName: z.string(),
  size: z.number(),
  ext: z.string(),
  chunkSize: z.number(),
  channelName: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  chunksCount: z.number(),
});

export type File = z.infer<typeof fileListSchema>;

export function useFileList(search: string) {
  return useQuery({
    queryKey: ["files", search],
    queryFn: () => fetcher(`/files?search=${search}`, z.array(fileListSchema)),
  });
}
