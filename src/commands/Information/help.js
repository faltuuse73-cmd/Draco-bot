const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "help",
  category: "Information",
  aliases: ["h"],
  description: "Help with all commands, or one specific command.",
  botParams: ["EmbedLinks", "SendMassges"],
  cooldown: 3,
  execute: async (message, args, client, prefix) => {
    const ozuma = await client.users.fetch("1029065620878282792");
    const embed = new client.embed()
      .d(
        `- Prefix For This Server \`${prefix}\`\n- Total Commands \`${client.slashCommands.size + client.commands.size}\`\n- -# Prefix: ${client.commands.size}, Slash: ${client.slashCommands.size} `,
      )
      .addFields({
        name: `${client.emoji.search} **__My Commands:__**`,
        value: `
> ${client.emoji.antinuke} \`:\` **Antinuke**
> <:meko:1389892185754959912> \`:\` **Automod**
> ${client.emoji.config} \`:\` **Config**
> ${client.emoji.extra} \`:\` **Extra**
> ${client.emoji.fun} \`:\` **Fun**
> ${client.emoji.information} \`:\` **Information**
> ${client.emoji.moderation} \`:\` **Moderation**
> ${client.emoji.music} \`:\` **Music**
> ${client.emoji.pfp} \`:\` **Pfps**
> ${client.emoji.playlist} \`:\` **Playlists**
> ${client.emoji.profile} \`:\` **Profile**
> ${client.emoji.role} \`:\` **Role**
> ${client.emoji.utility} \`:\` **Utility**
> ${client.emoji.voice} \`:\` **Voice**
> ${client.emoji.welc} \`:\` **Welcome**
        `,
      })
      .img(client.config.links.arrkiii)
      .thumb(message.author.displayAvatarURL({ dynamic: true }))
      .setFooter({
        text: `Loved by ${client.guilds.cache.size} Servers`,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      });

    const button = new ActionRowBuilder().addComponents(
      new client.button().s(`home`, ``, client.emoji.home),
    );
    const commandCategories = [
      {
        label: "Antinuke",
        value: "antinuke",
        description: "Get all Antinuke commands",
        emoji: `${client.emoji.antinuke}`,
      },
        {
        label: "Automod",
        value: "automod",
        description: "Get all Automod commands",
        emoji: `<:meko:1389892185754959912>`,
      },
      {
        label: "Config",
        value: "config",
        description: "Get all Config commands",
        emoji: `${client.emoji.config}`,
      },
      {
        label: "Extra",
        value: "extra",
        description: "Get all Extra commands",
        emoji: `${client.emoji.extra}`,
      },
      {
        label: "Fun",
        value: "fun",
        description: "Get all Fun commands",
        emoji: `${client.emoji.fun}`,
      },
      {
        label: "Information",
        value: "information",
        description: "Get all Information commands",
        emoji: `${client.emoji.information}`,
      },
      {
        label: "Moderation",
        value: "moderation",
        description: "Get all Moderation commands",
        emoji: `${client.emoji.moderation}`,
      },
      {
        label: "Music",
        value: "music",
        description: "Get all Music commands",
        emoji: `${client.emoji.music}`,
      },
      {
        label: "Pfp",
        value: "pfp",
        description: "Get all Pfps commands",
        emoji: `${client.emoji.pfp}`,
      },
      {
        label: "Playlist",
        value: "playlist",
        description: "Get all Playlist commands",
        emoji: `${client.emoji.playlist}`,
      },
      {
        label: "Profile",
        value: "profile",
        description: "Get all Profile commands",
        emoji: `${client.emoji.profile}`,
      },
      {
        label: "Role",
        value: "role",
        description: "Get all Role commands",
        emoji: `${client.emoji.role}`,
      },
      {
        label: "Utility",
        value: "utility",
        description: "Get all Utility commands",
        emoji: `${client.emoji.utility}`,
      },
      {
        label: "Voice",
        value: "voice",
        description: "Get all Voice commands",
        emoji: `${client.emoji.voice}`,
      },
      {
        label: "Welcome",
        value: "welcome",
        description: "Get all Welcome commands",
        emoji: `${client.emoji.welc}`,
      },
    ];

    const dropdown = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("help_select")
        .setPlaceholder("Select a command category")
        .addOptions(commandCategories),
    );

    const sentMessage = await message.channel.send({
      embeds: [embed],
      components: [dropdown],
    });

    const collector = sentMessage.createMessageComponentCollector({
      filter: (interaction) => interaction.user.id === message.author.id,
      time: 60000,
    });

    collector.on("collect", async (interaction) => {
      if (interaction.isButton()) {
        if (interaction.customId === "home") {
          return interaction.update({
            embeds: [embed],
            components: [dropdown],
          });
        }
      } else if (interaction.isStringSelectMenu()) {
        const selectedCategory = interaction.values[0];
        const categoryCommands = client.commands
          .filter((cmd) => cmd.category?.toLowerCase() === selectedCategory)
          .map((cmd) => `\`${cmd.name}\``);

        const categoryEmbed = new client.embed()
          .d(
            `${categoryCommands.join(", ") || "No commands found for this category."}`,
          )
          .t(
              `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Commands`,
          )
          .setFooter({
            text: `Total ${categoryCommands.length} commands.`,
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          })
          .img(client.config.links.arrkiii);

        await interaction.update({
          embeds: [categoryEmbed],
          components: [dropdown, button],
        });
      }
    });

    collector.on("end", () => {
      sentMessage.edit({ components: [] });
    });
  },
};
