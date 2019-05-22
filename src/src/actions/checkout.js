import Immutable from 'immutable'
import { getFormSyncErrors } from 'redux-form'

import logger from 'utils/logger'
import routes from 'config/routes'
import gaID from 'config/head/gaTracking'
import Cookies from 'utils/GoustoCookies'
import { getSlot } from 'utils/deliveries'
import { redirect } from 'actions/redirect'
import { createPreviewOrder } from 'apis/orders'
import { fetchIntervals } from 'apis/customers'
import GoustoException from 'utils/GoustoException'
import { basketResetPersistent } from 'utils/basket'
import { fetchAddressByPostcode } from 'apis/addressLookup'
import { isValidPromoCode, getPreviewOrderErrorName } from 'utils/order'
import { getAboutYouFormName, getDeliveryFormName } from 'selectors/checkout'

import actionTypes from './actionTypes'
import {
  basketPreviewOrderChange,
  basketPromoCodeChange,
  basketPromoCodeAppliedChange,
  basketReset
} from './basket'
import loginActions from './login'
import { userSubscribe } from './user'
import statusActions from './status'
import pricingActions from './pricing'
import tempActions from './temp'
import { orderAssignToUser } from './order'

const { pending, error } = statusActions

const checkoutActions = {
  checkoutClearErrors,
  checkoutCreatePreviewOrder,
  checkoutPostSignup,
  checkoutAddressLookup,
  checkoutSignup,
  resetDuplicateCheck,
  trackSignupPageChange,
  checkoutFetchIntervals,
  trackingOrderPlaceAttempt,
  trackingOrderPlaceAttemptFailed,
  trackingOrderPlaceAttemptSucceeded,
  trackPromocodeChange
}

function resetDuplicateCheck() {
  return (dispatch, getState) => {
    dispatch(error(actionTypes.CHECKOUT_ERROR_DUPLICATE, null))
    if (getState().basket.get('promoCode')) {
      const { pricing } = getState()

      if (!isValidPromoCode(pricing.get('prices'))) {
        dispatch(basketPromoCodeChange(''))
        dispatch(basketPromoCodeAppliedChange(false))
        dispatch(error(actionTypes.CHECKOUT_ERROR_DUPLICATE, true))
        dispatch(pricingActions.pricingRequest())
      }
    }
  }
}

export function checkoutClearErrors() {
  return {
    type: actionTypes.CHECKOUT_ERRORS_CLEAR,
  }
}

export function checkoutAddressLookup(postcode) {
  return async (dispatch) => {
    dispatch(pending(actionTypes.CHECKOUT_ADDRESSES_RECEIVE, true))
    dispatch(error(actionTypes.CHECKOUT_ADDRESSES_RECEIVE, null))

    const addresses = {
      deliveryPoints: [],
      postcode,
    }

    try {
      const lookupResults = await fetchAddressByPostcode(postcode)

      addresses.deliveryPoints = lookupResults.data.deliveryPoints || []
      addresses.town = lookupResults.data.town
      addresses.postcode = lookupResults.data.postcode || postcode
      addresses.county = lookupResults.data.traditionalCounty || ''
    } catch (err) {
      dispatch(error(actionTypes.CHECKOUT_ADDRESSES_RECEIVE, err.message))
      logger.error({ message: 'Unable to look-up address' })
    } finally {
      dispatch(pending(actionTypes.CHECKOUT_ADDRESSES_RECEIVE, false))
    }

    return addresses
  }
}

export function checkoutCreatePreviewOrder() {
  return async (dispatch, getState) => {
    const { basket, boxSummaryDeliveryDays } = getState()
    const date = basket.get('date')
    const slotId = basket.get('slotId')
    const slot = getSlot(boxSummaryDeliveryDays, date, slotId)

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
        dispatch(error(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, { message: 'Missing data, persistent basket might be expired', code: 'basket-expired' }))
      }

      const orderDetails = {
        delivery_day_id: deliveryDayId,
        delivery_slot_id: deliverySlotId,
        recipe_choices: recipeChoices,
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
        dispatch(error(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, { message, code }))
      }
    } catch (e) {
      logger.warning(e.message)
      dispatch(error(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, e.message))
    } finally {
      dispatch(pending(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, false))
    }
  }
}

