import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { getBrowserType } from 'selectors/browser'
import { getRecipePosition } from 'selectors/collections'
import { getMenuRecipeIdForDetails } from '../selectors/menuRecipeDetails'
import { getRecipeOutOfStock, getSelectedRecipeSidesFromMenu } from '../selectors/recipe'
import { DetailOverlay } from './DetailOverlay'
import { getBasketRecipes } from '../../../selectors/basket'
import { getCurrentMenuVariants } from '../selectors/variants'

// this is very similar to getBasketRecipesWithSidesBaseId
const getSidesInBasketForBaseRecipe = createSelector(
  [getBasketRecipes, getCurrentMenuVariants],
  (basketRecipes, currentMenuVariants) => {
    if (!currentMenuVariants) {
      return {}
    }

    const flattenedVariants = Object.entries(currentMenuVariants.toJS())

    let output = {}

    basketRecipes.forEach((quantity, recipeId) => {
      const baseVariant = flattenedVariants.find(
        ([ baseId, variant ]) => variant.sides.some(s => s.coreRecipeId === recipeId)
      )

      if (baseVariant) {
        const [ baseVariantId ] = baseVariant

        output = {
          ...output,
          [baseVariantId]: recipeId
        }
      }
    })

    return output
  }
)

const getOverlayRecipeId = (state, ownProps) => ownProps.overlayRecipeId
const getSelectedRecipeSide = createSelector(
  [ getSelectedRecipeSidesFromMenu, getSidesInBasketForBaseRecipe, getOverlayRecipeId ],
  (sidesFromMenu, basketRecipesForBase, overlayRecipeId) => {
    const selectedSide = sidesFromMenu[overlayRecipeId]

    if (selectedSide) {
      return selectedSide
    }

    return basketRecipesForBase[overlayRecipeId] || null
  }
)

const mapStateToProps = (state, ownProps) => {
  const recipeId = getMenuRecipeIdForDetails(state)

  const selectedRecipeSide = getSelectedRecipeSide(state, { overlayRecipeId: recipeId })

  return {
    recipesStore: state.recipes,
    numPortions: state.basket.get('numPortions'),
    showOverlay: (Boolean(getMenuRecipeIdForDetails(state)) && ownProps.showOverlay),
    position: getRecipePosition(state, getMenuRecipeIdForDetails(state)),
    browserType: getBrowserType(state),
    menuRecipeDetailShow: recipeId,
    chosenSideRecipeId: selectedRecipeSide,
    isOutOfStock: getRecipeOutOfStock(state, { recipeId: getMenuRecipeIdForDetails(state) }),
  }
}

const DetailOverlayContainer = connect(mapStateToProps, {})(DetailOverlay)

export { DetailOverlayContainer }
