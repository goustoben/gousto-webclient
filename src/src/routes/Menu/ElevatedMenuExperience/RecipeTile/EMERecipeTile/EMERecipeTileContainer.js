import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { getBrowserType } from 'selectors/browser'
import { getRecipes } from 'selectors/root'
import { isMobile } from 'utils/view'
import { getRecipeSurcharge , getRecipeOutOfStock, getRecipeTitle } from '../../../selectors/recipe'
import { showDetailRecipe } from '../../../actions/menuRecipeDetails'
import { EMERecipeTile } from './EMERecipeTile'
import { getElevatedMenuExperienceRecipeTags } from '../../../selectors/elevatedMenuExperienceRecipeTags'

const getIdForRecipeTile = (state, props) => props.recipeId

// this allows RecipeTileContainer to be rendered with just a recipeId
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
    isMobile: isMobile(getBrowserType(state)),
    brandTags: getElevatedMenuExperienceRecipeTags(state, ownProps),
    surcharge: getRecipeSurcharge(state, ownProps)
  }
}

const EMERecipeTileContainer = connect(mapStateToProps, { showDetailRecipe })(EMERecipeTile)

export { EMERecipeTileContainer }
