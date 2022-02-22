import Immutable from 'immutable'
import { getFormSyncErrors } from 'redux-form'

import { gaTrackingConfig } from 'config/head/gaTracking'
import { PaymentMethod } from 'config/signup'
import { checkoutConfig } from 'config/checkout'

import logger from 'utils/logger'
import Cookies from 'utils/GoustoCookies'
import GoustoException from 'utils/GoustoException'
import { basketResetPersistent } from 'utils/basket'
import { isValidPromoCode } from 'utils/order'

import { validateUserPassword } from 'apis/auth'
import { fetchAddressByPostcode } from 'apis/addressLookup'
import { fetchReference } from 'apis/customers'
import { authPayment, checkPayment, fetchPayPalToken, signupPayment } from 'apis/payments'

import { getSignupRecaptchaToken } from 'selectors/auth'
import { getPreviewOrderId, getPromoCode, getBasketRecipes } from 'selectors/basket'
import {
  accountFormName,
  deliveryFormName,
  getPasswordValue,
  getSignupE2ETestName,
} from 'selectors/checkout'
import { getSessionId } from 'selectors/cookies'
import {
  isCardPayment,
  getPaymentAuthData,
  getPaymentData,
  getPaymentProvider,
} from 'selectors/payment'

import {
  feLoggingLogEvent,
  logLevels,
} from 'actions/log'

import { actionTypes } from './actionTypes'
import * as trackingKeys from './trackingKeys'
import {
  basketPromoCodeChange,
  basketPromoCodeAppliedChange,
  basketReset
} from './basket'
import { userSubscribe } from './user'
import {
  trackAffiliatePurchase,
  trackUTMAndPromoCode,
  trackCheckoutError,
  trackSubscriptionCreated,
  clearTapjoy,
} from './tracking'
import loginActions from './login'
import statusActions from './status'
import tempActions from './temp'
import { checkoutCreatePreviewOrder } from '../routes/Menu/actions/checkout'
export { checkoutTransactionalOrder } from '../routes/Menu/actions/checkout'

const { pending, error } = statusActions
const { errorsThatClearOrderPreview, errorsToHandleForSignupPayment, passwordRules } = checkoutConfig

/* eslint-disable no-use-before-define */
export const checkoutActions = {
  checkoutClearErrors,
  checkoutCreatePreviewOrder,
  checkoutPostSignup,
  checkoutAddressLookup,
  checkoutSignup,
  checkoutCardAuthorisation,
  checkoutSignupPayment,
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
  promoCodeHasBeenUsed: '409-offer-has-been-used',
  challengeFailed: '3ds-challenge-failed',
}

