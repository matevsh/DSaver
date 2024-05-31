import { z } from "zod";

const envSchema = z.object({
  VITE_API_HOST: z.string(),
});

export const ENV = envSchema.parse(import.meta.env);
