const fs = require("fs");
const path = require("path");

exports.run = (client) => {
	fs.readdir(path.join(__dirname, "..", "events"), (err, files) => {
  		if (err) return console.error(err);
  		files.forEach(file => {
    		const event = require(path.join(__dirname, "..", "events", file));
    		let eventName = file.split(".")[0];
    		client.on(eventName, event.bind(null, client));
  		});
	});
}