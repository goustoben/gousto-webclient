import { push } from 'react-router-redux'

import { invokeHotjarEvent } from 'utils/hotjarUtils'

import { actionTypes } from '../../../actions/actionTypes'
import * as trackingKeys from '../../../actions/trackingKeys'
import { locationQuery, locationBeforeTransitions } from '../../../selectors/routing'
import { getMenuRecipeIdForDetails } from '../selectors/menuRecipeDetails'
import { doesRecipeHaveSurcharges } from '../selectors/menuService'
import { replaceSideRecipeIdWithBaseRecipeId } from '../selectors/recipeList'

export const menuRecipeDetailVisibilityChange =
  (recipeId, categoryId, recipeReference) => (dispatch, getState) => {
    const { recipes } = getState()
    if (recipeId && !recipes.get(recipeId, null)) {
      return
    }

    // If the recipe is a side, then get the base recipe id associated with it and display that instead.
    const baseRecipeId = replaceSideRecipeIdWithBaseRecipeId(getState(), { recipeId })
    const showRecipeDetails = Boolean(baseRecipeId)

    if (showRecipeDetails) {
      invokeHotjarEvent(trackingKeys.menuRecipeDetailsShown)
    }

    dispatch({
      type: actionTypes.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE,
      recipeId: baseRecipeId,
      categoryId,
      recipeReference,
      trackingData: {
        actionType: trackingKeys.changeMenuRecipeDetailVisibility,
        recipeId: baseRecipeId || getMenuRecipeIdForDetails(getState()),
        show: showRecipeDetails,
      },
    })
  }

export const showDetailRecipe =
  (recipeId, categoryIds, recipeReference) => (dispatch, getState) => {
    const { boxSummaryShow } = getState()

    if (!boxSummaryShow.get('show')) {
      menuRecipeDetailVisibilityChange(recipeId, categoryIds, recipeReference)(dispatch, getState)
    }
  }

export const checkQueryParams = () => (dispatch, getState) => {
  const prevLoc = locationBeforeTransitions(getState())
  const queryParams = locationQuery(getState())
  const recipeId = queryParams.recipeDetailId

  if (recipeId) {
    delete queryParams.recipeDetailId
    const newLoc = { ...prevLoc, query: queryParams }
    dispatch(push(newLoc))
    dispatch(showDetailRecipe(recipeId))
  }
}
export const initSelectedRecipeVariantAction = (selectedRecipeVariants) => ({
  type: actionTypes.MENU_RECIPE_VARIANT_INIT,
  payload: { selectedRecipeVariants },
})

export const selectRecipeVariantAction = (
  originalRecipeId,
  variantId,
  collectionId,
  variantOutOfStock,
  view = 'grid',
  close = true,
  hasSurcharge,
  recipeReference,
) => ({
  type: actionTypes.MENU_RECIPE_VARIANT_SELECTED,
  payload: {
    collectionId,
    originalRecipeId,
    variantId,
    close,
    recipeReference,
  },
  trackingData: {
    actionType: trackingKeys.selectRecipeVariant,
    recipe_id: originalRecipeId,
    recipe_variant_id: variantId,
    collection_id: collectionId,
    variant_out_of_stock: variantOutOfStock,
    view,
    has_surcharge: hasSurcharge,
  },
})

export const selectRecipeVariant =
  ({
    originalRecipeId,
    variantId,
    collectionId,
    variantOutOfStock,
    view = 'grid',
    close = true,
    recipeReference,
  }) =>
  async (dispatch, getState) => {
    const hasSurcharges = doesRecipeHaveSurcharges(getState(), variantId)

    dispatch(
      selectRecipeVariantAction(
        originalRecipeId,
        variantId,
        collectionId,
        variantOutOfStock,
        view,
        close,
        hasSurcharges,
        recipeReference,
      ),
    )
  }
