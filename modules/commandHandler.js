const fs = require("fs");
const Enmap = require("enmap");

exports.run = (client) => {
	client.commands = new Enmap();

	fs.readdir("./commands/", (err, files) => {
  		if (err) return console.error(err);
  		files.forEach(file => {
    		if (!file.endsWith(".js")) return;
   		 	let props = require(`../commands/${file}`);
    		let commandName = file.split(".")[0];
    		console.log(`Attempting to load command ${commandName}`);
    		client.commands.set(commandName, props);
  		});
	});

	client.on('message', message => {
  		if (message.content.indexOf(client.config.prefix) === 0) {
  			if (message.guild == null) {
  				message.author.send("Command only avaible in a Guild!")
  			} else {
  				runCommand(client, message);
  			}
  		}
	});
}

function runCommand (client, message) {
  if (message.author.bot) return;

  if (message.guild == null || message.member == null || message.content == null) return;

  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);
  if (!cmd) return;

  cmd.run(client, message, args);
}
