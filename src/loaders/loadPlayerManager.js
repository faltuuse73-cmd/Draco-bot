/** @format */

const {
  Kazagumo,
  KazagumoTrack,
} = require("kazagumo");

const {
  Connectors,
  LoadType,
} = require("shoukaku");

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
  if (!client.config.nodes || !client.config.nodes.length) {
    client.logger.log("[Lavalink] WARNING: No nodes found in config.js!", "error");
  } else {
    client.logger.log(`[Lavalink] Initializing with ${client.config.nodes.length} node(s)...`, "ready");
  }

  const manager = new Kazagumo(
    {
      defaultSearchEngine: client.config.node_source || "ytsearch",
      send: (guildId, payload) => {
        const guild = client.guilds.cache.get(guildId);
        if (guild) {
          guild.shard.send(payload);
        }
      },
    },
    new Connectors.DiscordJS(client),
    client.config.nodes,
    ShoukakuOptions
  );

  manager.searchEngines = searchEngines;
  manager.defaultSearchEngine = client.config.node_source || "ytsearch";

  manager.search = async function (query, options = {}) {
    const prefix = options.engine || this.defaultSearchEngine;

    const node = [...this.shoukaku.nodes.values()].find(
      (node) => node.state === 2
    );

    const selectedNode = node || [...this.shoukaku.nodes.values()][0];

    if (!selectedNode) {
      return {
        type: "SEARCH",
        tracks: [],
      };
    }

    const isUrl = /^https?:\/\//i.test(query);
    const searchQuery = isUrl ? query : `${prefix}:${query}`;

    const res = await selectedNode.rest
      .resolve(searchQuery)
      .catch((error) => {
        if (client.logger) {
          client.logger.log(
            `[Lavalink Search] ${error.message || error}`,
            "error"
          );
        }
        return null;
      });

    if (!res) {
      return {
        type: "SEARCH",
        tracks: [],
      };
    }

    switch (res.loadType) {
      case LoadType.TRACK:
        return {
          type: "TRACK",
          tracks: [
            new KazagumoTrack(
              res.data,
              options.requester
            ),
          ],
        };

      case LoadType.PLAYLIST:
        return {
          type: "PLAYLIST",
          playlistName: res.data?.info?.name || "Unknown Playlist",
          tracks: (res.data?.tracks || []).map(
            (track) =>
              new KazagumoTrack(
                track,
                options.requester
              )
          ),
        };

      case LoadType.SEARCH:
        return {
          type: "SEARCH",
          tracks: (res.data || []).map(
            (track) =>
              new KazagumoTrack(
                track,
                options.requester
              )
          ),
        };

      default:
        return {
          type: "SEARCH",
          tracks: [],
        };
    }
  };

  client.manager = manager;
  return manager;
};
