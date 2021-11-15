import { trackUnexpectedSignup } from "actions/tracking/trackUnexpectedSignup"
import { error } from "actions/status/error"
import { actionTypes } from "actions/actionTypes"
import { pending } from "actions/status/pending"
import { getSignupE2ETestName } from "selectors/checkout"
import { buildSignupRequestData } from "actions/user/buildSignupRequestData"
import Immutable from "immutable"
import { trackNewUser } from "actions/tracking/trackNewUser"
import { placeOrder } from "actions/trackingKeys"
import { getPreviewOrderId, getPromoCode } from "selectors/basket"
import { trackFirstPurchase } from "actions/tracking/trackFirstPurchase"
import { trackNewOrder } from "actions/tracking/trackNewOrder"
import { basketPreviewOrderChange } from "actions/basket/basketPreviewOrderChange"
import { trackSuccessfulCheckoutFlow } from "actions/log/trackSuccessfulCheckoutFlow"
import GoustoException from "utils/GoustoException"
import logger from "utils/logger"
import { trackFailedCheckoutFlow } from "actions/log/trackFailedCheckoutFlow"
import { customerSignup } from "apis/customers/customerSignup"

export function userSubscribe(sca3ds = false, sourceId = null) {
  return async (dispatch, getState) => {
    const state = getState()
    if (!state.basket.get('boxId')) {
      dispatch(trackUnexpectedSignup())

      return
    }
    dispatch(error(actionTypes.USER_SUBSCRIBE, null))
    dispatch(pending(actionTypes.USER_SUBSCRIBE, true))

    const prices = state.pricing.get('prices')
    const signupTestName = getSignupE2ETestName(state)
    try {
      const reqData = buildSignupRequestData(state, sca3ds, sourceId)

      const {data} = await customerSignup(null, reqData)

      if (data.customer && data.addresses && data.subscription && data.orderId) {
        const {customer, addresses, subscription, orderId, customer: {id: customerId}} = data
        let user = Immutable.fromJS({
          ...customer,
          ...addresses,
          subscription
        })
        user = user.set('goustoReference', user.get('goustoReference').toString())

        dispatch(trackNewUser(customerId))

        dispatch({
          type: actionTypes.CHECKOUT_ORDER_PLACED,
          trackingData: {
            actionType: placeOrder,
            order_id: orderId,
            order_total: prices.get('total'),
            promo_code: getPromoCode(state),
            signup: true,
            subscription_active: data.subscription.status ? data.subscription.status.slug : true,
            interval_id: reqData.subscription.interval_id,
          }
        })

        dispatch(trackFirstPurchase(orderId, prices))
        dispatch(trackNewOrder(orderId, customerId))
        dispatch(basketPreviewOrderChange(orderId, state.basket.get('boxId')))
        dispatch({type: actionTypes.USER_SUBSCRIBE, user})
        if (signupTestName) {
          dispatch(trackSuccessfulCheckoutFlow('Signup succeeded', {testName: signupTestName, data}))
        }
      } else {
        throw new GoustoException(actionTypes.USER_SUBSCRIBE)
      }
    } catch (err) {
      dispatch(error(actionTypes.USER_SUBSCRIBE, err.message))
      dispatch(trackNewUser())

      const previewOrderId = getPreviewOrderId(state)

      dispatch({
        type: actionTypes.CHECKOUT_ORDER_FAILED,
        trackingData: {
          actionType: 'Order Failed',
          order_id: previewOrderId,
          promo_code: getPromoCode(state),
          signup: true,
          error_reason: err.message
        }
      })
      dispatch(trackNewOrder(previewOrderId))
      logger.error({message: err.message, errors: [err]})
      if (signupTestName) {
        dispatch(trackFailedCheckoutFlow('Signup failed', err, {testName: signupTestName}))
      }
      throw err
    } finally {
      dispatch(pending(actionTypes.USER_SUBSCRIBE, false))
    }
  }
}
