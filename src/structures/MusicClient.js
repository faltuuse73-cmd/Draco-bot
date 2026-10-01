/** @format */

const { Client, Collection } = require("discord.js");
const { Kazagumo } = require("kazagumo");
const { Connectors } = require("shoukaku");
const mongoose = require("mongoose");
const { ClusterClient, getInfo } = require("discord-hybrid-sharding");
const { AutoPoster } = require("topgg-autoposter");

const loadPlayerManager = require("../loaders/loadPlayerManager");
const permissionHandler = require("../events/Client/PremiumChecks");

// Shoukaku v4 options
const ShoukakuOptions = {
  moveOnDisconnect: false,
  resume: false,
  resumeTimeout: 30,
  reconnectTries: 2,
  restTimeout: 10000,
  userAgent: "DracoMC",
};

class MusicBot extends Client {
  constructor() {
    super({
      intents: 33779,

      properties: {
        browser: "Discord Android",
      },

      allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false,
      },

      shards: getInfo().SHARD_LIST,
      shardCount: getInfo().TOTAL_SHARDS,
    });

    // =========================
    // BASIC CLIENT PROPERTIES
    // =========================

    this.commands = new Collection();
    this.slashCommands = new Collection();

    this.config = require("../config.js");

    this.owner = this.config.ownerID;
    this.prefix = this.config.prefix;
    this.topgg = this.config.topgg;
    this.embedColor = this.config.embedColor;

    this.button = require("../custom/button.js");
    this.embed = require("../custom/embed.js")(this.embedColor);

    require("../custom/numformat")(this);

    this.aliases = new Collection();
    this.logger = require("../utils/logger.js");
    this.emoji = require("../utils/emoji.json");

    this.cluster = new ClusterClient(this);

    if (!this.token) {
      this.token = this.config.token;
    }

    this.spamMap = new Map();
    this.cooldowns = new Collection();

    // =========================
    // KAZAGUMO + SHOUKAKU
    // =========================
    //
    // IMPORTANT:
    // Kazagumo creates/manages the Shoukaku instance itself.
    // Do NOT create a separate `new Shoukaku(...)` here.
    //

    const connector = new Connectors.DiscordJS(this);

    this.manager = new Kazagumo(
      {
        defaultSearchEngine: this.config.node_source || "ytsearch",

        send: (guildId, payload) => {
          const guild = this.guilds.cache.get(guildId);

          if (guild) {
            guild.shard.send(payload);
          }
        },
      },

      connector,
      this.config.nodes,
      ShoukakuOptions
    );

    // Keep this alias because existing loaders/events may use
    // client.shoukaku directly.
    this.shoukaku = this.manager.shoukaku;

    // =========================
    // DATABASE / OTHER SYSTEMS
    // =========================

    this._connectMongodb();
    this._initAutoPoster();

    permissionHandler(this);

    // Existing music manager loader
    loadPlayerManager(this);

    // =========================
    // LOAD HANDLERS
    // =========================

    [
      "loadAntinukes",
      "loadAutoMods",
      "loadClients",
      "loadCommands",
      "loadNodes",
      "loadSlashCommands",
      "loadPlayers",
    ].forEach((handler) => {
      require(`../loaders/${handler}`)(this);
    });
  }

  async _connectMongodb() {
    const dbOptions = {
      autoIndex: false,
      connectTimeoutMS: 1000,
      family: 4,
    };

    mongoose.set("strictQuery", false);

    mongoose.connect(this.config.mongourl, dbOptions);

    mongoose.Promise = global.Promise;

    mongoose.connection.on("connected", () => {
      this.logger.log("[DB] Database connected", "ready");
    });

    mongoose.connection.on("err", (err) => {
      this.logger.log(
        `[DB] Mongoose connection error: ${err.stack}`,
        "error"
      );
    });

    mongoose.connection.on("disconnected", () => {
      this.logger.log("[DB] Mongoose disconnected", "error");
    });
  }

  _initAutoPoster() {
    const topggToken = this.config.topgg;

    if (!topggToken) {
      this.logger.log("Top.gg API token is not set.", "error");
      return;
    }

    AutoPoster(topggToken, this)
      .on("posted", () => {
        this.logger.log("Posted stats to top.gg!", "ready");
      })
      .on("error", (err) => {
        this.logger.log(`Error posting stats to top.gg: ${err}`, "error");
      });
  }

  connect() {
    return super.login(this.token);
  }
}

module.exports = MusicBot;
