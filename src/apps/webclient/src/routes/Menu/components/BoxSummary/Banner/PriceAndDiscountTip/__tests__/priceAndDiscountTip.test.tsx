import React from 'react'

import { render, screen } from '@testing-library/react'

import * as pricing from 'routes/Menu/domains/pricing'

import { JestSpyInstance } from '../../../../../../../types/jest'
import { PriceAndDiscountTip } from '../PriceAndDiscountTip'
import * as priceAndDiscountTipUtils from '../priceAndDiscountTipUtils'

jest.mock('routes/Menu/domains/pricing', () => ({
  usePricing: jest.fn(),
}))

jest.mock('../priceAndDiscountTipUtils', () => ({
  useDiscountDescriptor: jest.fn(),
  formatDiscountTip: jest.fn(),
}))

let usePricingSpy: JestSpyInstance<typeof pricing.usePricing>
let useDiscountDescriptorSpy: JestSpyInstance<typeof priceAndDiscountTipUtils.useDiscountDescriptor>
let formatDiscountTipSpy: JestSpyInstance<typeof priceAndDiscountTipUtils.formatDiscountTip>

describe('<PriceAndDiscountTip numPortion={} />', () => {
  beforeEach(() => {
    usePricingSpy = jest.spyOn(pricing, 'usePricing')
    useDiscountDescriptorSpy = jest.spyOn(priceAndDiscountTipUtils, 'useDiscountDescriptor')
    formatDiscountTipSpy = jest.spyOn(priceAndDiscountTipUtils, 'formatDiscountTip')
  })

  afterEach(jest.clearAllMocks)

  describe('given 2 or more recipes are added to the basket and discount is NOT applied', () => {
    describe('when price calcuation is in progress', () => {
      beforeEach(() => {
        usePricingSpy.mockReturnValue({
          pricing: {},
          isPending: true,
        })
        useDiscountDescriptorSpy.mockReturnValue({
          isDiscountEnabled: false,
        })
        formatDiscountTipSpy.mockReturnValue(null)
      })
      test('then it should render pricing pending component', () => {
        render(<PriceAndDiscountTip numRecipes={2} />)
        screen.debug()
        expect(screen.queryByText('incl. delivery')).toBeFalsy()
        expect(screen.queryByText('off your box')).toBeFalsy()
        expect(screen.queryByText('£—')).toBeTruthy()
      })
    })

    describe('when price calculation is finished and total price is £0.00', () => {
      beforeEach(() => {
        usePricingSpy.mockReturnValue({
          pricing: {
            total: 0,
            grossTotal: 0,
          },
          isPending: false,
        })
        useDiscountDescriptorSpy.mockReturnValue({
          isDiscountEnabled: false,
        })
        formatDiscountTipSpy.mockReturnValue(null)
      })
      test('then it should render total price £0.00', () => {
        render(<PriceAndDiscountTip numRecipes={2} />)
        expect(screen.queryByText('incl. delivery')).toBeFalsy()
        expect(screen.queryByText('off your box')).toBeFalsy()
        expect(screen.queryByText('£0.00')).toBeTruthy()
      })
    })

    describe('when price calculation is finished and total price is greater than £0', () => {
      beforeEach(() => {
        usePricingSpy.mockReturnValue({
          pricing: {
            grossTotal: 24.49,
            totalDiscount: 0,
            total: 24.49,
          },
          isPending: false,
        })
        useDiscountDescriptorSpy.mockReturnValue({
          isDiscountEnabled: false,
        })
        formatDiscountTipSpy.mockReturnValue(null)
      })
      test('then it should render total price and delivery text', () => {
        render(<PriceAndDiscountTip numRecipes={2} />)
        expect(screen.queryByText('£24.49')).toBeTruthy()
        expect(screen.queryByText('incl. delivery')).toBeTruthy()
      })
    })
  })

  describe('given 2 or more recipes are added to the basket and discount is applied', () => {
    describe('when price calcuation is in progress', () => {
      beforeEach(() => {
        usePricingSpy.mockReturnValue({
          pricing: {},
          isPending: true,
        })
        useDiscountDescriptorSpy.mockReturnValue({
          isDiscountEnabled: true,
          discountKind: 'percentage',
          discountAmount: 40,
        })
        formatDiscountTipSpy.mockReturnValue('40%')
      })
      test('then it should render pricing pending component', () => {
        render(<PriceAndDiscountTip numRecipes={2} />)
        expect(screen.queryByText('incl. delivery')).toBeFalsy()
        expect(screen.queryByText('£—')).toBeTruthy()
      })
    })

    describe('when price calculation is finished and total price is £0.00', () => {
      beforeEach(() => {
        usePricingSpy.mockReturnValue({
          pricing: {
            total: 0,
          },
          isPending: false,
        })
        useDiscountDescriptorSpy.mockReturnValue({
          isDiscountEnabled: true,
          discountKind: 'percentage',
          discountAmount: 40,
        })
        formatDiscountTipSpy.mockReturnValue('40%')
      })
      test('then it should render pricing £0.00', () => {
        render(<PriceAndDiscountTip numRecipes={2} />)
        expect(screen.queryByText('incl. delivery')).toBeFalsy()
        expect(screen.queryByText('£0.00')).toBeTruthy()
      })

      test('then it should render £0.00', () => {
        render(<PriceAndDiscountTip numRecipes={3} />)
        expect(screen.queryByText('incl. delivery')).toBeFalsy()
        expect(screen.queryByText('£0.00')).toBeTruthy()
      })
    })

    describe('when price calculation is finished and total price is greater than £0', () => {
      beforeEach(() => {
        usePricingSpy.mockReturnValue({
          pricing: {
            percentageOff: 40,
            grossTotal: 24.49,
            totalDiscount: 12.21,
            total: 12.21,
          },
          isPending: false,
        })
        useDiscountDescriptorSpy.mockReturnValue({
          isDiscountEnabled: true,
          discountKind: 'percentage',
          discountAmount: 40,
        })
        formatDiscountTipSpy.mockReturnValue('40%')
      })
      test('then it should render total price and delivery text', () => {
        render(<PriceAndDiscountTip numRecipes={2} />)
        expect(screen.queryByText('£24.49')).toBeTruthy()
        expect(screen.queryByText('£12.21')).toBeTruthy()
        expect(screen.queryByText('40% off your box')).toBeTruthy()
      })

      test('then it should render total price and delivery text', () => {
        render(<PriceAndDiscountTip numRecipes={3} />)
        expect(screen.queryByText('£24.49')).toBeTruthy()
        expect(screen.queryByText('£12.21')).toBeTruthy()
        expect(screen.queryByText('40% off your box')).toBeTruthy()
      })
    })
  })

  describe('given 0 or 1 recipe is added to the basket and discount is applied', () => {
    describe('when discount price is available', () => {
      beforeEach(() => {
        usePricingSpy.mockReturnValue({
          pricing: {
            percentageOff: 60,
            grossTotal: 24.49,
            totalDiscount: 12.21,
            total: 12.21,
          },
          isPending: false,
        })
        useDiscountDescriptorSpy.mockReturnValue({
          isDiscountEnabled: true,
          discountKind: 'percentage',
          discountAmount: 60,
        })
        formatDiscountTipSpy.mockReturnValue('60%')
      })

      test('then it should render discoumt tool tip', () => {
        render(<PriceAndDiscountTip numRecipes={0} />)
        expect(screen.queryByText('60% off')).toBeTruthy()
        expect(screen.queryByText('your Gousto box')).toBeTruthy()
      })

      test('then it should render discoumt tool tip', () => {
        render(<PriceAndDiscountTip numRecipes={1} />)
        expect(screen.queryByText('60% off')).toBeTruthy()
        expect(screen.queryByText('your Gousto box')).toBeTruthy()
      })
    })
  })

  describe('given 0 or 1 recipe is added to the basket and discount is NOT applied', () => {
    describe('when discount price is available', () => {
      beforeEach(() => {
        usePricingSpy.mockReturnValue({
          pricing: {
            percentageOff: 0,
            grossTotal: 24.49,
            totalDiscount: 0,
            total: 24.49,
          },
          isPending: false,
        })
        useDiscountDescriptorSpy.mockReturnValue({
          isDiscountEnabled: false,
        })
        formatDiscountTipSpy.mockReturnValue(null)
      })
      test('then it should render View Basket', () => {
        render(<PriceAndDiscountTip numRecipes={0} />)
        expect(screen.queryByText('View Basket')).toBeTruthy()
      })

      test('then it should render View Basket', () => {
        render(<PriceAndDiscountTip numRecipes={1} />)
        expect(screen.queryByText('View Basket')).toBeTruthy()
      })
    })
  })
})
