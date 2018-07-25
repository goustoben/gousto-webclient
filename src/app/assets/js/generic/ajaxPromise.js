'use strict';

const ajaxCall = require('./ajaxCall');

const ajaxPromise = function(url, method, data = {}, cache = false, dataType = 'json') {
	return new Promise(function(resolve, reject) {
		ajaxCall(url, method, data, resolve, reject, cache, dataType);
	});
};

module.exports = ajaxPromise;
