const { Schema, model } = require("mongoose");
const guildSchema = new Schema({
	_id: Schema.Types.ObjectId,
	guildId: String, //TODO: add a function in app.js that checks whether all guild the bot is in is stored in the database
	guildName: String,
	guildIcon: String,

	config: {
		rarespawn: {
			webhookToken: String,
			webhookID: String,
			channelID: String,
		},
		globaltracker: {
			webhookToken: String,
			webhookID: String,
			channelID: String,
		},
		userspawn: [],
	},
});

module.exports = model("Guild", guildSchema, "guilds");
