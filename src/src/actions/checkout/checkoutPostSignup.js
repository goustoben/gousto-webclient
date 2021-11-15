import { actionTypes } from 'actions/actionTypes'
import { accountFormName, getPasswordValue, getSignupE2ETestName } from 'selectors/checkout'
import { getSignupRecaptchaToken } from 'selectors/auth'
import Immutable from 'immutable'
import { getBasketRecipes, getPreviewOrderId } from 'selectors/basket'
import logger from 'utils/logger'
import GoustoException from 'utils/GoustoException'
import { basketResetPersistent } from 'utils/basket'
import Cookies from 'utils/GoustoCookies'
import { basketReset } from 'actions/basket/basketReset'
import { trackPurchase } from 'actions/checkout/trackPurchase'
import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { logLevels } from "actions/log/logLevels"
import { feLoggingLogEvent } from "actions/log/feLoggingLogEvent"
import { loginUser } from "actions/login/loginUser"
import { temp } from "actions/temp/temp"
import { trackSubscriptionCreated } from "actions/tracking/trackSubscriptionCreated"
import { trackCheckoutError } from "actions/tracking/trackCheckoutError"

export function checkoutPostSignup() {
  return async (dispatch, getState) => {
    dispatch(feLoggingLogEvent(logLevels.info, 'signup successful'))
    dispatch(trackSubscriptionCreated())
    dispatch(error(actionTypes.CHECKOUT_SIGNUP_LOGIN, null))
    dispatch(pending(actionTypes.CHECKOUT_SIGNUP_LOGIN, true))
    const state = getState()
    const signupTestName = getSignupE2ETestName(state)
    const signupTestData = signupTestName ? {testName: signupTestName} : undefined
    try {
      const {form, pricing} = state
      const recaptchaToken = getSignupRecaptchaToken(state)
      const accountValues = Immutable.fromJS(form[accountFormName].values)
      const account = accountValues.get('account')
      const email = account.get('email')
      const password = getPasswordValue(state)
      const orderId = getPreviewOrderId(state)
      const prices = pricing.get('prices')
      const grossTotal = prices && prices.get('grossTotal')
      const netTotal = prices && prices.get('total')
      const basketRecipes = getBasketRecipes(state)
      await dispatch(loginUser({email, password, rememberMe: true, recaptchaToken}, orderId))
      dispatch(temp('originalGrossTotal', grossTotal))
      dispatch(temp('originalNetTotal', netTotal))
      dispatch(trackPurchase({orderId}))
      dispatch({type: actionTypes.CHECKOUT_SIGNUP_SUCCESS, orderId, basketRecipes}) // used for data layer tracking
      dispatch(feLoggingLogEvent(logLevels.info, 'signup login success', signupTestData))
    } catch (err) {
      dispatch(feLoggingLogEvent(logLevels.info, `signup login failed: ${err.message}`, signupTestData))
      logger.error({message: `${actionTypes.CHECKOUT_SIGNUP_LOGIN} - ${err.message}`, errors: [err]})
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
