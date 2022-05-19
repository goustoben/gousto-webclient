import Immutable from 'immutable'
import moment from 'moment'

import logger from 'utils/logger'
import { trackAffiliatePurchase } from 'actions/tracking'
import { getAvailableDeliveryDays, transformDaySlotLeadTimesToMockSlots, getSlot, getDeliveryTariffId, getNDDFeatureFlagVal } from 'utils/deliveries'
import { getNDDFeatureValue } from 'selectors/features'
import { getUserId } from 'selectors/user'
import { orderTrackingActions } from 'config/order'
import { osrOrdersSkipped } from 'actions/trackingKeys'
import { getOrderForUpdateOrderV1 } from 'routes/Menu/selectors/order'
import * as orderV2 from 'routes/Menu/apis/orderV2'
import userActions from './user'
import tempActions from './temp'
import statusActions from './status'
import { orderConfirmationRedirect } from './orderConfirmation'
import { actionTypes } from './actionTypes'
import { sendClientMetric } from '../routes/Menu/apis/clientMetrics'
import { anyUnset } from '../utils/object'
import { updateOrderAddress } from '../apis/orders'
import { fetchDeliveryDays } from '../apis/deliveries'
import { unSkipDates, skipDates } from '../routes/Account/apis/subscription'
import { getAuthUserId } from '../selectors/auth'
import { getBasketOrderId } from '../selectors/basket'
import { openSidesModal } from '../routes/Menu/actions/sides'
import { deleteOrder } from '../routes/Account/MyDeliveries/apis/orderV2'

const getTrackingInformationForV1 = (order) => ({
  id: order.id,
  promoCode: order.prices.promo_code,
  total: order.prices.total
})

const getTrackingInformationForV2 = (order) => ({
  id: order.id,
  promoCode: order.attributes.prices.isPromoCodeValid,
  total: order.attributes.prices.total,
})

export const trackOrder = (orderAction, order) => (
  (dispatch, getState) => {
    if (Object.keys(orderTrackingActions).includes(orderAction)) {
      const { actionType, trackAffiliate } = orderTrackingActions[orderAction]

      if (trackAffiliate) {
        const { basket } = getState()
        const fn = order.attributes ? getTrackingInformationForV2 : getTrackingInformationForV1
        const { id, promoCode, total = '' } = fn(order)

        const affiliateTracking = {
          orderId: id,
          total,
          commissionGroup: 'EXISTING',
          promoCode: promoCode || basket.get('promoCode') || '',
        }

        dispatch(trackAffiliatePurchase(affiliateTracking))
      }

      if (actionType) {
        dispatch({
          type: actionType,
          order,
        })
      }
    }
  }
)

export const checkAllScheduledCancelled = (orders) => (
  !orders.some(order => (order.get('orderState') === 'scheduled'))
)

export const getPendingOrdersDates = (orders) => (
  orders.filter(order => (['confirmed', 'dispatched'].indexOf(order.get('orderState')) > -1))
    .map(order => order.get('deliveryDay'))
)

export const cancelledAllBoxesModalToggleVisibility = (visibility) => ({
  type: actionTypes.CANCELLED_ALL_BOXES_MODAL_VISIBILITY_CHANGE,
  visibility,
})

export const orderUpdate = (isSidesEnabled = false) => async (dispatch, getState) => {
  dispatch(statusActions.error(actionTypes.ORDER_SAVE, null))
  dispatch(statusActions.pending(actionTypes.ORDER_SAVE, true))

  const state = getState()
  const orderId = getBasketOrderId(state)
  const order = getOrderForUpdateOrderV1(state)
  const orderAction = order.order_action

  try {
    const { data: savedOrder } = await orderV2.updateOrder(dispatch, getState, orderId, order)

    if (savedOrder && savedOrder.id) {
      dispatch(trackOrder(
        orderAction,
        savedOrder,
      ))

      sendClientMetric('menu-edit-complete', 1, 'Count')

      if (isSidesEnabled) {
        dispatch(openSidesModal())
      } else {
        dispatch(orderConfirmationRedirect(savedOrder.id, orderAction))
      }
    }
  } catch (err) {
    logger.error({ message: 'saveOrder api call failed, logging error below...' })
    logger.error(err)
    dispatch(statusActions.error(actionTypes.ORDER_SAVE, err.message))
    dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, false))
  }
  dispatch(statusActions.pending(actionTypes.ORDER_SAVE, false))
}

