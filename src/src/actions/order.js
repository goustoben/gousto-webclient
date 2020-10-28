import Immutable from 'immutable'
import moment from 'moment'

import {
  saveOrder,
  fetchOrder,
  cancelOrder,
  checkoutOrder,
  updateOrderItems,
  updateOrderAddress,
} from 'apis/orders'

import { fetchDeliveryDays } from 'apis/deliveries'
import * as userApi from 'apis/user'
import GoustoException from 'utils/GoustoException'
import logger from 'utils/logger'
import { trackAffiliatePurchase } from 'actions/tracking'
import { getOrderDetails } from 'utils/basket'
import { getAvailableDeliveryDays, transformDaySlotLeadTimesToMockSlots, getSlot, getDeliveryTariffId, getNDDFeatureFlagVal } from 'utils/deliveries'
import { redirect } from 'utils/window'
import {
  getNDDFeatureValue,
  getAddOnsBeforeOrderConfirmation,
} from 'selectors/features'
import { getChosenAddressId } from 'selectors/basket'
import { orderTrackingActions } from 'config/order'
import { osrOrdersSkipped } from 'actions/trackingKeys'
import userActions from './user'
import tempActions from './temp'
import statusActions from './status'
import { orderConfirmationRedirect } from './orderConfirmation'
import { orderAddOnRedirect } from './orderAddOn'
import { actionTypes } from './actionTypes'
import { sendClientMetric } from '../routes/Menu/apis/clientMetrics'
import { anyUnset } from '../utils/object'

