import { responseSchema } from "@/utils/response-schema.ts";
import { z } from "zod";
import { ROLE } from "@/shared/enums/role.enum.ts";

export const userSessionSchema = responseSchema(
  z.object({
    id: z.string().cuid(),
    login: z.string(),
    name: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    role: z.enum([ROLE.USER, ROLE.ADMIN]),
  })
);
