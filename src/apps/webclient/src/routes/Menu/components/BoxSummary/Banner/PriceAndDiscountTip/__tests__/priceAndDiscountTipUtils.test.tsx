import Immutable from 'immutable'
import { renderHook } from '@testing-library/react-hooks'
import { useSelector, RootStateOrAny } from 'react-redux'
import { getIsAuthenticated } from 'selectors/auth'
import {
  useDiscountDescriptor,
  formatDiscountTip,
  getDiscountFromStore,
  getDiscountFromPricing,
} from '../priceAndDiscountTipUtils'

jest.mock('routes/Menu/domains/pricing', () => ({
  usePricing: jest.fn().mockReturnValue({
    pricing: {
      grossTotal: '49.99',
      recipeTotalDiscounted: '29.99',
      flatDiscountApplied: false,
      amountOff: null,
      percentageOff: '60.0000',
      promoCode: 'DTI-SB-6030',
    },
  }),
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

const mockedUseSelector = useSelector as jest.MockedFunction<typeof useSelector>

describe('priceAndDiscountTipUtils', () => {
  describe('given getDiscountFromStore is called', () => {
    let state: RootStateOrAny

    describe('when the promo store has details that say the promo code is flat-discount', () => {
      beforeEach(() => {
        state = {
          basket: Immutable.fromJS({
            promoCode: 'DTI-SB-6030',
          }),
          promoStore: Immutable.fromJS({
            'DTI-SB-6030': {
              details: {
                'discount-whole-order-amount': 40,
              },
            },
          }),
        }
      })

      test('then it should extract amount and say kind is flat', () => {
        expect(getDiscountFromStore(state)).toEqual({
          isDiscountEnabled: true,
          discountKind: 'flat',
          discountAmount: 40,
        })
      })
    })

    describe('when the promo store has details that say the promo code is percentage-discount', () => {
      beforeEach(() => {
        state = {
          basket: Immutable.fromJS({
            promoCode: 'DTI-SB-6030',
          }),
          promoStore: Immutable.fromJS({
            'DTI-SB-6030': {
              details: {
                'discount-whole-order-percent': 60,
              },
            },
          }),
        }
      })

      test('then it should extract amount and say kind is percentage', () => {
        expect(getDiscountFromStore(state)).toEqual({
          isDiscountEnabled: true,
          discountKind: 'percentage',
          discountAmount: 60,
        })
      })
    })
  })

  describe('given getDiscountFromPricing is called', () => {
    describe('when pricing is unavailble', () => {
      const pricing = null

      test('then it should report the correct data', () => {
        expect(getDiscountFromPricing(pricing)).toEqual({
          isDiscountEnabled: false,
        })
      })
    })

    describe('when pricing says the discount is flat-discount', () => {
      const pricing = {
        grossTotal: '49.99',
        recipeTotalDiscounted: '9.99',
        flatDiscountApplied: true,
        amountOff: '40.0000',
        promoCode: 'DTI-SB-6030',
        percentageOff: null,
      }

      test('then it should extract amount and say kind is flat', () => {
        expect(getDiscountFromPricing(pricing)).toEqual({
          isDiscountEnabled: true,
          discountKind: 'flat',
          discountAmount: '40.0000',
        })
      })
    })

    describe('when pricing says the discount is percentage-discount', () => {
      const pricing = {
        grossTotal: '49.99',
        recipeTotalDiscounted: '29.99',
        flatDiscountApplied: false,
        amountOff: null,
        percentageOff: '60.0000',
        promoCode: 'DTI-SB-6030',
      }

      test('then it should extract amount and say kind is percentage', () => {
        expect(getDiscountFromPricing(pricing)).toEqual({
          isDiscountEnabled: true,
          discountKind: 'percentage',
          discountAmount: '60.0000',
        })
      })
    })

    describe('when pricing says the discount is flat but amount is 0', () => {
      const pricing = {
        grossTotal: '49.99',
        recipeTotalDiscounted: '49.99',
        flatDiscountApplied: true,
        amountOff: '0.0000',
        percentageOff: null,
        promoCode: 'DTI-SB-6030',
      }

      test('then it should say the discount is not enabled', () => {
        expect(getDiscountFromPricing(pricing)).toEqual({
          isDiscountEnabled: false,
        })
      })
    })
  })

  describe('given useDiscountDescriptor is invoked by a component', () => {
    describe('when user is not authenticated', () => {
      beforeEach(() => {
        mockedUseSelector.mockImplementation((selectorFn) => {
          if (selectorFn === getIsAuthenticated) {
            return false
          } else {
            return {
              isDiscountEnabled: true,
              discountKind: 'flat',
              discountAmount: 40,
            }
          }
        })
      })

      test('then it should return data from promo store', () => {
        const { result } = renderHook(() => useDiscountDescriptor())

        expect(result.current).toEqual({
          isDiscountEnabled: true,
          discountKind: 'flat',
          discountAmount: 40,
        })
      })
    })

    describe('when user is authenticated', () => {
      beforeEach(() => {
        mockedUseSelector.mockImplementation((selectorFn) => {
          if (selectorFn === getIsAuthenticated) {
            return true
          } else {
            return {
              isDiscountEnabled: true,
              discountKind: 'flat',
              discountAmount: 40,
            }
          }
        })
      })

      test('then it should return data from the pricing hook', () => {
        const { result } = renderHook(() => useDiscountDescriptor())

        expect(result.current).toEqual({
          isDiscountEnabled: true,
          discountKind: 'percentage',
          discountAmount: '60.0000',
        })
      })
    })
  })

  describe('given formatDiscountTip is called', () => {
    test('then it should return a human-readable discount description', () => {
      expect(
        formatDiscountTip({
          isDiscountEnabled: false,
        }),
      ).toBe(null)
      expect(
        formatDiscountTip({
          isDiscountEnabled: true,
          discountKind: 'percentage',
          discountAmount: '60.0000',
        }),
      ).toEqual('60% off your box')
      expect(
        formatDiscountTip({
          isDiscountEnabled: true,
          discountKind: 'flat',
          discountAmount: '40.0000',
        }),
      ).toEqual('£40 off your box')
    })
  })
})