export const trackOrder = (orderAction, order) => (
  (dispatch, getState) => {
    if (Object.keys(orderTrackingActions).includes(orderAction)) {
      const { actionType, trackAffiliate } = orderTrackingActions[orderAction]

      if (trackAffiliate) {
        const { basket } = getState()
        const { id, prices } = order

        const affiliateTracking = {
          orderId: id,
          total: prices.total || '',
          commissionGroup: 'EXISTING',
          promoCode: prices.promo_code || basket.get('promoCode') || '',
        }

        trackAffiliatePurchase(affiliateTracking)
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

export const orderUpdate = (orderId, recipes, coreDayId, coreSlotId, numPortions, orderAction) => (
  async (dispatch, getState) => {
    dispatch(statusActions.error(actionTypes.ORDER_SAVE, null))
    dispatch(statusActions.pending(actionTypes.ORDER_SAVE, true))

    const { basket, boxSummaryDeliveryDays } = getState()
    const date = basket.get('date')
    const slotId = basket.get('slotId')
    const slot = getSlot(boxSummaryDeliveryDays, date, slotId)
    const chosenAddressId = getChosenAddressId({ basket })

    const order = {
      recipe_choices: recipes.map(id => ({ id, type: 'Recipe', quantity: numPortions })),
      order_action: orderAction,
      delivery_slot_id: coreSlotId,
      delivery_day_id: coreDayId,
      day_slot_lead_time_id: slot.get('daySlotLeadTimeId', ''),
      address_id: chosenAddressId
    }

    const accessToken = getState().auth.get('accessToken')
    try {
      const { data: savedOrder } = await saveOrder(accessToken, orderId, order)

      if (savedOrder && savedOrder.id) {
        dispatch(trackOrder(
          orderAction,
          savedOrder,
        ))

        sendClientMetric('menu-edit-complete', 1, 'Count')

        const isAddOnsFeatureFlagOn = getAddOnsBeforeOrderConfirmation(getState())
        if (isAddOnsFeatureFlagOn) {
          dispatch(orderAddOnRedirect(savedOrder.id, orderAction))
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
  })

export const orderUpdateDayAndSlot = (orderId, coreDayId, coreSlotId, slotId, slotDate, availableDeliveryDays) => (
  async (dispatch, getState) => {
    dispatch(statusActions.error(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT, null))
    dispatch(statusActions.pending(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT, true))

    const slot = getSlot(availableDeliveryDays, slotDate, slotId)

    const originalSlotId = getState().user.getIn(['newOrders', orderId, 'deliverySlotId'])
    const isCurrentPeriod = getState().user.getIn(['newOrders', orderId, 'isCurrentPeriod'])
    const trackingData = {
      order_id: orderId,
      isCurrentPeriod,
      original_deliveryslot_id: originalSlotId,
      new_deliveryslot_id: slotId,
    }

    try {
      const order = {
        delivery_day_id: coreDayId,
        delivery_slot_id: coreSlotId,
        day_slot_lead_time_id: slot.get('daySlotLeadTimeId', ''),
      }
      const accessToken = getState().auth.get('accessToken')
      dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'OrderDeliverySlot SaveAttempt',
          ...trackingData
        }
      })
      const { data: updatedOrder } = await saveOrder(accessToken, orderId, order)
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

export const orderCheckout = ({
  addressId,
  postcode,
  numPortions,
  promoCode,
  orderId,
  deliveryDayId,
  slotId,
  orderAction,
  disallowRedirectToSummary,
  recipes }) => (
  async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.ORDER_CHECKOUT, true))
    dispatch(statusActions.error(actionTypes.ORDER_CHECKOUT, null))
    const accessToken = getState().auth.get('accessToken')

    try {
      const { data } = await checkoutOrder(accessToken,
        {
          address_id: addressId,
          deliverypostcode: postcode,
          num_portions: numPortions,
          promocode: promoCode,
          order_id: orderId,
          delivery_day_id: deliveryDayId,
          delivery_slot_id: slotId,
          order_action: orderAction,
          disallow_redirect_to_summary: disallowRedirectToSummary,
          recipes,
        }
      )

      if (data.orderId && data.url) {
        return {
          orderId: data.orderId,
          url: data.url,
        }
      } else {
        throw { message: 'Error when saving the order' }
      }
    } catch (err) {
      if (err && err.redirected && err.url) {
        return redirect(err.url)
      }

      dispatch(statusActions.error(actionTypes.ORDER_CHECKOUT, err.message))
    } finally {
      dispatch(statusActions.pending(actionTypes.ORDER_CHECKOUT, false))
    }
  }
)

export const orderAssignToUser = (orderAction, existingOrderId) => (
  async (dispatch, getState) => {
    dispatch(statusActions.error(actionTypes.ORDER_SAVE, null))
    dispatch(statusActions.pending(actionTypes.ORDER_SAVE, true))
    const accessToken = getState().auth.get('accessToken')
    const userId = getState().auth.get('id')
    let orderDetailsUtils
    let savedOrder

    try {
      try {
        orderDetailsUtils = getOrderDetails(getState().basket, getState().boxSummaryDeliveryDays)
        const { data } = await userApi.saveUserOrder(accessToken, orderDetailsUtils)
        savedOrder = data
      } catch (err) {
        logger.error({
          message: 'saveUserOrder in orderAssignToUser failed, logging error below...',
          actor: userId,
          extra: {
            orderDetails: orderDetailsUtils
          }
        })
        logger.error(err)

        if (existingOrderId && err.message === 'user already has an order for chosen delivery day') {
          const updateUserOrderPayload = {
            ...orderDetailsUtils,
            order_id: existingOrderId,
          }

          try {
            const { data } = await userApi.updateUserOrder(accessToken, updateUserOrderPayload)
            savedOrder = data
          } catch (err) {
            logger.error({
              message: 'updateUserOrder in orderAssignToUser failed, logging error below...',
              actor: userId,
              extra: {
                updateUserOrderPayload
              }
            })
            logger.error(err)

            throw new GoustoException(err.message || err, {
              error: 'update-order-fail',
            })
          }
        } else {
          throw new GoustoException(err.message || err, {
            error: 'save-order-fail',
          })
        }
      }

      if (savedOrder && savedOrder.id) {
        dispatch(trackOrder(
          orderAction,
          savedOrder,
        ))
        const isAddOnsFeatureFlagOn = getAddOnsBeforeOrderConfirmation(getState())
        if (isAddOnsFeatureFlagOn) {
          dispatch(orderAddOnRedirect(savedOrder.id, orderAction))
        } else {
          dispatch(orderConfirmationRedirect(savedOrder.id, orderAction))
        }
      } else {
        throw new GoustoException('Order could not be assigned to user', {
          error: 'assign-order-fail',
        })
      }
    } catch (err) {
      logger.error({ message: 'orderAssignToUser failed, logging error below...', actor: userId })
      logger.error(err)

      dispatch(statusActions.error(actionTypes.ORDER_SAVE, err.error))
      dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, false))
    } finally {
      dispatch(statusActions.pending(actionTypes.ORDER_SAVE, false))
    }
  }
)

export const orderCheckPossibleDuplicate = (orderId) => (
  async (dispatch, getState) => {
    try {
      await dispatch(userActions.userLoadOrders(true, 'any', 5))
    } catch (e) {
      // do nothing
    }
    const orders = getState().user.get('orders', Immutable.List([]))
    const order = orders.filter(o => o.get('id') == orderId).first()
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

export const projectedOrderRestore = (orderId, userId, deliveryDayId) => (
  async (dispatch, getState) => {
    dispatch(statusActions.error(actionTypes.PROJECTED_ORDER_RESTORE, null))
    dispatch(statusActions.pending(actionTypes.PROJECTED_ORDER_RESTORE, true))
    dispatch(tempActions.temp('osrOrderId', orderId))
    const accessToken = getState().auth.get('accessToken')
    try {
      await userApi.restoreDelivery(accessToken, userId, deliveryDayId)
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
    const isCurrentPeriod = getState().user.getIn(['newOrders', orderId, 'isCurrentPeriod'])
    const trackingData = {
      order_id: orderId,
      is_current_period: isCurrentPeriod,
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

export const orderUpdateProducts = (orderId, itemChoices) => (
  async (dispatch, getState) => {
    const accessToken = getState().auth.get('accessToken')
    const reqData = { item_choices: itemChoices, restrict: 'Product' }

    try {
      await updateOrderItems(accessToken, orderId, reqData)
      dispatch({
        type: actionTypes.ORDER_UPDATE_PRODUCTS,
      })
    } catch (error) {
      dispatch({
        type: actionTypes.ORDER_UPDATE_PRODUCTS,
        error,
      })
    }
  }
)

export const orderHasAnyProducts = (orderId) => (
  async (dispatch, getState) => {
    const accessToken = getState().auth.get('accessToken')
    const dispatchError = (error) => (
      dispatch({
        type: actionTypes.ORDER_HAS_ANY_PRODUCTS,
        error,
      })
    )

    try {
      if (orderId === undefined || orderId === null || orderId === '') {
        return dispatchError(new Error('missing orderId'))
      }

      const response = await fetchOrder(accessToken, orderId)
      const hasProducts = response.data.productItems.length > 0
      dispatch({
        type: actionTypes.ORDER_HAS_ANY_PRODUCTS,
        hasProducts,
      })
    } catch (error) {
      dispatchError(error)
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
    const accessToken = getState().auth.get('accessToken')
    const valueProposition = getState().onScreenRecovery.get('valueProposition')
    const offer = getState().onScreenRecovery.get('offer')

    try {
      await cancelOrder(accessToken, orderId)
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
      const orders = getState().user.get('newOrders')
      if (checkAllScheduledCancelled(orders) && getState().subscription.getIn(['subscription', 'state']) === 'active') {
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
    const accessToken = getState().auth.get('accessToken')
    const valueProposition = getState().onScreenRecovery.get('valueProposition')
    const offer = getState().onScreenRecovery.get('offer')

    try {
      await userApi.skipDelivery(accessToken, deliveryDayId)
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

export const cancelMultipleBoxes = ({ selectedOrders }) => async (dispatch, getState) => {
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

  const cancelledOrders = []
  const accessToken = getState().auth.get('accessToken')
  const valueProposition = getState().onScreenRecovery.get('valueProposition')
  const offer = getState().onScreenRecovery.get('offer')

  try {
    const cancellations = selectedOrders.map((order) => {
      const request = order.isProjected
        ? userApi.skipDelivery(accessToken, order.deliveryDayId)
        : cancelOrder(accessToken, order.id)

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
  orderCheckout,
  orderUpdate,
  orderUpdateDayAndSlot,
  orderAssignToUser,
  orderCheckPossibleDuplicate,
  orderHasAnyProducts,
  projectedOrderCancel,
  cancelledAllBoxesModalToggleVisibility,
  projectedOrderRestore,
  orderAddressChange,
  orderGetDeliveryDays,
  orderUpdateProducts,
  cancelOrderModalToggleVisibility,
}
