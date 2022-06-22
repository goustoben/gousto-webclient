export const formatDeliveryPrice = (price: string): string =>
  price === '0.00' ? 'Free' : `£${price}`
