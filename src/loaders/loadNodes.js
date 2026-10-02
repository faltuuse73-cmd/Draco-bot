/** @format */

const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  if (!client.manager || !client.manager.shoukaku) {
    client.logger.log("[Lavalink] Shoukaku instance missing on manager!", "error");
    return;
  }

  // Raw direct listeners for guaranteed logging
  client.manager.shoukaku.on("ready", (name) => {
    client.logger.log(`[Lavalink] Node "${name}" is connected and ready!`, "ready");
  });

  client.manager.shoukaku.on("error", (name, error) => {
    client.logger.log(`[Lavalink] Node "${name}" error: ${error?.message || error}`, "error");
  });

  client.manager.shoukaku.on("close", (name, code, reason) => {
    client.logger.log(`[Lavalink] Node "${name}" connection closed (Code: ${code}, Reason: ${reason})`, "warn");
  });

  client.manager.shoukaku.on("disconnect", (name, count) => {
    client.logger.log(`[Lavalink] Node "${name}" disconnected.`, "warn");
  });

  // Directory based loader fallback
  const nodeEventsPath = path.join(__dirname, "../events/Node");
  if (fs.existsSync(nodeEventsPath)) {
    let totalEvents = 0;
    fs.readdirSync(nodeEventsPath).forEach((file) => {
      try {
        const event = require(path.join(nodeEventsPath, file));
        if (event && event.name && typeof event.run === "function") {
          client.manager.shoukaku.on(event.name, (...args) => event.run(client, ...args));
          totalEvents++;
        }
      } catch (err) {
        client.logger.log(`Failed to load node event ${file}: ${err.message}`, "error");
      }
    });
    client.logger.log(`Lavalink Node Events Loaded: ${totalEvents}`, "event");
  }
};
