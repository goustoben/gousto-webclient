import Immutable from 'immutable'
import Cookies from 'utils/GoustoCookies'
// eslint-disable-next-line import/no-cycle
import { get } from 'utils/cookieHelper2'

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

  return {
    promo_code: basket.get('promoCode', ''),
    phone_number: delivery.get('phone') ? `0${delivery.get('phone')}` : '',
    postcode: delivery.get('postcode'),
    line1: delivery.get('houseNo', ''),
    name_last: delivery.get('lastName').trim(),
  }
}

export const getCheckoutLastReachedStepIndex = state => state.checkout.get('lastReachedStepIndex')
export const getPasswordValue = state => state.checkout.getIn(['passwordInfo', 'value'])

export const getCheckoutLogData = state => ({
  session_id: get(Cookies, 'gousto_session_id', false, false),
  gousto_ref: state.checkout.get('goustoRef'),
})
