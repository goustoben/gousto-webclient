/* eslint no-use-before-define: ["error", { "functions": false }] */
import { createPreviewOrder } from 'apis/orders'
import { fetchAddressByPostcode } from 'apis/addressLookup'
import { fetchIntervals } from 'apis/customers'
import logger from 'utils/logger'
import Immutable from 'immutable'
import { getSlot } from 'utils/deliveries'
import { isValidPromoCode } from 'utils/order'
import { basketResetPersistent } from 'utils/basket'

import actionTypes from './actionTypes'
import basketActions from './basket'
import loginActions from './login'
import userActions from './user'
import statusActions from './status'
import GoustoException from '../utils/GoustoException'
import Cookies from '../utils/GoustoCookies'

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
  trackingOrderPlace,
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
      logger.error('Unable to look-up address')
    } finally {
      dispatch(pending(actionTypes.CHECKOUT_ADDRESSES_RECEIVE, false))
    }

    return addresses
  }
}

export function checkoutCreatePreviewOrder() {
  return async (dispatch, getState) => {
    const state = getState()
    const basket = state.basket

    const deliveryDays = state.boxSummaryDeliveryDays
    const date = basket.get('date')
    const slotId = basket.get('slotId')
    const slot = getSlot(deliveryDays, date, slotId)

    dispatch(pending(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, true))
    dispatch(error(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, null))
    try {
      if (!slot) {
        throw new Error(`Can't find any slot with id: ${slotId}`)
      }
      const deliverySlotId = slot.get('coreSlotId', '')
      const deliveryDayId = deliveryDays.getIn([date, 'coreDayId'])
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
        dispatch(basketActions.basketPreviewOrderChange(String(previewOrder.order.id), previewOrder.order.boxId, previewOrder.surcharges))
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

function resetDuplicateCheck() {
  return (dispatch, getState) => {
    dispatch(error(actionTypes.CHECKOUT_ERROR_DUPLICATE, null))
    if (getState().basket.get('promoCode')) {
      const { pricing } = getState()

      if (!isValidPromoCode(pricing.get('prices'))) {
        dispatch(basketActions.basketPromoCodeChange(''))
        dispatch(basketActions.basketPromoCodeAppliedChange(false))
        dispatch(error(actionTypes.CHECKOUT_ERROR_DUPLICATE, true))
      }
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

export function checkoutSignup() {
  return async (dispatch) => {
    dispatch(error(actionTypes.CHECKOUT_SIGNUP, null))
    dispatch(pending(actionTypes.CHECKOUT_SIGNUP, true))

    try {
      dispatch(checkoutActions.resetDuplicateCheck())
      dispatch(trackSignupPageChange('Submit'))
      await dispatch(userActions.userSubscribe())
      await dispatch(checkoutActions.checkoutPostSignup())
      dispatch({ type: actionTypes.CHECKOUT_SIGNUP_SUCCESS }) // used for facebook tracking
    } catch (err) {
      logger.error(`${actionTypes.CHECKOUT_SIGNUP} - ${err.message}`)
      dispatch(error(actionTypes.CHECKOUT_SIGNUP, err.code))
      if (err.code === '409-duplicate-details') {
        dispatch(basketActions.basketPromoCodeChange(''))
        dispatch(basketActions.basketPromoCodeAppliedChange(false))
        dispatch(error(actionTypes.CHECKOUT_ERROR_DUPLICATE, true))
      }
    } finally {
      dispatch(pending(actionTypes.CHECKOUT_SIGNUP, false))
    }
  }
}

export const trackPurchase = () => (
  (dispatch, getState) => {
    const { basket, pricing } = getState()
    const prices = pricing.get('prices')
    const orderId = basket.get('previewOrderId')
    const promoCode = basket.get('promoCode')
    const totalPrice = prices.get('grossTotal')
    const shippingPrice = prices.get('deliveryTotal')

    if (typeof ga !== 'undefined') {
      ga('ec:setAction', 'purchase', {
        id: orderId,
        revenue: totalPrice,
        shipping: shippingPrice,
        coupon: promoCode
      })
      ga('send', 'pageview')
    }
  }
)

export function checkoutPostSignup() {
  return async (dispatch, getState) => {
    dispatch(error(actionTypes.CHECKOUT_SIGNUP_LOGIN, null))
    dispatch(pending(actionTypes.CHECKOUT_SIGNUP_LOGIN, true))
    try {
      const checkoutInputs = Immutable.fromJS(getState().form.checkout.values)
      const aboutYou = checkoutInputs.get('aboutyou')
      const email = aboutYou.get('email')
      const password = aboutYou.get('password')
      const orderId = getState().basket.get('previewOrderId')
      await dispatch(loginActions.loginUser(email, password, true, orderId))
      dispatch(trackPurchase())
    } catch (err) {
      logger.error(`${actionTypes.CHECKOUT_SIGNUP_LOGIN} - ${err.message}`)
      dispatch(error(actionTypes.CHECKOUT_SIGNUP_LOGIN, true))
      throw new GoustoException(actionTypes.CHECKOUT_SIGNUP_LOGIN)
    } finally {
      basketResetPersistent(Cookies)
      dispatch(basketActions.basketReset())
      dispatch(pending(actionTypes.CHECKOUT_SIGNUP_LOGIN, false))
    }
  }
}

export function trackSignupPageChange(step) {
  return (dispatch) => {
    dispatch({ type: actionTypes.SIGNUP_TRACKING_STEP_CHANGE, step })
  }
}

export function trackingOrderPlace(isSignup, paymentProvider) {
  return(dispatch, getState) => {
    const { tracking, basket, pricing } = getState()
    const prices = pricing.get('prices')

    dispatch({
      type: actionTypes.CHECKOUT_ORDER_PLACE,
      trackingData: {
        actionType: 'Order Place',
        asource: tracking.get('asource'),
        order_id: basket.get('previewOrderId'),
        order_total: prices.get('grossTotal'),
        promo_code: prices.get('promoCode'),
        signup: isSignup,
        payment_provider: paymentProvider,
      }
    })
  }
}

export function trackingCardTokenisationFailed(err){
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

export function trackingCardTokenisationSuccesfuly(){
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHECKOUT_CARD_TOKENIZATION_SUCCEEDED,
      trackingData: {
        actionType: 'CardTokenization Succeededs'
      }
    })
  }
}

export default checkoutActions
