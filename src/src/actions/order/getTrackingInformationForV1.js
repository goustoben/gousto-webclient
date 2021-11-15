export const getTrackingInformationForV1 = (order) => ({
  id: order.id,
  promoCode: order.prices.promo_code,
  total: order.prices.total
})
