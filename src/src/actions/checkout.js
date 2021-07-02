import Immutable from 'immutable'
import { getFormSyncErrors } from 'redux-form'

import routes from 'config/routes'
import gaID from 'config/head/gaTracking'
import { PaymentMethod } from 'config/signup'
import { errorsThatClearOrderPreview, passwordRules } from 'config/checkout'

import logger from 'utils/logger'
import Cookies from 'utils/GoustoCookies'
import GoustoException from 'utils/GoustoException'
import { basketResetPersistent } from 'utils/basket'
import { isValidPromoCode } from 'utils/order'

import { fetchAddressByPostcode } from 'apis/addressLookup'
import { fetchPromoCodeValidity, fetchReference } from 'apis/customers'
import { authPayment, checkPayment, fetchPayPalToken } from 'apis/payments'
import { validateUserPassword } from 'apis/auth'

import { accountFormName, deliveryFormName, getPromoCodeValidationDetails, getPasswordValue } from 'selectors/checkout'
import { getIs3DSForSignUpEnabled, getIsPaymentBeforeChoosingEnabled } from 'selectors/features'
import { getCardToken, getCurrentPaymentMethod } from 'selectors/payment'
import { getUserId } from 'selectors/user'

import { actionTypes } from './actionTypes'
import * as trackingKeys from './trackingKeys'
import {
  basketPromoCodeChange,
  basketPromoCodeAppliedChange,
  basketReset
} from './basket'
import { userSubscribe } from './user'
import { trackAffiliatePurchase, trackUTMAndPromoCode, trackCheckoutError } from './tracking'
import loginActions from './login'
import statusActions from './status'
import { pricingRequest } from './pricing'
import tempActions from './temp'
import { checkoutCreatePreviewOrder } from '../routes/Menu/actions/checkout'
export { checkoutTransactionalOrder } from '../routes/Menu/actions/checkout'

const { pending, error } = statusActions

/* eslint-disable no-use-before-define */
const checkoutActions = {
  checkoutClearErrors,
  checkoutCreatePreviewOrder,
  checkoutPostSignup,
  checkoutAddressLookup,
  checkoutSignup,
  checkoutNon3DSSignup,
  checkout3DSSignup,
  fetchGoustoRef,
  clearGoustoRef,
  resetDuplicateCheck,
  trackSignupPageChange,
  trackingOrderPlaceAttempt,
  trackingOrderPlaceAttemptFailed,
  trackingOrderPlaceAttemptSucceeded,
  trackPromocodeChange,
}
/* eslint-enable no-use-before-define */

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
        dispatch(pricingRequest())
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
      dispatch(trackCheckoutError(actionTypes.CHECKOUT_ADDRESSES_RECEIVE, err.message, 'checkoutAddressLookup'))
      dispatch(error(actionTypes.CHECKOUT_ADDRESSES_RECEIVE, err.message))
      logger.error({ message: 'Unable to look-up address' })
    } finally {
      dispatch(pending(actionTypes.CHECKOUT_ADDRESSES_RECEIVE, false))
    }

    return addresses
  }
}

export const fireCheckoutPendingEvent = (pendingName, checkoutValue = true) => dispatch => {
  dispatch(pending(pendingName, checkoutValue))
}

export const fireCheckoutError = (errorName, errorValue = true) => dispatch => {
  dispatch(trackCheckoutError(errorName, errorValue, 'fireCheckoutError'))
  dispatch(error(errorName, errorValue))
}

// Note: this is a helper method, not an action.  It should be called directly
// instead of dispatched.
export const handlePromoCodeRemoved = async (dispatch, getState) => {
  const state = getState()
  const isPaymentBeforeChoosingEnabled = getIsPaymentBeforeChoosingEnabled(state)

  dispatch(basketPromoCodeChange(''))
  dispatch(basketPromoCodeAppliedChange(false))
  dispatch(error(actionTypes.CHECKOUT_ERROR_DUPLICATE, true))

  if (isPaymentBeforeChoosingEnabled) {
    await dispatch(checkoutCreatePreviewOrder())
  } else {
    dispatch(pricingRequest())
  }
}

