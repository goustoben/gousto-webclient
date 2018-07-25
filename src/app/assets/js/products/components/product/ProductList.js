'use strict';

var React = require('react');
var moment = require('moment');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const CONFIG = require('@fe/gousto-config');
const CONSTANTS = CONFIG.PRODUCTS;

var ProductItem = require('./ProductItem');
var ProductDetails = require('./ProductDetails');
const Gousto = require('@fe/gousto-generic');

var ProductList = React.createClass({
	mixins: [PureRenderMixin],

	getDefaultProps: function() {
		return {
			productDetailsId: ''
		}
	},

	getInitialState: function() {
		return {
			'showModal': false,
			'activePanel': 0
		}
	},

	inCategory: function(categories, selectedCategory) {
		if (selectedCategory === '0') {
			return true;
		}
		for (var i in categories) {
			if (categories[i].id === selectedCategory) {
				return true;
			}
		}
		return false;
	},

	getQty: function(id) {
		let qty = 0;
		if (this.props.userChoices.has(id)) {
			qty = this.props.userChoices.get(id).reduce((sum, item) => {
				return sum + item.get('qty');
			}, 0);
		}

		return qty;
	},

	lowStock: function(id) {
		if (this.props.stock.get(id) <= CONSTANTS.LOW_STOCK_TRESHOLD) {
			return true;
		}

		return false;
	},

	handleShowModal: function(cb) {
		this.modalSucces = cb;

		this.setState({
			'showModal': true
		});
	},

	canShowProduct: function(product, selectedCategory, stock, qty) {
		if (this.inCategory(product.get('categories'), selectedCategory)
			&& stock.get(product.get('id'), 0) > 0
			&& (product.get('is_for_sale') === true || (product.get('is_for_sale') === false && qty > 0))
		) {
			return true;
		}

		return false;
	},

	isNew: function (productItems, product, selectedCategory) {
		if (!product.has('created_at')) {
			return false;
		}
		const createdAt = moment(product.get('created_at'));
		const isNew = moment(createdAt).add(2, 'week').isAfter();

		return isNew;
	},

	addToList: function(productItems, product, selectedCategory) {
		let id = product.get('id');
		let qty = this.getQty(id);
		const isNew = this.isNew(productItems, product, selectedCategory);

		if (this.canShowProduct(product, selectedCategory, this.props.stock, qty)) {
			productItems.push(
				<ProductItem
					{...product.toObject()}
					key={id}
					qty={qty}
					isNew={isNew}
					onQtyChange={this.props.onQtyChange}
					ageVerified={this.props.ageVerified}
					onShowModal={this.handleShowModal}
					lowStock={this.lowStock(id)}
					onShowDetails={this.props.onShowDetails}
				/>
			);
		}
	},

	handleAgeVerified: function() {
		this.setState({
			'showModal': false
		});
		this.props.onAgeVerified(true, true);
		if (typeof this.modalSucces === 'function') {
			this.modalSucces();
		}
	},

	render: function() {
		var selectedCategory = this.props.selectedCategory;
		var productItems = [];

		this.props.products.forEach((product) => {
			this.addToList(productItems, product, selectedCategory);
		});

		var productDetails = {show: false};
		if (this.props.productDetailsId !== '' && this.props.products.has(this.props.productDetailsId) === true) {
			productDetails = this.props.products.get(this.props.productDetailsId).toObject();
			productDetails.show = true;
			productDetails.qty = this.getQty(productDetails.id);
			productDetails.lowStock= this.lowStock(productDetails.id);
		}

		return (
			<div className="product-list">
				<div className="row">
					{productItems}
				</div>

				<Gousto.Modal title="Over 18?" show={this.state.showModal} onHide={() => { this.setState( {'showModal': false, 'activePanel': 0 }) }} activePanel={this.state.activePanel}>
					<Gousto.Modal.Panel>
						To add this item to your order please confirm you are over 18.
						<Gousto.Button goustoClass="secondary" onClick={() => {this.setState({activePanel: 1})}}>No, I'm under 18</Gousto.Button>
						<Gousto.Button goustoClass="primary" onClick={this.handleAgeVerified}>Yes, I'm over 18</Gousto.Button>
					</Gousto.Modal.Panel>
					<Gousto.Modal.Panel>
						Sorry, 18 is the minimum legal age required for wine purchases.
						<Gousto.Button goustoClass="secondary" onClick={() => {this.setState({showModal: false})}}>Close</Gousto.Button>
					</Gousto.Modal.Panel>
				</Gousto.Modal>

				<ProductDetails
					{...productDetails}
					onQtyChange={this.props.onQtyChange}
					onHide={(id) => { this.props.onShowDetails(id, 'hide') }}
					dialogClassName="modal-lg"
					fade={false}
				/>
			</div>
		);
	}
});

module.exports = ProductList;
