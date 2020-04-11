const Discord = require("discord.js");
const warn = require("../utils/warns.js");

const lang = require("../utils/lang.js").str;

exports.run = async (client, message, args) => {
	const guild = await client.db.getGuild(message.guild.id);

	const embed = new Discord.RichEmbed()
		.setColor("#55FFAA")
		.setTitle(lang(guild.lang, "help_title"))
		.addField(client.config.prefix + "config", lang(guild.lang, "config_cmd_description"), true)
		.addField(client.config.prefix + "help", lang(guild.lang, "help_cmd_description"), true)
		.addField(client.config.prefix + "setlang <arg>", lang(guild.lang, "setlang_cmd_description"), true)
		.addField(client.config.prefix + "setcaps <arg>", lang(guild.lang, "setcaps_cmd_description"), true)
		.addField(client.config.prefix + "setinvite <arg>", lang(guild.lang, "setinvite_cmd_description"), true)
		.addField(client.config.prefix + "setnewlines <arg>", lang(guild.lang, "setnewlines_cmd_description"), true)
		.addField(client.config.prefix + "setmaxlines <arg>", lang(guild.lang, "setmaxlines_cmd_description"), true)
		.addField(client.config.prefix + "setlink <arg>", lang(guild.lang, "setlink_cmd_description"), true)
		.addField(client.config.prefix + "setswear <arg>", lang(guild.lang, "setswear_cmd_description"), true)
		.addField(client.config.prefix + "setflood <arg>", lang(guild.lang, "setflood_cmd_description"), true)
		.addField(client.config.prefix + "setmaxchar", lang(guild.lang, "setmaxchar_cmd_description"), true)
		.addField(client.config.prefix + "setmaxlength", lang(guild.lang, "setmaxlength_cmd_description"), true)

	message.channel.send(embed);
}