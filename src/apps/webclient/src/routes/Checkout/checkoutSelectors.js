import Immutable from 'immutable'
import { createSelector } from 'reselect'

import Cookies from 'utils/GoustoCookies'
// eslint-disable-next-line import/no-cycle
import { get } from 'utils/cookieHelper2'
import { parsePhoneNumber } from 'utils/phoneNumber/phoneNumber'

export const getCheckoutUrgency = ({ checkoutUrgency }) => checkoutUrgency

export const getCheckoutUrgencyCurrentStatus = createSelector(
  getCheckoutUrgency,
  (checkoutUrgency) => checkoutUrgency.get('currentStatus'),
)

export const hasCheckoutError = (state) => {
  const errors = state.checkout.get('errors')
  if (!errors) {
    return false
  }

  return errors.filter((error) => error).size > 0
}

export const accountFormName = 'account'
export const deliveryFormName = 'delivery'

export const getFormattedPhoneNumber = ({ form }) => {
  const delivery = Immutable.fromJS(form[deliveryFormName].values).get('delivery')
  const phone = parsePhoneNumber(delivery.get('phone', ''), 'GB')

  return phone ? phone.formatNational().replace(/\s/g, '') : ''
}

export const getCheckoutLastReachedStepIndex = (state) => state.checkout.get('lastReachedStepIndex')
export const getPasswordValue = (state) => state.checkout.getIn(['passwordInfo', 'value'])

export const getFeLoggingCorrelationData = (state) => ({
  session_id: get(Cookies, 'gousto_session_id', false, false),
  gousto_ref: state.checkout.get('goustoRef'),
})

export const getSignupE2ETestName = ({ features }) =>
  features && features.getIn(['signupE2ETestName', 'value'], '')

/**
 * Returns true if Apple Pay is enabled in browser and supported by Apple Pay API
 */
export const getIsApplePayEnabled = (state) => state.checkout.get('isApplePayEnabled')
