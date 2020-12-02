import { createSelector } from 'reselect'

const getCurrentUser = ({ currentUser }) => (currentUser || {shippingAddress: ''})

export const getCurrentUserPostcode = createSelector(
  getCurrentUser,
  (currentUser) => currentUser.shippingAddress.postcode
)
