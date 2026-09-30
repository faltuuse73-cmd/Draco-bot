/** @format
 *
 * DRACO MC By T4N1SHQ
 * © 2026 DRACO MC • T4N1SHQ
 *
 */

const {
  EmbedBuilder,
  MessageFlags,
  version,
  Message,
  ButtonStyle,
  ButtonBuilder,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  name: "stats",
  category: "Information",
  aliases: ["status", "botinfo", "bi"],
  description: "Displays bot stats.",
  botPrams: ["EmbedLinks"],
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  cooldown: 3,
  execute: async (message, args, client, prefix) => {
    const ozuma = client.users.cache.get(client.owner);
    const duration1 = Math.round((Date.now() - message.client.uptime) / 1000);
    const Result = Math.floor(Math.random() * 30);
    const guildsCounts = client.guilds.cache.size;
    const channelsCounts = await client.channels.cache.size;
    const usercount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)
    const TotalChannels = client.numb(channelsCounts);
    const TotalGuilds = client.numb(guildsCounts);
    const TotalUsers = client.numb(usercount);

    const embed = new client.embed()
      .setAuthor({
        name: `${client.user.username} Information`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setFooter({
        text: client.config.links.power,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .d(
        `>>> . Bot Name : ${client.user.username}\n. Servers : ${guildsCounts}\n. Channels : ${TotalChannels}\n. Users : ${TotalUsers}\n. Discord.js : v${version}\n. Total Commands : ${client.commands.size}\n. Uptime : <t:${duration1}:R>\n. Ping : ${client.ws.ping}ms`,
      );

    const systum1 = new ActionRowBuilder().addComponents(
      new client.button().d(`st`, `Statics`, ``, true),
      new client.button().s(`dev`, `Developers`),
      new client.button().s(`imp`, `Links`),
    );
    const systum2 = new ActionRowBuilder().addComponents(
      new client.button().s(`st`, `Statics`),
      new client.button().d(`dev`, `Developers`, ``, true),
      new client.button().s(`imp`, `Links`),
    );
    const systum3 = new ActionRowBuilder().addComponents(
      new client.button().s(`st`, `Statics`),
      new client.button().s(`dev`, `Developers`),
      new client.button().d(`imp`, `Links`, ``, true),
    );
    const embed4 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Danger)
        .setCustomId(`guild4`)
        .setLabel(`${guildsCounts} Servers`)
        .setDisabled(true),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Danger)
        .setCustomId(`guild5`)
        .setLabel(`${TotalUsers} Users`)
        .setDisabled(true),
      new ButtonBuilder()
        .setStyle(ButtonStyle.Danger)
        .setCustomId(`guild6`)
        .setLabel(`${client.ws.ping}ms`)
        .setDisabled(true),
    );
    const msg = await message.reply({
      embeds: [embed],
      components: [systum1, embed4],
    });
    const collector = await msg.createMessageComponentCollector({
      filter: (i) => {
        if (message.author.id === i.user.id) return true;
        else {
          i.reply({
            content: `${client.emoji.cross} | That's not your session run : \`${prefix}botinfo\` to create your own.`,
            ephemeral: true,
          });
        }
      },
      time: 60000,
    });
    collector.on("collect", async (i) => {
      if (i.customId === "st") {
        i.update({ embeds: [embed], components: [systum1, embed4] });
      } else if (i.customId === "dev") {
        const kabbu = await client.users.fetch(`883997337863749652`);
        const ayush = await client.users.fetch(`925801847938248795`);
        const dot = client.emoji.dot;
        const embedab2 = new EmbedBuilder()
          .setAuthor({
            name: "Team <33",
            iconURL: message.author.displayAvatarURL(),
            url: client.config.links.support,
          })
          .setDescription(
            `> **\`.01\` ${dot} Bot Dev.? | [${ozuma.displayName}](https://discord.com/users/${ozuma.id})\n> \`.02\` ${dot} Web Dev.? | [${kabbu.displayName}](https://discord.com/users/${kabbu.id})\n> \`.03\` ${dot} Own.? | [${ayush.displayName}](https://discord.com/users/${ayush.id})**`,
          )
          .setColor(client.color)
          .setImage(client.config.links.arrkiii)
          .setFooter({
            text: client.config.links.power,
            iconURL: client.user.displayAvatarURL(),
          });
        i.update({ embeds: [embedab2], components: [systum2, embed4] });
      } else if (i.customId === "imp") {
        const embed3 = new client.embed().d(
          `> *[DRACO MC](${client.config.links.support})\n> [DRACO MC Website](https://dracomc.fun)\n> [Hosting](https://panel.moonhost.xyz/)*`,
        );
        i.update({ embeds: [embed3], components: [systum3, embed4] });
      }
    });
    collector.on("end", async (i) => {
      if (!msg) return;
      msg.edit({ components: [] });
    });
  },
};