export const handleCheckoutError = async (err, initiator, dispatch, getState, options = {}) => {
  const { code } = err

  logger.error({ message: `${actionTypes.CHECKOUT_SIGNUP} - ${err.message}`, errors: [err] })

  dispatch(trackCheckoutError(actionTypes.CHECKOUT_SIGNUP, code, initiator))
  dispatch(error(actionTypes.CHECKOUT_SIGNUP, code))
  if (code === errorCodes.duplicateDetails) {
    if (options.skipPromoCodeRemovedCheck) {
      return
    }

    await handlePromoCodeRemoved(dispatch, getState)
  } else if (errorsThatClearOrderPreview.includes(code)) {
    // Certain error scenarios trigger the rollback logic which removes the
    // order preview, hence the preview order id stored at the client becomes
    // invalid.  Regenerate the order preview when such an error is detected.
    await dispatch(checkoutCreatePreviewOrder())
  }
}

export function checkoutSignup() {
  return async (dispatch, getState) => {
    const state = getState()
    dispatch(checkoutActions.trackSignupPageChange('Submit'))
    await dispatch(checkoutActions.fetchGoustoRef())

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
    let needClearGoustoRef = true

    dispatch(error(actionTypes.CHECKOUT_SIGNUP, null))
    dispatch(pending(actionTypes.CHECKOUT_SIGNUP, true))

    try {
      dispatch(checkoutActions.resetDuplicateCheck())
      await dispatch(userSubscribe(false, null))
      await dispatch(checkoutActions.checkoutPostSignup(recaptchaValue))
      dispatch({ type: actionTypes.CHECKOUT_SIGNUP_SUCCESS, orderId }) // used for facebook tracking
    } catch (err) {
      needClearGoustoRef = err.code !== errorCodes.duplicateDetails
      await handleCheckoutError(err, 'checkoutNon3DSSignup', dispatch, getState)
    } finally {
      dispatch(pending(actionTypes.CHECKOUT_SIGNUP, false))
      if (needClearGoustoRef) {
        dispatch(checkoutActions.clearGoustoRef())
      }
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
          dispatch(trackCheckoutError(actionTypes.CHECKOUT_SIGNUP, errorCodes.duplicateDetails, 'checkout3DSSignup'))
          dispatch(error(actionTypes.CHECKOUT_SIGNUP, errorCodes.duplicateDetails))
          await handlePromoCodeRemoved(dispatch, getState)
          dispatch(pending(actionTypes.CHECKOUT_SIGNUP, false))

          return
        }
      }

      const { basket } = state
      const orderId = basket.get('previewOrderId')
      const goustoRef = state.checkout.get('goustoRef')
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
      await handleCheckoutError(err, 'checkout3DSSignup', dispatch, getState, { skipPromoCodeRemovedCheck: true })
      dispatch(pending(actionTypes.CHECKOUT_SIGNUP, false))
      dispatch(checkoutActions.clearGoustoRef())
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
      } else {
        dispatch(trackUTMAndPromoCode(trackingKeys.signupChallengeFailed))
        dispatch(trackCheckoutError(actionTypes.CHECKOUT_SIGNUP, errorCodes.challengeFailed, 'checkPaymentAuth'))
        dispatch(error(actionTypes.CHECKOUT_SIGNUP, errorCodes.challengeFailed))
      }
    } catch (err) {
      await handleCheckoutError(err, 'checkPaymentAuth', dispatch, getState)
    } finally {
      dispatch(pending(actionTypes.CHECKOUT_SIGNUP, false))
      dispatch(checkoutActions.clearGoustoRef())
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
      const state = getState()
      const { form, pricing, basket } = state
      const accountValues = Immutable.fromJS(form[accountFormName].values)
      const account = accountValues.get('account')
      const email = account.get('email')
      const password = getPasswordValue(state)
      const orderId = basket.get('previewOrderId')
      await dispatch(loginActions.loginUser({ email, password, rememberMe: true, recaptchaToken: recaptchaValue }, orderId))
      const prices = pricing.get('prices')
      const grossTotal = prices && prices.get('grossTotal')
      const netTotal = prices && prices.get('total')
      dispatch(tempActions.temp('originalGrossTotal', grossTotal))
      dispatch(tempActions.temp('originalNetTotal', netTotal))
      dispatch(trackPurchase())
    } catch (err) {
      logger.error({ message: `${actionTypes.CHECKOUT_SIGNUP_LOGIN} - ${err.message}`, errors: [err] })
      dispatch(trackCheckoutError(actionTypes.CHECKOUT_SIGNUP_LOGIN, true, 'checkoutPostSignup'))
      dispatch(error(actionTypes.CHECKOUT_SIGNUP_LOGIN, true))
      throw new GoustoException(actionTypes.CHECKOUT_SIGNUP_LOGIN)
    } finally {
      basketResetPersistent(Cookies)
      dispatch(basketReset())
      dispatch(pending(actionTypes.CHECKOUT_SIGNUP_LOGIN, false))
    }
  }
}