function resetDuplicateCheck({ pricing }) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(error(actionTypes.CHECKOUT_ERROR_DUPLICATE, null))
    if (getPromoCode(state)) {
      if (!isValidPromoCode(pricing)) {
        dispatch(basketPromoCodeChange(''))
        dispatch(basketPromoCodeAppliedChange(false))
        dispatch(error(actionTypes.CHECKOUT_ERROR_DUPLICATE, true))
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
export const handlePromoCodeRemoved = async (dispatch) => {
  dispatch(basketPromoCodeChange(''))
  dispatch(basketPromoCodeAppliedChange(false))
  dispatch(error(actionTypes.CHECKOUT_ERROR_DUPLICATE, true))
}

export const handleCheckoutError = async (err, initiator, dispatch, getState) => {
  const { code } = err
  const errorName = errorsToHandleForSignupPayment.includes(code)
    ? actionTypes.CHECKOUT_PAYMENT
    : actionTypes.CHECKOUT_SIGNUP

  logger.error({ message: `${errorName} - ${err.message}`, errors: [err] })

  dispatch(trackCheckoutError(errorName, code, initiator))
  dispatch(error(errorName, code))
  if (code === errorCodes.duplicateDetails || code === errorCodes.promoCodeHasBeenUsed) {
    await handlePromoCodeRemoved(dispatch, getState)
  } else if (errorsThatClearOrderPreview.includes(code)) {
    // Certain error scenarios trigger the rollback logic which removes the
    // order preview, hence the preview order id stored at the client becomes
    // invalid. Regenerate the order preview when such an error is detected.
    await dispatch(checkoutCreatePreviewOrder())
  }
}

export function checkoutSignup({ pricing }) {
  return async (dispatch, getState) => {
    dispatch(feLoggingLogEvent(logLevels.info, 'signup started'))
    dispatch(checkoutActions.trackSignupPageChange('Submit'))

    dispatch(error(actionTypes.CHECKOUT_SIGNUP, null))
    dispatch(pending(actionTypes.CHECKOUT_SIGNUP, true))

    try {
      await dispatch(checkoutActions.fetchGoustoRef())
      dispatch(checkoutActions.resetDuplicateCheck({ pricing }))
      await dispatch(userSubscribe({ pricing }))
    } catch (err) {
      dispatch(feLoggingLogEvent(logLevels.error, `Signup failed: ${err.message}`))
      await handleCheckoutError(err, 'checkoutSignup', dispatch, getState)
      if (err.code !== errorCodes.duplicateDetails) {
        dispatch(checkoutActions.clearGoustoRef())
      }
      dispatch(pending(actionTypes.CHECKOUT_SIGNUP, false))

      return
    }

    if (isCardPayment(getState())) {
      await dispatch(checkoutActions.checkoutCardAuthorisation({ pricing }))
    } else {
      const sourceId = null
      await dispatch(checkoutActions.checkoutSignupPayment(sourceId, { pricing }))
    }
  }
}

export function checkoutCardAuthorisation({ pricing }) {
  return async (dispatch, getState) => {
    try {
      const reqData = getPaymentAuthData(getState(), { pricing })
      if (reqData.order_id) {
        const { data } = await authPayment(reqData, getSessionId())
        dispatch({
          type: actionTypes.PAYMENT_SHOW_MODAL,
          challengeUrl: data.responsePayload.redirectLink,
        })
        dispatch(trackUTMAndPromoCode(trackingKeys.signupChallengeModalDisplay))
      } else {
        dispatch(feLoggingLogEvent(logLevels.error, 'Auth payment failed: order_id does not exist'))
      }
    } catch (err) {
      dispatch(feLoggingLogEvent(logLevels.error, `Auth payment failed: ${err.message}`))
      await handleCheckoutError(err, 'checkoutCardAuthorisation', dispatch, getState)
      dispatch(checkoutActions.clearGoustoRef())
      dispatch(pending(actionTypes.CHECKOUT_SIGNUP, false))
    }
  }
}

export function checkoutSignupPayment(sourceId, { pricing }) {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const sessionId = getSessionId()
      const provider = getPaymentProvider(state)
      const reqData = getPaymentData(state)

      if (sourceId) {
        reqData.card_token = sourceId
      }

      await signupPayment(reqData, provider, sessionId)
      await dispatch(checkoutActions.checkoutPostSignup({ pricing }))
    } catch (err) {
      dispatch(feLoggingLogEvent(logLevels.error, `Signup payment failed: ${err.message}`))
      await handleCheckoutError(err, 'checkoutSignupPayment', dispatch, getState)
    } finally {
      dispatch(checkoutActions.clearGoustoRef())
      dispatch(pending(actionTypes.CHECKOUT_SIGNUP, false))
    }
  }
}

export const checkPaymentAuth = (checkoutSessionId, { pricing }) => (
  async (dispatch, getState) => {
    dispatch({ type: actionTypes.PAYMENT_HIDE_MODAL })
    dispatch(pending(actionTypes.CHECKOUT_SIGNUP, true))

    try {
      const { data } = await checkPayment(checkoutSessionId, getSessionId())
      if (data && data.approved) {
        dispatch(trackUTMAndPromoCode(trackingKeys.signupChallengeSuccessful))

        dispatch(feLoggingLogEvent(logLevels.info, 'signup 3ds challenge success'))
        await dispatch(checkoutActions.checkoutSignupPayment(data.sourceId, { pricing }))
      } else {
        dispatch(feLoggingLogEvent(logLevels.info, 'signup 3ds challenge failed'))
        dispatch(trackUTMAndPromoCode(trackingKeys.signupChallengeFailed))
        dispatch(trackCheckoutError(actionTypes.CHECKOUT_SIGNUP, errorCodes.challengeFailed, 'checkPaymentAuth'))
        dispatch(error(actionTypes.CHECKOUT_SIGNUP, errorCodes.challengeFailed))
        await dispatch(checkoutCreatePreviewOrder())
        dispatch(checkoutActions.clearGoustoRef())
        dispatch(pending(actionTypes.CHECKOUT_SIGNUP, false))
      }
    } catch (err) {
      dispatch(feLoggingLogEvent(logLevels.error, `Check payment auth failed: ${err.message}`))
      await handleCheckoutError(err, 'checkPaymentAuth', dispatch, getState)
      dispatch(checkoutActions.clearGoustoRef())
      dispatch(pending(actionTypes.CHECKOUT_SIGNUP, false))
    }
  }
)

