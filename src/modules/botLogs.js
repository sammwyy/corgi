exports.run = (client) => {
	let guild;
	let channel;

	client.on("guildCreate", (guild) => {
		if (channel != null)
			channel.send(":white_check_mark: Guild join: " + guild.name);
	})

	client.on("guildDelete", (guild) => {
		if (channel != null)
			channel.send(":x: Guild leave: " + guild.name);
	})

	client.on("ready", () => {
		let guildid = client.config.main_guild_id;
		let channelid = client.config.logs_channel_id;

		if (guildid == "xxxxxxxxxx" || channelid == "xxxxxxxxxx" == null) return;

		guild = client.guilds.find(guild => guild.id == guildid);
		if (guild == null) return;

		channel = guild.channels.find(channel => channel.id == client.config.logs_channel_id);
		if (channel == null) return;

		channel.send(":gear: Bot started.");
	});
}