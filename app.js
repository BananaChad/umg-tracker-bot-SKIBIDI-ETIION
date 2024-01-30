require("dotenv").config();

const discord = require("discord.js");
const botToken = process.env.botToken;
const userToken = process.env.clientToken;
//ignore this wanna try implementing dumper but TOO LAZY TO check if discordjs and discord selfbot js can work together properly (im in hell)
const client = new discord.Client({
	intents: [
		discord.GatewayIntentBits.Guilds,
		discord.GatewayIntentBits.GuildMessages,
		discord.GatewayIntentBits.GuildPresences,
		discord.GatewayIntentBits.GuildMessageReactions,
		discord.GatewayIntentBits.DirectMessages,
		discord.GatewayIntentBits.MessageContent,
	],
	partials: [
		discord.Partials.Channel,
		discord.Partials.Message,
		discord.Partials.User,
		discord.Partials.GuildMember,
		discord.Partials.Reaction,
	],
});

const { connect } = require("mongoose");

const handle = require("./handler.js");

handle.getEvents("./events", client);
handle.getModules("./modules");
handle.getDB("./mongo");

//console.log(botToken);
client.login(botToken); //please work :)

(async () => {
	await connect(process.env.mongoose).catch(console.error);
})();

// syaro was here

//what if i do a funny and copy paste everything from dumper to here
//WHY DOES THAT ACTUALLY WORK LMFAOOOO
//god this is a bad practice but it works so idc
// note for syaro!! you can still run 2 at once by running app_DUO.js and dumper_DUO.js, however keeping packages up-to-date would be more frustrating
// (the node dependencies plugin helps with that ^^ )

const { Client, WebhookClient } = require("discord.js-selfbot-v13");
const uClient = new Client();
const webhookToken = process.env.webhookToken;
const trackerWebhookToken = process.env.trackerWebhookToken;

uClient.on("ready", async () => {
	console.log("selfbot online.");
});

const webhookUrls = {
	rarespawn: webhookToken, //proxy webhook token here!
	normalTracker: TrackerWebhookToken, //proxy token here!
	alteredTracker: TrackerWebhookToken, //proxy token here!
	superAlteredTracker: TrackerWebhookToken, //proxy token here!
	giganticTracker: TrackerWebhookToken, //proxy token here!
	tinyTracker: TrackerWebhookToken, //proxy token here!
	evilTracker: TrackerWebhookToken, //webhook token here!
};

const hooks = {};

for (const [key, url] of Object.entries(webhookUrls)) {
	hooks[`${key}Hook`] = new WebhookClient({ url });
}

let embedData = {
	rare: false,
};

uClient.on("messageCreate", async (message) => {
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

	embedData = { rare: false };
});
uClient.login(userToken);
