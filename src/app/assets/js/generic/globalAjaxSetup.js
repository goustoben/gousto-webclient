'use strict';

const $ = window.$;

let globalAjaxSetup = function (CONFIG, data) {

	if ($) {
		const headers = {}
		if (data && data.user && data.user.token) {
			headers.Authorization = `Bearer ${data.user.token}`
		}

		let setupData = {
			data: {}
		};

		if (CONFIG && CONFIG.API_TOKEN) {
			headers['API-Token'] = CONFIG.API_TOKEN
		}

		setupData.headers = headers
		$.ajaxSetup(setupData);
	}
}

module.exports = globalAjaxSetup;
