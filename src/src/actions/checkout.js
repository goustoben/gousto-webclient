import Immutable from 'immutable'
import { getFormSyncErrors } from 'redux-form'

import routes from 'config/routes'
import gaID from 'config/head/gaTracking'
import { PaymentMethod } from 'config/signup'

import logger from 'utils/logger'
import Cookies from 'utils/GoustoCookies'
import GoustoException from 'utils/GoustoException'
import { basketResetPersistent } from 'utils/basket'
import { getSlot, getDeliveryTariffId } from 'utils/deliveries'
import { isValidPromoCode, getPreviewOrderErrorName } from 'utils/order'

import { fetchAddressByPostcode } from 'apis/addressLookup'
import { fetchIntervals, fetchPromoCodeValidity, fetchReference } from 'apis/customers'
import { authPayment, checkPayment, fetchPayPalToken } from 'apis/payments'
import { createPreviewOrder } from 'apis/orders'

import { getChosenAddressId } from 'selectors/basket'
import { getAboutYouFormName, getDeliveryFormName, getPromoCodeValidationDetails } from 'selectors/checkout'
import { getNDDFeatureValue, getIs3DSForSignUpEnabled } from 'selectors/features'
import { getCardToken, getCurrentPaymentMethod } from 'selectors/payment'

import { actionTypes } from './actionTypes'
import * as trackingKeys from './trackingKeys'
import {
  basketPreviewOrderChange,
  basketPromoCodeChange,
  basketPromoCodeAppliedChange,
  basketReset
} from './basket'
import { userSubscribe } from './user'
import { trackAffiliatePurchase, trackUTMAndPromoCode } from './tracking'
import { redirect } from './redirect'
import { orderAssignToUser } from './order'
import loginActions from './login'
import statusActions from './status'
import pricingActions from './pricing'
import tempActions from './temp'

const { pending, error } = statusActions

const checkoutActions = {
  checkoutClearErrors,
  checkoutCreatePreviewOrder,
  checkoutPostSignup,
  checkoutAddressLookup,
  checkoutSignup,
  checkoutNon3DSSignup,
  checkout3DSSignup,
  resetDuplicateCheck,
  trackSignupPageChange,
  checkoutFetchIntervals,
  trackingOrderPlaceAttempt,
  trackingOrderPlaceAttemptFailed,
  trackingOrderPlaceAttemptSucceeded,
  trackPromocodeChange,
}

const errorCodes = {
  duplicateDetails: '409-duplicate-details',
  challengeFailed: '3ds-challenge-failed',
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
}

export function checkoutFetchIntervals() {
  return async (dispatch) => {
    dispatch(pending(actionTypes.CHECKOUT_INTERVALS_RECEIVE, true))

    try {
      const { data: intervals } = await fetchIntervals()

      dispatch({
        type: actionTypes.CHECKOUT_INTERVALS_RECEIVE,
        intervals,
      })
    } catch (error) {
      const { message, code } = error
      logger.warning(message)
      dispatch(error(actionTypes.CHECKOUT_INTERVALS_RECEIVE, { message, code }))
    } finally {
      dispatch(pending(actionTypes.CHECKOUT_INTERVALS_RECEIVE, false))
    }
  }
}

export const fireCheckoutError = (errorName, errorValue = true) => dispatch => {
  dispatch(error(errorName, errorValue))
}

export const fireCheckoutPendingEvent = (pendingName, checkoutValue = true) => dispatch => {
  dispatch(pending(pendingName, checkoutValue))
}

export function checkoutSignup() {
  return async (dispatch, getState) => {
    const state = getState()
    dispatch(checkoutActions.trackSignupPageChange('Submit'))

    const is3DSEnabled = getIs3DSForSignUpEnabled(state)
    const isCardPayment = getCurrentPaymentMethod(state) === PaymentMethod.Card

    if (is3DSEnabled && isCardPayment) {
      await dispatch(checkoutActions.checkout3DSSignup())
    } else {
      await dispatch(checkoutActions.checkoutNon3DSSignup())
    }
  }
}

