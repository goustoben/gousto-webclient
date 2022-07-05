import { formatPrice } from 'utils/format'

interface DeliveryPriceConfig {
  deliveryPriceFormatted: string
  DELIVERY_PRICE: number
}

const DELIVERY_PRICE = 1.99

export const deliveryPriceConfig: DeliveryPriceConfig = {
  deliveryPriceFormatted: formatPrice(DELIVERY_PRICE),
  DELIVERY_PRICE,
}
