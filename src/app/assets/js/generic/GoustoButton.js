'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const classNames = require('classnames');
const GoustoLoading = require('./GoustoLoading');

const GoustoButton = React.createClass({
	mixins: [PureRenderMixin],

	getDefaultProps: function() {
		return ({
			goustoClass: 'primary',
			type: 'button',
			className: null,
			onClick: () => {},
			loading: false,
			disabled: false,
		});
	},

	render: function() {
		return (
			<button
				className={classNames('gbtn-' + this.props.goustoClass, this.props.className, {disabled: this.props.disabled})}
				onClick={this.props.onClick}
				type={this.props.type}
				disabled={this.props.disabled}
			>
				{this.props.children}
				{this.props.loading ?
					<GoustoLoading />
					:
					null
				}
			</button>
		);
	}
});

module.exports = GoustoButton;
