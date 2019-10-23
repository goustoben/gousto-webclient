import Immutable from 'immutable'
import moment from 'moment'

export const transformPendingOrders = (orders) => {

  return orders.reduce((ordersAccumulator, order) => {
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

    const isDeliveryDay = moment().isSame(deliveryDate, 'day')

    let orderState = state

    if (state === 'committed' && isDeliveryDay) {
      orderState = 'dispatched'
    }

    if (state === 'committed' && !isDeliveryDay) {
      orderState = 'confirmed'
    }

    if (state === 'pending' && !recipeItems.length) {
      orderState = 'menu open'
    }

    if (state === 'pending' && !!recipeItems.length) {
      orderState = 'recipes chosen'
    }

    let deliveryDayRescheduledReason = null

    if (originalDeliveryDay) {
      if (originalDeliveryDay.unavailableReason === 'holiday') {
        deliveryDayRescheduledReason = 'We\'ve had to change your regular delivery day due to the bank holiday.'
      } else {
        deliveryDayRescheduledReason = 'Choose recipes now.'
      }
    }

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
        cancellable: phase === 'awaiting_choices' || phase === 'open',
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
          image:
            'https://production-media.gousto.co.uk/cms/mood-image/1186---Annabels-Scrummy-Fish-Chowder-2-x300.jpg'
        })),
        products: {
          total: productItems.length,
          elements: productItems.map(item => ({
            id: item.id,
            unitPrice: item.listPrice / item.quantity,
            quantity: item.quantity,
            title: item.title,
            image:
              'https://production-media.gousto.co.uk/cms/mood-image/1186---Annabels-Scrummy-Fish-Chowder-2-x300.jpg'
          }))
        },
        portionsCount: box.numPortions,
        availableFrom: period.whenStart,
        availableTo: period.whenCutoff
      })
    )
  }, new Immutable.Map())
}
