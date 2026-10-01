/** @format
 *
 * DRACO MC By T4N1SHQ
 * © 2026 DRACO MC • T4N1SHQ
 */

const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "team",
  category: "Information",
  aliases: ["team"],
  description: "See information about the DRACO MC team.",
  args: false,
  usage: "",
  owner: false,
  cooldown: 3,
  execute: async (message, args, client) => {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: "DRACO MC Team",
        iconURL: client.user.displayAvatarURL({ dynamic: true, size: 2048 }),
      })
      .setDescription(
        `> **Developer:** T4N1SHQ\n> **Network:** DRACO MC\n> **Support:** ${client.config.links.vanity}`,
      )
      .setImage(client.config.links.arrkiii)
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setFooter({
        text: client.config.links.power,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      });

    await message.channel.send({ embeds: [embed] });
  },
};
