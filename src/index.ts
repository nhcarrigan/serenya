/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import {
  Client,
  GatewayIntentBits,
  Events,
} from "discord.js";
import { about } from "./commands/about.js";
import { breakCommand } from "./commands/break.js";
import { instantiateServer } from "./server/serve.js";
import { logger } from "./utils/logger.js";

const serenya = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

serenya.once(Events.ClientReady, () => {
  void logger.log(
    "debug", `Logged in as ${serenya.user?.username ?? "unknown user"}.`,
  );
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises -- Nah.
serenya.on(Events.InteractionCreate, async(interaction) => {
  if (!interaction.isChatInputCommand() || !interaction.inCachedGuild()) {
    return;
  }
  const command = interaction.commandName;
  if (command === "about") {
    await about(interaction);
    return;
  }
  if (command === "break") {
    await breakCommand(interaction);
    return;
  }
  await interaction.reply("Huh?");
});

await serenya.login(process.env.BOT_TOKEN);
instantiateServer();
