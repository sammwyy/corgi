const mod = require("../utils/moderation.js")

exports.run = (client) => {
	client.on("message", (message) => {
		if (ignore(message)) return;
		mod.filterMessage(client, message);
	});

	client.on("messageUpdate", (old, message) => {
		if (ignore(message)) return;
		mod.filterMessage(client, message);
	});
}

function ignore (message) {
	return message.guild.member(message.author).hasPermission('BAN_MEMBERS') 
		|| message.author.bot 
		|| message.guild == null 
		|| message.member == null 
		|| message.content == null;
}
