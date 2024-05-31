import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher.ts";
import { z } from "zod";

const CHANNELS_QUERY_KEY = ["discord-channels"];

const channelsSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export function useDiscordChannels() {
  return useQuery({
    queryKey: CHANNELS_QUERY_KEY,
    queryFn: () => fetcher("/discord/channels", z.array(channelsSchema)),
  });
}
