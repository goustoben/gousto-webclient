import { getPromoCode } from 'selectors/basket'
import gaID from 'config/head/gaTracking'
import { trackAffiliatePurchase } from "actions/tracking/trackAffiliatePurchase"

export const trackPurchase = ({orderId}) => (
  (dispatch, getState) => {
    const state = getState()
    const {pricing} = state
    const promoCode = getPromoCode(state)
    const prices = pricing.get('prices')
    const totalPrice = prices.get('grossTotal')
    const shippingPrice = prices.get('deliveryTotal')
    const gaIDTracking = gaID[__ENV__]// eslint-disable-line no-underscore-dangle

    if (typeof ga !== 'undefined') {
      ga('create', gaIDTracking, 'auto', 'gousto')
      ga('gousto.require', 'ec')
      ga('gousto.ec:setAction', 'purchase', {
        id: orderId,
        revenue: totalPrice,
        shipping: shippingPrice,
        coupon: promoCode
      })
      ga('gousto.send', 'pageview')
    }

    dispatch(trackAffiliatePurchase({
      orderId,
      total: prices.get('total', ''),
      commissionGroup: 'FIRSTPURCHASE',
      promoCode,
    }))
  }
)
