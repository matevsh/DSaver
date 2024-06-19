import { z } from "zod";

export const fileSchema = z.object({
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
  fileStatus: z.string(),
});

export type FileSchema = z.infer<typeof fileSchema>;
