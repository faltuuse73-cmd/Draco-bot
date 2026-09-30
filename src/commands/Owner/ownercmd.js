/** @format
 *
 * DRACO MC By T4N1SHQ
 * © 2026 DRACO MC • T4N1SHQ
 *
 */

module.exports = {
  name: "ownercmd",
  category: "Owner",
  aliases: ["ownercmd", "ocmdlist", "ocmd"],
  description: "Help with all commands, or one specific command.",
  args: false,
  usage: "",
  botPrams: ["EMBED_LINKS", "SEND_MESSAGES"],
  userPerms: [],
  owner: false,
  execute: async (message, args, client, prefix) => {
    const Owns = client.commands
      .filter((x) => x.category && x.category === "Owner")
      .map((x) => `\`${x.name}\``);
    return await message.channel.send({
      embeds: [new client.embed().d(Owns.join(", "))],
    });
  },
};
