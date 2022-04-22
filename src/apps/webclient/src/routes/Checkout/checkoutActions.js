import Immutable from 'immutable'
import { signupConfig } from 'config/signup'
import GoustoException from 'utils/GoustoException'
import { actionTypes } from 'actions/actionTypes'
import { getUTMAndPromoCode } from 'selectors/tracking'
import logger from 'utils/logger'
import { getNDDFeatureValue, getIsGoustoOnDemandEnabled } from 'selectors/features'
import { isCardPayment } from 'selectors/payment'
import {
  accountFormName,
  deliveryFormName,
  getPasswordValue,
  getSignupE2ETestName,
  getFormattedPhoneNumber,
} from 'selectors/checkout'
import { getAddress } from 'utils/checkout'
import { getPreviewOrderId, getPromoCode } from 'selectors/basket'
import { getSessionId } from 'selectors/cookies'
import { getDeliveryTariffId } from 'utils/deliveries'
import {
  feLoggingLogEvent,
  logLevels,
  trackSuccessfulCheckoutFlow,
  trackFailedCheckoutFlow,
} from 'actions/log'
import {
  trackUnexpectedSignup,
  trackFirstPurchase,
  trackNewUser,
  trackNewOrder,
} from 'actions/tracking'
import statusActions from 'actions/status'
import { customerSignup } from 'apis/customers'
import { placeOrder } from 'actions/trackingKeys'
import { basketPreviewOrderChange } from 'actions/basket'

export const checkoutUrgencySetCurrentStatus = (currentStatus) => ({
  type: actionTypes.CHECKOUT_URGENCY_SET_CURRENT_STATUS,
  currentStatus,
})

export const trackCheckoutUrgencyAction =
  (type, additionalData = {}) =>
  (dispatch, getState) => {
    const { promoCode, UTM } = getUTMAndPromoCode(getState())

    dispatch({
      type,
      trackingData: {
        actionType: type,
        ...UTM,
        promoCode,
        ...additionalData,
      },
    })
  }

function buildSignupRequestData(state) {
  const { form, basket, promoAgeVerified } = state

  const isGoustoOnDemandEnabled = getIsGoustoOnDemandEnabled(state)

  const isCard = isCardPayment(state)

  const account = Immutable.fromJS(form[accountFormName].values).get('account')
  const delivery = Immutable.fromJS(form[deliveryFormName].values).get('delivery')
  const payment = Immutable.fromJS(form.payment.values).get('payment')

  const deliveryAddress = getAddress(delivery)
  const billingAddress =
    isCard && payment.get('isBillingAddressDifferent') ? getAddress(payment) : deliveryAddress

  const intervalId = delivery.get('interval_id', 1)
  const promoCode = getPromoCode(state) || ''

  return {
    order_id: getPreviewOrderId(state),
    promocode: promoCode,
    session_id: getSessionId(),
    customer: {
      tariff_id: basket.get('tariffId', ''),
      phone_number: getFormattedPhoneNumber(state),
      email: account.get('email'),
      name_first: delivery.get('firstName').trim(),
      name_last: delivery.get('lastName').trim(),
      promo_code: promoCode,
      password: getPasswordValue(state),
      age_verified: Number(promoAgeVerified || false),
      marketing_do_allow_email: Number(account.get('allowEmail') || false),
      marketing_do_allow_thirdparty: Number(account.get('allowThirdPartyEmail') || false),
      delivery_tariff_id: getDeliveryTariffId(null, getNDDFeatureValue(state)),
      gousto_ref: state.checkout.get('goustoRef'),
    },
    addresses: {
      shipping_address: {
        type: signupConfig.address_types.shipping,
        delivery_instructions:
          delivery.get('deliveryInstructionsCustom') || delivery.get('deliveryInstruction'),
        ...deliveryAddress,
      },
      billing_address: {
        type: signupConfig.address_types.billing,
        ...billingAddress,
      },
    },
    subscription: {
      interval_id: intervalId,
      delivery_slot_id: basket.get('slotId'),
      box_id: basket.get('boxId'),
      ...(isGoustoOnDemandEnabled && { paused: Number(isGoustoOnDemandEnabled || false) }),
    },
    decoupled: {
      payment: 1,
    },
  }
}

export function userSubscribe({ pricing }) {
  return async (dispatch, getState) => {
    const state = getState()
    const boxId = state.basket.get('boxId')
    if (!boxId) {
      dispatch(
        feLoggingLogEvent(
          logLevels.error,
          'userSubscribe called with missing boxId: unexpected signup',
        ),
      )
      dispatch(trackUnexpectedSignup())

      return
    }
    dispatch(feLoggingLogEvent(logLevels.info, 'userSubscribe started', { boxId }))
    dispatch(statusActions.error(actionTypes.USER_SUBSCRIBE, null))
    dispatch(statusActions.pending(actionTypes.USER_SUBSCRIBE, true))

    const signupTestName = getSignupE2ETestName(state)
    try {
      const reqData = buildSignupRequestData(state)

      const { data } = await customerSignup(null, reqData)

      if (data.customer && data.addresses && data.subscription && data.orderId) {
        const {
          customer,
          addresses,
          subscription,
          orderId,
          customer: { id: customerId },
        } = data
        let user = Immutable.fromJS({
          ...customer,
          ...addresses,
          subscription,
        })
        user = user.set('goustoReference', user.get('goustoReference').toString())

        dispatch(trackNewUser(customerId))

        dispatch({
          type: actionTypes.CHECKOUT_ORDER_PLACED,
          trackingData: {
            actionType: placeOrder,
            order_id: orderId,
            order_total: pricing?.total,
            promo_code: getPromoCode(state),
            signup: true,
            subscription_active: data.subscription.status ? data.subscription.status.slug : true,
            interval_id: reqData.subscription.interval_id,
          },
        })

        dispatch(trackFirstPurchase(orderId, pricing))
        dispatch(trackNewOrder(orderId, customerId))
        dispatch(basketPreviewOrderChange(orderId, state.basket.get('boxId')))
        dispatch({ type: actionTypes.USER_SUBSCRIBE, user })
        dispatch(
          trackSuccessfulCheckoutFlow('userSubscribe: customerSignup successful', {
            testName: signupTestName,
            data,
          }),
        )
      } else {
        throw new GoustoException(actionTypes.USER_SUBSCRIBE)
      }
    } catch (err) {
      dispatch(statusActions.error(actionTypes.USER_SUBSCRIBE, err.message))
      dispatch(trackNewUser())

      const previewOrderId = getPreviewOrderId(state)

      dispatch({
        type: actionTypes.CHECKOUT_ORDER_FAILED,
        trackingData: {
          actionType: 'Order Failed',
          order_id: previewOrderId,
          promo_code: getPromoCode(state),
          signup: true,
          error_reason: err.message,
        },
      })
      dispatch(trackNewOrder(previewOrderId))
      logger.error({ message: err.message, errors: [err] })
      dispatch(
        trackFailedCheckoutFlow('userSubscribe: customerSignup failed', err, {
          testName: signupTestName,
        }),
      )
      throw err
    } finally {
      dispatch(statusActions.pending(actionTypes.USER_SUBSCRIBE, false))
    }
  }
}
