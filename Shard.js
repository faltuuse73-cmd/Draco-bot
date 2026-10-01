/** @format
 *
 * DRACO MC By T4N1SHQ
 * © 2026 DRACO MC • T4N1SHQ
 *
 */

// Render Web Service health server
const http = require("http");

const PORT = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("DRACO MC Bot is online!");
  })
  .listen(PORT, "0.0.0.0", () => {
    console.log(`[WEB] Health server running on port ${PORT}`);
  });

// Discord bot
const config = require("./src/config");
const { ClusterManager } = require("discord-hybrid-sharding");

[
  {
    file: "./index.js",
    token: config.token,
    shards: 1,
    perCluster: 1,
  },
].forEach((client) => {
  new ClusterManager(client.file, {
    restarts: {
      max: 5,
      interval: 1000,
    },
    respawn: true,
    mode: "worker",
    token: client.token,
    totalShards: client.shards || "auto",
    shardsPerClusters: parseInt(client.perCluster) || 2,
  })
    .on("shardCreate", (cluster) => {
      console.log(`Launched cluster ${cluster.id}`);
    })
    .on("debug", (info) => {
      console.log(`${info}`, "cluster");
    })
    .spawn({ timeout: -1 });
});
