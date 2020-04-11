const Discord = require("discord.js");
const db = require("../utils/database.js");
const warn = require("../utils/warns.js");

const lang = require("../utils/lang.js").str;

const invite = "https://discordapp.com/api/oauth2/authorize?client_id=698225680055271445&permissions=403565574&scope=bot";

exports.run = async (client, message, args) => {
	const guild = await client.db.getGuild(message.guild.id);

	const embed = new Discord.RichEmbed()
		.setTitle(lang(guild.lang, "click_here"))
		.setColor("#55FFAA")
		.setDescription(lang(guild.lang, "invite_me"))
		.setURL(invite)
	message.author.send(embed);
}