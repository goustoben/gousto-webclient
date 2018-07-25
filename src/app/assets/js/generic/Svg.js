'use strict';

var React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const CONFIG = require('../config');

var Svg = React.createClass({
	mixins: [PureRenderMixin],

	getDefaultProps: function() {
		return {
			fileName: '',
			className: ''
		};
	},

	render: function() {
		return (
			<svg className={this.props.fileName + ' ' + this.props.className}>
				<use xlinkHref={'/' + CONFIG.SPRITE_FILE_NAME + '#' + this.props.fileName} />
			</svg>
		);
	}
});

module.exports = Svg;
