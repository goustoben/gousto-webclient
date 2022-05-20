import { TableItemType, Currency } from 'routes/Home/PriceComparisonTable/enums'

export interface TableItemData {
  id: string
  type: TableItemType
  currency: Currency
  price: number
  priceDescription: string
  priceDiff: number
}
