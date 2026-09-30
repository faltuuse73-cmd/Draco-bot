module.exports = {
  name: "ping",
  cooldown: 5,
  category: "Information",
  execute: async (message, args, client, prefix) => {
    message.reply({
      embeds: [
        new client.embed().setAuthor({
          name: `- My Ping is [${client.ws.ping}ms]`,
          iconURL: message.author.displayAvatarURL(),
          url: client.config.links.support,
        }),
      ],
    });
  },
};
