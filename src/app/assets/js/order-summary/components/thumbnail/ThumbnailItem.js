'use strict';

var React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

var ThumbnailItem = React.createClass({
	mixins: [PureRenderMixin],

	render: function() {
		let portions = this.props.qty + ' Item' + (this.props.qty > 1 ? 's' : '');
		return (
			<li className="ordersummary-recipe clearfix">
				<div className="ordersummary-products-picture-container">
					<img src={this.props.imageUrl} />
				</div>
				<div className="ordersummary-recipe-overview">
					<p className="order-summary-recipe-title--container">
						<span className="ordersummary-recipe-title">{this.props.title}</span>
					</p>
					<p>
						<span className="ordersummary-recipe-portions">{portions}</span>
					</p>
					<p>
						{this.props.isGift ? <span className="free-gift-text">FREE GIFT</span> : ''}
					</p>
				</div>
				{this.props.isGift ? '' : <span className="glyphicon glyphicon-remove" onClick={() => {this.props.onQtyChange(this.props.id, -1)}}/>}
			</li>
		);
	}
});

module.exports = ThumbnailItem;
