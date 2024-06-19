import { z } from "zod";
export const signUpSchema = z.object({
    login: z.string(),
    invitationCode: z.string(),
    password: z.string(),
    repeatPassword: z.string(),
});
export const signInSchema = z.object({
    login: z.string(),
    password: z.string(),
});
