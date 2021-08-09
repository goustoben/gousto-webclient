import { createSelector } from 'reselect'
import {
  checkoutUrgencyDefaultStartSeconds,
  checkoutUrgencyDefaultModalSeconds,
} from 'routes/Checkout/checkoutUrgencyConfig'

const getCheckoutUrgencyFeatureValue = ({ features }) =>
  features && features.getIn(['checkoutUrgency', 'value'], false)

export const getIsCheckoutUrgencyEnabled = createSelector(
  getCheckoutUrgencyFeatureValue,
  (value) => {
    if (value === false) {
      return value
    } else {
      return true
    }
  }
)

const getSecondsFromCheckoutUrgencyValue = (value, partIndex, defaultSeconds) => {
  if (value === false || value === true) {
    return defaultSeconds
  }
  const parts = value.split(',')
  const part = parts[partIndex]
  const minutes = Number.parseFloat(part, 10)
  if (Number.isNaN(minutes)) {
    return defaultSeconds
  }

  return Math.floor(minutes * 60)
}

export const getCheckoutUrgencyStartSeconds = createSelector(
  getCheckoutUrgencyFeatureValue,
  (value) => getSecondsFromCheckoutUrgencyValue(value, 0, checkoutUrgencyDefaultStartSeconds)
)

export const getCheckoutUrgencyModalSeconds = createSelector(
  getCheckoutUrgencyFeatureValue,
  (value) => getSecondsFromCheckoutUrgencyValue(value, 1, checkoutUrgencyDefaultModalSeconds)
)

export const getCheckoutUrgency = ({ checkoutUrgency }) => checkoutUrgency

export const getCheckoutUrgencyCurrentStatus = createSelector(
  getCheckoutUrgency,
  (checkoutUrgency) => checkoutUrgency.get('currentStatus')
)
