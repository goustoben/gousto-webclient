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
import { VariantRecipeList } from './VariantRecipeList'

const mapStateToProps = (state, ownProps) => {
  const recipe = getRecipeById(state, ownProps.recipeId)

  const { recipeVariants } = getSidesData(state, { recipeId: ownProps.originalId })
  const recipeVariantsArray = recipeVariants ? recipeVariants.variantsList.toJS() : []

  let selectedRecipe = {}

  if (recipe) {
    selectedRecipe = {
      displayName: getRecipeTitle(recipe),
      coreRecipeId: ownProps.recipeId
    }
  }

  return {
    collectionId: getCurrentCollectionId(state),
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
