const langs = require("../databases/bot_langs.json").langs;

exports.str = (lang, string) => {
	return langs[getIndex(lang)][string];
}

function getIndex (lang) {
	if (lang.toLowerCase() == "es") return 1;
	else return 0;
}