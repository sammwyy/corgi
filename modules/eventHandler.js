const fs = require("fs");

exports.run = (client) => {
	fs.readdir("./events/", (err, files) => {
  		if (err) return console.error(err);
  		files.forEach(file => {
    		const event = require(`../events/${file}`);
    		let eventName = file.split(".")[0];
    		client.on(eventName, event.bind(null, client));
  		});
	});
}