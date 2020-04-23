const mod = require("../utils/moderation.js")

exports.run = async (client) => {
	client.on("message", async (message) => {
		const isIgnored = await ignore(client, message);
		if (isIgnored) return;
		
		mod.filterMessage(client, message);
	});

	client.on("messageUpdate", async (old, message) => {
		const isIgnored = await ignore(client, message);
		if (isIgnored) return;

		mod.filterMessage(client, message);
	});
}

async function ignore (client, message) {
	const config = await client.db.getGuild(message.guild.id);
	const admin_bypass = config.admin_bypass;
	const mod_bypass = config.mod_bypass;

	return message.author.bot
		|| message.guild == null 
		|| message.member == null 
		|| message.content == null
		|| (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
		|| (message.guild.member(message.author).hasPermission('ADMINISTRATOR') && admin_bypass)
		|| (message.guild.member(message.author).hasPermission('BAN_MEMBERS') && mod_bypass);
}