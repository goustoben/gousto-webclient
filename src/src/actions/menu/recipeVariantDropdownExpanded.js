import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"

export const recipeVariantDropdownExpanded = (recipeData) => ({
  type: actionTypes.MENU_RECIPE_VARIANTS_DROPDOWN_EXPANDED,
  payload: {
    recipeData,
  },
  trackingData: {
    actionType: trackingKeys.discloseRecipeVariants,
    show: Boolean(recipeData ? recipeData.recipeId : null)
  }
})
