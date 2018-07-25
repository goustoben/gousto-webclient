'use strict';

const Gousto = {
	//please keep in alphabetic order
	ajaxCall:  require('./ajaxCall'),
	ajaxPromise:  require('./ajaxPromise'),
	Button: require('./GoustoButton'),
	globalAjaxSetup: require('./globalAjaxSetup'),
	Heading: require('./GoustoHeading'),
	Hero: require('./GoustoHero'),
	Image: require('./Image'),
	LinkButton: require('./GoustoLinkButton'),
	Modal: require('./GoustoModal'),
	preloadImage: require('./preloadImage'),
	roundTime: require('./roundTime'),
	Svg: require('./Svg'),
	utils: require('./utils/index'),
};

module.exports = Gousto;
