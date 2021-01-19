import { getSlot, getDeliveryTariffId } from 'utils/deliveries'
import { getPreviewOrderErrorName } from 'utils/order'
import logger from 'utils/logger'
import routes from 'config/routes'

import { createPreviewOrder } from 'apis/orders'

import { getChosenAddressId } from 'selectors/basket'
import { getNDDFeatureValue, } from 'selectors/features'

import { actionTypes } from 'actions/actionTypes'
import {
  basketPreviewOrderChange,
} from 'actions/basket'
import { redirect } from 'actions/redirect'
import statusActions from 'actions/status'

import { orderAssignToUser } from './order'

const { pending, error } = statusActions

export const checkoutCreatePreviewOrder = () => async (dispatch, getState) => {
  const { auth, basket, boxSummaryDeliveryDays, user } = getState()
  const date = basket.get('date')
  const slotId = basket.get('slotId')
  const userId = auth.get('id')
  const slot = getSlot(boxSummaryDeliveryDays, date, slotId)
  const chosenAddressId = getChosenAddressId({ basket })

  dispatch(pending(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, true))
  dispatch(error(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, null))

  try {
    if (!slot) {
      throw new Error(`Can't find any slot with id: ${slotId}`)
    }
    const deliverySlotId = slot.get('coreSlotId', '')
    const deliveryDayId = boxSummaryDeliveryDays.getIn([date, 'coreDayId'])
    const recipes = basket.get('recipes')
    const quantity = basket.get('numPortions')
    const daySlotLeadTimeId = slot.get('daySlotLeadTimeId', '')
    const deliveryTariffId = getDeliveryTariffId(user, getNDDFeatureValue(getState()))

    const recipeChoices = (
      recipes.reduce((recipesArray, qty, id) => {
        Array.from(Array(qty).keys()).forEach(() => {
          recipesArray.push({
            id,
            quantity,
            type: 'Recipe',
          })
        })

        return recipesArray
      }, [])
    )

    if (!(deliveryDayId && deliverySlotId && recipeChoices.length > 0)) {
      const { router: { locationBeforeTransitions: { pathName: path } = {} } = {} } = getState()

      logger.warning({
        message: 'Missing data, persistent basket might be expired',
        actor: userId,
        extra: {
          deliveryDayId,
          deliverySlotId,
          recipeChoices,
          path,
          serverSide: __SERVER__ === true,
        }
      })
      dispatch(error(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, { message: 'Missing data, persistent basket might be expired', code: 'basket-expired' }))
    }

    const orderDetails = {
      delivery_day_id: deliveryDayId,
      delivery_slot_id: deliverySlotId,
      recipe_choices: recipeChoices,
      day_slot_lead_time_id: daySlotLeadTimeId,
      delivery_tariff_id: deliveryTariffId,
      address_id: chosenAddressId
    }

    if (basket.get('orderId')) {
      orderDetails.order_id = basket.get('orderId')
    }

    if (basket.get('promoCode')) {
      orderDetails.promo_code = basket.get('promoCode')
    }

    try {
      const { data: previewOrder = {} } = await createPreviewOrder(orderDetails)
      dispatch(basketPreviewOrderChange(String(previewOrder.order.id), previewOrder.order.boxId, previewOrder.surcharges))
      dispatch(error(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, null))
    } catch (e) {
      const { message, code } = e
      logger.warning(message)

      const { router: { locationBeforeTransitions: { pathName: path } = {} } = {} } = getState()
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

      dispatch(error(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, { message, code }))
    }
  } catch (e) {
    logger.error({ message: 'checkoutCreatePreviewOrder failed, logging error below...', actor: userId })
    logger.error({ error: e })
    dispatch(error(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, e.message))
  } finally {
    dispatch(pending(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, false))
  }
}

export const checkoutTransactionalOrder = (orderAction) => (
  async (dispatch, getState) => {
    await dispatch(checkoutCreatePreviewOrder())

    const { auth, basket, error, user } = getState()

    const previewOrderError = error.get(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, false)
    const previewOrderErrorName = getPreviewOrderErrorName(error)
    const orderId = basket.get('previewOrderId')
    const userStatus = user.get('status')
    const isAuthenticated = auth.get('isAuthenticated')

    if (previewOrderError || !orderId) {
      logger.warning(`Preview order id failed to create, persistent basket might be expired, error: ${previewOrderErrorName}`)

      await dispatch(redirect(`${routes.client.menu}?from=newcheckout&error=${previewOrderErrorName}`, true))
    } else if (orderId && isAuthenticated) {
      if (userStatus === 'onhold') {
        await dispatch(redirect(`${routes.client.myGousto}`))
      } else {
        await dispatch(orderAssignToUser(orderAction, orderId))
      }
    }
  }
)
