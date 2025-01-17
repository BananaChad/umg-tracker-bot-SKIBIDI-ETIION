const server = require("../schema/guild.js");
const mongoose = require("mongoose");

const { ChannelType, PermissionsBitField } = require("discord.js");

module.exports = async (client, guild) => {
	console.log(
		`[GUILD] ${client.user.tag} has joined ${guild.name} (${guild.id}).`,
	);

	const c = await guild.channels.cache.find(
		(c) =>
			c.type === ChannelType.GuildText &&
			guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages),
	);

	if (!c) {
		console.log(
			`[INFO] ${guild.name} (${guild.id}) has no text channels, skipping welcome message. lol`,
		);
	} else {
		const msg =
			"Thanks for adding me to your server, send me (syaro) a DM if you encounter any bugs as this bot is still in development. \n\nTo get started, run the `setup` command. \n\nIf you need help, run the `help` command.";
		c.send(msg);
	}

	let guildProfile = await server.findOne({ guildId: guild.id });
	if (!guildProfile) {
		guildProfile = new server({
			_id: new mongoose.Types.ObjectId(),
			guildId: guild.id,
			guildName: guild.name,
			guildIcon: guild.iconURL({ dynamic: true } || "None"),

			config: {
				rarespawn: {
					webhookToken: String,
					webhookID: String,
					channelID: String,
				},
				globalTracker: {
					channelID: String,
					webhookToken: String,
					webhookID: String,
				},
				userspawn: [],
			},
		});
	} else {
		return console.log(
			`[DATABASE] ${guild.name} (${guild.id}) has been loaded from the database.`,
		);
	}

	await guildProfile.save().catch((err) => console.log(err));
	console.log(
		`[DATABASE] ${guild.name} (${guild.id}) has been saved to the database.`,
	);
};
