const Discord = require("discord.js");
const warn = require("../utils/warns.js");
const parser = require("../utils/parser.js");

const lang = require("../utils/lang.js").str;

exports.run = async (client, message, args) => {
	const guild = await client.db.getGuild(message.guild.id);

	if (!message.member.hasPermission("ADMINISTRATOR"))
		return warn.sendInfo(message, lang(guild.lang, "admin_permissions_required"));

	const arg = args[0];
	if (arg == null) 
		return warn.sendInfo(message, lang(guild.lang, "specify_value_range").replace("%range%", "2, 50"));

	if (isNaN(arg))
		return warn.sendInfo(message, lang(guild.lang, "invalid_value_range").replace("%range%", "2, 50"));

	const number = parseInt(arg);

	if (number < 2 || number > 50)
		return warn.sendInfo(message, lang(guild.lang, "invalid_value_range").replace("%range%", "2, 50"));

	await client.db.set(message.guild.id, {max_repeated_character: number});
	warn.sendMini(message, lang(guild.lang, "configuration_title"), 
		lang(guild.lang, "value_changed")
		.replace("%key%",  lang(guild.lang, "max_repeated_char"))
		.replace("%value%", number)
	);
}