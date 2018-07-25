'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const Gousto = require('@fe/gousto-generic');
const ProductBasket = require('./ProductBasket');
const ProductImage = require('./ProductImage');

var ProductDetails = React.createClass({
	mixins: [PureRenderMixin],

	render: function() {
		let attributesHtml = [];
		if (this.props.attributes) {
			this.props.attributes.forEach((attribute) => {
				if (attribute.value !== '') {
					attributesHtml.push(
						<span className="details-attribute">
							<span className="details-attribute-name">{attribute.title}</span>: <span className="details-attribute-value">{attribute.value}{attribute.unit}</span>
						</span>
					);
				}
			});
		}

		return (
			<Gousto.Modal show={this.props.show} fade={false} onHide={() => { this.props.onHide(this.props.id) }} className="details" dialogClassName='modal-lg'>
				<Gousto.Modal.Panel>
				{(() => {
					if (this.props.show === true) {
						return (
							<div className="container-fluid">
								<div className="mobile-hide">
									<div className="row">
										<div className="col-sm-12">
											<h3 className="details-title text-heading">{this.props.title}</h3>
										</div>
									</div>
									<div className="row details-main">
										<div className="col-md-6 col-sm-12">
											<div className="details-image--container">
												<ProductImage images={this.props.images} className="details-image" />
												{(() => {
													if (this.props.lowStock === true) {
														return <div className="low-stock">low stock</div>;
													}
												})()}
											</div>
										</div>
										<div className="col-md-6 col-sm-12">
											<p>{this.props.description}</p>
										</div>
										<div className="col-md-6 col-sm-12 details-main-info">
											<p className="details-price">&pound;{this.props.price}</p>
											<ProductBasket
												qty={this.props.qty}
												id={this.props.id}
												price={this.props.price}
												limitReached={this.props.limitReached}
												ageRestricted={this.props.age_restricted}
												onQtyChange={this.props.onQtyChange}
												ageVerified={true}
												onShowModal={true}
												context="details"
											/>
										</div>
									</div>
								</div>
								<div className="desktop-hide details-mobile">
									<div className="details-image--container">
										<ProductImage images={this.props.images} className="details-image" />
										{(() => {
											if (this.props.lowStock === true) {
												return <div className="low-stock">low stock</div>;
											}
										})()}
									</div>
									<h3 className="details-title text-heading">{this.props.title}</h3>
									<p className="details-price--mobile">&pound;{this.props.price}</p>
									<p>{this.props.description}</p>
									<div className="details-mobile-header clearfix">
										<span className="details-mobile-header-back" onClick={() => { this.props.onHide(this.props.id) }}>
											<span className="glyphicon glyphicon-menu-left"></span> Products
										</span>
										<div className="details-mobile-header-button">
											<ProductBasket
												qty={this.props.qty}
												id={this.props.id}
												price={this.props.price}
												limitReached={this.props.limitReached}
												ageRestricted={this.props.age_restricted}
												onQtyChange={this.props.onQtyChange}
												ageVerified={true}
												onShowModal={true}
												context="details"
												display="mobile"
											/>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12 details-attribute--container">
										{attributesHtml}
									</div>
								</div>
							</div>
						);
					}
				})()}
				</Gousto.Modal.Panel>
			</Gousto.Modal>
		);
	}
});

module.exports = ProductDetails;
