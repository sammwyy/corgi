const path = require("path");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const Cache = new Map();
const adapter = new FileAsync(path.join(__dirname, "..", "databases", "guild_settings.json")); let db;


exports.set = async (id, assign) => {
	await db.get("guilds").find({id: id}).assign(assign).write();

	let guild = await db.get("guilds").find({id: id}).value();
	setCache(id, guild)
}

exports.get = (id, key) => {
	if (Cache.get(id)[key] == null) return getDefault(id)[key];
	else return Cache.get(id)[key];
}

exports.getGuild = async (id) => {
	if (Cache.get(id) == null) {
		let guild = await db.get("guilds").find({id: id});

		if (guild == null) guild = await this.create(id);

		return setCache(id, guild.value());
	} else {
		return Cache.get(id);
	}
}

// Variables added after the first version
const newvalues = ["admin_bypass", "mod_bypass"];

function setCache (id, guild) {
	for (let i = 0; i < newvalues.length; i++) {
		if (guild[newvalues[i]] == null) guild[newvalues[i]] = getDefault(id)[newvalues[i]];
	}

	Cache.set(id, guild);
	return guild;
}

exports.create = async (id) => {
	let guild = await db.get('guilds').push(getDefault(id)).write();
	return guild;
}

exports.delete = async (id) => {
	await db.get('guilds').remove({ id: id }).write();
}

async function init () {
	db = await low(adapter);
	await db.defaults({ guilds:[] }).write();
}

function getDefault (id) {
	return {
		"id": id,
		"lang": "en",

		"caps_check": true,

		"invite_check": true,

		"newlines_check": true,
		"max_newlines": 6,

		"link_check": true,

		"swear_check": true,

		"flood_check": true,
		"max_repeated_character": 7,

		"max_message_length": 512,

		"mod_bypass": true,
		"admin_bypass": true
	}
}

init();