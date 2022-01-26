import { createSelector } from 'reselect'

export const getCheckoutUrgency = ({ checkoutUrgency }) => checkoutUrgency

export const getCheckoutUrgencyCurrentStatus = createSelector(
  getCheckoutUrgency,
  (checkoutUrgency) => checkoutUrgency.get('currentStatus')
)
