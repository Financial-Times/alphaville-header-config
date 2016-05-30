"use strict";

exports.get = function(selected, loggedIn) {
	const headerConfig = require('./header_config.json');

	headerConfig.navItems.map(function (obj) {
		if (obj.name.indexOf(selected)>-1) {
			obj.selected = true;
		}
		return obj;
	});

	if (loggedIn === true) {
		headerConfig.loggedIn = true;
	} else {
		headerConfig.loggedOut = true;
	}

	return headerConfig;
};
