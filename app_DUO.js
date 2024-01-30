require("dotenv").config();

const discord = require("discord.js");
const botToken = process.env.botToken;
//const userToken = process.env.clientToken; //WIP
//const webhookToken = process.env.webhookToken; //WIP
//ignore this wanna try implementing dumper but TOO LAZY TO check if discordjs and discord selfbot js can work together properly
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

//console.log(botToken); check if your .env didn't fuck up
client.login(botToken); //please work :)

(async () => {
	await connect(process.env.mongoose).catch(console.error);
})();

// syaro  was here
