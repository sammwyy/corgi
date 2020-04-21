const Discord = require("discord.js");
const warn = require("../utils/warns.js");
const parser = require("../utils/parser.js");

const lang = require("../utils/lang.js").str;

const allowedValues = ["enabled", "disabled"]

exports.run = async (client, message, args) => {
	const guild = await client.db.getGuild(message.guild.id);

	if (!message.member.hasPermission("ADMINISTRATOR"))
		return warn.sendInfo(message, lang(guild.lang, "admin_permissions_required"));

	const arg = args[0];
	if (arg == null) 
		return warn.sendInfo(message, lang(guild.lang, "specify_value_enable_disable"));

	if (!allowedValues.includes(arg.toLowerCase()))
		return warn.sendInfo(message, lang(guild.lang, "invalid_value_enable_disable"));

	await client.db.set(message.guild.id, {mod_bypass: parser.stringToBool(arg)});

	warn.sendMini(message, lang(guild.lang, "configuration_title"), 
		lang(guild.lang, "value_changed")
		.replace("%key%",  lang(guild.lang, "mod_bypass"))
		.replace("%value%", arg.toUpperCase())
	);
}