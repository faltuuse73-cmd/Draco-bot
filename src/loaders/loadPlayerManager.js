/** @format */

const { Kazagumo, KazagumoTrack } = require("kazagumo");
const { Connectors, LoadType } = require("shoukaku");

const searchEngines = {
  DEEZER: "dzsearch",
  SPOTIFY: "spsearch",
  YOUTUBE: "ytsearch",
  JIO_SAAVAN: "jssearch",
  SOUNDCLOUD: "scsearch",
  YOUTUBE_MUSIC: "ytmsearch",
};

const ShoukakuOptions = {
  moveOnDisconnect: false,
  resume: false,
  resumeTimeout: 30,
  reconnectTries: 5,
  restTimeout: 10000,
  userAgent: "DracoMC",
};

module.exports = function loadPlayerManager(client) {
  const connector = new Connectors.DiscordJS(client);

  const manager = new Kazagumo(
    {
      defaultSearchEngine: client.config.node_source || "ytsearch",
      send: (guildId, payload) => {
        const guild = client.guilds.cache.get(guildId);
        if (guild) guild.shard.send(payload);
      },
    },
    connector,
    client.config.nodes,
    ShoukakuOptions
  );

  // Connection logger & Error handler
  manager.shoukaku.on("ready", (name) => {
    client.logger.log(`[Lavalink] Node "${name}" connected successfully!`, "ready");
  });

  manager.shoukaku.on("error", (name, error) => {
    client.logger.log(`[Lavalink] Node "${name}" error: ${error?.message || error}`, "error");
  });

  manager.shoukaku.on("close", (name, code, reason) => {
    client.logger.log(`[Lavalink] Node "${name}" closed (${code} - ${reason})`, "warn");
  });

  manager.shoukaku.on("disconnect", (name) => {
    client.logger.log(`[Lavalink] Node "${name}" disconnected.`, "warn");
  });

  manager.searchEngines = searchEngines;
  manager.defaultSearchEngine = client.config.node_source || "ytsearch";

  manager.search = async function (query, options = {}) {
    const prefix = options.engine || this.defaultSearchEngine;
    const node = [...this.shoukaku.nodes.values()].find((n) => n.state === 2) || [...this.shoukaku.nodes.values()][0];

    if (!node) return { type: "SEARCH", tracks: [] };

    const isUrl = /^https?:\/\//i.test(query);
    const searchQuery = isUrl ? query : `${prefix}:${query}`;

    const res = await node.rest.resolve(searchQuery).catch((err) => {
      if (client.logger) client.logger.log(`[Lavalink Search] ${err.message || err}`, "error");
      return null;
    });

    if (!res) return { type: "SEARCH", tracks: [] };

    switch (res.loadType) {
      case LoadType.TRACK:
        return { type: "TRACK", tracks: [new KazagumoTrack(res.data, options.requester)] };
      case LoadType.PLAYLIST:
        return {
          type: "PLAYLIST",
          playlistName: res.data?.info?.name || "Unknown Playlist",
          tracks: (res.data?.tracks || []).map((t) => new KazagumoTrack(t, options.requester)),
        };
      case LoadType.SEARCH:
        return {
          type: "SEARCH",
          tracks: (res.data || []).map((t) => new KazagumoTrack(t, options.requester)),
        };
      default:
        return { type: "SEARCH", tracks: [] };
    }
  };

  client.manager = manager;
  return manager;
};
