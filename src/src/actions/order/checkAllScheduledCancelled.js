export const checkAllScheduledCancelled = (orders) => (
  !orders.some(order => (order.get('orderState') === 'scheduled'))
)
