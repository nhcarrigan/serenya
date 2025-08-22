/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

/* eslint-disable stylistic/max-len -- We have a few long strings so Naomi bein' lazy. */

import { logger } from "../utils/logger.js";
import type { ChatInputCommandInteraction } from "discord.js";

/**
 * Processes the `/break` command. Attempts to mute the user for
 * the duration they specify.
 * @param interaction - The interaction payload from Discord.
 */
export const breakCommand = async(
  interaction: ChatInputCommandInteraction<"cached">,
): Promise<void> => {
  try {
    await interaction.deferReply();
    const minutes = interaction.options.getInteger("minutes", true);
    const { member } = interaction;
    if (!member.moderatable) {
      await interaction.editReply({ content: "Sorry, I was not able to mute you. Please have an admin confirm that I have the necessary permission, and that my role is above yours in the heirarchy." });
      return;
    }
    await member.timeout(minutes * 60 * 1000, "Self-requested mute to enforce a break");
    await interaction.editReply({ content: "Okie dokie dearie! Enjoy your break, and we will see you later! 🩵" });
  } catch (error) {
    if (error instanceof Error) {
      await logger.error("break command", error);
    }
    await interaction.editReply({ content: "Sorry, something went wrong. Please try again later." });
  }
};