export function validatePassword(password) {
  return async (dispatch) => {
    if (password) {
      try {
        await validateUserPassword(password, 2)

        dispatch({ type: actionTypes.CHECKOUT_PASSWORD_VALIDATION_RULES_SET, password, errors: [] })
      } catch (err) {
        dispatch({
          type: actionTypes.CHECKOUT_PASSWORD_VALIDATION_RULES_SET,
          errors: err.errors,
          password,
        })
        logger.error({ message: err.message, errors: err })
      }
    } else {
      dispatch({
        type: actionTypes.CHECKOUT_PASSWORD_VALIDATION_RULES_SET,
        errors: passwordRules,
        password,
      })
    }
  }
}

export function fetchGoustoRef() {
  return async (dispatch, getState) => {
    let goustoRef = getState().checkout.get('goustoRef')
    if (!goustoRef) {
      const { data } = await fetchReference()
      goustoRef = data.goustoRef

      dispatch({
        type: actionTypes.CHECKOUT_SET_GOUSTO_REF,
        goustoRef,
      })
    }
  }
}

export function clearGoustoRef() {
  return { type: actionTypes.CHECKOUT_SET_GOUSTO_REF, goustoRef: null }
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
      dispatch(trackCheckoutError(actionTypes.PAYPAL_TOKEN_FETCH_FAILED, true, 'fetchPayPalClientToken'))
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

export function setCurrentPaymentMethod(paymentMethod, options = {}) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.PAYMENT_SET_PAYMENT_METHOD,
      paymentMethod
    })

    if (!options.disableTracking) {
      const trackingKey = paymentMethod === PaymentMethod.Card
        ? trackingKeys.selectCardPayment
        : trackingKeys.selectPayPalPayment
      dispatch(trackUTMAndPromoCode(trackingKey))
    }
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
    dispatch(trackCheckoutError(actionTypes.PAYPAL_ERROR, true, 'firePayPalError'))
    dispatch(error(actionTypes.PAYPAL_ERROR, true))
  }
}

export const checkoutStepIndexReached = (stepIndex) => dispatch => {
  dispatch({
    type: actionTypes.CHECKOUT_STEP_INDEX_REACHED,
    stepIndex
  })
}

export const trackWelcomeToGoustoButton = (orderId) => (dispatch, getState) => {
  const state = getState()
  const type = trackingKeys.checkoutWelcomeToGousto
  const promoCode = state.promoStore.keySeq().first()
  const userId = getUserId(state)

  dispatch({
    type,
    trackingData: {
      actionType: type,
      promoCode,
      orderId,
      userId,
    }
  })
}

export const sendRequestToUpdateOrderSummaryPrices = () => async (dispatch, getState) => {
  const state = getState()
  const isPaymentBeforeChoosingEnabled = getIsPaymentBeforeChoosingEnabled(state)

  if (isPaymentBeforeChoosingEnabled) {
    await dispatch(checkoutCreatePreviewOrder())
  } else {
    await dispatch(pricingRequest())
  }
}

export default checkoutActions
