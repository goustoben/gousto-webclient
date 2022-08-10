import { TableItemType, Currency } from 'routes/Home/PriceComparisonTable/enums'

export type TableItemData = {
  id: string
  type: TableItemType
  currency: Currency
  price: number
  priceDescription: string
  priceDiff: number
  priceText: (currency?: Currency, priceDiff?: number) => string
}
