import { formatPrice, getFirstPartPostcode, formatLabelPlural, formatDashOrPrice, formatDeliveryTotal, formatRecipeDiscount } from 'utils/format'

describe('formatPrice', () => {
  test('should return string with £ sign appended before price & fixed at 2 decimal points', () => {
    expect(formatPrice(4.99)).toEqual('£4.99')
    expect(formatPrice('10')).toEqual('£10.00')
  })
})

describe('getFirstPartPostcode', () => {
  test('should return a lowercase first half of a postcode', () => {
    expect(getFirstPartPostcode('N178lY')).toEqual('n17')
    expect(getFirstPartPostcode('N17 8lY')).toEqual('n17')
    expect(getFirstPartPostcode('W30ap')).toEqual('w3')
    expect(getFirstPartPostcode('W3 0ap')).toEqual('w3')
    expect(getFirstPartPostcode('EC1A 1BB')).toEqual('ec1a')
    expect(getFirstPartPostcode('W1A 0AX')).toEqual('w1a')
    expect(getFirstPartPostcode('M1 1AE')).toEqual('m1')
    expect(getFirstPartPostcode('B33 8TH')).toEqual('b33')
  })

  describe('formatLabelPlural', () => {
    test('should return singular string if numItem is 0', () => {
      expect(formatLabelPlural('Recipe', 0)).toEqual('Recipe')
    })
    test('should return singular string and number of recipes if numItem is 1', () => {
      expect(formatLabelPlural('Recipe', 1)).toEqual('Recipe (1)')
    })
    test('should return plural string and number of recipes if numItem is greater than 1', () => {
      expect(formatLabelPlural('Recipe', 2)).toEqual('Recipes (2)')
    })
  })

  describe('formatDashOrPrice', () => {
    test('should return the formatted price by default', () => {
      expect(formatDashOrPrice('24.99', 2, { totalPrice: '24.99' })).toEqual('£24.99')
    })
    test('should return no price indicator if prices is not defined', () => {
      expect(JSON.stringify(formatDashOrPrice('24.99', 2))).toContain('£')
    })
    test('should return no price indicator if numRecipes < 2', () => {
      expect(JSON.stringify(formatDashOrPrice('24.99', 1))).toContain('£')
    })
  })

  describe('formatDeliveryTotal', () => {
    describe('when deliveryTotalPrice is set', () => {
      test('should return formatted delivery price if deliveryTotalPrice > 0', () => {
        expect(formatDeliveryTotal({ deliveryTotal: '2.99' }, '2.99')).toEqual('£2.99')
      })
      test('should return Free if deliveryTotalPrice = 0', () => {
        expect(formatDeliveryTotal({ deliveryTotal: '0.00' }, '0.00')).toEqual('Free')
      })
    })
    test('should return no price indicator if deliveryTotalPrice is not set', () => {
      expect(JSON.stringify(formatDeliveryTotal({ deliveryTotal: '' }, ''))).toContain('£')
    })
  })

  describe('formatRecipeDiscount', () => {
    test('should return the formatted discount percentage if recipeDiscountPercent is set', () => {
      expect(formatRecipeDiscount('50')).toEqual('50% discount')
    })
    test('should return "Discount" if recipeDiscountPercent is not set', () => {
      expect(formatRecipeDiscount('')).toEqual('Discount')
    })
  })
})
