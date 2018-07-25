'use strict';

const React = require('react');
const Gousto = require('@fe/gousto-generic');
const CONFIG = require('@fe/gousto-config');
const WIDGET_CONFIG = CONFIG.MY_GOUSTO.WIDGETS.COOKBOOK;
const CookbookPanel = require('./CookbookPanel');

let Cookbook = React.createClass({
	getInitialState: function() {
		return({
			recipes: this.getPlaceHolders(),
			ready: false
		});
	},

	componentDidMount: function() {
		Gousto.ajaxPromise(WIDGET_CONFIG.ROUTES.API.USER_ORDERS, 'GET', {limit: 5, sort_order: 'desc', phase: 'delivered'})
		.then((userOrders) => {
			if (!this.ignoreFetch && userOrders) {
				let recipe_ids = [];
				if (userOrders.length > 0) {
					userOrders = userOrders.sort((a,b) => {
						return parseInt(b.id) - parseInt(a.id);
					});
					userOrders.forEach(function(order) {
						if (recipe_ids.length < 6) {
							order.recipe_items.forEach(function(recipe) {
								if (recipe_ids.length < 6 && recipe.itemable_type === 'Recipe' && recipe_ids.indexOf(recipe.recipe_id) < 0) {
									recipe_ids.push(recipe.recipe_id);
								}
							});
						}
					});
				}
				let queryParams = {
					includes: ['media'],
					size: WIDGET_CONFIG.IMAGE_SIZES.SMALL
				};
				if (recipe_ids.length < 1) {
					throw 'no user recipes found';
				} else {
					queryParams.recipe_ids = recipe_ids;
				}

				return new Promise((resolve, reject) => {
					Gousto.ajaxPromise(WIDGET_CONFIG.ROUTES.API.RECIPES, 'GET', queryParams, true).then(userRecipes => {
						let orderedUserRecipes = new Map();
						recipe_ids.forEach(recipeId => {
							orderedUserRecipes.set(recipeId, userRecipes.recipes[recipeId]);
						});

						resolve(orderedUserRecipes);
					}).catch(err =>{
						reject(err);
					});
				});
			}
		}).then((userRecipes) => {
			this.setState({
				recipes: this.getRecipes(userRecipes),
				ready: true
			});
		}).catch((err) => {
			this.setState({ready: true});
		});
	},

	componentWillUnmount: function() {
		this.ignoreFetch = true;
	},

	getRecipes: function(userRecipes) {
		let pastRecipes = [];
		if (userRecipes) {
			userRecipes.forEach(recipe => {
				pastRecipes.push({
					url: (recipe.url)? recipe.url : '',
					img: (recipe.media && recipe.media[0] && recipe.media[0].url)? recipe.media[0].url : Gousto.Image.imagePath(WIDGET_CONFIG.PLACEHOLDER_IMAGE),
					title: recipe.title
				});
			});

			while (pastRecipes.length < 6){
				pastRecipes.push(this.getPlaceHolder());
			}
		}
		return pastRecipes;
	},

	getPlaceHolder: function() {
		return {
			title: '',
			url: '',
			'img': Gousto.Image.imagePath(WIDGET_CONFIG.PLACEHOLDER_IMAGE)
		};
	},

	getPlaceHolders: function() {
		let recipes = [];
		for (var i = 0; i<6; i++) {
			recipes.push(this.getPlaceHolder());
		}
		return recipes;
	},

	render: function(){
		return(
			<CookbookPanel
				recipes={this.state.recipes}
				ready={this.state.ready}
			/>
		);
	}
});

module.exports = Cookbook;
