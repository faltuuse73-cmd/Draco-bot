/** @format */

module.exports = {
  token: process.env.DISCORD_TOKEN || "",
  clientId: "1399186967966519326",
  prefix: ">",
  ownerID: "1416420999519408250",
  SpotifyID: process.env.SPOTIFY_CLIENT_ID || "",
  SpotifySecret: process.env.SPOTIFY_CLIENT_SECRET || "",
  mongourl: process.env.MONGO_URI || "",
  embedColor: "#2f3136",
  logs: process.env.LOGS_WEBHOOK || "",
  node_source: "ytsearch",
  topgg: process.env.TOPGG_TOKEN || "",
  links: {
    BG: "https://cdn.discordapp.com/attachments/1519995340361568386/1555057312316526712/IMG_20261001_085221.jpg?backend=b2&ex=6abf237a&is=6abdd1fa&hm=92c172e8cf93bc168a2a09d3c446f57f493df782b6fedfa0ec615ecc483696b9&",
    support: "https://discord.gg/dracomc",
    invite:
      "https://discord.com/api/oauth2/authorize?client_id=1399186967966519326&permissions=824671333721&scope=bot",
    arrkiii:
      "https://cdn.discordapp.com/attachments/1519995340361568386/1555056524374835261/standard_3.gif?backend=b2&ex=6abf22be&is=6abdd13e&hm=60e0af3652488c739ebae7640392e5153781df9bc3404428936fa69d4793cd1e&",
    power: "Powered By DRACO MC • T4N1SHQ",
    vanity: "discord.gg/dracomc",
    guild: "1534085749010595840",
    topgg: "https://top.gg/bot/1033496708992204840/vote",
  },
  Webhooks: {
    black: process.env.WEBHOOK_BLACK || "",
    player_create: process.env.WEBHOOK_PLAYER_CREATE || "",
    player_delete: process.env.WEBHOOK_PLAYER_DELETE || "",
    guild_join: process.env.WEBHOOK_GUILD_JOIN || "",
    guild_leave: process.env.WEBHOOK_GUILD_LEAVE || "",
    cmdrun: process.env.WEBHOOK_CMDRUN || "",
  },

nodes: [
    {
      name: "AjieBlogs-SSL",
      url: "lava-v4.ajieblogs.eu.org:443",
      auth: "https://dsc.gg/ajidevserver",
      secure: true,
    },
    {
      name: "Serenetia-SSL",
      url: "lavalinkv4.serenetia.com:443",
      auth: "https://dsc.gg/ajidevserver",
      secure: true,
    },
    {
      name: "Inari-V4",
      url: "lavalink.inari.site:443",
      auth: "youshallnotpass",
      secure: true,
    }
  ],
};

function parseBoolean(value) {
  if (typeof value === "string") {
    value = value.trim().toLowerCase();
  }
  switch (value) {
    case true:
    case "true":
      return true;
    default:
      return false;
  }
}
