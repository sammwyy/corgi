const Discord = require("discord.js");
const warn = require("../utils/warns.js");

const lang = require("../utils/lang.js").str;
let botowner = null;

exports.run = async (client, message, args) => {
	const guild = await client.db.getGuild(message.guild.id);
	if (botowner == null) botowner = await client.users.find(user => user.id == client.config.bot_owner);

	const embed = new Discord.RichEmbed()
		.setColor("#55FFAA")
		.setTitle(lang(guild.lang, "botinfo_title"))
		.addField(lang(guild.lang, "word_users"), client.users.size, false)
		.addField(lang(guild.lang, "word_guilds"), client.guilds.size, false);

		if (botowner != null)
			embed.addField(lang(guild.lang, "word_creator"), `\`${botowner.tag}\`\n<@${botowner.id}>`, false)

	message.channel.send(embed);
}