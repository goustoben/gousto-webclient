'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const Gousto = require('@fe/gousto-generic');
const moment = require('moment');

const Editorial = React.createClass({
	mixins: [PureRenderMixin],

	getDefaultProps: function () {
		return ({
			displayBestChoiseDate: '2016-12-26',
		});
	},

	renderEditorialNutritionist: function () {
		return (
			<div className="editorial clearfix">
				<div className="editorial-image--container col-md-4 hidden-sm col-xs-12">
					<Gousto.Image src={Gousto.Image.imagePath('photos/nutritionist.jpg')} className="editorial-image" />
				</div>
				<div className="editorial-content col-md-8 col-sm-12">
					<h3 className="editorial-content-title">A word from our nutritionist</h3>
					<p>
						So many studies have proven that the most effective way to eat well is simply to cook from scratch. Knowing exactly what’s going into your food is so important, especially when strange chemicals with impossible-to-pronounce names are added to the processed food on sale everywhere! With Gousto, it couldn’t be easier to create nutritious, home-cooked meals that your family will love.</p>
					<p className="editorial-content-signature">Vicki</p>
				</div>
			</div>
		);
	},

	renderEditorialBestChoise: function () {
		return (
			<div className="editorial clearfix">
				<div className="editorial-image--container col-md-4 hidden-sm col-xs-12">
					<div className="editorial-merch-container">
						<div className="editorial-merch-inner">
							<p className="editorial-merch-text">The UK's<br />best for<br />choice</p>
						</div>
					</div>
				</div>
				<div className="editorial-content col-md-8 col-sm-12">
					<h3 className="editorial-content-title">Variety (the spice of life and all that...)</h3>
					<p>
						A varied diet is important for balanced nutrition – and to keep mealtimes interesting! Gousto has over 20 recipes to choose from each week (lots more than other recipe boxes). So you can choose meals you'll look forward to cooking (and tucking into). You also have the most choice for delivery: any day of the week!</p>
				</div>
			</div>
		);
	},

	render: function () {
		const displayBestChoiseDate = moment(this.props.displayBestChoiseDate);
		const todaysDate = moment();
		if (todaysDate.isSameOrAfter(displayBestChoiseDate, 'day')) {
			return this.renderEditorialBestChoise();
		}
		return this.renderEditorialNutritionist();
	}
});

module.exports = Editorial;