export const orderUpdateDayAndSlot = (orderId, coreDayId, coreSlotId, slotId, slotDate, availableDeliveryDays) => (
  async (dispatch, getState) => {
    dispatch(statusActions.error(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT, null))
    dispatch(statusActions.pending(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT, true))

    const slot = getSlot(availableDeliveryDays, slotDate, slotId)

    const originalSlotId = getState().user.getIn(['newOrders', orderId, 'deliverySlotId'])
    const addressId = getState().user.getIn(['newOrders', orderId, 'shippingAddressId'])
    const trackingData = {
      order_id: orderId,
      original_deliveryslot_id: originalSlotId,
      new_deliveryslot_id: slotId,
    }

    try {
      const order = {
        delivery_day_id: coreDayId,
        delivery_slot_id: coreSlotId,
        day_slot_lead_time_id: slot.get('daySlotLeadTimeId', ''),
        shipping_address_id: addressId
      }
      dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'OrderDeliverySlot SaveAttempt',
          ...trackingData
        }
      })
      const { data: updatedOrder } = await orderV2.updateOrder(dispatch, getState, orderId, order)
      dispatch({
        type: actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT,
        orderId,
        coreDayId,
        slotId: coreSlotId,
        deliveryDay: updatedOrder.deliveryDate,
        humanDeliveryDay: updatedOrder.humanDeliveryDate,
        deliverySlotStart: slot.get('deliveryStartTime'),
        deliverySlotEnd: slot.get('deliveryEndTime'),
        shouldCutoffAt: updatedOrder.shouldCutoffAt,
        trackingData: {
          actionType: 'OrderDeliverySlot Saved',
          ...trackingData
        }
      })
      dispatch(userActions.userToggleEditDateSection(orderId, false))
    } catch (err) {
      dispatch(statusActions.error(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT, err.message))
      dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'OrderDeliverySlot SaveAttemptFailed',
          error: err.message,
          ...trackingData
        }
      })
    } finally {
      dispatch(statusActions.pending(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT, false))
    }
  })

export const orderCheckPossibleDuplicate = (orderId) => (
  async (dispatch, getState) => {
    try {
      await dispatch(userActions.userLoadOrders(true, 'any', 5))
    } catch (e) {
      // do nothing
    }
    const orders = getState().user.get('orders', Immutable.List([]))
    const order = orders.filter(o => o.get('id') === orderId).first()
    if (order) {
      const sixDaysBeforeOrder = moment(order.get('deliveryDate')).subtract(6, 'days')
      const sixDaysFromOrder = moment(order.get('deliveryDate')).add(6, 'days')

      const closeOrderIds = orders
        .filter(o => (
          moment(o.get('deliveryDate')).isBetween(sixDaysBeforeOrder, sixDaysFromOrder)
        ))
        .map(o => o.get('id'))

      if (closeOrderIds.size > 0) {
        dispatch(tempActions.temp('closeOrderIds', closeOrderIds))
      }
    }
  })

export const projectedOrderRestore = (orderId, userId, deliveryDayId, deliveryDay) => (
  async (dispatch, getState) => {
    dispatch(statusActions.error(actionTypes.PROJECTED_ORDER_RESTORE, null))
    dispatch(statusActions.pending(actionTypes.PROJECTED_ORDER_RESTORE, true))
    dispatch(tempActions.temp('osrOrderId', orderId))
    const state = getState()
    const accessToken = state.auth.get('accessToken')

    try {
      const deliveryDayDate = deliveryDay.split(' ')[0]
      await unSkipDates(accessToken, userId, [deliveryDayDate])

      dispatch({
        type: actionTypes.PROJECTED_ORDER_RESTORE,
        orderId,
      })
    } catch (err) {
      dispatch(statusActions.error(actionTypes.PROJECTED_ORDER_RESTORE, { error: err.message, orderId }))
    } finally {
      dispatch(statusActions.pending(actionTypes.PROJECTED_ORDER_RESTORE, false))
    }
  }
)

