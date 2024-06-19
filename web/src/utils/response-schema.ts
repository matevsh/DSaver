import { z, ZodObject, ZodRawShape, ZodArray, ZodTypeAny } from "zod";

const baseServerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type ServerResponse = z.infer<typeof baseServerResponseSchema>;

type BaseServerResponse = {
  success: z.ZodBoolean;
  message: z.ZodString;
};

// Overload signatures
export function responseSchema(): ZodObject<BaseServerResponse>;
export function responseSchema<T extends ZodRawShape>(
  schema: ZodObject<T>
): ZodObject<
  BaseServerResponse & {
    data: ZodObject<T>;
  }
>;
export function responseSchema<T extends ZodTypeAny>(
  schema: ZodArray<T>
): ZodObject<
  BaseServerResponse & {
    data: ZodArray<T>;
  }
>;

// Function implementation
export function responseSchema<T extends ZodTypeAny>(
  schema?: ZodObject<ZodRawShape> | ZodArray<T>
) {
  if (schema) {
    return z.object({
      ...baseServerResponseSchema.shape,
      data: schema,
    }) as ZodObject<
      BaseServerResponse & {
        data: typeof schema;
      }
    >;
  } else {
    return baseServerResponseSchema as ZodObject<BaseServerResponse>;
  }
}
