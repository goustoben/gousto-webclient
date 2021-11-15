import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"

export const selectRecipeVariantAction = (originalRecipeId, variantId, collectionId, variantOutOfStock, view = 'grid', close = true, hasSurcharge) => ({
    type: actionTypes.MENU_RECIPE_VARIANT_SELECTED,
    payload: {
        collectionId,
        originalRecipeId,
        variantId,
        close
    },
    trackingData: {
        actionType: trackingKeys.selectRecipeVariant,
        recipe_id: originalRecipeId,
        recipe_variant_id: variantId,
        collection_id: collectionId,
        variant_out_of_stock: variantOutOfStock,
        view,
        has_surcharge: hasSurcharge,
    }
})
