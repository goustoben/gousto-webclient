import { actionTypes } from 'actions/actionTypes'

export const orderConfirmationUpdateOrderTracking = () => (
  (dispatch, getState) => {
    const {basket, user} = getState()
    const orderId = basket.get('orderId')
    const basketOrderDetails = basket.get('orderDetails')
    const prices = basketOrderDetails.get('prices')
    const orderTotal = prices.get('total')
    const promoCode = prices.get('promoCode')
    const subscription = user.get('subscription')
    const subscriptionActive = subscription.get('state') === 'active'

    dispatch({
      type: actionTypes.ORDER_CONFIRMATION_EDITED_TRACKING,
      trackingData: {
        actionType: 'Order Edited',
        order_id: orderId,
        order_total: orderTotal,
        promo_code: promoCode,
        signup: false,
        subscription_active: subscriptionActive,
      },
    })
  }
)
