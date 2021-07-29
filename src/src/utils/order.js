import Immutable from 'immutable'
import moment from 'moment'
import { formatPrice } from 'utils/format'

const ELIGIBILITY_DAYS = 10
const hyphen = String.fromCharCode(45)

export function isOrderBeingDeliveredToday(deliveryDate) {
  const now = moment()
  const orderDeliveryDate = moment(deliveryDate)
  const nextOrderIsToday = now.format('YYMMDD') === orderDeliveryDate.format('YYMMDD')

  return nextOrderIsToday
}

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

export function findNewestOrder(orders, areFutureOrdersIncluded) {
  const now = moment()

  const orderIndex = orders.reduce((currentOrderIndex, order, index) => {
    const orderDeliveryDate = moment(order.get('deliveryDate')).endOf('day')
    const orderValidComparedToNow = areFutureOrdersIncluded
      ? orderDeliveryDate.isAfter(now)
      : orderDeliveryDate.isBefore(now)

    if (!orderValidComparedToNow) return currentOrderIndex
    if (currentOrderIndex === null) return index

    const currentOrderDeliveryDate = moment(
      orders.getIn([currentOrderIndex, 'deliveryDate'])
    ).endOf('day')

    return orderDeliveryDate.isBetween(currentOrderDeliveryDate, now)
      || orderDeliveryDate.isBetween(now, currentOrderDeliveryDate)
      ? index
      : currentOrderIndex
  }, null)

  return orders.get(orderIndex, null)
}

export function isOrderEligibleForSelfRefundResolution(previousOrder) {
  const now = moment()
  const numberOfDaysSincePreviousOrder = previousOrder
    && now.diff(moment(previousOrder.get('deliveryDate')), 'days', true)

  return numberOfDaysSincePreviousOrder && numberOfDaysSincePreviousOrder < ELIGIBILITY_DAYS
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

export const getAffiliateTrackingData = (
  commissionGroup = '',
  order = Immutable.Map({}),
  basket = Immutable.Map({}),
) => ({
  orderId: order.get('id', ''),
  total: order.getIn(['prices','total'], ''),
  commissionGroup,
  promoCode: getConfirmationPromoCode(order, basket),
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
