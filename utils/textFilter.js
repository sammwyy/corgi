exports.capsCheck = (str) => {
	var lowers = str.replace( /[^a-z]/g, '' ).length;
	var uppers = str.replace( /[a-z]/g, '' ).length;
	return str.length > 8 && uppers > 6 && uppers > lowers ;
}

exports.inviteCheck = (str) => {
	noslash = str.replace(/\\/gi, "");
	special = str.replace(/ /gi, "").replace(/[^\w\s]/gi, '');
	spaces = str.replace(/ /gi, "");

	return special.includes("httpsdiscordgg") 
		|| special.includes("httpsdiscordappcominvite") 
		|| special.includes("httpsinvitegg")
		|| str.includes("discord.gg/")
		|| str.includes("discordapp.com/invite/")
		|| noslash.includes("discord.gg/")
		|| noslash.includes("discordapp.com/invite/")
		|| spaces.includes("discord.gg/")
		|| spaces.includes("discordapp.com/invite/")
}

exports.newlineCheck = (str, maxlines) => {
	if (maxlines == null) maxlines = 6;
	return str.split("\n").length >= maxlines;
}

exports.linkCheck = (str) => {
	let check1 = str.includes("http://") || str.includes("https://");
	let check2 = str.includes("://www.");
	let check3 = str.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)+[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm);
	let check4 = str.includes(".com") || str.includes(".us") || str.includes(".net") || str.includes(".es") || str.includes(".xyz") || str.includes(".gl") || str.includes(".ly")

	return check3 || (check1 && check4) || (check1 && check2);
}