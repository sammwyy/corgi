const Discord = require("discord.js");
const filters = require('./filters.js');

const lang = require("./lang.js").str;

exports.filterMessage = async (client, message) => {
	const author = message.author;
	const member = message.member;
	const content = message.content;

	const config = await client.db.getGuild(message.guild.id);

	if (filters.capsCheck(content) && config.caps_check)
		return this.sendWarn(message, lang(config.lang, "caps_warning"), lang(config.lang, "warning"));

	if (filters.inviteCheck(content) && config.invite_check)
		return this.sendWarn(message, lang(config.lang, "invite_warning"), lang(config.lang, "warning"));

	if (filters.newlineCheck(content, config.max_newlines)  && config.newlines_check)
		return this.sendWarn(message, lang(config.lang, "newlines_warning"), lang(config.lang, "warning"));

	if (filters.linkCheck(content) && config.link_check)
		return this.sendWarn(message, lang(config.lang, "link_warning"), lang(config.lang, "warning"));

	if (filters.floodCheck(content, config.max_repeated_character) && config.flood_check)
		return this.sendWarn(message, lang(config.lang, "flood_warning"), lang(config.lang, "warning"));

	if (content.length >= config.max_message_length)
		return this.sendWarn(message, lang(config.lang, "length_warning"), lang(config.lang, "warning"));
}

exports.sendWarn = (message, reason, title) => {
	const embed = new Discord.RichEmbed()
		.setColor("#55FFAA")
		.setTitle(title + ":")
		.setDescription(`<@${message.author.id}>, ${reason}`);

	message.channel.send(embed).then(msg => msg.delete(5000));
	message.delete(0);
}