export const formatPrice = (price) => {
  if (Number.parseFloat(price) === 0) {
    return 'FREE'
  }

  return `£${price}`
}
