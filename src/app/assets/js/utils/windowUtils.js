'use strict';

const CONFIG = require('@fe/gousto-config')

var WindowUtils = {
	getQueryParamByName: function(name, url) {
		if (!url) {
			url = window.location.href;
		}
		name = name.replace(/[\[\]]/g, '\\$&');
		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
		if (!results || !results[2]) {
			return;
		}
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	},
	isDev: function() {
		return CONFIG.ENV === 'dev'
	},
	getQueryParamsAsObj: function(queryString) {
		if (!queryString) {
			queryString = window.location.search;
		}
		if(typeof queryString === 'undefined' || queryString === '' || queryString === null) {
			return {};
		}
		queryString = decodeURIComponent(queryString);
		var queryObj = {};
		queryString.substr(1).split('&').forEach(function(item) {
			var string = item.split('='),
			key = string[0],
			val = string[1] && decodeURIComponent(string[1]);
			key = key.replace(/\[\d.*?\]/gi, '[]');
			if(key in queryObj) {
				queryObj[key].push(val);
			} else {
				queryObj[key] = [val];
			}
		});
		return queryObj;
	}
};

module.exports = WindowUtils;
