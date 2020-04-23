// Presence Variables
const twitchUrl = "https://www.twitch.tv/sammwy";
const presences = ["%users% users | c!help", "%guilds% guilds | c!help", "Support: Sammwy#0001 | c!help"];
const type = "playing";
const status = "dnd";
const presenceRefreshRate = 30;

// Set presence every X seconds
exports.run = (client) => {
	client.on('ready', () => { 
    	client.user.setStatus(status)
    	client.user.setPresence({ game: { name: getPresence(client), type: type, url: twitchUrl } });
    	setInterval(() => {
       		client.user.setPresence({ game: { name: getPresence(client), type: type, url: twitchUrl } });
    	}, presenceRefreshRate * 1000)
	});
}

function getPresence (client) {
  let presence = presences[getRandomInt(0, presences.length - 1)];
	return presence
		.replace("%guilds%", client.guilds.size)
		.replace("%users%", client.users.size);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}