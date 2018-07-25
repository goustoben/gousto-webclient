'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const classNames = require('classnames');
const Gousto = require('@fe/gousto-generic');
const CONFIG = require('@fe/gousto-config');
const WIDGET_CONFIG = CONFIG.MY_GOUSTO.WIDGETS.FEATURED_RECIPES;

const RecipeItem = React.createClass({
	mixins: [PureRenderMixin],

	getInitialState: function() {
		return {imageLoaded: false};
	},

	getDefaultProps: function() {
		return ({
			recipes: [],
			weekAbbreviation: '',
			ready: false,
			orderId: null
		});
	},

	componentWillReceiveProps: function(nextProps) {
		if (nextProps.ready) {
			let media = this.getMedia(nextProps.recipe.media);
			Gousto.preloadImage(media.url).then(function() {
				this.setState({imageLoaded: true});
			}.bind(this));
		}
	},

	getMedia: function(medias) {
		let media = medias.find((media) => {
			return (media.purpose && media.purpose === 'mood-image');
		});

		return media;
	},

	getLink: function(recipeId, orderId) {
		if (this.props.weekAbbreviation) {
			let qString = '';
			if (orderId) {
				qString = '/' + orderId;
			}
			qString += '?recipe_ids[]=' + recipeId;

			return CONFIG.CLIENT.ROUTES[this.props.weekAbbreviation] + qString;
		}
		return '#';
	},

	render: function() {
		let recipe = this.props.recipe;
		return (
			<div className={classNames('recipe', {'fade-in': this.state.imageLoaded})}>
				<div className="recipe-image--container">
					{(() => {
						if (recipe.media) {
							let media = this.getMedia(recipe.media);
							let url = Gousto.Image.imagePath('icons/product-placeholder.png')
							if (media && media.url && this.props.ready && this.state.imageLoaded) {
								url = media.url;
							}
							return <Gousto.Image src={url} alt={recipe.title} className="recipe-image"/>;
						}
					})()}
					{(() => {
						if (this.props.ready && this.state.imageLoaded) {
							return <div className="recipe-label">{this.props.label}</div>
						}
					})()}
				</div>
				<div className="recipe-details">
					{(() => {
						if (this.props.ready && this.state.imageLoaded) {
							return (
								<div>
									<p className="recipe-details-title">{recipe.title}</p>
									<a className="recipe-add gbtn-secondary-outline-add" href={this.getLink(recipe.id, this.props.orderId)}>Add</a>
									<div className="recipe-description">
										<Gousto.Svg fileName={this.props.icon} className="recipe-description-icon" />
										<p className="recipe-description-text">{this.props.labelDescription}</p>
									</div>
								</div>
							);
						}
					})()}
				</div>
			</div>
		);
	}
});

module.exports = RecipeItem;
