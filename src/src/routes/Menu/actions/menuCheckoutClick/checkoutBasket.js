import { getIsAuthenticated } from "selectors/auth"
import { isBasketTransactionalOrder } from "selectors/basket"
import { validateMenuLimitsForBasket } from "routes/Menu/selectors/menu"
import { boxSummaryVisibilityChange } from "actions/boxSummary/boxSummaryVisibilityChange"
import { basketCheckedOut } from "actions/basket/basketCheckedOut"
import { basketCheckoutClicked } from "actions/basket/basketCheckoutClicked"
import { error } from "actions/status/error"
import { actionTypes } from "actions/actionTypes"
import { basketProceedToCheckout } from "actions/basket/basketProceedToCheckout"
import { checkoutTransactionalOrder } from "routes/Menu/actions/checkoutTransactionalOrder/checkoutTransactionalOrder"
import { checkoutTransactionalOrder as checkoutTransactionalOrderV1 } from "routes/Menu/actions/checkout/checkoutTransactionalOrder"
import { orderUpdate } from "actions/order/orderUpdate"
import { isOrderApiCreateEnabled, isOrderApiUpdateEnabled } from "routes/Menu/actions/menuCheckoutClick/common"
import { sendUpdateOrder } from "routes/Menu/actions/order/sendUpdateOrder"

export const checkoutBasket = (section, view) => async (dispatch, getState) => {
    const state = getState()
    const isAuthenticated = getIsAuthenticated(state)
    const isTransactionalOrder = isBasketTransactionalOrder(state)
    const rules = validateMenuLimitsForBasket(state)
    const transactionalOrderForNonLoggedInUser = isTransactionalOrder && !isAuthenticated

    dispatch(boxSummaryVisibilityChange(false))
    dispatch(basketCheckedOut(view))
    dispatch(basketCheckoutClicked(section))

    if (rules.length !== 0) {
        dispatch(error(actionTypes.BASKET_NOT_VALID, {
            errorTitle: 'Basket Not Valid',
            recipeId: null,
            rules
        }))

        return
    }

    if (transactionalOrderForNonLoggedInUser) {
        dispatch(basketProceedToCheckout())

        return
    }

    if (isTransactionalOrder) {
        const isCreateV2Enabled = await isOrderApiCreateEnabled(dispatch, getState)

        if (isCreateV2Enabled) {
            dispatch(checkoutTransactionalOrder())
        } else {
            dispatch(checkoutTransactionalOrderV1('create'))
        }

        return
    }

    const isUpdateV2Enabled = await isOrderApiUpdateEnabled(dispatch, getState)

    if (isUpdateV2Enabled) {
        dispatch(sendUpdateOrder())
    } else {
        dispatch(orderUpdate())
    }
}
