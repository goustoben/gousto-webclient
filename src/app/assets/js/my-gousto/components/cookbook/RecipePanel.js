'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const Gousto = require('@fe/gousto-generic');
const CONFIG = require('@fe/gousto-config');
const WIDGET_CONFIG = CONFIG.MY_GOUSTO.WIDGETS.COOKBOOK;
const classNames = require('classnames');

const RecipePanel = React.createClass({
	mixins: [PureRenderMixin],
	getInitialState: function() {
		return ({
			imageLoaded: false
		});
	},

	getDefaultProps: function() {
		return({
			recipeData: {},
		});
	},

	componentWillReceiveProps: function(nextProps) {
		if (nextProps.recipeData && nextProps.recipeData.img) {
			let mediaUrl = nextProps.recipeData.img;
			Gousto.preloadImage(mediaUrl).then(function() {
				this.setState({imageLoaded: true});
			}.bind(this));
		}
	},

	getRecipePanel: function(recipeData, fadeIn) {
		return (
			<div className="cookbook-container">
				<div className="cookbook-image-container">
					{(() => {
						if (!fadeIn || this.state.imageLoaded) {
							return <Gousto.Image src={recipeData.img} className={classNames("cookbook-image", {'cookbook-image-border': !fadeIn})} />
						}
					})()}
				</div>
				<div>
					{(() => {
						if (!fadeIn || this.state.imageLoaded) {
							if (recipeData.title) {
								let recipeWords = recipeData.title.trim().split(' ');
								let lastWord = recipeWords.splice(recipeWords.length-1, 1);
								let rwords = recipeWords.join(' ');
								return <p className="cookbook-title">{rwords} <span className="cookbook-title-glyph">{lastWord} <span className={classNames("glyphicon glyphicon-menu-right cookbook-glyph", {'hide': !fadeIn})}></span></span></p>
							} else {
								return <p className="cookbook-title"><span className={classNames("glyphicon glyphicon-menu-right cookbook-glyph", {'hide': !fadeIn})}></span></p>
							}
						}
					})()}
				</div>
			</div>
		);
	},

	render: function() {
		let recipeData = this.props.recipeData;
		if (recipeData.title) {
			return (
				<a href={WIDGET_CONFIG.ROUTES.API.COOKBOOK + '/' + recipeData.url} className={classNames("cookbook-link col-md-2 col-xs-6", {'fade-in': this.state.imageLoaded})}>
					{this.getRecipePanel(recipeData, true)}
				</a>
			);
		} else {
			return (
				<div className="col-md-2 col-xs-6 mobile-hide">
					{this.getRecipePanel(recipeData, false)}
				</div>
			);
		}
	}
});

module.exports = RecipePanel;
