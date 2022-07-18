import { DiscountDescriptor } from 'routes/Menu/components/BoxSummary/Banner/PriceAndDiscountTip/priceAndDiscountTipUtils'

import { formatDiscountTip } from '../discountAppliedBarUtils'

const discountDescriptorMock: DiscountDescriptor = {
  isDiscountEnabled: true,
  discountKind: 'flat',
  discountAmount: '999',
}

describe('Given: formatDiscountTip()', () => {
  describe('When: format function being called', () => {
    test('It: should return null if isDiscountEnabled is falsy', () => {
      const updatedDiscountDescriptorMock: DiscountDescriptor = {
        ...discountDescriptorMock,
        isDiscountEnabled: false,
      }

      expect(formatDiscountTip(updatedDiscountDescriptorMock)).toBeNull()
    })

    test('It: should return discount tip with pounds on `flat` price', () => {
      expect(formatDiscountTip(discountDescriptorMock)).toBe('£999 off first box')
    })

    test('It: should return discount tip with percents on `percentage` price', () => {
      const updatedDiscountDescriptorMock: DiscountDescriptor = {
        ...discountDescriptorMock,
        discountKind: 'percentage',
      }

      expect(formatDiscountTip(updatedDiscountDescriptorMock)).toBe('999% off first box')
    })
  })
})