export function checkoutPostSignup({ pricing }) {
  return async (dispatch, getState) => {
    dispatch(feLoggingLogEvent(logLevels.info, 'signup successful'))
    dispatch(trackSubscriptionCreated({ pricing }))
    dispatch(error(actionTypes.CHECKOUT_SIGNUP_LOGIN, null))
    dispatch(pending(actionTypes.CHECKOUT_SIGNUP_LOGIN, true))
    const state = getState()
    const signupTestName = getSignupE2ETestName(state)
    const signupTestData = signupTestName ? { testName: signupTestName } : undefined
    try {
      const { form } = state
      const recaptchaToken = getSignupRecaptchaToken(state)
      const accountValues = Immutable.fromJS(form[accountFormName].values)
      const account = accountValues.get('account')
      const email = account.get('email')
      const password = getPasswordValue(state)
      const orderId = getPreviewOrderId(state)
      const basketRecipes = getBasketRecipes(state)
      await dispatch(loginActions.loginUser({ email, password, rememberMe: true, recaptchaToken }, orderId))
      dispatch(tempActions.temp('originalGrossTotal', pricing.grossTotal))
      dispatch(tempActions.temp('originalNetTotal', pricing.netTotal))
      dispatch(trackPurchase({ orderId, pricing }))
      dispatch({ type: actionTypes.CHECKOUT_SIGNUP_SUCCESS, orderId, basketRecipes, pricing }) // used for data layer tracking
      dispatch(feLoggingLogEvent(logLevels.info, 'signup login success', signupTestData))
    } catch (err) {
      dispatch(feLoggingLogEvent(logLevels.info, `signup login failed: ${err.message}`, signupTestData))
      logger.error({ message: `${actionTypes.CHECKOUT_SIGNUP_LOGIN} - ${err.message}`, errors: [err] })
      dispatch(trackCheckoutError(actionTypes.CHECKOUT_SIGNUP_LOGIN, err.code, 'checkoutPostSignup'))
      dispatch(error(actionTypes.CHECKOUT_SIGNUP_LOGIN, true))
      throw new GoustoException(actionTypes.CHECKOUT_SIGNUP_LOGIN)
    } finally {
      basketResetPersistent(Cookies)
      dispatch(basketReset())
      dispatch(pending(actionTypes.CHECKOUT_SIGNUP_LOGIN, false))
    }
  }
}

export const trackPurchase = ({ orderId, pricing }) => (
  (dispatch, getState) => {
    const state = getState()
    const promoCode = getPromoCode(state)
    const {
      grossTotal: totalPrice,
      deliveryTotal: shippingPrice,
      total
    } = pricing

    const gaIDTracking = gaTrackingConfig[__ENV__]// eslint-disable-line no-underscore-dangle

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

    dispatch(trackAffiliatePurchase({
      orderId,
      total: total || '',
      commissionGroup: 'FIRSTPURCHASE',
      promoCode,
      isSignup: true,
    }))
    dispatch(clearTapjoy())
  }
)

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
      dispatch(feLoggingLogEvent(logLevels.info, 'fetchGoustoRef: fetched'))
    } else {
      dispatch(feLoggingLogEvent(logLevels.info, 'fetchGoustoRef: already present'))
    }
  }
}

export function clearGoustoRef() {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.CHECKOUT_SET_GOUSTO_REF,
      goustoRef: null
    })
    dispatch(feLoggingLogEvent(logLevels.info, 'clearGoustoRef'))
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

export function trackingOrderPlaceAttempt({ pricing }) {
  return (dispatch, getState) => {
    const state = getState()

    dispatch({
      type: actionTypes.CHECKOUT_ORDER_PLACE_ATTEMPT,
      trackingData: {
        actionType: trackingKeys.placeOrderAttempt,
        order_id: getPreviewOrderId(state),
        order_total: pricing?.grossTotal,
        promo_code: pricing?.promoCode,
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

export function trackingOrderPlaceAttemptSucceeded({ pricing }) {
  return (dispatch, getState) => {
    const state = getState()
    const { form } = state
    const deliveryInputs = Immutable.fromJS(form[deliveryFormName].values)
    const intervalId = deliveryInputs.getIn(['delivery', 'interval_id'], '1')

    dispatch({
      type: actionTypes.CHECKOUT_ORDER_PLACE_ATTEMPT_SUCCEEDED,
      trackingData: {
        actionType: trackingKeys.placeOrderAttemptComplete,
        order_id: getPreviewOrderId(state),
        order_total: pricing?.grossTotal,
        promo_code: pricing?.promoCode,
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
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.PAYMENT_SET_PAYMENT_METHOD,
      paymentMethod
    })

    const state = getState()

    if (paymentMethod === PaymentMethod.PayPal && state.checkout.get('paypalErrors').size && !state.checkout.get('paypalErrorsReported')) {
      dispatch( { type: actionTypes.CHECKOUT_PAYPAL_ERRORS_REPORTED})
      dispatch(feLoggingLogEvent(logLevels.info, 'PayPal signup attempt failed because of init issue'))
    }

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

export function setPayPalNonce(nonce, { pricing }) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.PAYMENT_SET_PAYPAL_NONCE,
      nonce
    })

    dispatch(checkoutActions.trackingOrderPlaceAttemptSucceeded({ pricing }))
    dispatch(checkoutActions.checkoutSignup({ pricing }))
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
