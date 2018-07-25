'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const Gousto = require('@fe/gousto-generic');
const classNames = require('classnames');

const Stamp = React.createClass({
	mixins: [PureRenderMixin],

	getDefaultProps: function() {
		return({
			size: "large",
			type: "price",
			value: 0,
			bodytext: ''
		});
	},

	render: function() {
		let small = this.props.size === 'small' ? true : false;
		let large = this.props.size === 'large' ? true : false;
		return(
			<div className={classNames(this.props.size, {'col-md-12': small}, {'col-md-6': large}, 'stamp col-xs-12 col-lg-12')}>
				<div className={this.props.size + ' stamp-badge'}>
					<p className="stamp-number">{this.props.type === 'price' ? 	<span>&pound;</span> : ''}{this.props.value}</p>
					<Gousto.Svg
						fileName={(this.props.type === 'price' || this.props.type === 'percentage') ? 'icon-stamp-half' : 'icon-stamp-full'}
						className={"stamp-svg-" + this.props.size + ' stamp-svg'}
					/>
				</div>
				<p className={this.props.size + ' stamp-text'}>{this.props.bodytext}</p>
			</div>
		);
	}
});

module.exports = Stamp;
