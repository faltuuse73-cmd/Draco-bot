/** @format
 *
 * DRACO MC By T4N1SHQ
 * © 2026 DRACO MC • T4N1SHQ
 *
 */

const {
  EmbedBuilder,
  MessageFlags,
  CommandInteraction,
  Client,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  version,
} = require("discord.js");

module.exports = {
  name: "about",
  description: "Know Me!",
  userPrams: [],
  botPrams: ["EMBED_LINKS"],
  owner: false,

  run: async (client, interaction, prefix) => {
    await interaction.deferReply({
      ephemeral: false,
    });

    const duration1 = Math.round(
      (Date.now() - interaction.client.uptime) / 1000,
    );
    const Result = Math.floor(Math.random() * 30);
    const guildsCounts = await client.guilds.cache;
    const channelsCounts = await client.channels.cache;
    const usercount = client.guilds.cache.reduce(
      (acc, guild) => acc + guild.memberCount,
      0,
    );
    const userCounts2 = usercount + usercount + usercount;
    const ping = Result;

    const embed11 = new EmbedBuilder()
      .setColor(client.embedColor)
      .setAuthor({
        name: `${client.user.username} Information`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setFooter({ text: client.config.links.power })
      .setDescription(
        `>>> . Bot Name : ${client.user.username}\n. Servers : ${guildsCounts.size}\n. Channels : ${channelsCounts.size}\n. Users : ${usercount}\n. Discord.js : v${version}\n. Total Commands : ${client.commands.size}\n. Uptime : <t:${duration1}:R>\n. Ping : ${Result}ms`,
      );

    const home = new EmbedBuilder()
      .setColor(client.color)
      .setTitle(`<:there:1125101077486915715>ㅤㅤ**Welc** To About`)
      .setDescription(
        `_<:stolen_emoji:1201841280577970176> <a:Playing:1188088755819663400> ﹒⁾⁾ **Check** [Website!](https://dracomc.fun)\n<:stolen_emoji:1201841280577970176> **join** [Support](${client.config.links.support}) & Get **Nop**!_\n___Know more info about me by clicking the button below.___`,
      )
      .setImage(client.config.links.arrkiii)
      .setFooter({ text: `Keep supporting us <33` });

    const row6 = new ActionRowBuilder().addComponents([
      new ButtonBuilder()
        .setCustomId("arki")
        .setLabel("Home")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(true),
      new ButtonBuilder()
        .setCustomId("inf")
        .setLabel("Info")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(false),
      new ButtonBuilder()
        .setCustomId("od")
        .setLabel("Team")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(false),
    ]);
    const roww6 = new ActionRowBuilder().addComponents([
      new ButtonBuilder()
        .setCustomId("arki")
        .setLabel("Home")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(false),
      new ButtonBuilder()
        .setCustomId("inf")
        .setLabel("Info")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(true),
      new ButtonBuilder()
        .setCustomId("od")
        .setLabel("Team")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(false),
    ]);
    const rowww6 = new ActionRowBuilder().addComponents([
      new ButtonBuilder()
        .setCustomId("arki")
        .setLabel("Home")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(false),
      new ButtonBuilder()
        .setCustomId("inf")
        .setLabel("Info")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(false),
      new ButtonBuilder()
        .setCustomId("od")
        .setLabel("Team")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(true),
    ]);

    await interaction.editReply({ embeds: [home], components: [row6] });
    const collector = interaction.channel.createMessageComponentCollector({
      filter: (b) => {
        if (b.user.id === interaction.user.id) return true;
        else
          return b
            .reply({
              content: `Only **${interaction.user.tag}** can use this button, if you want then you've to run the command again.`,
            })
            .catch(() => {});
      },
      time: 60000 * 5,
      idle: 30e3,
    });

    collector.on("collect", async (i) => {
      if (i.customId === "arki") {
        await i.update({ embeds: [home], components: [row6] });
      } else if (i.customId === "inf") {
        const embedab1 = new EmbedBuilder()
          .setTitle(
            `**Hi i am ${client.user.username} a music bot with rich audio quality**`,
          )
          .setDescription(
            `> <:RedDot:1127603979824672789> _You Can Type ${prefix}help For More Commands_\n> <:RedDot:1127603979824672789> _You Can Play Music By Typing ${prefix}play <song name>_`,
          )
          .setImage(client.config.links.arrkiii)
          .setColor(client.color)
          .setFooter({
            text: `${client.config.links.power}`,
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          })
          .setAuthor({
            name: `${client.user.username}`,
            iconURL: interaction.member.displayAvatarURL(),
          });
        await i.update({ embeds: [embed11], components: [roww6] });
      } else if (i.customId === "od") {
        const ozuma = await client.users.fetch(`1029065620878282792`);
        const shubh = await client.users.fetch(`852561898774724648`);
        const manas = await client.users.fetch(`1036503458066468935`);
        const nik = await client.users.fetch(`1219141942017921106`);
        const roke = await client.users.fetch(`883997337863749652`);
        const ray = await client.users.fetch(`870179991462236170`);

        const embedab2 = new EmbedBuilder()
          .setAuthor({
            name: `Arrkiii\`'s Team`,
            iconURL: interaction.member.displayAvatarURL(),
          })
          .addFields([
            {
              name: `Teams <33`,
              value: `> **\`.01\` <:stolen_emoji:1201841280577970176> Bot Dev.? | [${ozuma.displayName}](https://discord.com/users/${ozuma.id})\n> \`.02\` <:stolen_emoji:1201841280577970176> Web Dev.? | [${roke.displayName}](https://discord.com/users/${roke.id})\n> \`.03\` <:stolen_emoji:1201841280577970176> Own.? | [${shubh.displayName}](https://discord.com/users/${shubh.id})\n> \`.04\` <:stolen_emoji:1201841280577970176> Own.? | [${manas.displayName}](https://discord.com/users/${manas.id})\n> \`.05\` <:stolen_emoji:1201841280577970176> Own.? | [${nik.displayName}](https://discord.com/users/${nik.id})\n> \`.06\` <:stolen_emoji:1201841280577970176> Own.? | [${ray.displayName}](https://discord.com/users/${ray.id})**`,
            },
          ])
          .setColor(client.color)
          .setImage(client.config.links.arrkiii)
          .setFooter({
            text: `Thanks For Supporting Us <3`,
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          });
        i.update({ embeds: [embedab2], components: [rowww6] });
      }
    });
  },
};
