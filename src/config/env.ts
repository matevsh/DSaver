import {z} from "zod";
import 'dotenv/config';

const envSchema = z.object({
    PORT: z.coerce.number(),
})

export const env = envSchema.parse(process.env);