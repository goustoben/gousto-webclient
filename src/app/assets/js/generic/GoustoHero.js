'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const classNames = require('classnames');

const GoustoHero = React.createClass({
	mixins: [PureRenderMixin],

	getDefaultProps: function() {
		return {
			title: '',
			imageUrl: '',
			className: ''
		};
	},

	render: function() {
		return (
			<div className={classNames(['ghero', this.props.className])} style={{ backgroundImage: 'url(' + this.props.imageUrl + ')' }}>
				{this.props.children}
			</div>
		);
	}
});

module.exports = GoustoHero;
