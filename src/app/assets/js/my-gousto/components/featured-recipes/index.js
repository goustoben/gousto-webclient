'use strict';

const React = require('react');
const Gousto = require('@fe/gousto-generic');
const CONFIG = require('@fe/gousto-config');
const WIDGET_CONFIG = CONFIG.MY_GOUSTO.WIDGETS.FEATURED_RECIPES;
const RecipeList = require('./RecipeList');

const FeaturedRecipes = React.createClass({
	getInitialState: function() {
		return {
			ready: false,
			recipes: [],
			title: '',
			weekName: 'this',
			orderId: null
		};
	},

	componentDidMount: function() {
		let currentPeriod = Gousto.ajaxPromise(WIDGET_CONFIG.ROUTES.API.PERIOD_CURRENT_MENU, 'GET', {}, true);
		let nextPeriod = Gousto.ajaxPromise(WIDGET_CONFIG.ROUTES.API.PERIOD_NEXT_MENU, 'GET', {}, true);
		let userSubscription = Gousto.ajaxPromise(WIDGET_CONFIG.ROUTES.API.SUBSCRIPTION, 'GET');
		let userOrdersCall = Gousto.ajaxPromise(WIDGET_CONFIG.ROUTES.API.USER_ORDERS, 'GET', {limit: 5, sort_order: 'desc'});

		let twrRecipeIds, nwrRecipeIds, userOrders, periodIds;
		let isVegetarian = false;

		Promise.all([currentPeriod, nextPeriod, userSubscription, userOrdersCall]).then((data) => {
			if (!this.ignoreFetch) {
				twrRecipeIds = data[0].recipe_ids;
				nwrRecipeIds = data[1].recipe_ids;
				periodIds = {twr: data[0].period_id, nwr: data[1].period_id};
				isVegetarian = (data[2].box && data[2].box.box_type && data[2].box.box_type === 'vegetarian') ? true : false;
				userOrders = data[3];

				let {period, orderId, chosenBoth} = this.sortUserOrders(userOrders, periodIds);
				let linkTitle = this.getLinkTitle(period, orderId, chosenBoth);
				let title = this.getTitle(period, orderId, chosenBoth);
				let queryParams = {
					includes: ['ratings', 'nutritional_info', 'media'],
					size: WIDGET_CONFIG.IMAGE_SIZES.MEDIUM
				};

				if (period === 'this') {
					queryParams.recipe_ids = twrRecipeIds;
				} else if (period === 'next') {
					queryParams.recipe_ids = nwrRecipeIds;
				}

				this.setState({
					title,
					linkTitle,
					weekName: period,
					orderId
				});

				return Gousto.ajaxPromise(WIDGET_CONFIG.ROUTES.API.RECIPES, 'GET', queryParams, true);
			}
		}).then((recipesForPeriod) => {
			if (recipesForPeriod) {
				let recipes = [];
				let featuredRecipes = this.sortMenuRecipes(recipesForPeriod, isVegetarian);
				recipes = [
					{
						label: WIDGET_CONFIG.TYPE.POPULAR.LABEL,
						recipe: featuredRecipes.popular,
						icon: WIDGET_CONFIG.TYPE.POPULAR.ICON,
						labelDescription: "Rated " + featuredRecipes.popular.ratings.average + " stars by " + featuredRecipes.popular.ratings.count + " customers"
					},
					{
						label: WIDGET_CONFIG.TYPE.HEALTHY.LABEL,
						recipe: featuredRecipes.healthy,
						icon: WIDGET_CONFIG.TYPE.HEALTHY.ICON,
						labelDescription: "Just " + featuredRecipes.healthy.nutritional_info.calories_kcal + " calories per serving"
					},
					{
						label: WIDGET_CONFIG.TYPE.QUICK.LABEL,
						recipe: featuredRecipes.quick,
						icon: WIDGET_CONFIG.TYPE.QUICK.ICON,
						labelDescription: "Ready in " + featuredRecipes.quick.preparation_time_minutes + " minutes"
					}
				];
				this.setState({
					recipes: recipes,
					ready: true
				});
			}
		}).catch((err) => {
			this.setState({ready: true});
			throw err;
		});
	},

	componentWillUnmount: function() {
		this.ignoreFetch = true;
	},

	getTitle: function(period, orderId, chosenBoth) {
		let title = 'Want more? You can order up to 4 boxes per week';

		if (period === 'this') {
			title = 'Recommended for you this week';
		} else if (period === 'next' && !chosenBoth) {
			title = 'Recommended for you next week';
		}

		return title;
	},

	getLinkTitle: function(period, orderId, chosenBoth) {
		let linkTitle = 'See all recipes';

		if (orderId) {
			linkTitle = 'Choose my recipes';
		} else if (chosenBoth) {
			linkTitle = 'Add another box';
		}

		return linkTitle;
	},

	sortUserOrders: function(userOrders, periodIds, isVegetarian = false) {
		let chosenTwr = false;
		let chosenNwr = false;
		let editOrders = new Map();
		let thisPeriodId = periodIds['twr'];
		let nextPeriodId = periodIds['nwr'];
		if (userOrders.length > 0) {
			userOrders.forEach(function(order) {
				if (order.state === 'pending' && order.default === '1') {
					if (order.period_id === thisPeriodId && !editOrders.has('this')) {
						editOrders.set('this', order.id);
					} else if (order.period_id === nextPeriodId && !editOrders.has('next')) {
						editOrders.set('next', order.id);
					}
				} else if (order.state === 'committed' || (order.state === 'pending' && order.default === '0')) {
					if (order.period_id === thisPeriodId && !chosenTwr) {
						chosenTwr = true;
					} else if (order.period_id === nextPeriodId && !chosenNwr) {
						chosenNwr = true;
					}
				}
			});
		}

		let period = 'this';
		if (editOrders.size > 0) {
			if (editOrders.has('this')) {
				period = 'this';
			} else if (editOrders.has('next')) {
				period = 'next';
			}
		} else if (chosenTwr) {
			period = 'next';
		} else if (chosenNwr) {
			period = 'this';
		}

		return ({
			period,
			chosenBoth: chosenNwr && chosenTwr,
			orderId: editOrders.get(period)
		});
	},

	sortMenuRecipes: function(menu, isVegetarian) {
		let featuredRecipeIds = [];
		let recipes = menu.recipes;
		let recipeArray = Object.values(recipes);

		if (isVegetarian) {
			recipeArray = recipeArray.filter(function(recipe) {
				return recipe.type === 'vegetarian' && parseInt(recipe.fish) === 0;
			});
		}

		let healthiest = recipeArray.reduce((currentRecipe, nextRecipe) => {
			if (featuredRecipeIds.indexOf(nextRecipe) === -1) {
				let currentRecipeKcal = parseInt(currentRecipe.nutritional_info.calories_kcal);
				let nextRecipeKcal = parseInt(nextRecipe.nutritional_info.calories_kcal);
				if (nextRecipeKcal < currentRecipeKcal) {
					return nextRecipe;
				}
			}
			return currentRecipe;
		}, recipeArray[0]);
		recipeArray.splice(recipeArray.indexOf(healthiest), 1);
		featuredRecipeIds.push(healthiest);

		let quickest = recipeArray.reduce((currentRecipe, nextRecipe) => {
			if (featuredRecipeIds.indexOf(nextRecipe) === -1) {
				let currentRecipeTime = parseInt(currentRecipe.preparation_time_minutes);
				let nextRecipeTime = parseInt(nextRecipe.preparation_time_minutes);
				if (nextRecipeTime < currentRecipeTime) {
					return nextRecipe;
				}
			}
			return currentRecipe;
		}, recipeArray[0]);
		recipeArray.splice(recipeArray.indexOf(quickest), 1);
		featuredRecipeIds.push(quickest);

		let popular = recipeArray.reduce((currentRecipe, nextRecipe) => {
			if (featuredRecipeIds.indexOf(nextRecipe) === -1) {
				let currentRecipeRating = parseFloat(currentRecipe.ratings.average);
				let nextRecipeRating = parseFloat(nextRecipe.ratings.average);
				if (nextRecipeRating > currentRecipeRating) {
					return nextRecipe;
				}
			}
			return currentRecipe;
		}, recipeArray[0]);

		return {
			healthy: healthiest,
			quick: quickest,
			popular: popular
		};
	},

	render: function() {
		return(
			<RecipeList
				ready={this.state.ready}
				recipes={this.state.recipes}
				title={this.state.title}
				linkTitle={this.state.linkTitle}
				weekName={this.state.weekName}
				orderId={this.state.orderId}
			/>
		);
	}
});

module.exports = FeaturedRecipes;
