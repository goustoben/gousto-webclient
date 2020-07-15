import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { getRecipes } from 'selectors/root'
import { getNumPortions } from 'selectors/basket'

import { showDetailRecipe } from '../../../actions/menuRecipeDetails'
import { CookingTimeIcon } from './CookingTimeIcon'

const getIdForCookingTimeIcon = (state, props) => props.recipeId

// this allows CookingTimeIconContainer to be rendered with just a recipeId
const getRecipeForCookingTimeIcon = createSelector(
  [getRecipes, getIdForCookingTimeIcon],
  (allRecipes, recipeId) => allRecipes.get(recipeId)
)

const mapStateToProps = (state, ownProps) => {
  const recipe = getRecipeForCookingTimeIcon(state, ownProps)
  const numPortions = getNumPortions(state)
  const cookingTime = numPortions === 2 ? recipe.get('cookingTime') : recipe.get('cookingTimeFamily')

  return {
    cookingTime
  }
}

const CookingTimeIconContainer = connect(mapStateToProps, { showDetailRecipe })(CookingTimeIcon)

export { CookingTimeIconContainer }
