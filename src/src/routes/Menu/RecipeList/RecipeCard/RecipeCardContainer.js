import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { getCutoffDate } from 'routes/Menu/selectors/cutoff'
import { getNumPortions } from 'selectors/basket'
import { getRecipes } from 'selectors/root'

import { showDetailRecipe } from '../../actions/menuRecipeDetails'
import { RecipeCard } from './RecipeCard'
import { getRecipeOutOfStock } from '../../selectors/recipe'

const getIdForRecipeCard = (state, props) => props.recipeId

// this allows RecipeCardContainer to be rendered with just a recipeId
const getRecipeForRecipeCard = createSelector(
  [getRecipes, getIdForRecipeCard],
  (allRecipes, recipeId) => allRecipes.get(recipeId)
)

const mapStateToProps = (state, ownProps) => {
  const numPortions = getNumPortions(state)
  const recipe = getRecipeForRecipeCard(state, ownProps)
  const recipeId = getIdForRecipeCard(state, ownProps)

  return {
    recipe,
    numPortions,
    cutoffDate: getCutoffDate(state),
    browserType: state.request.get('browser'),
    isOutOfStock: getRecipeOutOfStock(state, ownProps),
    inBasket: state.basket.hasIn(['recipes', recipeId]),
  }
}

const RecipeCardContainer = connect(mapStateToProps, { showDetailRecipe })(RecipeCard)

export { RecipeCardContainer }
