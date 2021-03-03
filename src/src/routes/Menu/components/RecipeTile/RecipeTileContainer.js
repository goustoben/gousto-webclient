import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { getRecipes } from 'selectors/root'
import { getBrowserType } from 'selectors/browser'
import { getCurrentExpandedRecipeVariantsDropdown } from 'selectors/menu'
import { getRecipeOutOfStock, getRecipeTitle, getRecipeIsFineDineIn } from '../../selectors/recipe'
import { getVariantsForRecipe } from '../../selectors/variants'
import { showDetailRecipe } from '../../actions/menuRecipeDetails'
import { RecipeTile } from './RecipeTile'
import { getBrandAvailability, getBrandTagline } from '../../selectors/recipeTags'

const getIdForRecipeTile = (state, props) => props.recipeId

const getRecipeForRecipeTile = createSelector(
  [getRecipes, getIdForRecipeTile],
  (allRecipes, recipeId) => allRecipes.get(recipeId)
)

const mapStateToProps = (state, ownProps) => {
  const recipe = getRecipeForRecipeTile(state, ownProps)
  const currentExpandedRecipeVariantsDropdown = getCurrentExpandedRecipeVariantsDropdown(state)
  const browserType = getBrowserType(state)
  const showVariantDropdown = (currentExpandedRecipeVariantsDropdown && browserType !== 'mobile')
    ? currentExpandedRecipeVariantsDropdown.recipeId === ownProps.recipeId
    : false

  return {
    browserType,
    recipe,
    showVariantDropdown,
    isOutOfStock: getRecipeOutOfStock(state, ownProps),
    title: getRecipeTitle(state, ownProps),
    brandAvailability: getBrandAvailability(state, ownProps),
    brandTagline: getBrandTagline(state, ownProps),
    isFineDineIn: getRecipeIsFineDineIn(state, ownProps),
    recipeVariants: getVariantsForRecipe(state, ownProps)
  }
}

const RecipeTileContainer = connect(mapStateToProps, { showDetailRecipe })(RecipeTile)

export { RecipeTileContainer }
