var React = require('react');

const CONFIG = require('@fe/gousto-config');
const CONSTANTS = CONFIG.PRODUCTS;

var ProductImage = React.createClass({
	getDefaultProps: function(){
		return ({
			size: CONSTANTS.IMAGE_SMALL
		});
	},
	_hasProductImage: function(size) {
		if(this.props.images && this.props.images[size] && this.props.images[size].url) {
			return true;
		}
		return false;
	},
	render: function() {
		if(!this._hasProductImage(this.props.size)) {
			return (<div className="product-image-placeholder"></div>);
		}
		return (
			<img src={this.props.images[this.props.size].url} alt={this.props.alt} className={this.props.className} />
		);
	}
});

module.exports = ProductImage;
