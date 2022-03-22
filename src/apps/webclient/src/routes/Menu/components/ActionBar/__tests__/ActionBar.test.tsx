import React from 'react'
import Immutable from 'immutable'
import { render, fireEvent, screen, RenderResult } from '@testing-library/react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { useMedia } from 'react-use'

import { ActionBar } from '../ActionBar'

jest.useFakeTimers()

jest.mock('react-use', () => ({
  ...jest.requireActual('react-use'),
  useMedia: jest.fn().mockReturnValue(true),
}))

describe('ActionBar', () => {
  let rendered: RenderResult

  const mockStore = configureMockStore()
  const state = {
    basket: Immutable.fromJS({
      recipes: [],
    }),
    pending: Immutable.fromJS({}),
    features: Immutable.fromJS({
      isSimplifyBasketBarEnabled: { value: false },
    }),
    auth: Immutable.fromJS({
      accessToken: 'test-access-token',
    }),
    menuService: {},
  }
  const mockedStore = mockStore(state)

  beforeEach(() => {
    rendered = render(
      <Provider store={mockedStore}>
        <ActionBar variant="separate" />
      </Provider>
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
        const newStore = mockStore({
          ...state,
          basket: Immutable.fromJS({
            recipes: [1],
          }),
        })
        const { rerender, getByTestId } = rendered

        rerender(
          <Provider store={newStore}>
            <ActionBar variant="separate" />
          </Provider>
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
        const newStore = mockStore({
          ...state,
          basket: Immutable.fromJS({
            recipes: [1],
          }),
        })
        const { rerender, getByTestId } = rendered

        rerender(
          <Provider store={newStore}>
            <ActionBar variant="separate" />
          </Provider>
        )

        expect(getByTestId('actionBar')).not.toHaveClass('shouldAnimate')
      })
    })
  })
})
