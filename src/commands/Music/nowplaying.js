const { EmbedBuilder, MessageFlags, AttachmentBuilder } = require("discord.js");
const { convertTime } = require("../../utils/convert.js");
const canvacard = require("canvacard");
const { progressbar } = require("../../utils/progressbar.js");

const { dynamicCard } = require("songcard");

module.exports = {
  name: "nowplaying",
  aliases: ["np"],
  category: "Music",
  description: "Show now playing song",
  args: false,
  usage: "",
  userPrams: [],
  botPrams: ["EmbedLinks"],
  owner: false,
  player: true,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix) => {
    const player = client.manager.players.get(message.guild.id);
    const song = player.queue.current;

    if (!player.queue.current) {
      const thing = new client.embed().d(
        `${client.emoji.cross} | No song/s currently playing within this guild.`,
      );

      return message.channel.send({ embeds: [thing] });
    }

    const emojimusic = client.emoji.music;
    const title =
      song.title.length > 25
        ? song.title.slice(0, 25) + "....."
        : song.title + ".....";
    const req = song.requester;
    const auth = player.queue.current.author;
    const total = song.length;
    const current = player.position;
    let playing = "";
    if (
      song.uri.toLowerCase().includes("youtube") ||
      song.uri.toLowerCase().includes("youtu")
    ) {
      playing = "youTube";
    } else if (song.uri.toLowerCase().includes("spotify")) {
      playing = "spotify";
    }

    const sexy = [
      "https://cdn.discordapp.com/attachments/1187323477032697867/1246372908780097626/20240601_132847.png",
      "https://cdn.discordapp.com/attachments/1187323477032697867/1246372896960679957/20240601_132856.png",
      "https://cdn.discordapp.com/attachments/1187323477032697867/1246372751808266271/20240601_132927.png",
    ];
    const sexneeded = Math.floor(Math.random() * sexy.length);
    const boobs = sexneeded[sexy];

    const buffer = await dynamicCard({
      thumbnailURL: song.thumbnail.replace("hqdefault", "maxresdefault"),
      songTitle: title,
      songArtist: auth,
      streamProvider: playing,
      trackRequester: `@` + req.username,
    });
     
    const attachment = new AttachmentBuilder(buffer, { name: "arrkiii.png" });

    const embed = new client.embed()
      // .setThumbnail(song.setThumbnailnail.replace('hqdefault', 'maxresdefault'))
      // .d(`<a:Playing:1188088755819663400> **Song** [${title}](${client.config.links.support})\n${client.emoji.dot} **Duration**\n[ \`${convertTime(current)} / ${convertTime(total)}\`]\n${client.emoji.dot} **Requester**\n ${song.requester}`)
      .img(`attachment://arrkiii.png`);
    // .setAuthor({name: `Now Playing`, iconURL: client.user.displayAvatarURL(), url: `https://top.gg/bot/1033496708992204840/vote`})
    // .setFooter({text: `Duration: [ ${convertTime(current)} | ${convertTime(total)} ] `});
    return message.channel.send({ /* embeds: [embed], */ files: [attachment] });
  },
};