export const orderAddressChange = (orderId, addressId) => (
  async (dispatch, getState) => {
    const originalAddressId = getState().user.getIn(['newOrders', orderId, 'shippingAddressId'])
    const trackingData = {
      order_id: orderId,
      original_deliveryaddress_id: originalAddressId,
      new_deliveryaddress_id: addressId,
    }
    dispatch(statusActions.error(actionTypes.ORDER_ADDRESS_CHANGE, {
      orderId: '',
      errorMessage: ''
    }))
    dispatch(statusActions.pending(actionTypes.ORDER_ADDRESS_CHANGE, orderId))
    const accessToken = getState().auth.get('accessToken')
    const data = {
      orderId,
      addressId,
    }
    try {
      dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'OrderDeliveryAddress SaveAttempt',
          ...trackingData
        }
      })
      await updateOrderAddress(accessToken, orderId, addressId)
      dispatch({
        type: actionTypes.ORDER_ADDRESS_CHANGE,
        data,
        trackingData: {
          actionType: 'OrderDeliveryAddress Saved',
          ...trackingData
        }
      })
    } catch (err) {
      dispatch(statusActions.error(actionTypes.ORDER_ADDRESS_CHANGE, {
        orderId,
        errorMessage: err.message
      }))
      dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'OrderDeliveryAddress SaveAttemptFailed',
          error: err.message,
          ...trackingData
        }
      })
    } finally {
      dispatch(statusActions.pending(actionTypes.ORDER_ADDRESS_CHANGE, ''))
    }
  }
)

export const orderGetDeliveryDays = (cutoffDatetimeFrom, cutoffDatetimeUntil, addressId, orderId) => (
  async (dispatch, getState) => {
    const state = getState()
    const { user } = state
    dispatch(statusActions.error(actionTypes.ORDER_DELIVERY_DAYS_RECEIVE, null))
    dispatch(statusActions.pending(actionTypes.ORDER_DELIVERY_DAYS_RECEIVE, true))

    const postcode = user.getIn(['addresses', addressId, 'postcode'])
    const isNDDExperiment = !!getNDDFeatureFlagVal(state)
    const deliveryTariffId = getDeliveryTariffId(user, getNDDFeatureValue(state))

    try {
      let { data: days } = await fetchDeliveryDays(null, cutoffDatetimeFrom, cutoffDatetimeUntil, isNDDExperiment, deliveryTariffId, postcode)

      if (isNDDExperiment) {
        days = transformDaySlotLeadTimesToMockSlots(days)
      }

      const availableDays = getAvailableDeliveryDays(days)
      dispatch({
        type: actionTypes.ORDER_DELIVERY_DAYS_RECEIVE,
        availableDays,
        orderId,
      })
    } catch (err) {
      if (err.message !== 'do-not-deliver') {
        logger.error(err)
      }
      dispatch(statusActions.error(actionTypes.ORDER_DELIVERY_DAYS_RECEIVE, err.message))
    } finally {
      dispatch(statusActions.pending(actionTypes.ORDER_DELIVERY_DAYS_RECEIVE, false))
    }
  }
)

export const cancelOrderModalToggleVisibility = (visibility, orderId) => (
  (dispatch) => {
    dispatch({
      type: actionTypes.ORDER_CANCELLED_MODAL_VISIBILITY_CHANGE,
      data: {
        visibility,
        orderId,
      },
    })
    if (visibility === false) {
      dispatch(statusActions.error(actionTypes.ORDER_CANCEL, null))
    }
  }
)

export const orderCancel = (orderId, deliveryDayId, variation) => (
  async (dispatch, getState) => {
    dispatch(statusActions.error(actionTypes.ORDER_CANCEL, null))
    dispatch(statusActions.pending(actionTypes.ORDER_CANCEL, true))
    const state = getState()
    const accessToken = state.auth.get('accessToken')
    const valueProposition = state.onScreenRecovery.get('valueProposition')
    const offer = state.onScreenRecovery.get('offer')
    const userId = getAuthUserId(state)

    try {
      await deleteOrder(accessToken, orderId, userId)

      dispatch({
        type: actionTypes.ORDER_CANCEL,
        orderId,
        trackingData: {
          actionType: 'Order Cancelled',
          order_id: orderId,
          delivery_day_id: deliveryDayId,
          order_state: 'pending',
          cms_variation: variation,
          recovery_reasons: [
            valueProposition,
            offer,
          ],
        }
      })
    } catch (err) {
      dispatch(statusActions.error(actionTypes.ORDER_CANCEL, { error: err.message, orderId }))
      throw err
    } finally {
      dispatch(statusActions.pending(actionTypes.ORDER_CANCEL, false))
    }
  })

