'use strict';
const $ = window.$;

module.exports = {
	setDeliveryDay: function(delDay) {
		return $('a[data-delivery-day-id=' + delDay + ']').trigger('click');
	}
};
