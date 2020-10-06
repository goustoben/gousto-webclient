import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { getRecipes } from 'selectors/root'
import { getRecipeOutOfStock, getRecipeTitle, getRecipeIsFineDineIn } from '../../../selectors/recipe'
import { getVariantsForRecipe } from '../../../selectors/variants'
import { showDetailRecipe } from '../../../actions/menuRecipeDetails'
import { EMERecipeTile } from './EMERecipeTile'
import { getBrandAvailability, getBrandTagline } from '../../../selectors/recipeTags'

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
    brandAvailability: getBrandAvailability(state, ownProps),
    brandTagline: getBrandTagline(state, ownProps),
    isFineDineIn: getRecipeIsFineDineIn(state, ownProps),
    recipeVariants: getVariantsForRecipe(state, ownProps)
  }
}

const EMERecipeTileContainer = connect(mapStateToProps, { showDetailRecipe })(EMERecipeTile)

export { EMERecipeTileContainer }
