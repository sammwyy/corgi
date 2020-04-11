const Discord = require("discord.js");
const warn = require("../utils/warns.js");

const lang = require("../utils/lang.js").str;

const allowedValues = ["es", "en"]

exports.run = async (client, message, args) => {
	const guild = await client.db.getGuild(message.guild.id);

	if (!message.member.hasPermission("ADMINISTRATOR"))
		return warn.sendInfo(message, lang(guild.lang, "admin_permissions_required"));

	const arg = args[0];
	if (arg == null) 
		return warn.sendInfo(message, lang(guild.lang, "specify_value_lang"));

	if (!allowedValues.includes(arg.toLowerCase()))
		return warn.sendInfo(message, lang(guild.lang, "invalid_value_lang"));

	await client.db.set(message.guild.id, {lang: arg.toLowerCase()});
	warn.sendMini(message, lang(guild.lang, "configuration_title"), 
		lang(guild.lang, "value_changed")
		.replace("%key%",  lang(guild.lang, "lang"))
		.replace("%value%", arg.toUpperCase())
	);
}