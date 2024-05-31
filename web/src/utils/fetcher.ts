import { ZodType } from "zod";
import { ENV } from "@/common/env.ts";

export async function fetcher<T>(
  url: string,
  zodSchema: ZodType<T>,
  fetchArgs?: RequestInit
) {
  const response = await fetch(`${ENV.VITE_API_HOST}${url}`, fetchArgs);

  const rawData = await response.json();

  const data = zodSchema.parse(rawData);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
}
