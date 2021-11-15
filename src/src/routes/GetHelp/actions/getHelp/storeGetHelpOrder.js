import { actionTypes } from "routes/GetHelp/actions/actionTypes"

export const storeGetHelpOrder = ({id, recipeIds, recipeDetailedItems, deliverySlot, deliveryDate}) => ({
    type: actionTypes.GET_HELP_STORE_ORDER,
    payload: {
        id,
        recipeIds,
        recipeDetailedItems,
        deliverySlot,
        deliveryDate,
    },
})