export function checkoutFetchIntervals() {
  return async (dispatch) => {
    dispatch(pending(actionTypes.CHECKOUT_INTERVALS_RECIEVE, true))

    try {
      const { data: intervals } = await fetchIntervals()

      dispatch({
        type: actionTypes.CHECKOUT_INTERVALS_RECIEVE,
        intervals,
      })
    } catch (error) {
      const { message, code } = error
      logger.warning(message)
      dispatch(error(actionTypes.CHECKOUT_INTERVALS_RECIEVE, { message, code }))
    } finally {
      dispatch(pending(actionTypes.CHECKOUT_INTERVALS_RECIEVE, false))
    }
  }
}

export const fireCheckoutError = (errorName, errorValue = true) => {
  return dispatch => {
    dispatch(error(errorName, errorValue))
  }
}

export const fireCheckoutPendingEvent = (pendingName, checkoutValue = true) => {
  return dispatch => {
    dispatch(pending(pendingName, checkoutValue))
  }
}

export function checkoutSignup() {
  return async (dispatch) => {
    dispatch(error(actionTypes.CHECKOUT_SIGNUP, null))
    dispatch(pending(actionTypes.CHECKOUT_SIGNUP, true))

    try {
      dispatch(checkoutActions.resetDuplicateCheck())
      dispatch(trackSignupPageChange('Submit'))
      await dispatch(userSubscribe())
      await dispatch(checkoutActions.checkoutPostSignup())
      dispatch({ type: actionTypes.CHECKOUT_SIGNUP_SUCCESS }) // used for facebook tracking
    } catch (err) {
      logger.error({ message: `${actionTypes.CHECKOUT_SIGNUP} - ${err.message}`, errors: [err] })
      dispatch(error(actionTypes.CHECKOUT_SIGNUP, err.code))
      if (err.code === '409-duplicate-details') {
        dispatch(basketPromoCodeChange(''))
        dispatch(basketPromoCodeAppliedChange(false))
        dispatch(error(actionTypes.CHECKOUT_ERROR_DUPLICATE, true))
        dispatch(pricingActions.pricingRequest())
      }
    } finally {
      dispatch(pending(actionTypes.CHECKOUT_SIGNUP, false))
    }
  }
}

export const checkoutTransactionalOrder = (orderAction) => (
  async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.CHECKOUT_TRANSACTIONAL_ORDER, true))
    await dispatch(checkoutCreatePreviewOrder())

    const { auth, basket, error, user } = getState()

    const previewOrderError = error.get(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, false)
    const previewOrderErrorName = getPreviewOrderErrorName(error)
    const orderId = basket.get('previewOrderId')
    const userStatus = user.get('status')
    const isAuthenticated = auth.get('isAuthenticated')

    if (previewOrderError || !orderId) {
      logger.warning(`Preview order id failed to create, persistent basket might be expired, error: ${previewOrderErrorName}`)

      return dispatch(redirect(`${routes.client.menu}?from=newcheckout&error=${previewOrderErrorName}`, true))
    }

    if (orderId && isAuthenticated) {
      if (userStatus === 'onhold') {
        return dispatch(redirect(`${routes.client.myGousto}`))
      }

      return dispatch(orderAssignToUser(orderAction, orderId))
    }
    dispatch(statusActions.pending(actionTypes.CHECKOUT_TRANSACTIONAL_ORDER, false))
  }
)

export const trackPurchase = () => (
  (dispatch, getState) => {
    const { basket, pricing } = getState()
    const prices = pricing.get('prices')
    const orderId = basket.get('previewOrderId')
    const promoCode = basket.get('promoCode')
    const totalPrice = prices.get('grossTotal')
    const shippingPrice = prices.get('deliveryTotal')
    const gaIDTracking = gaID[__ENV__]// eslint-disable-line no-underscore-dangle

    if (typeof ga !== 'undefined') {
      ga('create', gaIDTracking, 'auto', 'gousto')
      ga('gousto.require', 'ec')
      ga('gousto.ec:setAction', 'purchase', {
        id: orderId,
        revenue: totalPrice,
        shipping: shippingPrice,
        coupon: promoCode
      })
      ga('gousto.send', 'pageview')
    }
  }
)

