import PropTypes from 'prop-types'
import React from 'react'
// import css from './RecipeSummary.css'
import Immutable from 'immutable'
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
    const { menuRecipesStore, recipes } = this.props
    if (menuRecipesStore && menuRecipesStore.size === 0) {
      const {store} = this.context
      const orderRecipeIds = recipes && recipes.size ? recipes.keySeq().toArray() : []
      RecipeSummary.fetchData({ store, orderRecipeIds })
    }
  }

  render() {
    const {recipes, menuRecipesStore, menuRecipeStock, numPortions, menuBoxPrices, view} = this.props
    const prices = menuBoxPrices.getIn([numPortions.toString(), (basketSum(recipes).toString()), 'gourmet'], Immutable.Map({}))

    return (
      <div data-testing="checkoutRecipeSummary">
        {recipes.map((serving, recipeId) => (
          <OrderedRecipe
            key={recipeId}
            recipeId={recipeId}
            view={view}
            featureBtn={false}
            serving={numPortions * recipes.get(recipeId, 0)}
            title={menuRecipesStore.getIn([recipeId, 'title'], '')}
            basics={menuRecipesStore.getIn([recipeId, 'basics'], Immutable.List([]))}
            stock={menuRecipeStock.getIn([recipeId, String(numPortions)], 0)}
            media={menuRecipesStore.getIn([recipeId, 'media', 'images', 0, 'urls'], Immutable.List([]))}
            isFineDineIn={menuRecipesStore.getIn([recipeId, 'isFineDineIn'], false)}
            pricePerServing={Number(prices.get('pricePerPortion', 0))}
            pricePerServingDiscounted={Number(prices.get('pricePerPortionDiscounted', 0))}
          />
        )).toArray()}
      </div>
    )
  }
}

export default RecipeSummary
