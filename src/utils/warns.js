const Discord = require("discord.js");

exports.sendWarn = (message, reason, title) => {
	const embed = new Discord.RichEmbed()
		.setColor("#55FFAA")
		.setTitle(title)
		.setDescription(`<@${message.author.id}>, ${reason}`);

	message.channel.send(embed).then(msg => msg.delete(5000));
	message.delete(0);
}

exports.sendInfo = (message, reason) => {
	const embed = new Discord.RichEmbed()
		.setColor("#55FFAA")
		.setDescription(`<@${message.author.id}>, ${reason}.`);

	message.channel.send(embed);
}

exports.sendMini = (message, title, content) => {
	const embed = new Discord.RichEmbed()
		.setColor("#55FFAA")
		.setTitle(title)
		.setDescription(content);

	message.channel.send(embed);
}