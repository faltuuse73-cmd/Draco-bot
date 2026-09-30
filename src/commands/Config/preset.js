const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
} = require("discord.js");
const Preset = require("../../schema/preset");

module.exports = {
  name: "preset",
  aliases: ["preset"],
  category: "Config",
  args: false,
  execute: async (message, args, client, prefix) => {
    const presetImages = {
      1: "https://media.discordapp.net/attachments/1222557654916923432/1234789465508024321/preset1.png",
      2: "https://media.discordapp.net/attachments/1222557654916923432/1234789465868865586/preset2.png",
      3: "https://media.discordapp.net/attachments/1222557654916923432/1234789466145554452/preset3.png",
      4: "https://media.discordapp.net/attachments/1222557654916923432/1234789466439159859/preset4.png",
    };

    const embed = new EmbedBuilder()
      .setDescription("> Select a preset from the menu below!")
      .setColor(client.color);

    const selectMenu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("preset_menu")
        .setPlaceholder("Choose a preset")
        .addOptions(
          Object.keys(presetImages).map((key) => ({
            label: `Preset ${key}`,
            value: key,
            description: "Music Card Preview",
          }))
        )
    );

    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("save_preset")
        .setLabel("Save Current")
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId("reset_preset")
        .setLabel("Reset to Default")
        .setStyle(ButtonStyle.Danger)
    );

    const presetMessage = await message.channel.send({
      embeds: [embed],
      components: [selectMenu, buttons],
    });

    let selectedPreset = null;

    const collector = presetMessage.createMessageComponentCollector({
      filter: (i) => i.user.id === message.author.id,
      time: 60000,
    });

    collector.on("collect", async (i) => {
      if (i.isStringSelectMenu()) {
        selectedPreset = i.values[0];

        const presetEmbed = new EmbedBuilder()
          .setTitle(`Preset ${selectedPreset}`)
          .setColor(client.color)
          .setImage(presetImages[selectedPreset]);

        return i.update({
          embeds: [presetEmbed],
          components: [selectMenu, buttons],
        });
      }

      if (i.isButton()) {
        if (i.customId === "save_preset") {
          if (!selectedPreset) {
            return i.reply({
              content: "⚠️ Please select a preset before saving!",
              ephemeral: true,
            });
          }

          await Preset.updateOne(
            { guildId: message.guild.id },
            { $set: { presetType: parseInt(selectedPreset) } }, 
            { upsert: true }
          );

          return i.reply({
            content: `✅ Preset **${selectedPreset}** has been saved!`,
            ephemeral: true,
          });
        }

        if (i.customId === "reset_preset") {
          await Preset.deleteMany({ guildId: message.guild.id });

          return i.reply({
            content: `🔄 Preset has been reset to **Default**!`,
            ephemeral: true,
          });
        }
      }
    });

    collector.on("end", async () => {
      try {
        await presetMessage.edit({ components: [] });
      } catch (err) {
        console.error("Failed to disable components after timeout:", err);
      }
    });
  },
};
