import React from 'react'
import Immutable from 'immutable'
import { renderHook } from '@testing-library/react-hooks'
import { useSelector } from 'react-redux'
import { Pricing, usePricing } from 'routes/Menu/domains/pricing'
import { getIsAuthenticated } from 'selectors/auth'
import { useCheckoutPrices, useDiscountTip, createExtractDiscountFromStore } from '../utilHooks'

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

describe('BoxSummary utilHooks', () => {
  describe('given createExtractDiscountFromStore is called', () => {
    let selector
    let state

    beforeEach(() => {
      selector = createExtractDiscountFromStore('DTI-SB-6030')
    })

    describe('when the promo store has details that say the promo code is flat-discount', () => {
      beforeEach(() => {
        state = {
          promoStore: Immutable.fromJS({
            'DTI-SB-6030': {
              details: {
                'discount-whole-order-amount': 40,
              },
            },
          }),
        }
      })

      test('then the returned selector should extract amount and say flat is true', () => {
        expect(selector(state)).toEqual([40, true])
      })
    })

    describe('when the promo store has details that say the promo code is percentage-discount', () => {
      beforeEach(() => {
        state = {
          promoStore: Immutable.fromJS({
            'DTI-SB-6030': {
              details: {
                'discount-whole-order-percent': 60,
              },
            },
          }),
        }
      })

      test('then the returned selector should extract amount and say flat is false', () => {
        expect(selector(state)).toEqual([60, false])
      })
    })
  })

  describe('given useCheckoutPrices is invoked by a component', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selectorFn) => {
        if (selectorFn === getIsAuthenticated) {
          return false
        } else {
          return [60, false]
        }
      })
    })

    test('then it should return correct data', () => {
      const { result } = renderHook(() => useCheckoutPrices())

      expect(result.current).toEqual({
        grossPrice: 49.99,
        totalPrice: 29.99,
        isDiscountEnabled: true,
        isDiscountFlat: false,
        discountAmount: 60,
      })
    })
  })

  describe('given useDiscountTip is invoked by a component', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selectorFn) => {
        if (selectorFn === getIsAuthenticated) {
          return false
        } else {
          return [60, false]
        }
      })
    })

    test('then it should return human-readable discount description', () => {
      const { result } = renderHook(() => useDiscountTip())

      expect(result.current).toEqual('60% off your box')
    })

    describe('when the discount is flat', () => {
      beforeEach(() => {
        useSelector.mockImplementation((selectorFn) => {
          if (selectorFn === getIsAuthenticated) {
            return false
          } else {
            return [40, true]
          }
        })
      })

      test('then it should return the correct string', () => {
        const { result } = renderHook(() => useDiscountTip())

        expect(result.current).toEqual('£40 off your box')
      })
    })

    describe('when there is no discount', () => {
      beforeEach(() => {
        useSelector.mockImplementation((selectorFn) => {
          if (selectorFn === getIsAuthenticated) {
            return false
          } else {
            return [null, null]
          }
        })
      })

      test('then it should return null', () => {
        const { result } = renderHook(() => useDiscountTip())

        expect(result.current).toEqual(null)
      })
    })
  })
})
