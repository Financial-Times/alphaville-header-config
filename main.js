
const headerConfig = require('header_config.json');

module.exports = {
	getConfig : function(sectionName){
		return headerConfig.navItems.map(function (obj) {
			if (obj.name.indexOf('The Blog')>-1) {
				obj.selected = true;
			}
			return obj;
		});
	}
};
