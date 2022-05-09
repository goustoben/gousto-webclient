import React from 'react'
import Immutable from 'immutable'
import { render, fireEvent, screen, RenderResult } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { useMedia } from 'react-use'

import { useIsActionBarRedesignEnabled } from 'routes/Menu/hooks/useIsActionBarRedesignEnabled'
import { BoxSummaryBanner } from '../BoxSummaryBanner'

jest.mock('routes/Menu/hooks/useIsActionBarRedesignEnabled', () => ({
  useIsActionBarRedesignEnabled: jest.fn(),
}))

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

jest.mock('src/routes/Menu/domains/basket', () => ({
  useBasket: jest.fn().mockReturnValue({
    recipeCount: 2,
  }),
}))

jest.mock('react-use', () => ({
  ...jest.requireActual('react-use'),
  useMedia: jest.fn(),
}))

const mockStore = configureMockStore()
const state = {
  basket: Immutable.fromJS({}),
  pending: Immutable.fromJS({}),
  promoStore: Immutable.fromJS({}),
  boxSummaryShow: Immutable.fromJS({}),
  auth: Immutable.fromJS({}),
  menuService: {},
  features: Immutable.fromJS({}),
  error: Immutable.fromJS({}),
}
const mockedStore = mockStore(state)

describe('BoxSummaryBanner', () => {
  let rendered: RenderResult

  const onExpandClick = jest.fn()

  describe('when rendered on desktop', () => {
    beforeEach(() => {
      useMedia.mockReturnValue(false)

      rendered = render(
        <Provider store={mockedStore}>
          <BoxSummaryBanner
            numRecipes={0}
            onExpandClick={onExpandClick}
            showBrowseCTA={false}
            errorText={undefined}
          />
        </Provider>,
      )
    })

    test('then it should render two buttons', () => {
      const { getAllByRole } = rendered
      expect(getAllByRole('button')).toHaveLength(2)
    })
  })

  describe('when rendered on mobile', () => {
    beforeEach(() => {
      useMedia.mockReturnValue(true)

      rendered = render(
        <Provider store={mockedStore}>
          <BoxSummaryBanner
            numRecipes={0}
            onExpandClick={onExpandClick}
            showBrowseCTA={false}
            errorText={undefined}
          />
        </Provider>,
      )
    })

    test('then it should render one button', () => {
      const { getByText, getAllByRole } = rendered
      expect(getAllByRole('button')).toHaveLength(1)
      expect(getByText('Checkout')).toBeDefined()
    })
  })
})
