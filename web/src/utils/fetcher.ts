import { ZodType } from "zod";
import { ENV } from "@/common/env.ts";
import { ResponseSchema } from "@/utils/response-schema.ts";

const FETCH_FAILED =
  "Unknown server error, please try again later or contact support.";

export async function fetcher<T extends ResponseSchema>(
  url: string,
  zodSchema: ZodType<T>,
  fetchArgs?: RequestInit
) {
  const response = await fetch(`${ENV.VITE_API_HOST}${url}`, {
    credentials: "include",
    ...fetchArgs,
  }).catch(() => {
    throw new Error(FETCH_FAILED);
  });

  const rawData = await response.json();

  const parseResult = zodSchema.safeParse(rawData);

  if (!parseResult.success) {
    throw new Error(FETCH_FAILED);
  }

  if (!parseResult.data.success) {
    throw new Error(parseResult.data.message);
  }

  return parseResult.data;
}
