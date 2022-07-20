import React from 'react'

import { render, fireEvent, screen, RenderResult } from '@testing-library/react'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import { useMedia } from 'react-use'

import { createMockStore } from 'routes/Menu/_testing/createMockStore'
import { useBasket, useSupportedBoxTypes } from 'routes/Menu/domains/basket'
import { canUseWindow } from 'utils/browserEnvironment'
import { getDomain } from 'utils/isomorphicEnvironment'

import { ActionBar } from '../ActionBar'

jest.useFakeTimers()

jest.mock('react-use', () => ({
  ...jest.requireActual('react-use'),
  useMedia: jest.fn().mockReturnValue(true),
}))

jest.mock('utils/browserEnvironment')
jest.mock('utils/isomorphicEnvironment')

jest.mock('routes/Menu/domains/basket')

const useBasketMock = useBasket as jest.MockedFunction<typeof useBasket>
const useSupportedBoxTypesMock = useSupportedBoxTypes as jest.MockedFunction<
  typeof useSupportedBoxTypes
>

describe('ActionBar', () => {
  let rendered: RenderResult

  const state = {
    features: Immutable.fromJS({}),
    pending: Immutable.fromJS({}),
    auth: Immutable.fromJS({
      accessToken: 'test-access-token',
    }),
    menuService: {},
  }
  const mockedStore = createMockStore(state)

  beforeEach(() => {
    ;(canUseWindow as jest.Mock).mockReturnValue(false)
    ;(getDomain as jest.Mock).mockReturnValue('gousto.local')

    // TODO create a builder rather than casting mocks to `any`
    useBasketMock.mockReturnValue({
      recipeCount: 0,
    } as any)

    useSupportedBoxTypesMock.mockReturnValue({
      maxRecipesForPortion: () => 4,
      allowedPortionSizes: () => [2, 4],
      minRecipesForPortion: () => 2,
      isPortionSizeAllowedByRecipeCount: () => true,
    })

    rendered = render(
      <Provider store={mockedStore}>
        <ActionBar variant="separate" />
      </Provider>,
    )
  })

  test('renders correctly', () => {
    const { getByText } = rendered
    expect(getByText('Add first recipe')).toBeDefined()
    expect(getByText('to get started')).toBeDefined()
  })

  describe('when numRecipes change', () => {
    describe('when on mobile', () => {
      test('then it should animate', () => {
        const newStore = createMockStore(state)

        // TODO create a builder rather than casting mocks to `any`
        useBasketMock.mockReturnValue({
          recipeCount: 1,
        } as any)

        const { rerender, getByTestId } = rendered

        rerender(
          <Provider store={newStore}>
            <ActionBar variant="separate" />
          </Provider>,
        )

        expect(getByTestId('actionBar')).toHaveClass('shouldAnimate')
      })

      describe('and when animation ends', () => {
        test('then it should stop animation', () => {
          fireEvent.animationEnd(screen.getByTestId('actionBar'))

          const { getByTestId } = rendered
          expect(getByTestId('actionBar')).not.toHaveClass('shouldAnimate')
        })
      })
    })

    describe('when on desktop', () => {
      beforeEach(() => {
        ;(useMedia as jest.Mock).mockReturnValue(false)
      })

      test('then it should set the new value immediately', () => {
        const newStore = createMockStore(state)

        // TODO create a builder rather than casting mocks to `any`
        useBasketMock.mockReturnValue({
          recipeCount: 1,
        } as any)
        const { rerender, getByTestId } = rendered

        rerender(
          <Provider store={newStore}>
            <ActionBar variant="separate" />
          </Provider>,
        )

        expect(getByTestId('actionBar')).not.toHaveClass('shouldAnimate')
      })
    })
  })
})
