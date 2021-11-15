import { checkoutCreatePreviewOrder } from "routes/Menu/actions/checkout/checkoutCreatePreviewOrder"
import { actionTypes } from "actions/actionTypes"
import { getPreviewOrderErrorName } from "utils/order"
import { getPreviewOrderId } from "selectors/basket"
import { getUserStatus } from "selectors/user"
import { getIsAuthenticated } from "selectors/auth"
import logger from "utils/logger"
import routes from "config/routes"
import { redirect } from "actions/redirect/redirect"
import { orderAssignToUser } from "routes/Menu/actions/order/orderAssignToUser"

export const checkoutTransactionalOrder = (orderAction) => async (dispatch, getState) => {
    await dispatch(checkoutCreatePreviewOrder())

    const {error} = getState()

    const previewOrderError = error.get(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, false)
    const previewOrderErrorName = getPreviewOrderErrorName(error)
    const orderId = getPreviewOrderId(getState())
    const userStatus = getUserStatus(getState())
    const isAuthenticated = getIsAuthenticated(getState())

    if (previewOrderError || !orderId) {
        logger.warning(`Preview order id failed to create, persistent basket might be expired, error: ${previewOrderErrorName}`)

        dispatch(redirect(`${routes.client.menu}?from=newcheckout&error=${previewOrderErrorName}`, true))

        return
    }

    if (!isAuthenticated) {
        return
    }

    if (userStatus === 'onhold') {
        dispatch(redirect(`${routes.client.myGousto}`))
    } else {
        dispatch(orderAssignToUser(orderAction, orderId))
    }
}
