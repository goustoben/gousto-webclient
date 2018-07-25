'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const classNames = require('classnames');

const GoustoLinkButton = React.createClass({
	mixins: [PureRenderMixin],

	getDefaultProps: function() {
		return ({
			type: null,
			className: '',
			target: '_self'
		});
	},

	render: function() {
		return (
			<a className={classNames({['gbtn-' + this.props.type]: this.props.type}, this.props.className)} href={this.props.href} target={this.props.target} >
				{this.props.children}
			</a>
		);
	}
});

module.exports = GoustoLinkButton;
