import React from 'react'

import { render, fireEvent, screen, RenderResult } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import { useSupportedBoxTypes } from 'routes/Menu/domains/basket'

import { CheckoutCounter } from '../CheckoutCounter'

jest.mock('src/routes/Menu/domains/basket', () => ({
  useBasket: jest.fn().mockReturnValue({
    recipeCount: 2,
  }),
  useSupportedBoxTypes: jest.fn().mockReturnValue({
    maxRecipesForPortion: () => 4,
  }),
}))

const mockStore = configureMockStore()

const state = {}

const mockedStore = mockStore(state)

describe('CheckoutCounter', () => {
  describe('when rendered', () => {
    let rendered: RenderResult

    beforeEach(() => {
      rendered = render(
        <Provider store={mockedStore}>
          <CheckoutCounter isDisabled={false} isButtonHovered={false} numRecipes={2} />,
        </Provider>,
      )
    })

    test('then it renders correctly', () => {
      const { getByText } = rendered
      expect(getByText('2')).toBeInTheDocument()
      expect(getByText('/')).toBeInTheDocument()
      expect(getByText('4')).toBeInTheDocument()
    })

    describe('when animation starts and ends', () => {
      test('then it should assign and clear animation classes properly', () => {
        expect(screen.getByTestId('CheckoutCounter_background')).toHaveClass(
          'scaleAndWiggleAnimation',
        )
        expect(screen.getByTestId('CheckoutCounter_content')).toHaveClass('wiggleAnimation')

        fireEvent.animationEnd(screen.getByTestId('CheckoutCounter_background'))

        expect(screen.getByTestId('CheckoutCounter_background')).not.toHaveClass(
          'scaleAndWiggleAnimation',
        )
        expect(screen.getByTestId('CheckoutCounter_content')).not.toHaveClass('wiggleAnimation')
      })
    })
  })

  describe('when menu service allows five recipes', () => {
    let rendered: RenderResult

    beforeEach(() => {
      ;(useSupportedBoxTypes as jest.Mock).mockReturnValue({
        maxRecipesForPortion: () => 5,
      })
      rendered = render(
        <Provider store={mockedStore}>
          <CheckoutCounter isDisabled={false} isButtonHovered={false} numRecipes={0} />,
        </Provider>,
      )
    })

    test('then it should render 5 as its second number', () => {
      const { getByText } = rendered
      expect(getByText('0')).toBeInTheDocument()
      expect(getByText('/')).toBeInTheDocument()
      expect(getByText('5')).toBeInTheDocument()
    })
  })
})
