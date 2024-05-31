import { z, ZodObject, ZodRawShape } from "zod";

export function responseSchema<T extends ZodRawShape>(schema: ZodObject<T>) {
  return z.object({
    success: z.boolean(),
    message: z.string(),
    data: schema,
  });
}
