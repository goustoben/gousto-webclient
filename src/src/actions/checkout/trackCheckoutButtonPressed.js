import { actionTypes } from 'actions/actionTypes'

export const trackCheckoutButtonPressed = (type, property) => {
  const tracking = {
    actionType: type,
    seCategory: 'Checkout',
    ...property
  }

  return {
    type: actionTypes.TRACKING,
    trackingData: tracking,
    gtmEvent: tracking
  }
}
