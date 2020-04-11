exports.run = (client) => {
	client.on('ready', () => { 
    	client.user.setStatus("dnd");
    	client.user.setPresence({
    		game: {
      			name: "In " + client.guilds.size + " guilds | c!help",
      			type: "STREAMING",
      			url: "https://www.twitch.tv/sammwy"
    		}
  		});

	  	setInterval(function () {
	    	client.user.setPresence({
		    	game: {
		        	name: "In " + client.guilds.size + " guilds | c!help",
		        	type: "STREAMING",
		        	url: "https://www.twitch.tv/sammwy"
		      	}
	    	});
	  	}, 60000);
	});
}