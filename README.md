# DRACO MC Latest

A feature-rich, modern Discord bot with a beautiful UI, best-in-class music system, advanced moderation, and automation tools. Built with the latest JavaScript libraries and MongoDB for performance and reliability.

# Description
This all-in-one Discord bot offers everything your server needs: 
- Aesthetic UI with Canvas-powered graphics
- Advanced music system (Kazagumo + Shoukaku)
- Anti-nuke and automod security
- Powerful moderation and fun modules
- Automation tools: auto-responder, auto-react, auto-pfp, voice roles, and more
- Persistent data storage with MongoDB
- Playlist-enabled welcome messages and profile cards

# Features

## 🎵 Music System
- Kazagumo + Shoukaku for high-quality, lag-free music
- Supports YouTube, Spotify, SoundCloud, and more
- Playlists, audio filters, lyrics, and voice commands

## 🖼️ Aesthetic UI
- Canvas-based welcome banners, profile cards, and rank images
- Customizable templates and server dashboards

## 🔒 Security & Moderation
- Better anti-nuke: detects and blocks mass bans, role deletes, and more
- Automod: spam, mention, and bad word filtering
- Moderation: ban, kick, mute, purge, warn, logs

## ⚙️ Automation & Roles
- Auto-responder: custom triggers and replies
- Auto-react: automatic reactions to messages
- Auto-pfp: auto profile picture assignment
- Voice roles: assign roles based on voice channel activity

## 🎉 Fun & Utility
- Games, memes, interactive commands
- User profiles, leveling, achievements

# Tech Stack
- discord.js (latest)
- kazagumo (latest)
- shoukaku (latest)
- mongoose (latest)
- canvas (latest)

# Example Music Setup
const { Kazagumo } = require('kazagumo');
const { Shoukaku } = require('shoukaku');
const nodes = [{ name: 'main', url: 'localhost:2333', auth: 'password' }];
const shoukaku = new Shoukaku(new Shoukaku.Client(), nodes);
const kazagumo = new Kazagumo({ plugins: [], defaultSearchEngine: 'youtube' }, shoukaku);

# Example Canvas Welcome Banner
const { createCanvas, loadImage } = require('canvas');
async function welcomeBanner(user) {
  const canvas = createCanvas(800, 250);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#23272A';
  ctx.fillRect(0, 0, 800, 250);
  const avatar = await loadImage(user.displayAvatarURL({ extension: 'jpg' }));
  ctx.drawImage(avatar, 25, 25, 200, 200);
  ctx.font = 'bold 40px Sans';
  ctx.fillStyle = '#fff';
  ctx.fillText(`Welcome, ${user.username}!`, 250, 120);
  return canvas.toBuffer();
}

# Example Anti-Nuke
client.on('guildMemberRemove', async (member) => {
  // Detect mass kicks/bans and take action
});

# Example Auto-Responder
const triggers = [{ phrase: 'hello', response: 'Hi there!' }];
client.on('messageCreate', msg => {
  const trig = triggers.find(t => msg.content.toLowerCase().includes(t.phrase));
  if (trig) msg.reply(trig.response);
});

# Installation

## 1. Clone the repo
git clone https://github.com/faltuuse73-cmd/Draco-bot

## 2. Install dependencies
npm install

## 3. Configure .env
TOKEN=your_discord_token
MONGO_URI=your_mongodb_uri
SPOTIFY_ID=your_spotify_id
SPOTIFY_SECRET=your_spotify_secret

## 4. Start the bot
node Shard.js

# Credits
- Developed by: T4N1SHQ
- Support: https://discord.gg/qcNj6VBm6s

# Requirements
- Node.js v20+
- Lavalink server for music features

# Enjoy a premium, DRACO MC experience!
