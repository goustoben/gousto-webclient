export const getPendingOrdersDates = (orders) => (
  orders.filter(order => (['confirmed', 'dispatched'].indexOf(order.get('orderState')) > -1))
    .map(order => order.get('deliveryDay'))
)
