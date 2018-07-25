'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const Gousto = require('@fe/gousto-generic');
const RecipePanel = require('./RecipePanel');

const CookbookPanel = React.createClass({
	mixins: [PureRenderMixin],

	getDefaultProps: function() {
		return({
			recipes: [],
			ready: false
		});
	},

	isAllPlaceHolders: function(recipes) {
		return recipes.filter((recipe) => {return (!recipe.title)}).length === recipes.length;
	},

	render: function() {
		let recipes = this.props.recipes;
		if (!this.props.ready || (this.props.ready && recipes.length > 0)) {
			return (
				<div className="cookbook clearfix">
					<div className="container-padding">
						<Gousto.Heading type="h3" style="line" textAlign="left">Your cookbook</Gousto.Heading>
					</div>
					{(() => {
						if (!this.props.ready) {
							return <p className="desktop-hide cookbook-empty">Loading your your most recent recipes...</p>
						} else if(this.props.ready && this.isAllPlaceHolders(recipes)){
							return <p className="desktop-hide cookbook-empty">Please order more recipes to view your recipe cookbook</p>
						}
					})()}
					{recipes.map((recipe, index) => {
						return <RecipePanel recipeData={recipe} ready={this.props.ready} key={index} />;
					})}
				</div>
			);
		} else {
			return <span></span>
		}
	}
});

module.exports = CookbookPanel;
