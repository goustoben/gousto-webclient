import Immutable from 'immutable'

import { formatPrice } from 'utils/format'

const hyphen = String.fromCharCode(45)

export function formatTotalDiscounts(dashPricing, boxPrice) {
  let totalDiscounts = null
  if (boxPrice) {
    const recipeTotal = parseFloat(boxPrice.get('recipeTotal'))
    const recipeTotalDiscounted = parseFloat(boxPrice.get('recipeTotalDiscounted'))
    if (!dashPricing && recipeTotal > recipeTotalDiscounted) {
      totalDiscounts = `${hyphen}${formatPrice(recipeTotal - recipeTotalDiscounted)}`
    }
  }

  return totalDiscounts
}

export function totalPrice(boxPrice, extrasPrice, slotPrice) {
  let total = boxPrice ? parseFloat(boxPrice.get('recipeTotalDiscounted')) : 0.0
  total += extrasPrice ? parseFloat(extrasPrice) : 0.0
  total += parseFloat(slotPrice)

  return total.toFixed(2)
}

export function isValidPromoCode(prices) {
  return prices.get('promoCodeValid', false)
}

export const getConfirmationPromoCode = (order, basket) => (
  order.getIn(['prices', 'promoCode'], '') || basket.get('promoCode', '')
)

export const getAffiliateTrackingData = (order = Immutable.Map({}), commissionGroup = '') => ({
  orderId: order.get('id', ''),
  total: order.getIn(['prices','total'], ''),
  commissionGroup,
  promoCode: order.getIn(['prices','promoCode'], ''),
})

export const getPreviewOrderErrorName = error => {
  if (error && error.code) {
    switch (error.code) {
    case 'out-of-stock':
      return 'no-stock'
    case 'basket-expired':
      return 'basket-expired'
    default:
      return 'undefined-error'
    }
  }

  return 'undefined-error'
}

export default {
  formatTotalDiscounts,
  totalPrice,
  isValidPromoCode,
}
