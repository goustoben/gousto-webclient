'use strict';

const globalConfig = {
	ENV: '[environment_name]',
	API_TOKEN: '[api_token]',
	ENDPOINTS: {
		PRODUCT_SERVICE: '[products_domain][products_domain_path]',
		BASE: '[api_domain]',
		DELIVERY_SERVICE: '[deliveries_domain][deliveries_domain_path]',
	}
};

module.exports = globalConfig;
