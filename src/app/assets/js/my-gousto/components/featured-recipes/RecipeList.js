'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const Gousto = require('@fe/gousto-generic');
const CONFIG = require('@fe/gousto-config');

const RecipeItem = require('./RecipeItem');

const RecipeList = React.createClass({
	mixins: [PureRenderMixin],

	getDefaultProps: function() {
		return ({
			recipes: [],
			weekName: 'this',
			title: '',
			linkTitle: '',
			ready: false,
			orderId: null
		});
	},

	getWeekAbbreviation: function() {
		if (this.props.weekName === 'this') {
			return 'TWR';
		} else if (this.props.weekName === 'next') {
			return 'NWR';
		}
	},

	getData: function() {
		if (this.props.ready) {
			return this.props.recipes;
		} else {
			let recipes = [];
			for (let i = 0; i < 3; i++) {
				recipes.push({
						recipe: {
							label: undefined,
							title: '&nbsp;',
							media: [{
								purpose: 'mood-image',
								url: Gousto.Image.imagePath('icons/product-placeholder.png')
							}]
						},
						label: undefined,
						icon: undefined,
						labelDescription: undefined
				});
			}
			return recipes;
		}
	},

	getRecipesLink: function(routes, week, orderId) {
		let url = routes[week];
		if (orderId) {
			url += '/' + orderId;
		}

		return url;
	},

	render: function() {
		let recipes = this.getData();
		if (!this.props.ready || (this.props.ready && recipes.length > 0)) {
			return (
				<div className="recipes clearfix">
					<div className="container-padding">
						<Gousto.Heading type="h3" style="line" textAlign="left">{this.props.title}</Gousto.Heading>
					</div>
					<div className="clearfix">
						{recipes.map((recipe, index) => {
							return (
								<div className="col-md-4 recipe--container" key={index}>
									<RecipeItem
										ready={this.props.ready}
										recipe={recipe.recipe}
										label={recipe.label}
										icon={recipe.icon}
										labelDescription={recipe.labelDescription}
										weekAbbreviation={this.getWeekAbbreviation()}
										orderId={this.props.orderId}
									/>
								</div>
							);
						})}
					</div>
					<p className="container-padding recipes-link">
						{(()=> {
							if (this.props.ready) {
								return (
									<a href={this.getRecipesLink(CONFIG.CLIENT.ROUTES, this.getWeekAbbreviation(), this.props.orderId)}>
										{this.props.linkTitle} <span className="glyphicon glyphicon-menu-right recipes-link-icon" aria-hidden="true"></span>
									</a>
								);
							} else {
								return <span>&nbsp;</span>;
							}
						})()}
					</p>
				</div>
			);
		} else {
			return <span></span>;
		}
	}
});

module.exports = RecipeList;
