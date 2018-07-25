'use strict';

//ordered list, defines stacking order on my-gousto page
let WIDGET_LIST = [
	'notification',
	'header',
	'cookbook',
	'editorial',
	'stats',
	'referfriend',
];

const MY_GOUSTO = {
	WIDGET_LIST: WIDGET_LIST,
	WIDGETS: {}
};

WIDGET_LIST.forEach((widgetName) => {
	let widgetKey = widgetName.replace(/-/g, '_').toUpperCase();
	let widgetConfig;
	try {
		widgetName = './my-gousto/' + widgetName;
		widgetConfig = require(widgetName + '.js');
	} catch (e) {
		widgetConfig = {};
	}

	MY_GOUSTO.WIDGETS[widgetKey] = widgetConfig;
});

module.exports = MY_GOUSTO;
