import { z } from "zod";

export const uploadFileBodySchema = z.object({
  name: z.string(),
  channel: z.string(),
});
