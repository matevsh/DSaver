import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.coerce.number(),
  DISCORD_TOKEN: z.string(),
  SESSION_SECRET: z.string(),
  WEB_URL: z.string(),
});

export const env = envSchema.parse(process.env);
