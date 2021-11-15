import { getAuthUserId } from "selectors/auth"
import {
  getCouldBasketBeExpired,
  getDetailsForOrderWithoutRecipes,
  getIsOrderWithoutRecipes,
  getOrderDetails,
  getSlotForBoxSummaryDeliveryDays
} from "routes/Menu/selectors/order"
import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { checkoutUrgencySetCurrentStatus } from "routes/Checkout/checkoutActions"
import { checkoutUrgencyStatuses } from "routes/Checkout/checkoutUrgencyConfig"
import logger from "utils/logger"
import { basketPreviewOrderChange } from "actions/basket/basketPreviewOrderChange"
import { pricingSuccess } from "actions/pricing/pricingSuccess"
import { createPreviewOrder } from "apis/orders/createPreviewOrder"

export const checkoutCreatePreviewOrder = () => async (dispatch, getState) => {
    const userId = getAuthUserId(getState())
    const [slot, slotId] = getSlotForBoxSummaryDeliveryDays(getState())

    dispatch(pending(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, true))
    dispatch(error(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, null))

    const state = getState()

    dispatch(checkoutUrgencySetCurrentStatus(checkoutUrgencyStatuses.loading))

    if (!slot) {
        logger.error({message: `Can't find any slot with id: ${slotId}`, actor: userId})

        dispatch(pending(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, false))
        dispatch(error(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, `Can't find any slot with id: ${slotId}`))

        return
    }

    const isOrderWithoutRecipes = getIsOrderWithoutRecipes(state)

    const orderDetails = isOrderWithoutRecipes ? getDetailsForOrderWithoutRecipes(state) : getOrderDetails(state)

    const couldBasketBeExpired = getCouldBasketBeExpired(getState())

    if (couldBasketBeExpired && !isOrderWithoutRecipes) {
        const {router: {locationBeforeTransitions: {pathName: path} = {}} = {}} = getState()

        logger.warning({
            message: 'Missing data, persistent basket might be expired',
            actor: userId,
            extra: {
                deliveryDayId: orderDetails.deliveryDayId,
                deliverySlotId: orderDetails.deliverySlotId,
                recipeChoices: orderDetails.recipeChoices,
                path,
                serverSide: __SERVER__ === true,
            }
        })

        dispatch(error(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, {
            message: 'Missing data, persistent basket might be expired',
            code: 'basket-expired'
        }))
    }

    try {
        const {data: previewOrder = {}} = await createPreviewOrder(orderDetails)
        dispatch(basketPreviewOrderChange(String(previewOrder.order.id), previewOrder.order.boxId, previewOrder.surcharges))
        dispatch(error(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, null))
        if (isOrderWithoutRecipes) {
            dispatch(pricingSuccess(previewOrder.prices))
        }

        dispatch(checkoutUrgencySetCurrentStatus(checkoutUrgencyStatuses.running))
    } catch (e) {
        const {message, code} = e
        logger.warning(message)

        const {router: {locationBeforeTransitions: {pathName: path} = {}} = {}} = getState()
        logger.error({
            message: 'createPreviewOrder failed, logging error below...',
            actor: userId,
            extra: {
                orderDetails,
                path,
                serverSide: __SERVER__ === true,
            }
        })
        logger.error(e)

        dispatch(error(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, {message, code}))
    }

    dispatch(pending(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, false))
}
