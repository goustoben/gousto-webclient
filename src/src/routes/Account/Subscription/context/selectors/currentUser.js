import { createSelector } from 'reselect'

const getCurrentUser = ({ currentUser }) => (currentUser || {})

export const getCurrentUserPostcode = createSelector(
  getCurrentUser,
  ({ shippingAddress }) => (shippingAddress || {}).postcode
)

export const getFirstName = createSelector(
  getCurrentUser,
  ({ nameFirst }) => nameFirst
)

export const getIsCurrentUserLoaded = createSelector(
  getCurrentUser,
  (currentUser) => Boolean(Object.keys(currentUser).length)
)

export const getCurrentUserDeliveryTariffId = createSelector(
  getCurrentUser,
  ({ deliveryTariffId }) => deliveryTariffId
)
