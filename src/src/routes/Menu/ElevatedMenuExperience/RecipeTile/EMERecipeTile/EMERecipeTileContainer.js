import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { getRecipes } from 'selectors/root'
import { getRecipeOutOfStock, getRecipeTitle } from '../../../selectors/recipe'
import { showDetailRecipe } from '../../../actions/menuRecipeDetails'
import { EMERecipeTile } from './EMERecipeTile'
import { getElevatedMenuExperienceRecipeTags } from '../../../selectors/elevatedMenuExperienceRecipeTags'

const getIdForRecipeTile = (state, props) => props.recipeId

const getRecipeForRecipeTile = createSelector(
  [getRecipes, getIdForRecipeTile],
  (allRecipes, recipeId) => allRecipes.get(recipeId)
)

const mapStateToProps = (state, ownProps) => {
  const recipe = getRecipeForRecipeTile(state, ownProps)

  return {
    recipe,
    isOutOfStock: getRecipeOutOfStock(state, ownProps),
    title: getRecipeTitle(state, ownProps),
    brandTags: getElevatedMenuExperienceRecipeTags(state, ownProps),
  }
}

const EMERecipeTileContainer = connect(mapStateToProps, { showDetailRecipe })(EMERecipeTile)

export { EMERecipeTileContainer }
