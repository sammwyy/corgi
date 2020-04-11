exports.stringToBool = (str) => {
	str = str.toLowerCase();
	return str == "enabled";
}

exports.boolToString = (bool) => {
	if (bool) return "Enabled";
	else return "Disabled";
}