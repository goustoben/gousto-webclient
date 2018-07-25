'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const classNames = require('classnames');

const GoustoHeading = React.createClass({
	mixins: [PureRenderMixin],

	getDefaultProps: function() {
		return {
			title: '',
			className: '',
			style: '',
			textAlign: 'left',
			type: 'h1'
		};
	},

	render: function() {
		let type = this.props.type;
		if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(this.props.type) === -1) {
			type = 'h1';
		}

		let className = this.props.className;
		let children = this.props.children;
		if (this.props.style === 'line') {
			className = classNames(className, 'header-line', 'header-line' + '--' + this.props.textAlign);
			children = <span className="header-line-text">{children}</span>
		}

		let header = React.createElement(type, {className}, children);

		return header;
	}
});

module.exports = GoustoHeading;
