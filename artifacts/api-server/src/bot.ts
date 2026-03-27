import { Client, GatewayIntentBits, Events } from "discord.js";
import { logger } from "./lib/logger";

export function startBot() {
  const token = process.env["DISCORD_BOT_TOKEN"];

  if (!token) {
    logger.error("DISCORD_BOT_TOKEN is not set. Bot will not start.");
    return;
  }

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages,
    ],
  });

  client.once(Events.ClientReady, (readyClient) => {
    logger.info({ tag: readyClient.user.tag }, "Discord bot is online!");
  });

  client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    if (message.content === "!ping") {
      await message.reply("Pong!");
    }

    if (message.content === "!hello") {
      await message.reply(`Hello, ${message.author.displayName}!`);
    }

    if (message.content === "!help") {
      await message.reply(
        "**Available commands:**\n`!ping` — check if bot is online\n`!hello` — say hello\n`!help` — show this message"
      );
    }
  });

  client.login(token).catch((err) => {
    logger.error({ err }, "Failed to login to Discord");
  });
}
