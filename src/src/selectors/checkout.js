import Immutable from 'immutable'

export const hasCheckoutError = state => {
  const errors = state.checkout.get('errors')
  if (!errors) {
    return false
  }

  return errors.filter(error => error).size > 0
}

export const getAboutYouFormName = (state, isCheckoutOverhaulEnabled) => {
  const { request } = state

  return request.get('browser') === 'mobile' && !isCheckoutOverhaulEnabled ? 'yourdetails' : 'aboutyou'
}

export const getDeliveryFormName = (state, isCheckoutOverhaulEnabled) => {
  const { request } = state

  return request.get('browser') === 'mobile' && !isCheckoutOverhaulEnabled ? 'yourdetails' : 'delivery'
}

export const getPromoCodeValidationDetails = state => {
  const { form, basket } = state
  const deliveryFormName = getDeliveryFormName(state)
  const delivery = Immutable.fromJS(form[deliveryFormName].values).get('delivery')

  return {
    promo_code: basket.get('promoCode', ''),
    phone_number: delivery.get('phone') ? `0${delivery.get('phone')}` : '',
    postcode: delivery.get('postcode'),
    line1: delivery.get('houseNo', '')
  }
}
