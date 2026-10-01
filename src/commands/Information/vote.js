const {
    ButtonBuilder,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  name: "vote",
  aliases: ["vote"],
  description: "Vote for the bot",
  args: false,
  botPrams: ["EMBED_LINKS"],
  userPerms: [],
  owner: false,
  category: "Information",
  cooldown: 3,
  execute: async (message, args, client, prefix) => {
    const button = new ButtonBuilder()
      .setLabel("Vote")
      .setStyle("Link")
      .setURL("https://discord.gg/qcNj6VBm6s");
    const row = new ActionRowBuilder().addComponents(button);
    message.reply({components: [row] });
  },
};
