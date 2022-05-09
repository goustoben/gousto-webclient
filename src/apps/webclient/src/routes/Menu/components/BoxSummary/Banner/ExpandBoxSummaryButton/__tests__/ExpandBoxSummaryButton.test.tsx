import React from 'react'
import { render, fireEvent, screen, RenderResult } from '@testing-library/react'
import { ExpandBoxSummaryButton } from '../ExpandBoxSummaryButton'

jest.mock('routes/Menu/components/BoxSummary/Banner/PriceAndDiscountTip', () => ({
  PriceAndDiscountTip: jest.fn().mockReturnValue(<div>price and discount tip</div>),
}))

describe('given ExpandBoxSummaryButton is rendered', () => {
  let rendered: RenderResult

  const onClick = jest.fn()

  beforeEach(() => {
    rendered = render(
      <ExpandBoxSummaryButton
        showDetails={false}
        showBrowseCTA={false}
        numRecipes={2}
        onClick={onClick}
      />,
    )
  })

  test('then it should render a Button with PriceAndDiscountTip', () => {
    const { getByRole, getByText } = rendered
    expect(getByRole('button')).toBeDefined()
    expect(getByText('price and discount tip')).toBeDefined()
  })

  describe('when clicked', () => {
    beforeEach(() => {
      fireEvent.click(screen.getByText('price and discount tip'))
    })

    test('then it should invoke onClick', () => {
      expect(onClick).toHaveBeenCalled()
    })
  })
})
