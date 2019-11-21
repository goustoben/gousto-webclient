import Immutable from 'immutable'
import moment from 'moment'

const getProjectedDeliveryDayRescheduledReason = (unavailableReason, humanWhenMenuLive) => {
  if (unavailableReason === 'holiday') {
    return "We've had to change your regular delivery day due to the bank holiday."
  }

  if (unavailableReason) {
    return `Recipes available from ${humanWhenMenuLive}`
  }
}

export const filterOrders = (orders) => (
  orders.filter(order => {
    const phase = order.get('phase')

    return phase !== 'delivered'
  })
)

export const getOrderState = (state, deliveryDate, recipeItems, phase) => {
  const isDeliveryDay = moment().isSame(deliveryDate, 'day')

  if (phase === 'pre-menu') {
    return 'scheduled'
  }

  if (state === 'committed' && isDeliveryDay) {
    return 'dispatched'
  }

  if (state === 'committed' && !isDeliveryDay) {
    return 'confirmed'
  }

  if (state === 'pending' && !recipeItems.size) {
    return 'menu open'
  }

  if (state === 'pending' && !!recipeItems.size) {
    return 'recipes chosen'
  }

  return state
}

export const getDeliveryDayRescheduledReason = (originalDeliveryDay) => {

  if (originalDeliveryDay && originalDeliveryDay.size) {
    if (originalDeliveryDay.get('unavailableReason') === 'holiday') {
      return 'We\'ve had to change your regular delivery day due to the bank holiday.'
    } else {
      return 'Choose recipes now.'
    }
  }

}

export const transformPendingOrders = (orders) => {
  const futureOrders = filterOrders(orders)

  return futureOrders.reduce((ordersAccumulator, order) => {
    const id = order.get('id')
    const state = order.get('state')
    const phase = order.get('phase')
    const whenLive = order.get('whenLive')
    const shouldCutoffAt = order.get('shouldCutoffAt')
    const isCurrentPeriod = order.get('isCurrentPeriod')
    const deliveryDayId = order.get('deliveryDayId')
    const deliveryDate = order.get('deliveryDate')
    const deliverySlotId = order.get('deliverySlotId')
    const deliverySlot = order.get('deliverySlot')
    const prices = order.get('prices')
    const recipeItems = order.get('recipeItems')
    const productItems = order.get('productItems')
    const box = order.get('box')
    const originalDeliveryDay = order.get('originalDeliveryDay')
    const period = order.get('period')
    const shippingAddress = order.get('shippingAddress')

    const orderState = getOrderState(state, deliveryDate, recipeItems, phase)
    const deliveryDayRescheduledReason = getDeliveryDayRescheduledReason(originalDeliveryDay)
    const cancellable = phase === 'awaiting_choices' || phase === 'open'

    return ordersAccumulator.set(
      id,
      Immutable.Map({
        id,
        orderState,
        whenMenuOpen: whenLive,
        whenCutoff: shouldCutoffAt,
        isCurrentPeriod,
        shippingAddressId: shippingAddress.get('id'),
        coreDeliveryDayId: deliveryDayId,
        deliveryDay: deliveryDate,
        deliveryDayRescheduled: originalDeliveryDay,
        deliveryDayRescheduledReason,
        deliverySlotId,
        deliverySlotStart: deliverySlot.get('deliveryStart'),
        deliverySlotEnd: deliverySlot.get('deliveryEnd'),
        cancellable,
        priceBreakdown: Immutable.Map({
          grossRecipesPrice: parseFloat(prices.get('recipeTotal')),
          grossExtrasPrice: parseFloat(prices.get('productTotal')),
          grossShippingPrice: parseFloat(prices.get('deliveryTotal')),
          grossOrderPrice: parseFloat(prices.get('grossTotal')),
          flatDiscountAmount: parseFloat(prices.get('totalDiscount')),
          percentageDiscountAmount: parseFloat(prices.get('percentageOff')),
          netOrderPrice: parseFloat(prices.get('total'))
        }),
        recipes: recipeItems.map(item => (Immutable.Map({
          id: item.get('id'),
          title: item.get('title'),
          recipeId: item.get('recipeId'),
        }))),
        products: Immutable.Map({
          total: productItems.size,
          elements: productItems.map(item => (Immutable.Map({
            id: item.get('id'),
            unitPrice: item.get('listPrice') / item.get('quantity'),
            quantity: item.get('quantity'),
            title: item.get('title'),
          })))
        }),
        portionsCount: box.get('numPortions'),
        availableFrom: period.get('whenStart'),
        availableTo: period.get('whenCutoff')
      })
    )
  }, new Immutable.Map())
}

export const transformProjectedDeliveries = (projectedDeliveries) => {

  return projectedDeliveries.reduce((deliveryAccumulator, delivery) => {
    const id = delivery.get('id')
    const date = delivery.get('date')
    const whenCutoff = delivery.get('whenCutoff')
    const humanWhenMenuLive = delivery.get('humanWhenMenuLive')
    const whenMenuLive = delivery.get('whenMenuLive')
    const deliverySlot = delivery.get('deliverySlot')
    const active = delivery.get('active')
    const unavailableReason = delivery.get('unavailableReason')
    const alternateDeliveryDay = delivery.get('alternateDeliveryDay')
    const deliveryDayId = delivery.get('id')

    const orderState = parseInt(active) === 1 ? 'scheduled' : 'cancelled'
    const deliveryDayRescheduledReason = getProjectedDeliveryDayRescheduledReason(unavailableReason, humanWhenMenuLive)
    const restorable = parseInt(active) === 0

    return deliveryAccumulator.set(
      id,
      Immutable.Map({
        id,
        orderState,
        deliveryDay: date,
        whenCutoff,
        whenMenuOpen: whenMenuLive,
        deliverySlotStart: deliverySlot.get('deliveryStart'),
        deliverySlotEnd: deliverySlot.get('deliveryEnd'),
        deliveryDayRescheduledReason,
        alternateDeliveryDay,
        isProjected: true,
        restorable,
        cancellable: true,
        deliveryDayId,
      })
    )
  }, new Immutable.Map())
}
