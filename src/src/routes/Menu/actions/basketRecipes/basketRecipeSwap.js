import { getBasketNotValidError } from "selectors/status"
import { clearBasketNotValidError } from "routes/Menu/actions/menuCheckoutClick/clearBasketNotValidError"

export const basketRecipeSwap = () =>
    (dispatch, getState) => {
        const basketNotValidError = getBasketNotValidError(getState())

        if (basketNotValidError) {
            const recipeFromBasket = basketNotValidError.rules[0].items[0]
            const recipeToReplace = basketNotValidError.recipeId

            dispatch(exports.basketRecipeRemove(recipeFromBasket, 'swapModal'))
            dispatch(exports.validBasketRecipeAdd(recipeToReplace, 'swapModal'))
            dispatch(clearBasketNotValidError())
        }
    }
