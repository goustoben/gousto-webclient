'use strict';

const $ = window.$;

const ajaxCall = function(url, method, data = {}, successCb = () => {}, errorCb = () => {}, cache = false, dataType = 'json', accessToken) {
	let formatArrayErrors = (errors) => {
		return errors.reduce((str, error) => {
			return str + ' ' + error.message;
		}, '');
	}

	let httpMethod = method;
	if (method === 'PUT' || method === 'PATCH' || method === 'DELETE') {
		httpMethod = 'POST';
	}

	let ajaxSettings = {
		url,
		type: httpMethod,
		data,
		dataType,
		cache,
		success: function(response) {
			if (response.status === 'ok') {
				var cbData = response;
				if (typeof response.result !== 'undefined') {
					cbData = response.result;
					if (typeof response.result.data !== 'undefined') {
						cbData = response.result.data;
					}
				} else if (typeof response.data !== 'undefined') {
					cbData = response.data;
				}
				successCb(cbData);
			} else if (Array.isArray(response.errors)) {
				errorCb(this.formatArrayErrors(response.errors));
			} else if (Array.isArray(response.data)) {
				errorCb(formatArrayErrors(response.data));
			} else if (typeof response.error !== 'undefined') {
				errorCb(response.error);
			}
		},
		error: function(xhr, status, err) {
			if (xhr.responseJSON && xhr.responseJSON.data && Array.isArray(xhr.responseJSON.data)) {
				errorCb(formatArrayErrors(xhr.responseJSON.data));
			} else if (xhr.responseJSON && xhr.responseJSON.errors && Array.isArray(xhr.responseJSON.errors)) {
				errorCb(formatArrayErrors(xhr.responseJSON.errors));
			} else if (xhr.status !== 200) {
				errorCb('Request error.');
			} else {
				errorCb(err.toString(), status);
			}
		}
	};

	if (accessToken) {
		ajaxSettings.beforeSend = function(xhr) {
			xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
		}
	}

	if (method !== 'POST' || method !== 'GET') {
		ajaxSettings.data._method = method;
	}

	$.ajax(ajaxSettings);
}

module.exports = ajaxCall;
