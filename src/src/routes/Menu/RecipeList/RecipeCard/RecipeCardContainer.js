import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { getCutoffDate } from 'routes/Menu/selectors/cutoff'
import { getNumPortions } from 'selectors/basket'
import { getRecipes } from 'selectors/root'

import { showDetailRecipe } from '../../actions/menuRecipeDetails'
import { RecipeCard } from './RecipeCard'

// this allows RecipeCardContainer to be rendered with just a recipeId
const getRecipeForRecipeCard = createSelector(
  [getRecipes, (state, props) => props.recipeId],
  (allRecipes, recipeId) => allRecipes.get(recipeId)
)

const mapStateToProps = (state, ownProps) => ({
  recipe: getRecipeForRecipeCard(state, ownProps),
  numPortions: getNumPortions(state),
  cutoffDate: getCutoffDate(state),
  browserType: state.request.get('browser')
})

const RecipeCardContainer = connect(mapStateToProps, { showDetailRecipe })(RecipeCard)

export { RecipeCardContainer }
