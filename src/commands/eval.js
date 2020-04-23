const Discord = require("discord.js");
const util = require("util");

exports.run = (client, message, args) => {
    
    if (message.member.id == client.config.bot_owner) {
    	try {
        	const code = args.join(" ");
        	let evaled = eval(code);
   
        	if (typeof evaled !== "string")
          		evaled = util.inspect(evaled);
   
   			sendOutput(message, code, clean(evaled), "finished")
      } catch (err) {
      	sendOutput(message, args.join(" "), `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``, "Error")
      }
    }
}

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
      return text;
}

function sendOutput (message, instruction, output, status) {
  	const embed = new Discord.RichEmbed()
      .setAuthor("ℹ️ Eval")
      .setColor(0xFFC0CB)
      .addField("Instruction:", "> " + instruction)
      .addField("Output:", "> " + output)
      .addField("Status:", "> " + status)
    message.channel.send({embed});
}