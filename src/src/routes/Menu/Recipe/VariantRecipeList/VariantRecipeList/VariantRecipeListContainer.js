import { connect } from 'react-redux'
import {
  selectRecipeVariant,
  trackVariantListDisplay,
  selectRecipeSide,
  unselectRecipeSide,
} from 'actions/menu'
import { menuRecipeDetailVisibilityChange } from '../../../actions/menuRecipeDetails'
import { basketRecipeAdd, basketRecipeRemove } from '../../../actions/basketRecipes'
import { getSidesData } from '../../../selectors/variants'
import { getRecipeById, getRecipeTitle } from '../../../../../selectors/recipe'
import { getCurrentCollectionId } from '../../../selectors/collections'
import { getRecipeSelectedSides } from '../../../selectors/recipe'
import { VariantRecipeList } from './VariantRecipeList'

const mapStateToProps = (state, ownProps) => {
  const recipe = getRecipeById(state, ownProps.recipeId)
  const selectedRecipeSide = getRecipeSelectedSides(state, ownProps)
  const {
    recipeVariants,
    firstSideRecipeId,
    hasSideAddedToBasket,
  } = getSidesData(state, ownProps)
  const recipeVariantsArray = recipeVariants ? recipeVariants.variantsList.toJS() : []
  const hasRecipeAddedToBasket = !!state.basket.getIn(['recipes', ownProps.recipeId], 0)

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
    selectedRecipeSide,
    hasRecipeAddedToBasket,
    hasSideAddedToBasket,
    firstSideRecipeId,
  }
}

const VariantRecipeListContainer = connect(
  mapStateToProps,
  {
    selectRecipeVariant,
    menuRecipeDetailVisibilityChange,
    trackVariantListDisplay,
    selectRecipeSide,
    unselectRecipeSide,
    basketRecipeAdd,
    basketRecipeRemove,
  }
)(VariantRecipeList)

export { VariantRecipeListContainer }
