const _ = require('lodash');
window.React = require('react');

window.matchMedia =
	window.matchMedia ||
	function() {
		return {
			matches: false,
			addListener: function() {},
			removeListener: function() {},
		}
	}

if (!Object.entries) {
	Object.entries = function(obj) {
		const ownProps = Object.keys(obj)
		let i = ownProps.length
		const resArray = new Array(i) // preallocate the Array

		while (i--) {
			resArray[i] = [ownProps[i], obj[ownProps[i]]]
		}

		return resArray
	}
}

if (!Object.values) {
	Object.values = _.values
}
