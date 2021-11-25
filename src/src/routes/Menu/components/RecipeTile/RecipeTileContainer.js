import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { getRecipes } from 'selectors/root'
import { getBrowserType } from 'selectors/browser'
import { getRecipeOutOfStock, getRecipeTitle, getRecipeIsFineDineIn } from '../../selectors/recipe'
import { getVariantsForRecipe } from '../../selectors/variants'
import { showDetailRecipe } from '../../actions/menuRecipeDetails'
import { RecipeTile } from './RecipeTile'
import { getBrandAvailability } from '../../selectors/recipeTags'

const getIdForRecipeTile = (state, props) => props.recipeId

const getRecipeForRecipeTile = createSelector(
  [getRecipes, getIdForRecipeTile],
  (allRecipes, recipeId) => allRecipes.get(recipeId)
)

const mapStateToProps = (state, ownProps) => {
  const recipe = getRecipeForRecipeTile(state, ownProps)
  const browserType = getBrowserType(state)

  return {
    browserType,
    recipe,
    isOutOfStock: getRecipeOutOfStock(state, ownProps),
    title: getRecipeTitle(state, ownProps),
    brandAvailability: getBrandAvailability(state, ownProps),
    isFineDineIn: getRecipeIsFineDineIn(state, ownProps),
    recipeVariants: getVariantsForRecipe(state, ownProps)
  }
}

const RecipeTileContainer = connect(mapStateToProps, { showDetailRecipe })(RecipeTile)

export { RecipeTileContainer }
