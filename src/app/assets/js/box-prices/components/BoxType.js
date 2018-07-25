'use strict';

const React = require('react');
const classNames = require('classnames');

const BoxType = React.createClass({
	propTypes: {
		boxType: React.PropTypes.string
	},
	humanize: function(type) {
		if(parseInt(type, 10) === 4) {
			return 'Family';
		} else {
			return '2-Person';
		}
	},
	render: function() {
		return (
			<div>
				<h2 className={classNames('text-center', this.props.className)}>{this.humanize(this.props.boxType)} box</h2>
				{this.props.children}
			</div>
		);
	},

});

module.exports = BoxType;
