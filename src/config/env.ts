import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.coerce.number(),
  DISCORD_TOKEN: z.string(),
});

export const env = envSchema.parse(process.env);
