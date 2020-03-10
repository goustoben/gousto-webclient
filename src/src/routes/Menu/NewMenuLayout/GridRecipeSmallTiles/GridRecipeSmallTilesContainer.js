import { connect } from 'react-redux'
import Immutable from 'immutable'
import { getNumPortions } from 'selectors/basket'
import { isNew } from 'utils/recipe'
import { showDetailRecipe } from 'actions/menu'
import { GridRecipeSmallTiles } from './GridRecipeSmallTiles'
import { getRecipeProps } from './utils/getRecipeProps'

const mapStateToProps = (state, ownProps) => {
  const { basket, menuRecipeStock } = state
  const numPortions = getNumPortions(state)
  const recipeId = ownProps.recipe.get('id')
  const recipeProps = getRecipeProps(ownProps.recipe, numPortions)

  return {
    ...recipeProps,
    inBasket: basket.hasIn(['recipes', recipeId]),
    stock: menuRecipeStock.getIn([recipeId, String(numPortions)], 0),
    isNew: isNew(Immutable.fromJS(ownProps.recipe)),
    view: 'smallGrid',
    shouldShowRangeBadge: recipeProps.range && recipeProps.range.get('slug') === 'fine-dine-in'
  }
}

const GridRecipeSmallTilesContainer = connect(mapStateToProps, {
  onClick: showDetailRecipe
})(GridRecipeSmallTiles)

export { GridRecipeSmallTilesContainer }
