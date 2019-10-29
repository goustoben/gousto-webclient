import Immutable from 'immutable'
import moment from 'moment'

export const filterOrders = (orders) => (
  orders.filter(order => {
    const phase = order.get('phase')

    return phase !== 'delivered'
  })
)

export const getOrderState = (state, deliveryDate, recipeItems) => {
  const isDeliveryDay = moment().isSame(deliveryDate, 'day')

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
    const whenCutoff = order.get('whenCutoff')
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

    const orderState = getOrderState(state, deliveryDate, recipeItems)
    const deliveryDayRescheduledReason = getDeliveryDayRescheduledReason(originalDeliveryDay)
    const cancellable = phase === 'awaiting_choices' || phase === 'open'

    return ordersAccumulator.set(
      id,
      Immutable.Map({
        id,
        orderState,
        whenMenuOpen: whenLive,
        whenCutoff,
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
