import Immutable from 'immutable'
import moment from 'moment'

export const filterOrders = (orders) => (
  orders.filter(order => {
    const { phase } = order.toJS()

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

  if (state === 'pending' && !recipeItems.length) {
    return 'menu open'
  }

  if (state === 'pending' && !!recipeItems.length) {
    return 'recipes chosen'
  }

  return state
}

export const getDeliveryDayRescheduledReason = (originalDeliveryDay) => {

  if (originalDeliveryDay) {
    if (originalDeliveryDay.unavailableReason === 'holiday') {
      return 'We\'ve had to change your regular delivery day due to the bank holiday.'
    } else {
      return 'Choose recipes now.'
    }
  }

}

export const transformPendingOrders = (orders) => {
  const futureOrders = filterOrders(orders)

  return futureOrders.reduce((ordersAccumulator, order) => {
    const {
      id,
      state,
      phase,
      whenLive,
      whenCutoff,
      deliveryDayId,
      deliveryDate,
      deliverySlotId,
      deliverySlot,
      prices,
      recipeItems,
      productItems,
      box,
      originalDeliveryDay,
      period,
      shippingAddress
    } = order.toJS()

    const orderState = getOrderState(state, deliveryDate, recipeItems)
    const deliveryDayRescheduledReason = getDeliveryDayRescheduledReason(originalDeliveryDay)
    const cancellable = phase === 'awaiting_choices' || phase === 'open'

    return ordersAccumulator.set(
      id,
      Immutable.fromJS({
        id,
        orderState,
        whenMenuOpen: whenLive,
        whenCutoff,
        shippingAddressId: shippingAddress.id,
        coreDeliveryDayId: deliveryDayId,
        deliveryDay: deliveryDate,
        deliveryDayRescheduled: originalDeliveryDay,
        deliveryDayRescheduledReason,
        deliverySlotId,
        deliverySlotStart: deliverySlot.deliveryStart,
        deliverySlotEnd: deliverySlot.deliveryEnd,
        cancellable,
        priceBreakdown: {
          grossRecipesPrice: parseFloat(prices.recipeTotal),
          grossExtrasPrice: parseFloat(prices.productTotal),
          grossShippingPrice: parseFloat(prices.deliveryTotal),
          grossOrderPrice: parseFloat(prices.grossTotal),
          flatDiscountAmount: parseFloat(prices.totalDiscount),
          percentageDiscountAmount: parseFloat(prices.percentageOff),
          netOrderPrice: parseFloat(prices.total)
        },
        recipes: recipeItems.map(item => ({
          id: item.id,
          title: item.title,
        })),
        products: {
          total: productItems.length,
          elements: productItems.map(item => ({
            id: item.id,
            unitPrice: item.listPrice / item.quantity,
            quantity: item.quantity,
            title: item.title,
          }))
        },
        portionsCount: box.numPortions,
        availableFrom: period.whenStart,
        availableTo: period.whenCutoff
      })
    )
  }, new Immutable.Map())
}
