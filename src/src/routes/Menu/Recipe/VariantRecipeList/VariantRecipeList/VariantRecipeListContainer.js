import { connect } from 'react-redux'
import {
  selectRecipeVariant,
  trackVariantListDisplay,
  selectRecipeSide,
  unselectRecipeSide,
} from 'actions/menu'
import { trackDeselectSide, trackSelectSide } from '../../../actions/menuRecipeSidesTracking'
import { menuRecipeDetailVisibilityChange } from '../../../actions/menuRecipeDetails'
import { basketRecipeAdd, basketRecipeRemove } from '../../../actions/basketRecipes'
import { getSidesData } from '../../../selectors/variants'
import { getRecipeById, getRecipeTitle } from '../../../../../selectors/recipe'
import { getCurrentCollectionId } from '../../../selectors/collections'
import { getCategoryIdForVariants } from '../../../selectors/menu'
import { VariantRecipeList } from './VariantRecipeList'

const mapStateToProps = (state, ownProps) => {
  const recipe = getRecipeById(state, ownProps.recipeId)
  const recipeIdProp = ownProps.recipeId
  const categoryIdForVariants = getCategoryIdForVariants(state, ownProps)
  const { recipeVariants } = getSidesData(state, { recipeId: recipeIdProp, categoryId: categoryIdForVariants })
  const recipeVariantsArray = recipeVariants ? recipeVariants.variantsList.toJS() : []

  let selectedRecipe = {}

  if (recipe) {
    selectedRecipe = {
      displayName: getRecipeTitle(recipe),
      coreRecipeId: ownProps.recipeId
    }
  }

  return {
    collectionId: getCurrentCollectionId(state, ownProps),
    recipeVariants,
    recipeVariantsArray,
    selectedRecipe,
    basketRecipes: state.basket.get('recipes')
  }
}

const VariantRecipeListContainer = connect(
  mapStateToProps,
  {
    selectRecipeVariant,
    menuRecipeDetailVisibilityChange,
    trackVariantListDisplay,
    trackDeselectSide,
    trackSelectSide,
    selectRecipeSide,
    unselectRecipeSide,
    basketRecipeAdd,
    basketRecipeRemove,
  }
)(VariantRecipeList)

export { VariantRecipeListContainer }