export const projectedOrderCancel = (orderId, deliveryDayId, variation) => (
  async (dispatch, getState) => {
    const showAllCancelledModalIfNecessary = () => {
      const state = getState()
      const orders = state.user.get('newOrders')
      const subscriptionState = state.subscription.getIn(['subscription', 'state'])
      if (checkAllScheduledCancelled(orders) && subscriptionState === 'active') {
        const pendingOrdersDates = getPendingOrdersDates(orders)
        dispatch({
          type: actionTypes.CANCELLED_ALL_BOXES_MODAL_VISIBILITY_CHANGE,
          visibility: true,
          pendingOrdersDates,
        })
      }
    }

    dispatch(statusActions.error(actionTypes.PROJECTED_ORDER_CANCEL, null))
    dispatch(statusActions.pending(actionTypes.PROJECTED_ORDER_CANCEL, true))

    const state = getState()
    const accessToken = state.auth.get('accessToken')
    const valueProposition = state.onScreenRecovery.get('valueProposition')
    const offer = state.onScreenRecovery.get('offer')

    try {
      const orderDate = state.onScreenRecovery.get('orderDate').split(' ')[0]
      const userId = getUserId(state)

      await skipDates(accessToken, userId, [orderDate])

      dispatch({
        type: actionTypes.PROJECTED_ORDER_CANCEL,
        orderId,
        trackingData: {
          actionType: 'Order Skipped',
          delivery_day_id: deliveryDayId,
          order_state: 'projected',
          cms_variation: variation,
          recovery_reasons: [
            valueProposition,
            offer,
          ],
        }
      })

      dispatch(userActions.userOpenCloseOrderCard(orderId, true))
      showAllCancelledModalIfNecessary()
    } catch (err) {
      dispatch(statusActions.error(actionTypes.PROJECTED_ORDER_CANCEL, { error: err.message, orderId }))
    } finally {
      dispatch(statusActions.pending(actionTypes.PROJECTED_ORDER_CANCEL, false))
    }
  }
)

export const clearUpdateDateErrorAndPending = () => (
  (dispatch) => {
    dispatch(statusActions.pending(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT, null))
    dispatch(statusActions.error(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT, null))
  }
)

export const trackCancelMultipleBoxes = (orderIds = []) => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: osrOrdersSkipped,
    orders_skipped: orderIds
  }
})

export const cancelMultipleBoxes = ({ selectedOrders }, userId) => async (dispatch, getState) => {
  const malformedOrders = selectedOrders.find(({ id, isProjected, deliveryDayId }) => anyUnset(id, isProjected, deliveryDayId))

  if (malformedOrders || !selectedOrders.length) {
    dispatch({
      type: actionTypes.CANCEL_MULTIPLE_BOXES_ERROR
    })

    return
  }

  dispatch({
    type: actionTypes.CANCEL_MULTIPLE_BOXES_START,
  })

  const state = getState()
  const cancelledOrders = []
  const accessToken = state.auth.get('accessToken')
  const valueProposition = state.onScreenRecovery.get('valueProposition')
  const offer = state.onScreenRecovery.get('offer')

  try {
    const cancellations = selectedOrders.map((order) => {
      let request

      if (order.isProjected) {
        const deliveryDay = order.deliveryDay.split(' ')[0]
        request = skipDates(accessToken, userId, [deliveryDay])
      } else {
        request = deleteOrder(accessToken, order.id, userId)
      }

      return request.then(() => cancelledOrders.push(order))
    })

    await Promise.all(cancellations)

    dispatch({
      type: actionTypes.CANCEL_MULTIPLE_BOXES_SUCCESS,
      count: cancellations.length
    })
  } catch (err) {
    dispatch({
      type: actionTypes.CANCEL_MULTIPLE_BOXES_ERROR,
    })
  } finally {
    cancelledOrders.forEach(({ isProjected, id, deliveryDayId }) => {
      dispatch({
        type: isProjected
          ? actionTypes.PROJECTED_ORDER_CANCEL
          : actionTypes.ORDER_CANCEL,
        orderId: id,
        trackingData: {
          actionType: `Order ${isProjected ? 'Skipped' : 'Cancelled'}`,
          delivery_day_id: deliveryDayId,
          order_state: isProjected ? 'projected' : 'pending',
          cms_variation: id,
          recovery_reasons: [
            valueProposition,
            offer,
          ],
        }
      })
    })

    if (cancelledOrders.length) {
      const cancelledIds = cancelledOrders.map(({ id }) => id)
      dispatch(trackCancelMultipleBoxes(cancelledIds))
    }
  }
}

export default {
  orderCancel,
  orderUpdate,
  orderUpdateDayAndSlot,
  orderCheckPossibleDuplicate,
  projectedOrderCancel,
  cancelledAllBoxesModalToggleVisibility,
  projectedOrderRestore,
  orderAddressChange,
  orderGetDeliveryDays,
  cancelOrderModalToggleVisibility,
}
