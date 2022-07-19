import React from 'react'

import { render, RenderResult } from '@testing-library/react'

import { Price } from '../Price'

describe('Price', () => {
  let rendered: RenderResult

  describe('when isPending is true', () => {
    beforeEach(() => {
      rendered = render(<Price pricing={null} isPending />)
    })

    test('then it should render a dash', () => {
      const { getByText } = rendered
      expect(getByText('£—')).toBeDefined()
    })
  })

  describe('when isPending is false and there is a discount', () => {
    const pricing = {
      flatDiscountApplied: false,
      amountOff: '0.00',
      percentageOff: '60.00',
      promoCode: 'DTI-SB-63',
      promoCodeValid: true,
      pricePerPortion: '6.25',
      pricePerPortionDiscounted: '2.50',
      productTotal: '0.00',
      recipeTotal: '24.99',
      surchargeTotal: '0.00',
      recipeDiscount: '14.99',
      deliveryTotal: '0.00',
      grossTotal: '24.99',
      vatCharged: '0.00',
      total: '10.00',
      totalDiscount: '14.99',
      recipeTotalDiscounted: '10.00',
      items: [],
      isDeliveryFree: true,
    }

    beforeEach(() => {
      rendered = render(<Price pricing={pricing} isPending={false} />)
    })

    test('then it should render a striked-out price and the final price', () => {
      const { getByText } = rendered
      expect(getByText('£24.99')).toBeDefined()
      expect(getByText('£10.00')).toBeDefined()
    })
  })

  describe('when isPending is false and there is no discount', () => {
    const pricing = {
      flatDiscountApplied: false,
      amountOff: '0.00',
      percentageOff: '0.00',
      promoCodeValid: false,
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
      recipeTotalDiscounted: '24.99',
      items: [],
      promoCode: null,
      isDeliveryFree: true,
    }

    beforeEach(() => {
      rendered = render(<Price pricing={pricing} isPending={false} />)
    })

    test('then it should render only the final price', () => {
      const { getByText } = rendered
      expect(getByText('£24.99')).toBeDefined()
    })
  })
})
