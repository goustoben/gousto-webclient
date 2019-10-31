import Immutable from 'immutable'
import moment from 'moment'

import ordersApi from 'apis/orders'
import * as userApi from 'apis/user'
import { fetchDeliveryDays } from 'apis/deliveries'
import GoustoException from 'utils/GoustoException'
import logger from 'utils/logger'
import { getOrderDetails } from 'utils/basket'
import { getAvailableDeliveryDays, transformDaySlotLeadTimesToMockSlots, getSlot } from 'utils/deliveries'
import { redirect } from 'utils/window'
import {getNDDFeatureValue} from "../selectors/features";
import userActions from './user'
import tempActions from './temp'
import statusActions from './status'
import { orderConfirmationRedirect } from './orderConfirmation'
import actionTypes from './actionTypes'
import { getDeliveryTariffId, getNDDFeatureFlagVal } from '../utils/deliveries'

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

    const order = {
      recipe_choices: recipes.map(id => ({ id, type: 'Recipe', quantity: numPortions })),
      order_action: orderAction,
      delivery_slot_id: coreSlotId,
      delivery_day_id: coreDayId,
      day_slot_lead_time_id: slot.get('daySlotLeadTimeId', '')
    }

    const accessToken = getState().auth.get('accessToken')
    try {
      const { data: savedOrder } = await ordersApi.saveOrder(accessToken, orderId, order)

      if (savedOrder && savedOrder.id) {
        dispatch(orderConfirmationRedirect(savedOrder.id, orderAction))
      }
    } catch (err) {
      dispatch(statusActions.error(actionTypes.ORDER_SAVE, err.message))
      dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, false))
    }
    dispatch(statusActions.pending(actionTypes.ORDER_SAVE, false))
  })

export const orderUpdateDayAndSlot = (orderId, coreDayId, coreSlotId, slotId) => (
  async (dispatch, getState) => {
    dispatch(statusActions.error(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT, null))
    dispatch(statusActions.pending(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT, true))

    const { basket, boxSummaryDeliveryDays } = getState()
    const date = basket.get('date')
    const slot = getSlot(boxSummaryDeliveryDays, date, slotId)

    try {
      const order = {
        delivery_day_id: coreDayId,
        delivery_slot_id: coreSlotId,
        day_slot_lead_time_id: slot.get('daySlotLeadTimeId', '')
      }
      const accessToken = getState().auth.get('accessToken')
      const { data: updatedOrder } = await ordersApi.saveOrder(accessToken, orderId, order)
      dispatch({
        type: actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT,
        orderId,
        coreDayId,
        slotId,
        deliveryDay: updatedOrder.deliveryDate,
        deliverySlotStart: updatedOrder.deliverySlot.deliveryStart,
        deliverySlotEnd: updatedOrder.deliverySlot.deliveryEnd,
      })
    } catch (err) {
      dispatch(statusActions.error(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT, err.message))
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
      const { data } = await ordersApi.orderCheckout(accessToken,
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
      }
      else {
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
    let orderDetailsUtils
    let savedOrder

    try {
      try {
        orderDetailsUtils = getOrderDetails(getState().basket, getState().boxSummaryDeliveryDays)
        const { data } = await userApi.saveUserOrder(accessToken, orderDetailsUtils)
        savedOrder = data
      } catch (err) {
        if (existingOrderId && err.message === 'user already has an order for chosen delivery day') {
          try {
            const { data } = await userApi.updateUserOrder(accessToken, {
              ...orderDetailsUtils,
              order_id: existingOrderId,
            })
            savedOrder = data
          } catch (err) {
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
        dispatch(orderConfirmationRedirect(savedOrder.id, orderAction))
      } else {
        throw new GoustoException('Order could not be assigned to user', {
          error: 'assign-order-fail',
        })
      }
    } catch (err) {
      const logLevel = err.level || 'error'
      const errorMessage = err.message || err
      const error = err.error || errorMessage
      logger[logLevel](errorMessage)
      dispatch(statusActions.error(actionTypes.ORDER_SAVE, error))
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
    dispatch(statusActions.error(actionTypes.ORDER_ADDRESS_CHANGE, null))
    dispatch(statusActions.pending(actionTypes.ORDER_ADDRESS_CHANGE, true))
    const accessToken = getState().auth.get('accessToken')
    const data = {
      orderId,
      addressId,
    }
    try {
      await ordersApi.updateOrderAddress(accessToken, orderId, addressId)
      dispatch({
        type: actionTypes.ORDER_ADDRESS_CHANGE,
        data,
      })
    } catch (err) {
      dispatch(statusActions.error(actionTypes.ORDER_ADDRESS_CHANGE, err.message))
    } finally {
      dispatch(statusActions.pending(actionTypes.ORDER_ADDRESS_CHANGE, false))
    }
  }
)

export const orderGetDeliveryDays = (cutoffDatetimeFrom, cutoffDatetimeUntil, addressId, orderId) => (
  async (dispatch, getState) => {
    dispatch(statusActions.error(actionTypes.ORDER_DELIVERY_DAYS_RECEIVE, null))
    dispatch(statusActions.pending(actionTypes.ORDER_DELIVERY_DAYS_RECEIVE, true))

    const postcode = getState().user.getIn(['addresses', addressId, 'postcode'])
    const isNDDExperiment = getNDDFeatureFlagVal(getState().user, getNDDFeatureValue(getState()))
    const reqData = {
      'filters[cutoff_datetime_from]': cutoffDatetimeFrom,
      'filters[cutoff_datetime_until]': cutoffDatetimeUntil,
      sort: 'date',
      direction: 'asc',
      postcode,
      ndd: isNDDExperiment ? 'true' : 'false',
      delivery_tariff_id: getDeliveryTariffId(getState().user, getNDDFeatureValue(getState()))
    }

    try {
      let { data: days } = await fetchDeliveryDays(null, reqData)

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
    const reqData = { item_choices: itemChoices, restrict: "Product" }

    try {
      await ordersApi.updateOrderItems(accessToken, orderId, reqData)
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

      const response = await ordersApi.fetchOrder(accessToken, orderId)
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
      await ordersApi.cancelOrder(accessToken, orderId)
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

    const scrollToCurrentCard = () => {
      window.location.hash = '' // This is because setting the location.hash to the existing value won't do anything
      window.location.hash = `#order-${orderId}`
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
      scrollToCurrentCard()
      showAllCancelledModalIfNecessary()
    } catch (err) {
      dispatch(statusActions.error(actionTypes.PROJECTED_ORDER_CANCEL, { error: err.message, orderId }))
    } finally {
      dispatch(statusActions.pending(actionTypes.PROJECTED_ORDER_CANCEL, false))
    }
  }
)

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
