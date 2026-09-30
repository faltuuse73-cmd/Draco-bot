/** @format
 *
 * DRACO MC By T4N1SHQ
 * © 2026 DRACO MC • T4N1SHQ
 *
 */

const {
  EmbedBuilder,
  MessageFlags,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ComponentType,
} = require("discord.js");

module.exports = {
  name: "team",
  category: "Information",
  aliases: ["team"],
  description: "See information about this project.",
  args: false,
  usage: "",
  owner: false,
  cooldown: 3,
  execute: async (message, args, client, prefix, interaction) => {
    const ozuma = await client.users.fetch(`1029065620878282792`);
    const kabbu = await client.users.fetch(`1025035540518678598`);
    const ayush = await client.users.fetch(`925801847938248795`);
    const roke = await client.users.fetch(`883997337863749652`);

    const embedt = new EmbedBuilder()
      .setAuthor({
        name: `${client.user.username}\`'s Team`,
        iconURL: client.user.displayAvatarURL({ dynamic: true, size: 2048 }),
      })
      .setDescription(
        `> ***[${message.author.username}](https://discord.com/users/${message.author.id})*** ***Konichiwa!!*** ***Our Bot Is A Versatile And Intelligent Digital Assistant Designed To Handle A Wide Range Of Tasks And Interactions.*** <a:dr_heats:1169626554456875170>`,
      )
      .setImage(client.config.links.arrkiii)
      .setColor(client.color)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setFooter({
        text: client.config.links.power,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      });

    const row = new ActionRowBuilder().addComponents([
      new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setCustomId("1")
        .setEmoji("1127607405061079061"),
    ]);

    const devsbaby = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("teamm")
        .setPlaceholder("Moon development <3")
        .addOptions([
          {
            label: `${ozuma.displayName}`,
            value: `${ozuma.username}`,
            description: "Info About My Developer!",
            emoji: `1169971284332003440`,
          },
            {
            label: `${roke.displayName}`,
            value: `${roke.username}`,
            description: "Info About My Co Owner",
            emoji: `1242053801016299520`,
          },
          {
            label: `${kabbu.displayName}`,
            value: `${kabbu.username}`,
            description: "Info About My Owner",
            emoji: `1242053801016299520`,
          },
          {
            label: `${ayush.displayName}`,
            value: `${ayush.username}`,
            description: "Info About My Founder",
            emoji: `1242053801016299520`,
          },
        ]),
    );
    const msg = await message.channel.send({
      embeds: [embedt],
      components: [devsbaby],
    });
    const collector = await msg.createMessageComponentCollector({
      filter: (i) => {
        if (message.author.id === i.user.id) return true;
        else {
          i.reply({
            content: `${client.emoji.cross} | That's not your session run : \`${prefix}team\` to create your own.`,
            ephemeral: true,
          });
        }
      },
      time: 100000,
    });
    const oembed = new EmbedBuilder()
      .setThumbnail(ozuma.displayAvatarURL())
      .setAuthor({
        name: "Info About T4N1SHQ",
        iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }),
      })
      .setFooter({
        text: `Thanks For Using Me <3`,
        iconURL: message.author.displayAvatarURL(),
      })
      .setDescription(
        `> <:Owners:1199282508269879346> **__Developer__**\n> - [@${ozuma.displayName}](https://discord.com/users/${ozuma.id})\n> **ID:** \`-\` ${ozuma.id}\n\`\`\`ㅤ\`\`\`\n> <:links:1188351754128080957> **__Social Medias ↓__**\n\n> <:Insta:1196715538773180478> __[Insta!](https://www.instagram.com/ozuma_xd/)__\n> <:Snap:1196715534587281438> __[Snap!](https://www.snapchat.com/add/ozuma_xd)__\n> <:config:1127607954561056768> __[Support!](${client.config.links.support})__`,
      )
      .setImage(
        "https://media.discordapp.net/attachments/1222576070134595594/1242050561386483762/20240520_151426.jpg",
      )
      .setColor("#2f3136")
      .setTimestamp();

    const kembed = new EmbedBuilder()
      .setThumbnail(kabbu.displayAvatarURL())
      .setAuthor({
        name: "Info About Kabbu",
        iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }),
      })
      .setFooter({
        text: `Thanks For Using Me <3`,
        iconURL: message.author.displayAvatarURL(),
      })
      .setDescription(
        `> <:Owners:1199282508269879346> **__Developer__**\n> - [@${kabbu.displayName}](https://discord.com/users/${kabbu.id})\n> **ID:** \`-\` ${kabbu.id}\n\`\`\`ㅤ\`\`\`\n> <:links:1188351754128080957> **__Social Medias ↓__**\n\n> <:Insta:1196715538773180478> __[Insta!](https://www.instagram.com/velvetshayar/)__\n> <:Snap:1196715534587281438> __[Snap!](https://www.snapchat.com/add/xayar.kabir)__\n> <:config:1127607954561056768> __[Support!](${client.config.links.support})__`,
      )
      .setImage(
        "https://cdn.discordapp.com/banners/1025035540518678598/a_a1c81a2e75652f0673b67ed854cbfbeb.gif?size=512",
      )
      .setColor("#2f3136")
      .setTimestamp();

    const aembed = new EmbedBuilder()
      .setThumbnail(ayush.displayAvatarURL())
      .setAuthor({
        name: "Info About Ayush",
        iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }),
      })
      .setFooter({
        text: `Thanks For Using Me <3`,
        iconURL: message.author.displayAvatarURL(),
      })
      .setDescription(
        `> <:Owners:1199282508269879346> **__Founder__**\n> - [@${ayush.displayName}](https://discord.com/users/${ayush.id})\n> **ID:** \`-\` ${ayush.id}\n\`\`\`ㅤ\`\`\`\n> <:links:1188351754128080957> **__Social Medias ↓__**\n\n> <:Insta:1196715538773180478> __[Insta!](https://www.instagram.com/ayush_rajput.4290/)__\n> <:Snap:1196715534587281438> __[Snap!](https://www.snapchat.com/add/ayush_rajput6904)__\n> <:config:1127607954561056768> __[Support!](${client.config.links.support})__`,
      )
      .setImage(
        "https://cdn.discordapp.com/attachments/1312278857335832586/1315700166740934829/58fa749acfa848e78a6425345d4791d4.jpg",
      )
      .setColor("#2f3136")
    
    const rembed = new EmbedBuilder()
      .setThumbnail(roke.displayAvatarURL())
      .setAuthor({
        name: "Info About Roke",
        iconURL: message.guild.iconURL({ dynamic: true, size: 2048 }),
      })
      .setFooter({
        text: `Thanks For Using Me <3`,
        iconURL: message.author.displayAvatarURL(),
      })
      .setDescription(
        `> <:Owners:1199282508269879346> **____**\n> - [@${roke.displayName}](https://discord.com/users/${roke.id})\n> **ID:** \`-\` ${roke.id}\n\`\`\`ㅤ\`\`\`\n> <:links:1188351754128080957> **__Social Medias ↓__**\n\n> <:Insta:1196715538773180478> __[Insta!](https://www.instagram.com/ayush_rajput.4290/)__\n> <:Snap:1196715534587281438> __[Snap!](https://www.snapchat.com/add/ayush_rajput6904)__\n> <:config:1127607954561056768> __[Support!](${client.config.links.support})__`,
      )
      .setImage(
        "https://cdn.discordapp.com/attachments/1312278857335832586/1315700166740934829/58fa749acfa848e78a6425345d4791d4.jpg",
      )
      .setColor("#2f3136")

    collector.on("collect", async (i) => {
      if (i.isStringSelectMenu()) {
        for (const value of i.values) {
          if (value === ozuma.username) {
            return i.update({ embeds: [oembed], components: [devsbaby, row] });
          }
          if (value === kabbu.username) {
            return i.update({ embeds: [kembed], components: [devsbaby, row] });
          }
          if (value === ayush.username) {
            return i.update({ embeds: [aembed], components: [devsbaby, row] });
          }
            if (value === roke.username) {
            return i.update({ embeds: [rembed], components: [devsbaby, row] });
          }
        }
      }
      if (i.isButton()) {
        if (i.customId === "1")
          await i.update({ embeds: [embedt], components: [devsbaby] });
      }
      {
        if (i.customId === "2")
          await i.update({ embeds: [oembed], components: [devsbaby] });
      }
    });
    collector.on("end", async (i) => {
      if (!msg) return;
      msg.edit({
        embeds: [embedt],
        components: [],
        content: `<a:simpers_cheers:1194607806893015081> | Team commands timed out. Run \`${prefix}Team\` again.`,
      });
    });
  },
};
