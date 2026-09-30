const {
  EmbedBuilder,
  MessageFlags,
  AttachmentBuilder,
  CommandInteraction,
  Client,
} = require("discord.js");
const { convertTime } = require("../../utils/convert.js");
const { progressbar } = require("../../utils/progressbar.js");
const canvafy = require("canvafy");

module.exports = {
  name: "nowplaying",
  description: "Show now playing song",
  userPrams: [],
  botPrams: ["EMBED_LINKS"],
  player: true,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });
    const player = client.manager.players.get(interaction.guild.id);
    const song = player.queue.current;

    const emojimusic = client.emoji.music;
    const title =
      song.title.length > 25
        ? song.title.slice(0, 25) + "....."
        : song.title + ".....";
    const req = song.requester;
    const auth = player.queue.current.author;
    const total = song.length;
    const current = player.position;

    const spotify = await new canvafy.Spotify({
      font: {
        name: "Poppins",
        path: `assets/fonts/Poppins/Poppins-Regular.ttf`,
      },
    })
      .setAuthor(auth)
      .setTimestamp(current, total)
      .setImage(`${song.thumbnail}`)
      .setTitle(title)
      .setBlur(1)
      .setOverlayOpacity(0.5)
      .build();
    const attachment = new AttachmentBuilder(spotify, { name: "arrkiii.png" });

    const embed = new EmbedBuilder()
      .setThumbnail(interaction.member.displayAvatarURL({ dynamic: true }))
      .setDescription(
        `<a:Playing:1188088755819663400> **Song** [${title}](${client.config.links.support})\n<:RedDot:1127603979824672789> **Duration**\n[ \`${convertTime(current)} / ${convertTime(total)}\`]\n<:RedDot:1127603979824672789> **Requester**\n ${song.requester}`,
      )
      .setImage(`attachment://arrkiii.png`)
      .setColor(client.color)
      .setAuthor({
        name: `| Now Playing`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setFooter({
        text: `${client.config.links.power}`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      });
    return interaction.editReply({ embeds: [embed], files: [attachment] });
  },
};
