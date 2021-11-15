import { getBasketPostcode } from "selectors/basket"
import { menuBrowseCTAVisibilityChange } from "actions/menu/menuBrowseCTAVisibilityChange"

export const basketRecipeAddAttempt = (recipeId) => (
    (dispatch, getState) => {
        const basketPostcode = getBasketPostcode(getState())

        if (basketPostcode) {
            dispatch(exports.basketRecipeAdd(recipeId))
        } else {
            dispatch(menuBrowseCTAVisibilityChange(true))
        }
    }
)
