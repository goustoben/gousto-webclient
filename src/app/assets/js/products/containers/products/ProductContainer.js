'use strict';

var React = require('react');
var ReactRedux = require('react-redux');
const PureRenderMixin = require('react-addons-pure-render-mixin');

var Actions = require('../../actions');

var ProductList = require('../../components/product/ProductList');

var ProductContainer = React.createClass({
	mixins: [PureRenderMixin],

	render: function() {
		return (
			<div className="product-app">
				<ProductList
					products = {this.props.products}
					selectedCategory = {this.props.selectedCategoryId}
					userChoices = {this.props.userChoices}
					onQtyChange = {this.props.qtyChange}
					ageVerified = {this.props.ageVerified}
					onAgeVerified = {this.props.setAgeVerified}
					stock = {this.props.stock}
					onShowDetails = {this.props.showDetails}
					productDetailsId = {this.props.productDetailsId}
				/>
			</div>
		);
	}
});

const mapStateToProps = (state) => {
	return {
		products: state.products,
		selectedCategoryId: state.selectedCategoryId,
		userChoices: state.userChoices,
		ageVerified: state.user.get('ageVerified'),
		stock: state.stock,
		productDetailsId: state.productDetailsId,
	}
}

module.exports = ReactRedux.connect(
	mapStateToProps,
	Actions
)(ProductContainer);
