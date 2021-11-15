export const getTrackingInformationForV2 = (order) => ({
  id: order.id,
  promoCode: order.attributes.prices.isPromoCodeValid,
  total: order.attributes.prices.total,
})
