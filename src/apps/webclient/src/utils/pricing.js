export function getSurchargeItems(items = []) {
  return items
    .filter((item) => (item?.type ? item.type === 'Surcharge' : false))
}

export const formatOrderPrice = price => (
  price === '0.00' ? 'FREE' : `£${price}`
)
