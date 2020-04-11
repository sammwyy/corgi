const tfilter = require('../utils/textFilter.js');

module.exports = (client, message) => {
	if (message.author.bot) return;
	if (message.guild == null) return;
	if (message.member == null) return;
	if (message.content == null) return;

	filterMessage(message);
}

function filterMessage (message) {
	const author = message.author;
	const member = message.member;
	const content = message.content;

	if (tfilter.capsCheck(content))
		return sendWarn(message, "No uses muchas mayusculas por favor.");

	if (tfilter.inviteCheck(content))
		return sendWarn(message, "No envies invitacion de otros servidores por favor.");

	if (tfilter.newlineCheck(content))
		return sendWarn(message, "No envies mensajes con muchas lineas por favor.");

	if (tfilter.linkCheck(content))
		return sendWarn(message, "No envies links aqui por favor.");

	if (content.length >= 512)
		return sendWarn(message, "No envies mensajes muy largos.");
}

function sendWarn (message, reason) {
	message.reply(reason).then(msg => msg.delete(5000));
	message.delete(0);
}