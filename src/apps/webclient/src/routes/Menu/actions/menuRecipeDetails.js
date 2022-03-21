import { push } from 'react-router-redux'
import { actionTypes } from '../../../actions/actionTypes'
import * as trackingKeys from '../../../actions/trackingKeys'
import { getMenuRecipeIdForDetails } from '../selectors/menuRecipeDetails'
import { replaceSideRecipeIdWithBaseRecipeId } from '../selectors/recipeList'
import { locationQuery, locationBeforeTransitions } from '../../../selectors/routing'
import { doesRecipeHaveSurcharges } from '../selectors/menuService'

export const menuRecipeDetailVisibilityChange = (recipeId, categoryId) => (dispatch, getState) => {
  const { recipes } = getState()
  if (recipeId && !recipes.get(recipeId, null)) {
    return
  }

  // If the recipe is a side, then get the base recipe id associated with it and display that instead.
  const baseRecipeId = replaceSideRecipeIdWithBaseRecipeId(getState(), { recipeId })

  dispatch({
    type: actionTypes.MENU_RECIPE_DETAIL_VISIBILITY_CHANGE,
    recipeId: baseRecipeId,
    categoryId,
    trackingData: {
      actionType: trackingKeys.changeMenuRecipeDetailVisibility,
      recipeId: baseRecipeId || getMenuRecipeIdForDetails(getState()),
      show: Boolean(baseRecipeId),
    },
  })
}

export const showDetailRecipe = (recipeId, categoryIds) => (dispatch, getState) => {
  const { boxSummaryShow } = getState()

  if (!boxSummaryShow.get('show')) {
    menuRecipeDetailVisibilityChange(recipeId, categoryIds)(dispatch, getState)
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
  hasSurcharge
) => ({
  type: actionTypes.MENU_RECIPE_VARIANT_SELECTED,
  payload: {
    collectionId,
    originalRecipeId,
    variantId,
    close,
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
  (originalRecipeId, variantId, collectionId, variantOutOfStock, view = 'grid', close = true) =>
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
          hasSurcharges
        )
      )
    }
