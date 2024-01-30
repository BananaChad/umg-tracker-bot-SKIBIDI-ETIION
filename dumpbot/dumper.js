const { Client, WebhookClient } = require("discord.js-selfbot-v13");

const client = new Client();

client.on("ready", async () => {
  console.log("selfbot online.");
});

let embedData = {
  rare: false,
};

client.on("messageCreate", async (message) => {
  const guildId = "1059506407826788393";
  const trackers = {
    "1059846328772993064": {
      authorId: "1088664915457347594",
      hook: hooks.rarespawnHook,
      content: embedData.rare ? "ping" : " ",
    },
    "1059846357860491376": {
      authorId: "1088664394130534421",
      hook: hooks.normalTrackerHook,
    },
    "1173767047080054784": {
      authorId: "1173767219549843527",
      hook: hooks.alteredTrackerHook,
    },
    "1173773186240888842": {
      authorId: "1173773260542988483",
      hook: hooks.superAlteredTrackerHook,
    },
    "1173778041600757760": {
      authorId: "1173778285767950436",
      hook: hooks.giganticTrackerHook,
    },
    "1173778098379034705": {
      authorId: "1173779194933682197",
      hook: hooks.tinyTrackerHook,
    },
    "1173778128921960518": {
      authorId: "1173779668030206032",
      hook: hooks.evilTrackerHook,
    },
  };

  if (message.guild.id === guildId) {
    const tracker = trackers[message.channel.id];
    if (tracker && message.author.id === tracker.authorId) {
      if (message.content && tracker === trackers["1059846328772993064"]) {
        embedData.rare = true;
      }

      tracker.hook.send({
        content: tracker.content || " ",
        embeds: [message.embeds[0]],
      });
    }
  }

  embedData = {
    rare: false,
  };
});

client.login("token here");
