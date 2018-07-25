'use strict';

const $ = window.$;

module.exports = {
	applyFilter: function(filter) {
		return $('a[data-sort-attr=' + filter + ']').trigger('click');
	}
};
