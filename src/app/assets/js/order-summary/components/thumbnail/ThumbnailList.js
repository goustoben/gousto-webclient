'use strict';

var React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

var ThumbnailItem = require('./ThumbnailItem');

const CONFIG = require('@fe/gousto-config');
const CONSTANTS = CONFIG.PRODUCTS;

var ThumbnailList = React.createClass({
	mixins: [PureRenderMixin],

	getProducts: function() {
		var products = [];
		this.props.userChoices.forEach((productItems, id) => {
			let qty = productItems.reduce((sum, productItem) => {
				return sum + productItem.get('qty');
			}, 0);
			const image = this.props.products.getIn([id, 'images']);
			products.push(
				<ThumbnailItem
					key = {id}
					id = {id}
					qty = {qty}
					title = {this.props.products.getIn([id, 'title'])}
					imageUrl = {image ? image[CONSTANTS.IMAGE_SMALL].url : ''}
					onQtyChange={this.props.onQtyChange}
					isGift = {false}
				/>
			);
		});
		this.props.userGifts.forEach((giftItems, id) => {
			const image = this.props.userGifts.getIn([id, 'images']);
			products.push(
				<ThumbnailItem
					key = {'gift' + id}
					id = {id}
					qty = {this.props.userGifts.getIn([id, 'qty'])}
					title = {this.props.userGifts.getIn([id, 'title'])}
					imageUrl = {image ? image.getIn([CONSTANTS.IMAGE_SMALL, 'url']) : ''}
					onQtyChange={()=>{}}
					isGift = {true}
				/>
			);
		});

		return products;
	},

	render: function() {
		var products = this.getProducts();

		return (
			<ul className="ordersummary-recipes ordersummary-products">
				{products}
			</ul>
		);
	}
});

module.exports = ThumbnailList;
