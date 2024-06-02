import { z } from "zod";
import { responseSchema } from "@/utils/response-schema.ts";

export const signUpFormSchema = z
  .object({
    login: z.string().min(3),
    password: z.string().min(6),
    repeatPassword: z.string().min(6),
    invitationCode: z.string().min(1),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.repeatPassword) {
      return ctx.addIssue({
        path: ["repeatPassword"],
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
      });
    }
  });

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export const signUpMutationResponseSchema = responseSchema();
