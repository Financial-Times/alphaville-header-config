
var headerConfig = require('./header_config.json');

module.exports = {
	setSelected : function(sectionName){
		headerConfig.navItems.map(function (obj) {
			if (obj.name.indexOf(sectionName)>-1) {
				obj.selected = true;
			}
			return obj;
		});
		return headerConfig;
	}
};
