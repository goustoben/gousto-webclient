export const getUTMAndPromoCode = ({ tracking, basket, promoCurrent }) => ({
  UTM: tracking.get('utmSource'),
  promoCode: basket.get('promoCode') || promoCurrent
})

export const getTransactionType = ({ user, basket }) => {
  // 'transactional' for new transactional orders (one-off box)
  const orderId = basket.get('orderId')
  if (!orderId) return 'transactional'

  // 'subscription' for new subscription orders
  const currentOrderPhase = user?.getIn(['orders', orderId, 'phase'])
  if (currentOrderPhase === 'awaiting_choices') return 'subscription'

  // 'not set' for updates or order reviews
  return 'not set'
}
