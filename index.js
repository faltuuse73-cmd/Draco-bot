const { Collection } = require("discord.js");
const MusicBot = require("./src/structures/MusicClient");
const initializeCleanup = require("./src/events/Client/PremiumChecks");
const Dokdo = require("dokdo");
const client = new MusicBot();
const util = require("./src/utils/util");

client.util = new util(client);
module.exports = client;
client.connect();

client.Jsk = new Dokdo.Client(client, {
  aliases: ["dokdo", "dok", "jsk"],
  prefix: "?",
  owners: ["870179991462236170"],
});

process.env.SHELL = process.platform === "win32" ? "powershell" : "bash";

client.userSettings = new Collection();
client.color = "2b2d31";
client.emoji = {
  // music emojis
  music: "<:music:1127607386799083592>",
  playing: "<a:Playing:1188088755819663400>",
  volumehigh: "<:volumehigh:1188203004646666320>",
  play: "<:play:1188349488184701018>",
  stop: "<:resume:1188183870298918932>",
  skip: "<:forward:1188182458903036034>",
  resume: "<:resume:1188183870298918932>",
  join: "<:join:1188193835889729546>",
  leave: "<:leave:1188193876817752164>",
  autoplay: "<:autoplay:1188188713428209777>",
  mute: "<:mute:1188202691302785174>",
  volumemiddle: "<:volumemiddle:1188203002285268992>",
  volumelow: "<:volumelow:1188202998611071056>",
  shuffle: "<:shuffle:1188182084473335859>",
  rewind: "<:rewind:1188182454507425952>",
  queue: "<:queue:1188184969793781850>",
  playlist: "<:playlist:1188185181237039114>",
  pause: "<:pause:1188185761955188737>",
  loop: "<:loop:1188182962412462190>",
  forward: "<:forward:1188182458903036034>",
  filter: "<:filter:1188187546321158184>",
  addsong: "<:autoplay:1188188713428209777>",
  replay: "<:loop:1188182962412462190>",

  // utils emojis
  extra: "<:extra:1389892183401824287>",
  role: "<:roles:1389892180402765844>",
  delete: "<:del:1188108090499923999>",
  left: "<:left:1127618224595406929>",
  right: "<:right:1127618208510255165>",
  tick: "<:yes:1127619660519575612>",
  cross: "<:no:1127619635316015184>",
  dot: "<:dot:1201841280577970176>",
  warn: "<:warn:1127619432865337344>",
  search: "<:search:1188194606823788644>",
  jump: "<:join:1188198497120423957>",
  loading: "<a:loading:1193991974718537840>",
  config: "<:config:1127607954561056768>",
  information: "<:info:1188195669660422226>",
  home: "<:home:1127607405061079061>",
  ignore: "<:ignore:1224281352988397630>",
  profile: "<:profile:1224281268934414427>",
  premium: "<:premium:1225681906851512380>",
  dnd: "<:dnd:1230951770973278229>",
  offline: "<:offline:1230951861603795019>",
  online: "<:online:1230951647962726612>",
  idle: "<:idle:1230952869679599687>",
  voice: "<:voice:1231172368404054117>",
  fun: "<:fun:1231172370929156106>",
  moderation: "<:mod:1231172366244253716>",
  pfp: "<:pfp:1231174798642643008>",
  autoresponder: "<:autoresponder:1312668357199401003>",
  insta: "<:Insta:1196715538773180478>",
  snap: "<:Snap:1196715534587281438>",
  discord: "<:discord:1318846313579941888>",
  welc: "<:welc:1188198497120423957>",
  utility: "<:utility:1232983033871728651>",
  antinuke: "<:anti:1389892187805974558>",

  // pr emojis
  ozuma: "<:Ozuma:1169971284332003440>",
  owner: "<:Owners:1199282508269879346>",
  dev: "<:OxP:1199284739899670548>",
  admin: "<:Arrkiii:1199284047113883670>",
  staff: "<:Staffs:1199284056853069885>",
  partner: "<:Partners:1199282537357381762>",
  supporter: "<:supporter:1222100920175951882>",
  sponsor: "<:sponsor:1222100909769883698>",
  os: "<:ownerspecial:1222100912043069492>",
  vip: "<:Vips:1199282523331625020>",
  friend: "<:Homies:1199282532852699198>",
  bug: "<:Mods:1199282520114593884>",
  ownerspecial: "<:ownerspecial:1222100912043069492>",
  specialone: "<:special:1199284052046389329>",
  loveone: "<:love:1222100917206388766>",
  arrkiii: "<:arrkiii:1187678838759628800>",
  // a to z
  a: "<:A_simper:1211571868956622878>",
  b: "<:B_simper:1211571967015129118>",
  c: "<:C_simper:1211571972014874644>",
  d: "<:D_simper:1211571975726698497>",
  e: "<:E_simper:1211571981959561227>",
  f: "<:F_simper:1211571986820767784>",
  g: "<:G_simper:1211571992847978537>",
  h: "<:H_simper:1211571998443053106>",
  i: "<:I_simper:1211572004642361414>",
  j: "<:J_simper:1211572010308730951>",
  k: "<:K_simper:1211572015912194089>",
  l: "<:L_simper:1211572021385887775>",
  m: "<:M_simper:1211572027190677524>",
  n: "<:N_simper:1211572030533664828>",
  o: "<:O_simper:1211572035751510066>",
  p: "<:P_simper:1211572041820405802>",
  q: "<:Q_simper:1211572047155568650>",
  r: "<:R_simper:1211572054520889364>",
  s: "<:S_simper:1211572059793006613>",
  t: "<:T_simper:1211572065614700585>",
  u: "<:U_simper:1211572071130468353>",
  v: "<:V_simper:1211572076486459473>",
  w: "<:W_simper:1211572081737605182>",
  x: "<:X_simper:1211572085651148801>",
  y: "<:Y_simper:1211572090310889504>",
  z: "<:Z_simper:1211572095696502794>",
};

const { Api } = require("@top-gg/sdk");
client.topgg = client.config?.topgg ? new Api(client.config.topgg) : null;

client.on("messageCreate", (message) => {
  client.Jsk.run(message);
});

process.on("unhandledRejection", (reason, p) => {
  console.log(reason, p);
});

process.on("uncaughtException", (err, origin) => {
  console.log(err, origin);
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(err, origin);
});

//
