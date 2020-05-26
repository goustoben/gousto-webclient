import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { isNew } from 'utils/recipe'
import { getRecipes } from 'selectors/root'

import { showDetailRecipe } from '../../actions/menuRecipeDetails'
import { RecipeRating } from './Rating'

const getIdForRecipeCard = (state, props) => props.recipeId

const getRecipeForRecipeRating = createSelector(
  [getRecipes, getIdForRecipeCard],
  (allRecipes, recipeId) => allRecipes.get(recipeId)
)

const mapStateToProps = (state, ownProps) => {
  const recipe = getRecipeForRecipeRating(state, ownProps)
  const isChefPrepared = recipe.get('chefPrepared') === true

  return {
    average: recipe.getIn(['rating', 'average']),
    count: recipe.getIn(['rating', 'count']),
    isChefPrepared,
    isNew: isNew(recipe)
  }
}

const RecipeRatingContainer = connect(mapStateToProps, { showDetailRecipe })(RecipeRating)

export { RecipeRatingContainer }
