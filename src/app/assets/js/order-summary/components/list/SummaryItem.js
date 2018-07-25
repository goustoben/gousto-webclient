'use strict';

var React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

var SummaryItem = React.createClass({
	mixins: [PureRenderMixin],

	render: function() {
		let itemText = this.props.qty + ' x ' + this.props.title;
		if (this.props.is_vatable) {
			itemText += '*';
		}
		return (
			<p className="clearfix">
				<span className="summary-product-item pull-left">{itemText}</span><span className="pull-right">&pound;{this.props.totalPrice}</span>
			</p>
		);
	}
});

module.exports = SummaryItem;
