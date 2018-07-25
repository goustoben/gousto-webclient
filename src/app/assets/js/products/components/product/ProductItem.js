'use strict';

var React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

var ProductBasket = require('./ProductBasket');
const ProductImage = require('./ProductImage');

const Gousto = require('@fe/gousto-generic');
const CONFIG = require('@fe/gousto-config');
const CONSTANTS = CONFIG.PRODUCTS;

var ProductItem = React.createClass({
	mixins: [PureRenderMixin],

	handleOnClick: function() {
		if (this.props.age_restricted === true && this.props.ageVerified === false) {
			this.props.onShowModal(() => { this.props.onShowDetails(this.props.id, 'show'); });
		} else {
			this.props.onShowDetails(this.props.id, 'show');
		}
	},

	render: function() {
		var newIcon = this.props.isNew ? (<div className="icon-new-box"></div>): '';

		return (
			<div className="product-list-item--container col-md-6 col-sm-12">
				{newIcon}
				<div className="product-list-item">
					{(() => {
						if (this.props.lowStock === true) {
							return <div className="low-stock">low stock</div>;
						}
					})()}
					<div className="product-list-item-image" onClick={this.handleOnClick}>
						<ProductImage size={CONSTANTS.IMAGE_SMALL} images={this.props.images} alt={this.props.title} />
					</div>
					<div className="product-list-item-details--container clearfix">
						<div className="product-list-item-details" onClick={this.handleOnClick}>
							<div className="product-list-item-details-title">
								{this.props.title}
							</div>
							<p className="product-list-item-details-price">&pound;{this.props.price}</p>
						</div>
						<ProductBasket
							qty={this.props.qty}
							id={this.props.id}
							price={this.props.price}
							limitReached={this.props.limitReached}
							ageRestricted={this.props.age_restricted}
							onQtyChange={this.props.onQtyChange}
							ageVerified={this.props.ageVerified}
							onShowModal={this.props.onShowModal}
							context="grid"
						/>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = ProductItem;
