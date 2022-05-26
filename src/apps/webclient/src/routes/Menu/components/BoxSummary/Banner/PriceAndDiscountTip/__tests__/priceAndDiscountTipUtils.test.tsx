import React from 'react'

import { render, RenderResult } from '@testing-library/react'
import Immutable from 'immutable'
import { RootStateOrAny, Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import { actionTypes } from 'actions/actionTypes'

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
        flatDiscountApplied: true,
        amountOff: '10.0000',
        percentageOff: null,
        promoCodeValid: true,
        pricePerPortion: '6.25',
        pricePerPortionDiscounted: '6.25',
        productTotal: '0.00',
        recipeTotal: '24.99',
        surchargeTotal: '0.00',
        recipeDiscount: '0.00',
        deliveryTotal: '0.00',
        grossTotal: '24.99',
        vatCharged: '0.00',
        total: '24.99',
        totalDiscount: '0.00',
        recipeTotalDiscounted: '14.99',
        items: [],
        promoCode: 'TEST-10',
      }
      test('then it should extract amount and say kind is flat', () => {
        expect(getDiscountFromPricing(pricing)).toEqual({
          isDiscountEnabled: true,
          discountKind: 'flat',
          discountAmount: '10.0000',
        })
      })
    })

    describe('when pricing says the discount is percentage-discount', () => {
      const pricing = {
        flatDiscountApplied: false,
        amountOff: null,
        percentageOff: '60.0000',
        promoCodeValid: true,
        pricePerPortion: '6.25',
        pricePerPortionDiscounted: '6.25',
        productTotal: '0.00',
        recipeTotal: '24.99',
        surchargeTotal: '0.00',
        recipeDiscount: '0.00',
        deliveryTotal: '0.00',
        grossTotal: '49.99',
        vatCharged: '0.00',
        total: '24.99',
        totalDiscount: '0.00',
        recipeTotalDiscounted: '29.99',
        items: [],
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
        flatDiscountApplied: true,
        amountOff: '0.0000',
        percentageOff: null,
        promoCodeValid: true,
        pricePerPortion: '6.25',
        pricePerPortionDiscounted: '6.25',
        productTotal: '0.00',
        recipeTotal: '24.99',
        surchargeTotal: '0.00',
        recipeDiscount: '0.00',
        deliveryTotal: '0.00',
        grossTotal: '49.99',
        vatCharged: '0.00',
        total: '24.99',
        totalDiscount: '0.00',
        recipeTotalDiscounted: '49.99',
        items: [],
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
    const mockStore = configureMockStore()
    const Test = () => {
      const result = useDiscountDescriptor()

      return <div data-testid="result" data-result={JSON.stringify(result)} />
    }

    describe('when user is not authenticated', () => {
      const state = {
        auth: Immutable.fromJS({
          isAuthenticated: false,
        }),
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
        pending: Immutable.fromJS({
          [actionTypes.PROMO_GET]: false,
        }),
      }
      const mockedStore = mockStore(state)
      let rendered: RenderResult

      beforeEach(() => {
        rendered = render(
          <Provider store={mockedStore}>
            <Test />
          </Provider>,
        )
      })

      test('then it should return data from the promo store', () => {
        const { getByTestId } = rendered
        const element = getByTestId('result')
        expect(JSON.parse(element.dataset.result as string)).toEqual({
          isDiscountEnabled: true,
          discountKind: 'flat',
          discountAmount: 40,
        })
      })
    })

    describe('when user is authenticated', () => {
      const state = {
        auth: Immutable.fromJS({
          isAuthenticated: true,
        }),
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
        pending: Immutable.fromJS({
          [actionTypes.PROMO_GET]: false,
        }),
      }
      const mockedStore = mockStore(state)
      let rendered: RenderResult

      beforeEach(() => {
        rendered = render(
          <Provider store={mockedStore}>
            <Test />
          </Provider>,
        )
      })

      test('then it should return data from the pricing hook', () => {
        const { getByTestId } = rendered
        const element = getByTestId('result')
        expect(JSON.parse(element.dataset.result as string)).toEqual({
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
