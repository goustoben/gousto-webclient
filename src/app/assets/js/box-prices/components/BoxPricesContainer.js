'use strict';

const React = require('react');
const BoxPricesList = require('./BoxPricesList');
const BoxPricesContent = require('./BoxPricesContent');
const Gousto = require('@fe/gousto-generic');

const BoxPricesContainer = React.createClass({

	render: function() {
		return (
			<div className="box-prices">
				<Gousto.Hero imageUrl={Gousto.Image.imagePath('photos/box-prices-hero.png')} className="box-prices-ghero">
					<Gousto.Heading type="h1" className="box-prices-hero-title text-heading text-center">
						Box Prices
					</Gousto.Heading>
				</Gousto.Hero>
				<BoxPricesList />
				<BoxPricesContent />
			</div>
		);
	}
});

module.exports = BoxPricesContainer;