export function checkoutNon3DSSignup() {
  return async (dispatch, getState) => {
    const { basket, auth } = getState()
    const orderId = basket.get('previewOrderId')
    const recaptchaValue = auth.getIn(['recaptcha', 'signupToken'])

    dispatch(error(actionTypes.CHECKOUT_SIGNUP, null))
    dispatch(pending(actionTypes.CHECKOUT_SIGNUP, true))

    try {
      dispatch(checkoutActions.resetDuplicateCheck())
      await dispatch(userSubscribe(false, null))
      await dispatch(checkoutActions.checkoutPostSignup(recaptchaValue))
      dispatch({ type: actionTypes.CHECKOUT_SIGNUP_SUCCESS, orderId }) // used for facebook tracking
    } catch (err) {
      logger.error({ message: `${actionTypes.CHECKOUT_SIGNUP} - ${err.message}`, errors: [err] })
      dispatch(error(actionTypes.CHECKOUT_SIGNUP, err.code))
      if (err.code === errorCodes.duplicateDetails) {
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

export function checkout3DSSignup() {
  return async (dispatch, getState) => {
    dispatch(error(actionTypes.CHECKOUT_SIGNUP, null))
    dispatch(pending(actionTypes.CHECKOUT_SIGNUP, true))

    const state = getState()

    try {
      const promoCodeValidityDetails = getPromoCodeValidationDetails(state)
      if (promoCodeValidityDetails.promo_code) {
        const validationResult = await fetchPromoCodeValidity(promoCodeValidityDetails)

        if (!validationResult.data.valid) {
          dispatch(error(actionTypes.CHECKOUT_SIGNUP, errorCodes.duplicateDetails))
          dispatch(basketPromoCodeChange(''))
          dispatch(basketPromoCodeAppliedChange(false))
          dispatch(error(actionTypes.CHECKOUT_ERROR_DUPLICATE, true))
          dispatch(pricingActions.pricingRequest())
          dispatch(pending(actionTypes.CHECKOUT_SIGNUP, false))

          return
        }
      }

      let goustoRef = state.checkout.get('goustoRef')
      if (!goustoRef) {
        const { data } = await fetchReference()
        goustoRef = data.goustoRef

        dispatch({
          type: actionTypes.CHECKOUT_SET_GOUSTO_REF,
          goustoRef,
        })
      }

      const { basket } = state
      const orderId = basket.get('previewOrderId')
      const cardToken = getCardToken(state)
      const prices = state.pricing.get('prices')
      const amountInPence = Math.round(prices.get('total', 0) * 100)
      const { success, failure } = routes.client.payment

      const reqData = {
        order_id: orderId,
        card_token: cardToken,
        amount: amountInPence,
        gousto_ref: goustoRef,
        '3ds': true,
        success_url: window.location.origin + success,
        failure_url: window.location.origin + failure,
      }

      const { data } = await authPayment(reqData)
      dispatch({
        type: actionTypes.PAYMENT_SHOW_MODAL,
        challengeUrl: data.responsePayload.redirectLink,
      })
      dispatch(trackUTMAndPromoCode(trackingKeys.signupChallengeModalDisplay))
    } catch (err) {
      logger.error({ message: `${actionTypes.CHECKOUT_SIGNUP} - ${err.message}`, errors: [err] })
      dispatch(error(actionTypes.CHECKOUT_SIGNUP, err.code))
      dispatch(pending(actionTypes.CHECKOUT_SIGNUP, false))
    }
  }
}

export const checkPaymentAuth = (sessionId) => (
  async (dispatch, getState) => {
    dispatch({ type: actionTypes.PAYMENT_HIDE_MODAL })
    dispatch(pending(actionTypes.CHECKOUT_SIGNUP, true))

    try {
      const { data } = await checkPayment(sessionId)
      if (data && data.approved) {
        dispatch(trackUTMAndPromoCode(trackingKeys.signupChallengeSuccessful))

        const { basket, auth } = getState()
        const orderId = basket.get('previewOrderId')
        const recaptchaValue = auth.getIn(['recaptcha', 'signupToken'])

        dispatch(checkoutActions.resetDuplicateCheck())
        await dispatch(userSubscribe(true, data.sourceId))
        await dispatch(checkoutActions.checkoutPostSignup(recaptchaValue))
        dispatch({ type: actionTypes.CHECKOUT_SIGNUP_SUCCESS, orderId }) // used for facebook tracking
        dispatch({ type: actionTypes.CHECKOUT_SET_GOUSTO_REF, goustoRef: null })
      } else {
        dispatch(trackUTMAndPromoCode(trackingKeys.signupChallengeFailed))
        dispatch(error(actionTypes.CHECKOUT_SIGNUP, errorCodes.challengeFailed))
      }
    } catch (err) {
      logger.error({ message: `${actionTypes.CHECKOUT_SIGNUP} - ${err.message}`, errors: [err] })
      dispatch(error(actionTypes.CHECKOUT_SIGNUP, err.code))
      if (err.code === errorCodes.duplicateDetails) {
        dispatch(basketPromoCodeChange(''))
        dispatch(basketPromoCodeAppliedChange(false))
        dispatch(error(actionTypes.CHECKOUT_ERROR_DUPLICATE, true))
        dispatch(pricingActions.pricingRequest())
      }
    } finally {
      dispatch(pending(actionTypes.CHECKOUT_SIGNUP, false))
    }
  }
)

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

    trackAffiliatePurchase({
      orderId,
      total: prices.get('total', ''),
      commissionGroup: 'FIRSTPURCHASE',
      promoCode,
    })
  }
)

export function checkoutPostSignup(recaptchaValue) {
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
      await dispatch(loginActions.loginUser({ email, password, rememberMe: true, recaptchaToken: recaptchaValue }, orderId))
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

export const trackCheckoutButtonPressed = (type, property) => {
  const tracking = {
    actionType: type,
    seCategory: 'Checkout',
    ...property
  }

  return {
    type: actionTypes.TRACKING,
    trackingData: tracking,
    gtmEvent: tracking
  }
}

export function trackingOrderPlaceAttempt() {
  return (dispatch, getState) => {
    const { basket, pricing } = getState()
    const prices = pricing.get('prices')

    dispatch({
      type: actionTypes.CHECKOUT_ORDER_PLACE_ATTEMPT,
      trackingData: {
        actionType: trackingKeys.placeOrderAttempt,
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
        actionType: trackingKeys.placeOrderFailAttempt,
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
    const intervalId = deliveryInputs.getIn(['delivery', 'interval_id'], '1')

    dispatch({
      type: actionTypes.CHECKOUT_ORDER_PLACE_ATTEMPT_SUCCEEDED,
      trackingData: {
        actionType: trackingKeys.placeOrderAttemptComplete,
        order_id: basket.get('previewOrderId'),
        order_total: prices.get('grossTotal'),
        promo_code: prices.get('promoCode'),
        interval_id: intervalId,
        payment_provider: 'checkout'
      }
    })
  }
}

export function trackingCardTokenizationFailed(err) {
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

export function trackingCardTokenizationSuccessfully() {
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
      const intervalId = checkoutInputs.getIn(['delivery', 'interval_id'], '1')

      dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'SubscriptionFrequency Changed',
          interval_id: intervalId,
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

export function fetchPayPalClientToken() {
  return async (dispatch) => {
    try {
      const { data } = await fetchPayPalToken()

      dispatch({
        type: actionTypes.PAYMENT_SET_PAYPAL_CLIENT_TOKEN,
        token: data.clientToken
      })
    } catch (err) {
      logger.error({ message: `${actionTypes.PAYPAL_TOKEN_FETCH_FAILED} - ${err.message}`, errors: [err] })
      dispatch(error(actionTypes.PAYPAL_TOKEN_FETCH_FAILED, true))
    }
  }
}

export function clearPayPalErrors() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHECKOUT_PAYPAL_ERRORS_CLEAR
    })
  }
}

export function clearPayPalClientToken() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.PAYMENT_SET_PAYPAL_CLIENT_TOKEN,
      token: null
    })
  }
}

export function setCurrentPaymentMethod(paymentMethod) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.PAYMENT_SET_PAYMENT_METHOD,
      paymentMethod
    })

    const trackingKey = paymentMethod === PaymentMethod.Card
      ? trackingKeys.selectCardPayment
      : trackingKeys.selectPayPalPayment
    dispatch(trackUTMAndPromoCode(trackingKey))
  }
}

export function setPayPalDeviceData(deviceData) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.PAYMENT_SET_PAYPAL_DEVICE_DATA,
      deviceData
    })
  }
}

export function setPayPalNonce(nonce) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.PAYMENT_SET_PAYPAL_NONCE,
      nonce
    })

    dispatch(checkoutActions.trackingOrderPlaceAttemptSucceeded())
    dispatch(checkoutActions.checkoutSignup())
  }
}

export function firePayPalError(err) {
  return (dispatch) => {
    logger.error({ message: `${actionTypes.PAYPAL_ERROR} - ${err.message}`, errors: [err] })
    dispatch(error(actionTypes.PAYPAL_ERROR, true))
  }
}

export default checkoutActions