export function checkoutPostSignup() {
  return async (dispatch, getState) => {
    dispatch(error(actionTypes.CHECKOUT_SIGNUP_LOGIN, null))
    dispatch(pending(actionTypes.CHECKOUT_SIGNUP_LOGIN, true))
    try {
      const { form, pricing } = getState()
      const aboutYouFormName = getAboutYouFormName(getState())
      const aboutYouValues = Immutable.fromJS(form[aboutYouFormName].values)
      const aboutYou = aboutYouValues.get('aboutyou')
      const email = aboutYou.get('email')
      const password = aboutYou.get('password')
      const orderId = getState().basket.get('previewOrderId')
      await dispatch(loginActions.loginUser(email, password, true, orderId))
      const prices = pricing.get('prices')
      const grossTotal = prices && prices.get('grossTotal')
      const netTotal = prices && prices.get('total')
      dispatch(tempActions.temp('originalGrossTotal', grossTotal))
      dispatch(tempActions.temp('originalNetTotal', netTotal))
      dispatch(trackPurchase())

    } catch (err) {
      logger.error({ message: `${actionTypes.CHECKOUT_SIGNUP_LOGIN} - ${err.message}`, errors: [err] })
      dispatch(error(actionTypes.CHECKOUT_SIGNUP_LOGIN, true))
      throw new GoustoException(actionTypes.CHECKOUT_SIGNUP_LOGIN)
    } finally {
      basketResetPersistent(Cookies)
      dispatch(basketReset())
      dispatch(pending(actionTypes.CHECKOUT_SIGNUP_LOGIN, false))
    }
  }
}

export function trackSignupPageChange(step) {
  return (dispatch) => {
    dispatch({ type: actionTypes.SIGNUP_TRACKING_STEP_CHANGE, step })
  }
}

export function trackingOrderPlaceAttempt() {
  return (dispatch, getState) => {
    const { basket, pricing } = getState()
    const prices = pricing.get('prices')

    dispatch({
      type: actionTypes.CHECKOUT_ORDER_PLACE_ATTEMPT,
      trackingData: {
        actionType: 'Order Place Attempt',
        order_id: basket.get('previewOrderId'),
        order_total: prices.get('grossTotal'),
        promo_code: prices.get('promoCode'),
        payment_provider: 'checkout'
      }
    })
  }
}

export function trackingOrderPlaceAttemptFailed() {
  return (dispatch, getState) => {
    const errorMessages = getFormSyncErrors('payment')(getState()).payment

    dispatch({
      type: actionTypes.CHECKOUT_ORDER_PLACE_ATTEMPT_FAILED,
      trackingData: {
        actionType: 'Order Place Attempt Failed',
        missing_fields: Object.values(errorMessages)
      }
    })
  }
}

export function trackingOrderPlaceAttemptSucceeded() {
  return (dispatch, getState) => {
    const { basket, pricing, form } = getState()
    const prices = pricing.get('prices')
    const deliveryFormName = getDeliveryFormName(getState())
    const deliveryInputs = Immutable.fromJS(form[deliveryFormName].values)
    const interval_id = deliveryInputs.getIn(['delivery', 'interval_id'], '1')

    dispatch({
      type: actionTypes.CHECKOUT_ORDER_PLACE_ATTEMPT_SUCCEEDED,
      trackingData: {
        actionType: 'Order Place Attempt Succeeded',
        order_id: basket.get('previewOrderId'),
        order_total: prices.get('grossTotal'),
        promo_code: prices.get('promoCode'),
        interval_id: interval_id,
        payment_provider: 'checkout'
      }
    })
  }
}

export function trackingCardTokenisationFailed(err) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHECKOUT_CARD_TOKENIZATION_FAILED,
      trackingData: {
        actionType: 'CardTokenization Failed',
        error_reason: err
      }
    })
  }
}

export function trackingCardTokenisationSuccessfully() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHECKOUT_CARD_TOKENIZATION_SUCCEEDED,
      trackingData: {
        actionType: 'CardTokenization Succeededs'
      }
    })
  }
}

export const trackSubscriptionIntervalChanged = () => (
  (dispatch, getState) => {
    try {
      const deliveryFormName = getDeliveryFormName(getState())
      const checkoutInputs = Immutable.fromJS(getState().form[deliveryFormName].values)
      const interval_id = checkoutInputs.getIn(['delivery', 'interval_id'], '1')

      dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'SubscriptionFrequency Changed',
          interval_id,
        }
      })
    } catch (e) {
      logger.notice(e.message)
    }
  }
)

export function trackPromocodeChange(promocode, added) {
  return (dispatch) => dispatch({
    type: 'TRACKING_PROMOCODE_CHANGE',
    trackingData: {
      actionType: added ? 'Promocode Applied' : 'Promocode Removed',
      promocode
    }
  })
}

export default checkoutActions
