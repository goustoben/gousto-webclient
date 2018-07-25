'use strict';

var React = require('react');
var ReactRedux = require('react-redux');
const PureRenderMixin = require('react-addons-pure-render-mixin');

var Actions = require('../../actions');

var ThumbnailList = require('../../../order-summary/components/thumbnail/ThumbnailList');

var OrderSummaryThumbnailContainer = React.createClass({
	mixins: [PureRenderMixin],

	render: function() {
		return (
			<ThumbnailList
				userChoices={this.props.userChoices}
				products={this.props.products}
				userGifts={this.props.userGifts}
				onQtyChange={this.props.qtyChange}
			/>
		);
	}
});

const mapStateToProps = (state) => {
	return {
		userChoices: state.userChoices,
		products: state.products,
		userGifts: state.userGifts
	}
}

module.exports = ReactRedux.connect(
	mapStateToProps,
	Actions
)(OrderSummaryThumbnailContainer);
