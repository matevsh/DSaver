import { z } from "zod";

export const decodeBodySchema = z.object({
  fileId: z.string(),
});
