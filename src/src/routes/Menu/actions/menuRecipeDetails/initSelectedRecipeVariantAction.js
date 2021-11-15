import { actionTypes } from "actions/actionTypes"

export const initSelectedRecipeVariantAction = (selectedRecipeVariants) => ({
    type: actionTypes.MENU_RECIPE_VARIANT_INIT,
    payload: {selectedRecipeVariants},
})
