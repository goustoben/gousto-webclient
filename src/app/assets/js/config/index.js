'use strict';

const ENV_CONFIG = require('./env');

const configs = [
	'box-prices',
	'client',
	'core',
	'content',
	'my-gousto',
	'products',
	'signup',
	'deliveries'
];

let CONFIG = {

	SPRITE_FILE_NAME: (window.spriteFileName ? window.spriteFileName : ''),
	IMAGE_BASE_URL: (window.imageBaseURL ? window.imageBaseURL : ''),
	STATE_COOKIE_VERSION: 'v1_',

}

configs.forEach((configName) => {
	let config = require('./' + configName + '.js');
	Object.assign(CONFIG, {[(configName.replace(/-/g, '_')).toUpperCase()]: config});
});

module.exports = Object.assign({}, CONFIG, ENV_CONFIG);
