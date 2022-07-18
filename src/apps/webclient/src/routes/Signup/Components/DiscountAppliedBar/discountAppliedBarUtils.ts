import { DiscountDescriptor } from 'routes/Menu/components/BoxSummary/Banner/PriceAndDiscountTip/priceAndDiscountTipUtils'

// FYI: this is a copy just to speed up experiment release
export const formatDiscountTip = (discountDescriptor: DiscountDescriptor): string | null => {
  const { isDiscountEnabled, discountKind, discountAmount } = discountDescriptor
  if (!isDiscountEnabled) {
    return null
  }
  const formattedAmount = Math.ceil(parseFloat(discountAmount as string))
  const discountTip =
    discountKind === 'flat'
      ? `£${formattedAmount} off first box`
      : `${formattedAmount}% off first box`

  return discountTip
}
