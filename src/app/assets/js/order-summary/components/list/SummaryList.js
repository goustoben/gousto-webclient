'use strict';

var React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

var SummaryItem = require('./SummaryItem');

var SummaryList = React.createClass({
	mixins: [PureRenderMixin],

	getProducts: function() {
		let products = [];
		let totals = 0.0;

		this.props.userChoices.forEach((productItems, id) => {
			productItems.forEach((productItem) => {
				let total = productItem.get('price') * productItem.get('qty');
				totals += total;
				products.push(
					<SummaryItem
						key = {id + productItem.get('price')}
						qty = {productItem.get('qty')}
						title = {this.props.products.getIn([id, 'title'])}
						price = {productItem.get('price')}
						totalPrice = {total.toFixed(2)}
						is_vatable = {this.props.products.getIn([id, 'is_vatable'], false)}
					/>
				);
			});
		});

		totals.toFixed(2);

		return {
			products: products,
			total: totals
		};
	},

	updateSummaryTotal: function(productTotal) {
		let newTotal = (this.props.grandTotal + productTotal).toFixed(2);
		if (isNaN(newTotal)) {
			newTotal = '';
		}
		$('#ordersummary-grand-total').text(newTotal);
	},

	render: function() {
		let products = this.getProducts();
		this.updateSummaryTotal(products.total);
		return (
			<div>
				{(products.products.length > 0) ? <p>Extras</p> : ''}
				{products.products}
			</div>
		);
	}
});

module.exports = SummaryList;
