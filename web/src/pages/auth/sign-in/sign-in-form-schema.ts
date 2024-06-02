import { z } from "zod";
import { responseSchema } from "@/utils/response-schema.ts";

export const signInFormSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(6),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;

export const signInMutationResponseSchema = responseSchema();
