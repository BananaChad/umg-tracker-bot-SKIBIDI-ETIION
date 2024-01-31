const Discord = require("discord.js");
require("dotenv").config();
const botToken = process.env.botToken;

const client = new Discord.Client({
	intents: [Discord.GatewayIntentBits.Guilds],
});

client.on("ready", () => {
	const Guilds = client.guilds.cache.map((guild) => guild.id);
	console.log(Guilds);
});

client.login(botToken);
