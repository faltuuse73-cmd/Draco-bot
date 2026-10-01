/** @format
 *
 * DRACO MC By T4N1SHQ
 * © 2026 DRACO MC • T4N1SHQ
 *
 */
const {
  EmbedBuilder,
  PermissionsBitField,
  ActionRowBuilder,
  ButtonStyle,
  ButtonBuilder,
  WebhookClient,
  version,
} = require("discord.js");
const db = require("../../schema/prefix.js");
const bl = require("../../schema/blacklist");
const IgnoreChannelModel = require("../../schema/ignorechannel");
const VoteBypassUserModel = require("../../schema/votebypassuser");
const db4 = require("../../schema/noprefix");
const cooldowns = new Map();

module.exports = {
  name: "messageCreate",
  run: async (client, message) => {
    if (message.author.bot) return;

    let prefix = client.prefix;
    const ress = await db.findOne({ Guild: message.guildId });
    if (ress && ress.Prefix) prefix = ress.Prefix;
    const reacter = new RegExp(`^<@!?${client.owner}>( |)$`);

    if (message.content.includes(client.owner)) {
      await message.react(client.emoji.owner).catch(() => {});
    }

    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(mention)) {
      if (
        !message.guild.members.me.permissions.has(
          PermissionsBitField.resolve("SendMessages"),
        )
      )
        return await message.author
          .send({
            content: `I don't have **\`SEND_MESSAGES\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.`,
          })
          .catch(() => null);

      if (
        !message.guild.members.me.permissions.has(
          PermissionsBitField.resolve("ViewChannel"),
        )
      )
        return;

      if (
        !message.guild.members.me.permissions.has(
          PermissionsBitField.resolve("EmbedLinks"),
        )
      )
        return await message.channel
          .send({
            content: `I don't have **\`EMBED_LINKS\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.`,
          })
          .catch(() => {});
      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(
          `> <:heart:1215695204439293962> **Hey ${message.author}**,\n> <:dot:1201841280577970176> **Prefix For This Server\`${prefix}\`**\n\n- ___Type ${prefix}help for more information.___`,
        )
        .setThumbnail(message.author.displayAvatarURL())
        .setImage(
          "https://cdn.discordapp.com/attachments/1519995340361568386/1555057312316526712/IMG_20261001_085221.jpg?backend=b2&ex=6abf237a&is=6abdd1fa&hm=92c172e8cf93bc168a2a09d3c446f57f493df782b6fedfa0ec615ecc483696b9&",
        )
        .setFooter({
          text: `Love From DRACO MC <3`,
          iconURL: client.user.displayAvatarURL(),
        });

      const button1 = new ActionRowBuilder().addComponents([
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("sys")
          .setLabel("System")
          .setDisabled(true),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("abtt")
          .setLabel("About Devs")
          .setDisabled(false),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("linkss")
          .setLabel("Links")
          .setDisabled(false),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("homm")
          .setEmoji("1127607405061079061")
          .setDisabled(false),
      ]);
      const button2 = new ActionRowBuilder().addComponents([
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("sys")
          .setLabel("System")
          .setDisabled(false),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("abtt")
          .setLabel("About Devs")
          .setDisabled(true),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("linkss")
          .setLabel("Links")
          .setDisabled(false),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("homm")
          .setEmoji("1127607405061079061")
          .setDisabled(false),
      ]);
      const button3 = new ActionRowBuilder().addComponents([
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("sys")
          .setLabel("System")
          .setDisabled(false),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("abtt")
          .setLabel("About Devs")
          .setDisabled(false),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("linkss")
          .setLabel("Links")
          .setDisabled(true),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("homm")
          .setEmoji("1127607405061079061")
          .setDisabled(false),
      ]);
      const button4 = new ActionRowBuilder().addComponents([
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("sys")
          .setLabel("System")
          .setDisabled(false),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("abtt")
          .setLabel("About Devs")
          .setDisabled(false),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("linkss")
          .setLabel("Links")
          .setDisabled(false),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("homm")
          .setEmoji("1127607405061079061")
          .setDisabled(true),
      ]);
      const mssg = await message.channel.send({
        embeds: [embed],
        components: [button4],
      }).catch(() => null);
      const collector = await mssg.createMessageComponentCollector({
        filter: (i) => {
          if (message.author.id === i.user.id) return true;
          else {
            i.reply({
              content: `${client.emoji.cross} | That's not your session run : \`Tag Me\` to create your own.`,
              ephemeral: true,
            });
          }
        },
      });
      const Result = Math.floor(Math.random() * 30);
      const guildsCounts = await client.guilds.cache;
      const channelsCounts = await client.channels.cache;
      const usercount = client.guilds.cache.reduce(
        (acc, guild) => acc + guild.memberCount,
        0,
      );
      const lund = Math.round((Date.now() - message.client.uptime) / 1000);
      const ping = Result;
      const meko1 = new EmbedBuilder()
        .setColor(client.color)
        .setFooter({
          text: client.config.links.power,
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
        })
        .setDescription(
          `<:arroww:1215695191793471559> **System Information\n> . Bot Name : ${client.user.username}\n> . Servers : ${client.numb(guildsCounts.size)}\n> . Channels : ${client.numb(channelsCounts.size)}\n> . Users : ${client.numb(usercount)}\n> . Discord.js : ${version}\n> . Total Commands : ${client.numb(client.commands.size)}\n> . Uptime :<t:${lund}:R>\n> . Ping : ${client.ws.ping}ms**`,
        );
      const t4n1shq = await client.users.fetch(`1416420999519408250`);
      const dot = client.emoji.dot;
      const meko2 = new EmbedBuilder()
        .setColor(client.color)
        .setImage(client.config.links.arrkiii)
        .setAuthor({
          name: `| Team <3`,
          iconURL:
            "https://cdn.discordapp.com/emojis/1215695204439293962.webp?size=40&quality=lossless",
          url: client.config.links.support,
        })
        .setDescription(
          `> **\`.01\` ${dot} Bot Dev.? | [${t4n1shq.displayName}](https://discord.com/users/${t4n1shq.id})\n> \`.02\` ${dot} Web Dev.? | [${t4n1shq.displayName}](https://discord.com/users/${t4n1shq.id})\n> \`.03\` ${dot} Own.? | [${t4n1shq.displayName}](https://discord.com/users/${t4n1shq.id})**`,
        );

      const meko3 = new EmbedBuilder()
        .setColor(client.color)
        .setTitle(`**__Links__**`)
        .setImage(client.config.links.arrkiii)
        .setDescription(
          `>>> ***<:inv:1220409952921981021> Invite Links: [Click Me](${client.config.links.invite})\n<:support:1220409940943048784> Support Server Link [Click Me](${client.config.links.support})\n<:privacy:1220409917278523473> Privacy Policy Link: ***Coming soon!***\n<:topgg:1220409964116316170> Vote Link: ***Coming soon!***`,
        );

      collector.on("collect", async (i) => {
        if (i.customId === "sys") {
          await i.update({ embeds: [meko1], components: [button1] }).catch(() => null);
        } else if (i.customId === "abtt") {
          await i.update({ embeds: [meko2], components: [button2] }).catch(() => null);
        } else if (i.customId === "linkss") {
          await i.update({ embeds: [meko3], components: [button3] }).catch(() => null);
        } else if (i.customId === "homm") {
          await i.update({ embeds: [embed], components: [button4] }).catch(() => null);
        }
      });
    }

    const np = [];
    const npData = await db4.findOne({
      userId: message.author.id,
      noprefix: true,
    });
    if (npData) np.push(message.author.id);

    const regex = new RegExp(`^<@!?${client.user.id}>`);
    const pre = message.content.match(regex)
      ? message.content.match(regex)[0]
      : prefix;
    if (!np.includes(message.author.id)) {
      if (!message.content.startsWith(pre)) return;
    }

    const args =
      np.includes(message.author.id) === false
        ? message.content.slice(pre.length).trim().split(/ +/)
        : message.content.startsWith(pre) === true
          ? message.content.slice(pre.length).trim().split(/ +/)
          : message.content.trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName),
      );

    if (!command) return;
      
          const blusers = await bl.findOne({userId: message.author.id })
    if (blusers) {
      const embed = new client.embed().a(`You have been blacklisted from using the bot!`, message.author.displayAvatarURL());
      const m = await message.channel.send({ embeds: [embed] }).catch(() => null);
      setTimeout(() => m.delete().catch(() => null), 5000);
      return;
    }

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Map());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000; // Default cooldown: 3 seconds

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = Math.round(expirationTime / 1_000);
        const cooldownEmbed = new EmbedBuilder()
          .setColor(client.color)
          .setDescription(
            `Please wait **<t:${timeLeft}:R>** before reusing the \`${command.name}\` command.`,
          );
        return message.reply({ embeds: [cooldownEmbed] }).then((msg) => {
          const delayTime = expirationTime - now; // Calculate the remaining cooldown time
          setTimeout(() => {
            msg.delete();
          }, delayTime);
        });
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    const ICHchannelId = message.channel.id;
    const isIgnored = await IgnoreChannelModel.findOne({
      guildId: message.guild.id,
      channelId: ICHchannelId,
    });
    if (isIgnored) {
      const baap = new EmbedBuilder()
        .setAuthor({
          name: `This channel is set to ignored channel..`,
          iconURL: message.author.displayAvatarURL(),
        })
        .setColor(client.color);
      const ignoreMessage = await message.channel.send({ embeds: [baap] }).catch(() => null);
      setTimeout(() => {
        ignoreMessage.delete().catch(console.error);
      }, 3000);
      return;
    }

    if (command.voteonly) {
      if (!client.topgg || typeof client.topgg.hasVoted !== "function") {
        return message.channel.send({ content: "Vote verification is temporarily unavailable." }).catch(() => null);
      }
      const hasVoted = await client.topgg.hasVoted(message.author.id);
      const voteBypassUser = await VoteBypassUserModel.findOne({
        userId: message.author.id,
      });
      if (!hasVoted && !voteBypassUser) {
        const embed = new EmbedBuilder()
          .setDescription(
            `__This Command Is Only For Our Voters So Vote Us Now By [Clicking Here](https://top.gg/bot/${client.user.id}/vote)__`,
          )
          .setColor(client.color);
        return message.channel.send({ embeds: [embed] }).catch(() => null);
      }
    }

    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.resolve("SendMessages"),
      )
    )
      return await message.author
        .send({
          content: `I don't have **\`SEND_MESSAGES\`** permission in <${message.guild.name}> to execute this **\`${command.name}\`** command.`,
        })
        .catch(() => {});

    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.resolve("ViewChannel"),
      )
    )
      return;

    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.resolve("EmbedLinks"),
      )
    )
      return await message.author
        .send({
          content: `I don't have **\`EMBED_LINKS\`** permission in <#${message.guild.name}> to execute this **\`${command.name}\`** command.`,
        })
        .catch(() => {});

    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;

      if (command.usage) {
        reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``;
      }

      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(reply);
      return message.channel.send({ embeds: [embed] }).catch(() => null);
    }

    if (command.botPerms) {
      if (
        !message.guild.members.me.permissions.has(
          PermissionsBitField.resolve(command.botPerms || []),
        )
      ) {
        const embed = new EmbedBuilder().setDescription(
          `I don't have **\`${command.botPerms}\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.`,
        );
        return message.channel.send({ embeds: [embed] }).catch(() => null);
      }
    }
    if (command.userPerms) {
      if (
        !message.member.permissions.has(
          PermissionsBitField.resolve(command.userPerms || []),
        )
      ) {
        const embed = new EmbedBuilder()
          .setColor(client.color)
          .setDescription(
            `You don't have **\`${command.userPerms}\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.`,
          );
        return message.channel.send({ embeds: [embed] }).catch(() => null);
      }
    }

    if (command.owner && message.author.id !== `${client.owner}`) {
      const t4n1shq = await client.users.fetch(`1416420999519408250`);
      const embed = new EmbedBuilder().setColor(client.color).setAuthor({
        name: `| Only T4N1SHQ can use these commands!`,
        iconURL: message.author.displayAvatarURL(),
      });
      return message.channel.send({ embeds: [embed] }).catch(() => null);
    }

    const player = client.manager.players.get(message.guild.id);
    if (command.player && !player) {
      return message.channel.send(`i'm not in any vc!`).catch(() => null);;
    }
    if (command.inVoiceChannel && !message.member.voice.channelId) {
      const embed = new EmbedBuilder().setColor(client.color).setAuthor({
        name: `Your are not in any vc`,
        iconURL: message.author.displayAvatarURL(),
        url: client.config.links.support,
      });
      return message.channel.send({ embeds: [embed] }).catch(() => null);
    }

    if (command.sameVoiceChannel) {
      if (message.guild.members.me.voice.channel) {
        if (
          message.guild.members.me.voice.channelId !==
          message.member.voice.channelId
        ) {
          const embed = new EmbedBuilder().setColor(client.color).setAuthor({
            name: `Your are not in same vc`,
            iconURL: message.author.displayAvatarURL(),
            url: client.config.links.support,
          });
          return message.channel.send({ embeds: [embed] }).catch(() => null);
        }
      }
    }
    //

    command.execute(message, args, client, prefix).catch((e) => {
      console.log(e);
    });
    if (command && command.execute) {
      const log = client.channels.cache.get(`1241614535568134236`);
      const webhookUrl = client.config.Webhooks.cmdrun;
      const web = webhookUrl ? new WebhookClient({ url: webhookUrl }) : null;
      const commandlog = new EmbedBuilder()
        .setAuthor({
          name: message.author.tag,
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
        })
        .setColor(client.color)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setDescription(
          `Command Just Used In : \`${message.guild.name} | ${message.guild.id}\`\n Command Used In Channel : \`${message.channel.name} | ${message.channel.id}\`\n Command Name : \`${command.name}\`\n Command Executor : \`${message.author.tag} | ${message.author.id}\`\n Command Content : \`${message.content}\``,
        );
      if (web) web.send({ embeds: [commandlog] }).catch(() => null);
    }
  },
};
