'use strict';

var React = require('react');
var ReactRedux = require('react-redux');
const PureRenderMixin = require('react-addons-pure-render-mixin');

var Actions = require('../../actions');

var SummaryList = require('../../../order-summary/components/list/SummaryList');

var OrderSummaryListContainer = React.createClass({
	mixins: [PureRenderMixin],

	render: function() {
		return (
			<SummaryList
				userChoices={this.props.userChoices}
				products={this.props.products}
				grandTotal={this.props.grandTotal}
			/>
		);
	}
});

const mapStateToProps = (state) => {
	return {
		userChoices: state.userChoices,
		products: state.products
	}
}

module.exports = ReactRedux.connect(
	mapStateToProps,
	Actions
)(OrderSummaryListContainer);
