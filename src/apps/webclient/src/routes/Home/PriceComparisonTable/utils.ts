import { Currency } from './enums'

export const formatPriceText = (currency?: Currency, priceDiff?: number) =>
  currency !== undefined && priceDiff !== undefined
    ? `Pay on average ${currency}${priceDiff} more`
    : 'Best value'
