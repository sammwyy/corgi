const Discord = require("discord.js");
const warn = require("../utils/warns.js");
const parser = require("../utils/parser.js");

const lang = require("../utils/lang.js").str;

const allowedValues = ["es", "en"]

exports.run = async (client, message, args) => {
	const guild = await client.db.getGuild(message.guild.id);

	if (!message.member.hasPermission("ADMINISTRATOR"))
		return warn.sendInfo(message, lang(guild.lang, "admin_permissions_required"));
	
	const embed = new Discord.RichEmbed()
		.setColor("#55FFAA")
		.setTitle(lang(guild.lang, "configuration_title"))
		.addField(lang(guild.lang, "lang"), guild.lang.toUpperCase(), true)
		.addField(lang(guild.lang, "caps_check"), parser.boolToString(guild.caps_check), true)
		.addField(lang(guild.lang, "invite_check"), parser.boolToString(guild.invite_check), true)
		.addField(lang(guild.lang, "new_lines_check"), parser.boolToString(guild.newlines_check), true)
		.addField(lang(guild.lang, "max_lines_per_msg"), guild.max_newlines, true)
		.addField(lang(guild.lang, "link_check"), parser.boolToString(guild.link_check), true)
		.addField(lang(guild.lang, "swear_check"), parser.boolToString(guild.swear_check), true)
		.addField(lang(guild.lang, "flood_check"), parser.boolToString(guild.flood_check), true)
		.addField(lang(guild.lang, "max_repeated_char"), guild.max_repeated_character, true)
		.addField(lang(guild.lang, "max_msg_length"), guild.max_message_length, true);

	message.channel.send(embed);
}