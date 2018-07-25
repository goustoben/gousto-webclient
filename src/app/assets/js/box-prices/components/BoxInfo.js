'use strict';

const React = require('react');

const BoxInfo = React.createClass({
	propTypes: {
		portionsPerMeal: React.PropTypes.string,
		totalPrice: React.PropTypes.string,
		pricePerPortion: React.PropTypes.string
	},
	render: function() {
		return (
			<div>
				<p className="text-success"><span className="strong">{this.props.portionsPerMeal} <span className="recipes">Recipes</span></span></p>
				<p className="per-serving whatever-i-want"><span className="strong price">&pound;{ this.props.pricePerPortion }</span><br />per serving</p>
				<p className="per-box">Box price <span className="strong price">&pound;{ this.props.totalPrice }</span></p>
			</div>
		);
	}
});

module.exports = BoxInfo;
