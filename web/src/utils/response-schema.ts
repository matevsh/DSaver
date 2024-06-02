import { z, ZodObject, ZodRawShape } from "zod";

const baseServerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

type BaseServerResponse = {
  success: z.ZodBoolean;
  message: z.ZodString;
};

export function responseSchema(): ZodObject<BaseServerResponse>;
export function responseSchema<T extends ZodRawShape>(
  schema: ZodObject<T>
): ZodObject<
  BaseServerResponse & {
    data: ZodObject<T>;
  }
>;
export function responseSchema<T extends ZodRawShape>(schema?: ZodObject<T>) {
  if (schema) {
    return z.object({
      ...baseServerResponseSchema.shape,
      data: schema,
    }) as ZodObject<
      BaseServerResponse & {
        data: ZodObject<T>;
      }
    >;
  } else {
    return baseServerResponseSchema as ZodObject<BaseServerResponse>;
  }
}
