/** @format */

module.exports = {
  token: process.env.DISCORD_TOKEN || "",
  clientId: "1399186967966519326",
  prefix: ">",
  ownerID: "870179991462236170",
  SpotifyID: process.env.SPOTIFY_CLIENT_ID || "",
  SpotifySecret: process.env.SPOTIFY_CLIENT_SECRET || "",
  mongourl: process.env.MONGO_URI || "",
  embedColor: "#2f3136",
  logs: process.env.LOGS_WEBHOOK || "",
  node_source: "ytsearch",
  topgg: process.env.TOPGG_TOKEN || "",
  links: {
    BG: "https://cdn.discordapp.com/attachments/1061636453437804544/1186002755924525166/20231217_232106.jpg",
    support: "https://discord.gg/dracomc",
    invite:
      "https://discord.com/api/oauth2/authorize?client_id=1399186967966519326&permissions=824671333721&scope=bot",
    arrkiii:
      "https://cdn.discordapp.com/attachments/1187323477032697867/1236626903847407696/Arrkiii.gif",
    power: "Powered By DRACO MC • T4N1SHQ",
    vanity: "discord.gg/dracomc",
    guild: "1325384856477368420",
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
       url: process.env.NODE_URL || "lava-v4.ajieblogs.eu.org:443",
      name: process.env.NODE_NAME || "Lavalink",
      auth: process.env.NODE_AUTH || "https://dsc.gg/ajidevserver",
      secure: parseBoolean(process.env.NODE_SECURE || "true"),
    },
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
