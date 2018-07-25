const React = require('react');
const Gousto = require('@fe/gousto-generic');

const BoxPricesContent= React.createClass({

	render:function() {
		return (
			<div className="outer-container">
				<div className="flex-center-all container flexibility">
					<div className="col-xs-12 col-sm-5 text-center">
						<h3 className="sub-heading">You're in control</h3>
						<p>Choose from over 20 recipes a week: meat, fish and vegetarian. That’s more than other recipe boxes. Choose the recipes you want, the day of the week you want them delivered, and how many servings</p>
					</div>
					<div className="col-sm-1">&nbsp;</div>
					<div className="col-xs-12 col-sm-5 text-center">
						<h3 className="sub-heading">Won't be home for delivery?</h3>
						<p>No problem. Choose a safe place where we can leave your box. Ice and insulation help keep your ingredients cool.</p>
					</div>
				</div>
				<div className="flex-center-all">
					<Gousto.Svg fileName="icon-hearts" />
				</div>

				<div className="col-xs-12 col-sm-6 col-sm-offset-3 text-center quote-wrapper">
					<blockquote className="gquote">
						<p>Exceptionally high quality ingredients, superb meat, great big portions. No waste - one of the best bits - and a significant saving on our weekly food bill. Super excited when the box arrives each week!
						</p>
						<span className="author strong">Rachel, Leeds</span>
					</blockquote>
					<blockquote className="gquote">
						<p>Our boring meals are once again adventurous! Food bill is reduced as I no longer buy veg and meat that I forget to use. On to our third week of orders now - delicious!
						</p>
						<span className="author strong">Alison, St Albans</span>
					</blockquote>
				</div>
			</div>
		);
	}
});

module.exports = BoxPricesContent;
