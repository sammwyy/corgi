exports.run = (client) => {
	client.on("guildCreate", async (guild) => {
		await client.db.create(guild.id);
	})

	client.on("guildDelete", async (guild) => {
		await client.db.delete(guild.id);
	})
}