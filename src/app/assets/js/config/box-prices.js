'use strict';

const CLIENT = require('./client');

const CONSTANTS = {
	DEFAULT_BOX_TYPE: 'gourmet',
	BOX_IMAGES: {
		2: 'photos/couples-box.jpg',
		4: 'photos/family-box.jpg'
	},
	BOX_ICONS: {
		2: 'icons/most-popular.png',
		4: 'icons/best-value.png'
	},
	BOX_STRAPLINES: {
		2: 'Delicious meals for two',
		4: 'Tasty meals for 2 adults and 2-3 children'
	},
	BOX_LINKS: {
		2: CLIENT.ROUTES.TWR + '/?num_portions=2',
		4: CLIENT.ROUTES.TWR + '/?num_portions=4'
	}
};
module.exports = CONSTANTS;
