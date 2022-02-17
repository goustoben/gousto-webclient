export function getSurchargeItems(items = []) {
  return items
    .filter((item) => (item.get('type') ? item.get('type') === 'Surcharge' : false))
}

export const formatOrderPrice = price => (
  price === '0.00' ? 'FREE' : `£${price}`
)
