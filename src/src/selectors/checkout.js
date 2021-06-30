import Immutable from 'immutable'
import { getIsPromoCodeValidationEnabled } from 'selectors/features'

export const hasCheckoutError = state => {
  const errors = state.checkout.get('errors')
  if (!errors) {
    return false
  }

  return errors.filter(error => error).size > 0
}

export const accountFormName = 'account'
export const deliveryFormName = 'delivery'

export const getPromoCodeValidationDetails = state => {
  const { form, basket } = state
  const delivery = Immutable.fromJS(form[deliveryFormName].values).get('delivery')
  const isPromoCodeValidationEnabled = getIsPromoCodeValidationEnabled(state)

  return {
    promo_code: basket.get('promoCode', ''),
    phone_number: delivery.get('phone') ? `0${delivery.get('phone')}` : '',
    postcode: delivery.get('postcode'),
    line1: delivery.get('houseNo', ''),
    ...(isPromoCodeValidationEnabled && {
      check_last_name: Number(isPromoCodeValidationEnabled || false),
      name_last: delivery.get('lastName').trim(),
    })
  }
}

export const getCheckoutLastReachedStepIndex = state => state.checkout.get('lastReachedStepIndex')
export const getPasswordValue = state => state.checkout.getIn(['passwordInfo', 'value'])
