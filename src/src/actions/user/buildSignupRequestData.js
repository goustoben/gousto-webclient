import { getIsDecoupledPaymentEnabled, getIsGoustoOnDemandEnabled, getNDDFeatureValue } from "selectors/features"
import { getCardPaymentDetails, getPayPalPaymentDetails, isCardPayment } from "selectors/payment"
import Immutable from "immutable"
import { accountFormName, deliveryFormName, getFormattedPhoneNumber, getPasswordValue } from "selectors/checkout"
import { getAddress } from "utils/checkout"
import { getPreviewOrderId, getPromoCode } from "selectors/basket"
import { getDeliveryTariffId } from "utils/deliveries"
import { signupConfig } from "config/signup"

export function buildSignupRequestData(state, sca3ds, sourceId) {
  const {form, basket, promoAgeVerified} = state

  const isDecoupledPaymentEnabled = getIsDecoupledPaymentEnabled(state)
  const isGoustoOnDemandEnabled = getIsGoustoOnDemandEnabled(state)

  const isCard = isCardPayment(state)

  const account = Immutable.fromJS(form[accountFormName].values).get('account')
  const delivery = Immutable.fromJS(form[deliveryFormName].values).get('delivery')
  const payment = Immutable.fromJS(form.payment.values).get('payment')

  const deliveryAddress = getAddress(delivery)
  const billingAddress = isCard && payment.get('isBillingAddressDifferent')
    ? getAddress(payment)
    : deliveryAddress

  const intervalId = delivery.get('interval_id', 1)
  const promoCode = getPromoCode(state) || ''

  const reqData = {
    order_id: getPreviewOrderId(state),
    promocode: promoCode,
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
      gousto_ref: state.checkout.get('goustoRef')
    },
    addresses: {
      shipping_address: {
        type: signupConfig.address_types.shipping,
        delivery_instructions: delivery.get('deliveryInstructionsCustom') || delivery.get('deliveryInstruction'),
        ...deliveryAddress
      },
      billing_address: {
        type: signupConfig.address_types.billing,
        ...billingAddress
      }
    },
    subscription: {
      interval_id: intervalId,
      delivery_slot_id: basket.get('slotId'),
      box_id: basket.get('boxId'),
      ...(isGoustoOnDemandEnabled && {paused: Number(isGoustoOnDemandEnabled || false)}),
    },
    decoupled: {
      payment: Number(isDecoupledPaymentEnabled || false),
    }
  }

  if (!isDecoupledPaymentEnabled) {
    let paymentMethod
    if (isCard) {
      paymentMethod = {
        is_default: 1,
        type: signupConfig.payment_types.card,
        name: 'My Card',
        card: getCardPaymentDetails(state)
      }
      if (sca3ds) {
        paymentMethod.card.card_token = sourceId
      }
    } else {
      paymentMethod = {
        is_default: 1,
        type: signupConfig.payment_types.paypal,
        name: 'My PayPal',
        paypal: getPayPalPaymentDetails(state)
      }
    }

    reqData.payment_method = paymentMethod
    reqData['3ds'] = Number((isCard && sca3ds) || false)
  }

  return reqData
}
