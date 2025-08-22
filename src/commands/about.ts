/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import {
  type ChatInputCommandInteraction,
  ContainerBuilder,
  TextDisplayBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  MessageFlags,
} from "discord.js";
import { logger } from "../utils/logger.js";

/**
 * Handles a slash command. Only responds with the about information,
 * because that's all we need.
 * @param interaction - The interaction payload from Discord.
 */
// eslint-disable-next-line max-lines-per-function -- Mostly components.
export const about = async(
  interaction: ChatInputCommandInteraction<"cached">,
): Promise<void> => {
  try {
    const components = [
      new ContainerBuilder().
        addTextDisplayComponents(
          new TextDisplayBuilder().setContent("# About Serenya"),
        ).
        addTextDisplayComponents(
          new TextDisplayBuilder().setContent(
            // eslint-disable-next-line stylistic/max-len -- Big boi string.
            "Hi there~! I am Serenya, a bot that allows you to mute yourself in a server when you need to force yourself to take a break.",
          ),
        ).
        addSeparatorComponents(
          new SeparatorBuilder().
            setSpacing(SeparatorSpacingSize.Small).
            setDivider(true),
        ).
        addTextDisplayComponents(
          new TextDisplayBuilder().setContent("## What can I do?"),
        ).
        addTextDisplayComponents(
          new TextDisplayBuilder().setContent(
            // eslint-disable-next-line stylistic/max-len -- Big boi string.
            "Once a server admin has added me to your community and granted the necessary permissions, you can use my `/break` command to mute yourself for a given duration. You cannot undo the mute, so this will force you to take a break for however long you desire.",
          ),
        ).
        addSeparatorComponents(
          new SeparatorBuilder().
            setSpacing(SeparatorSpacingSize.Small).
            setDivider(true),
        ).
        addTextDisplayComponents(
          new TextDisplayBuilder().setContent("## What if I need help?"),
        ).
        addTextDisplayComponents(
          new TextDisplayBuilder().setContent(
            // eslint-disable-next-line stylistic/max-len -- Big boi string.
            "My deepest apologies if I have made a mistake! Please reach out to us in our Discord server and we will do our best to assist you.",
          ),
        ),
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder().
          setStyle(ButtonStyle.Link).
          setLabel("Discord Server").
          setURL("https://chat.nhcarrigan.com"),
      ),
    ];
    await interaction.reply({
      components: components,
      flags:      MessageFlags.IsComponentsV2,
    });
  } catch (error) {
    if (error instanceof Error) {
      await logger.error("about command", error);
    }
    await interaction.editReply({
      content: "Oh dear, something went wrong.",
    });
  }
};
