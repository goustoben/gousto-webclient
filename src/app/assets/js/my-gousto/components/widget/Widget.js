'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const classNames = require('classnames');

const CONFIG = require('@fe/gousto-config');

const Widget = React.createClass({
	mixins: [PureRenderMixin],

	getDefaultProps: function() {
		return ({
			type: 'eggshell'
		});
	},

	render: function() {
		return (
			<div className={classNames('clearfix', 'widget', 'widget--' + this.props.type, 'widget--' + this.props.name)}>
				<div className="container">
					{this.props.children}
				</div>
			</div>
		);
	}
});

module.exports = Widget;
