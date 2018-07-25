'use strict';

const $ = window.$;

module.exports = {
	applyNumPortions: function(numPortions) {
		return $('a.ordersummary-num-portions[data-selid=portion-qty-'+numPortions+']').trigger('click');
	}
};
