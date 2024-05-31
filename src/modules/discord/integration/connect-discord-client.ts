import { Client, GatewayIntentBits } from "discord.js";
import { env } from "../../../config/env";

export async function connectDiscordClient(): Promise<Client<true>> {
  return new Promise((resolve) => {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    client.on("ready", (c) => {
      resolve(c);
    });

    client.on("error", (err) => {
      console.error(err);
    });

    client.login(env.DISCORD_TOKEN);
  });
}
