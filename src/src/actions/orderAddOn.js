import { push } from 'react-router-redux'
import config from 'config/routes'
import actionTypes from 'actions/actionTypes'

export const orderAddOnRedirect = (orderId, orderAction) => (
  (dispatch) => {
    const url = config.client.orderAddOns.replace(':orderId', orderId)
    dispatch(push(`${url}?order_action=${orderAction}`))
  }
)

export const trackSkipOrderAddOnsClick = orderId => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'TrackSkipOrderAddOns Clicked',
    orderId,
  }
})

export const trackContinueOrderAddOnsClick = (orderId, numberOfProducts) => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: 'TrackContinueOrderAddOns Clicked',
    orderId,
    numberOfProducts,
  }
})

