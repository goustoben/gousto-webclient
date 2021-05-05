import { getFormValues } from 'redux-form'
import localisationConfig from 'config/localisation'
import { accountFormName, deliveryFormName } from 'selectors/checkout'

function formatString(value) {
  return typeof value === 'string' ? value.replace(/ /g, '').toLowerCase() : value
}

function formatPhone(value) {
  return `${localisationConfig.countryCode}${value}`
}

export function getAvailableUserData(action, state = {}) {
  let data
  const aboutYouValues = (getFormValues(accountFormName)(state) || {}).aboutyou || {}

  if (aboutYouValues.email) {
    data = {
      em: formatString(aboutYouValues.email),
      fn: formatString(aboutYouValues.firstName),
      ln: formatString(aboutYouValues.lastName),
      zp: formatString(state.basket.get('postcode')),
    }

    const deliveryValues = (getFormValues(deliveryFormName)(state) || {}).delivery || {}

    if (deliveryValues.postcode) {
      data = {
        ...data,
        ph: deliveryValues.phone ? formatPhone(deliveryValues.phone) : undefined,
        ct: formatString(deliveryValues.town),
        st: formatString(deliveryValues.county),
        zp: formatString(deliveryValues.postcode),
      }
    }
  }

  return data
}
