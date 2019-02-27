import PropTypes from 'prop-types'
import React from 'react'
// import css from './RecipeSummary.css'
import Immutable from 'immutable'/* eslint-disable new-cap */
import { basketSum } from 'utils/basket'
import recipesActions from 'actions/recipes'
import OrderedRecipe from './OrderedRecipe'

class RecipeSummary extends React.PureComponent {

	static propTypes = {
	  menuRecipesStore: PropTypes.instanceOf(Immutable.Map),
	  recipes: PropTypes.instanceOf(Immutable.Map),
	  menuRecipeStock: PropTypes.instanceOf(Immutable.Map),
	  numPortions: PropTypes.number,
	  menuBoxPrices: PropTypes.instanceOf(Immutable.Map),
	  view: PropTypes.oneOf(['summary', 'boxdetails']),
	}

	static defaultProps = {
	  menuRecipesStore: Immutable.Map({}),
	  menuRecipeStock: Immutable.Map({}),
	  menuBoxPrices: Immutable.Map({}),
	  recipes: Immutable.Map({}),
	  numPortions: 2,
	  view: 'boxdetails',
	}

	static contextTypes = {
	  store: PropTypes.object.isRequired,
	}

	static fetchData({ store, orderRecipeIds }) {
	  store.dispatch(recipesActions.recipesLoadRecipesById(orderRecipeIds))
	}

	componentDidMount() {
	  if (this.props.menuRecipesStore && this.props.menuRecipesStore.size === 0) {
	    const store = this.context.store
	    const orderRecipeIds = this.props.recipes && this.props.recipes.size ? this.props.recipes.keySeq().toArray() : []
	    RecipeSummary.fetchData({ store, orderRecipeIds })
	  }
	}

	render() {
	  const recipes = this.props.recipes
	  const menuRecipesStore = this.props.menuRecipesStore
	  const menuRecipeStock = this.props.menuRecipeStock
	  const numPortions = this.props.numPortions
	  const menuBoxPrices = this.props.menuBoxPrices
	  const prices = menuBoxPrices.getIn([numPortions.toString(), (basketSum(recipes).toString()), 'gourmet'], Immutable.Map({}))

	  return (
			<div data-testing="checkoutRecipeSummary">
				{recipes.map((serving, recipeId) => (
					<OrderedRecipe
					  key={recipeId}
					  recipeId={recipeId}
					  view={this.props.view}
					  featureBtn={false}
					  serving={numPortions * recipes.get(recipeId, 0)}
					  title={menuRecipesStore.getIn([recipeId, 'title'], '')}
					  basics={menuRecipesStore.getIn([recipeId, 'basics'], Immutable.List([]))}
					  stock={menuRecipeStock.getIn([recipeId, String(numPortions)], 0)}
					  media={menuRecipesStore.getIn([recipeId, 'media', 'images', 0, 'urls'], Immutable.List([]))}
					  range={menuRecipesStore.getIn([recipeId, 'range'], '')}
					  pricePerServing={Number(prices.get('pricePerPortion', 0))}
					  pricePerServingDiscounted={Number(prices.get('pricePerPortionDiscounted', 0))}
					/>
				)).toArray()}
			</div>
	  )
	}
}

export default RecipeSummary
