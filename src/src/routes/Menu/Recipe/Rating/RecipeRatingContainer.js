import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { getRecipes } from 'selectors/root'

import { showDetailRecipe } from '../../actions/menuRecipeDetails'
import { RecipeRating } from './Rating'

const getIdForRecipeRating = (state, props) => props.recipeId

const getRecipeForRecipeRating = createSelector(
  [getRecipes, getIdForRecipeRating],
  (allRecipes, recipeId) => allRecipes.get(recipeId)
)

const mapStateToProps = (state, ownProps) => {
  const recipe = getRecipeForRecipeRating(state, ownProps)

  return {
    average: recipe.getIn(['rating', 'average']),
    count: recipe.getIn(['rating', 'count'])
  }
}

const RecipeRatingContainer = connect(mapStateToProps, { showDetailRecipe })(RecipeRating)

export { RecipeRatingContainer }
