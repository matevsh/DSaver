import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher.ts";
import { z } from "zod";
import { responseSchema } from "@/utils/response-schema.ts";

const CHANNELS_QUERY_KEY = ["discord-channels"];

const channelsSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const channelsResponseSchema = responseSchema(z.array(channelsSchema));

export function useDiscordChannels() {
  return useQuery({
    queryKey: CHANNELS_QUERY_KEY,
    queryFn: () => fetcher("/discord/channels", channelsResponseSchema),
  });
}
