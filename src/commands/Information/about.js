/** @format */

const {
  EmbedBuilder,
  MessageFlags,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  version,
} = require("discord.js");

module.exports = {
  name: "about",
  category: "Information",
  aliases: ["dev", "abt"],
  botPrams: ["EMBED_LINKS"],
  description: "See information about this project.",
  cooldown: 3,
  execute: async (message, args, client, prefix) => {
    try {
      // Bot information
      const uptime = Math.round(Date.now() / 1000 - client.uptime / 1000);
      const guildCount = client.numb(client.guilds.cache.size);
      const channelCount = client.numb(client.channels.cache.size);
      const userCount = client.numb(
        client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0),
      );

      // Embeds
      const homeEmbed = new EmbedBuilder()
        .setColor(client.color)
        .setTitle("<:partners:1199282537357381762> Welcome to **About**")
        .setDescription(
          `_<:stolen_emoji:1201841280577970176> <a:Playing:1188088755819663400> **Check** [Website!](https://dracomc.fun)\n` +
            `<:stolen_emoji:1201841280577970176> **Join** [Support](${client.config.links.support}) & Get **Nop**!_\n\n` +
            `___Know more info about me by clicking the button below.___`,
        )
        .setImage(client.config.links.arrkiii)
        .setFooter({
          text: `DRACO MC | Page: [1/3]`,
          iconURL: client.user.displayAvatarURL(),
        });

      const infoEmbed = new EmbedBuilder()
        .setColor(client.embedColor)
        .setAuthor({
          name: `${client.user.username} Information`,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription(
          `>>> **. Bot Name:** ${client.user.username}\n` +
            `**. Servers:** ${guildCount}\n` +
            `**. Channels:** ${channelCount}\n` +
            `**. Users:** ${userCount}\n` +
            `**. Discord.js:** v${version}\n` +
            `**. Total Commands:** ${client.commands.size}\n` +
            `**. Uptime:** <t:${uptime}:R>\n` +
            `**. Ping:** ${client.ws.ping}ms`,
        )
        .setFooter({
          text: `DRACO MC | Page: [2/3]`,
          iconURL: client.user.displayAvatarURL(),
        });

      const teamEmbed = new EmbedBuilder()
        .setAuthor({
          name: "✨ Team DRACO MC ✨",
          iconURL: message.author.displayAvatarURL(),
          url: client.config.links.support,
        })
        .setDescription(
          `> **\`.01\` ${client.emoji.dot} Developer** **T4N1SHQ**\n` +
            `> **\`.02\` ${client.emoji.dot} Network** **DRACO MC**\n`
        )
        .setColor("#5865F2")
        .setImage(client.config.links.arrkiii)
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter({
          text: "🌙 DRACO MC | Page: [3/3]",
          iconURL: client.user.displayAvatarURL(),
        })
        .setTimestamp();

      // Buttons
      const rowHome = new ActionRowBuilder().addComponents([
        new ButtonBuilder()
          .setCustomId("arki")
          .setLabel("Home")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId("inf")
          .setLabel("Info")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("od")
          .setLabel("Team")
          .setStyle(ButtonStyle.Secondary),
      ]);

      // Send the initial message
      const msg = await message.reply({
        embeds: [homeEmbed],
        components: [rowHome],
      });

      // Collector
      const collector = msg.createMessageComponentCollector({
        filter: (i) => i.user.id === message.author.id,
        time: 60000, // 1-minute timeout
      });

      collector.on("collect", async (interaction) => {
        try {
          if (interaction.customId === "arki") {
            await interaction.update({
              embeds: [homeEmbed],
              components: [rowHome],
            });
          } else if (interaction.customId === "inf") {
            await interaction.update({
              embeds: [infoEmbed],
              components: [rowHome],
            });
          } else if (interaction.customId === "od") {
            await interaction.update({
              embeds: [teamEmbed],
              components: [rowHome],
            });
          }
        } catch (err) {
          console.error("Error handling interaction:", err);
        }
      });

      collector.on("end", (_, reason) => {
        if (reason === "time") {
          msg.edit({ components: [] }).catch(console.error);
        }
      });
    } catch (err) {
      console.error("Error executing 'about' command:", err);
      message.reply({
        content: "Something went wrong while executing this command.",
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
