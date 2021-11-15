import { actionTypes as webClientActionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"
import { SE_CATEGORY_HELP } from "routes/GetHelp/actions/getHelp/configuration"

export const trackDeselectIngredient = (selectedIngredient) => ({
    type: webClientActionTypes.TRACKING,
    trackingData: {
        actionType: trackingKeys.ssrDeselectIngredient,
        ingredient_name: selectedIngredient,
        seCategory: SE_CATEGORY_HELP,
    },
})
