const GuildSchema = require("../schema/guild.js");
const util = require("../../util.js"); //do i really need this? lets find out

const fetchOrCreateGuild = async (guildId, message, args) => {
	console.log("Running fetchOrCreateGuild.");
	const guild = await GuildSchema.findOne({ guildId: message.guild.id }).lean();
	if (guild) return guild;
	console.log("found servers that aren't in database, porting now");
	const query = new GuildSchema({ guildId: message.guild.id });
	await query.save();

	return query;
};
module.exports = { fetchOrCreateGuild };

//god im doing this at home i cant with this
