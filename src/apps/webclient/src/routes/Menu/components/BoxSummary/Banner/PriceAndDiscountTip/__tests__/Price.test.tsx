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
      grossTotal: '27.98',
      totalDiscount: '14.99',
      total: '12.99',
    }

    beforeEach(() => {
      rendered = render(<Price pricing={pricing} isPending={false} />)
    })

    test('then it should render a striked-out price and the final price', () => {
      const { getByText } = rendered
      expect(getByText('£27.98')).toBeDefined()
      expect(getByText('£12.99')).toBeDefined()
    })
  })

  describe('when isPending is false and there is no discount', () => {
    const pricing = {
      grossTotal: '27.98',
      totalDiscount: '0.00',
      total: '27.98',
    }

    beforeEach(() => {
      rendered = render(<Price pricing={pricing} isPending={false} />)
    })

    test('then it should render only the final price', () => {
      const { getByText } = rendered
      expect(getByText('£27.98')).toBeDefined()
    })
  })
})
