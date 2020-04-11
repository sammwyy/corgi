// Import the config file
const config = require('./config.json');
// Import discord.js library
const Discord = require("discord.js");
// Create discord client from library
const client = new Discord.Client();
// Import others libraries
const fs = require("fs");
const path = require("path");
const Enmap = require("enmap");
// Attach the config object to the client object
client.config = config;

// Read all files in the directory modules
fs.readdir(path.join(__dirname, "modules"), (err, files) => {
    if (err) return console.error(err);
    // Read all files and execute it.
    files.forEach(file => {
      const event = require(path.join(__dirname, "modules", file));
      event.run(client);
    });
});

// Login to the bot account using the bot token
client.login(config.token);
