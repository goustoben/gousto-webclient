export const formatDeliveryPrice = (price: string, zeroPiceLabel = 'Free'): string =>
  price === '0.00' ? zeroPiceLabel : `£${price}`
