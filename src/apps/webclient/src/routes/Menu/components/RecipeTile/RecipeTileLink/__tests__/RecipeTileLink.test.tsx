import React from 'react'

import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { createMockStore } from 'routes/Menu/_testing/createMockStore'

import { RecipeTileLink } from '../RecipeTileLink'

const onClickTileMock = jest.fn()
const mockedProps = {
  isFineDineIn: false,
  onClickTile: onClickTileMock,
}

describe('Given: RecipeTileLink component', () => {
  const mockedStore = createMockStore({})
  describe('When: User clicks on "More description ->" button', () => {
    test('Click event should trigger dispatch', () => {
      render(
        <Provider store={mockedStore}>
          <RecipeTileLink {...mockedProps} />
        </Provider>,
      )

      const button = screen.getByRole('button', { name: 'More details' })

      fireEvent(
        button,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      )

      expect(onClickTileMock).toHaveBeenCalledTimes(1)
    })
  })

  describe('When: user sees different kind of recipes', () => {
    test('With fineDineIn enabled', () => {
      const updatedProps = { ...mockedProps, isFineDineIn: true }
      render(
        <Provider store={mockedStore}>
          <RecipeTileLink {...updatedProps} />
        </Provider>,
      )

      expect(screen.getByText('More details')).toBeDefined()
      expect(screen.getByRole('button', { name: 'More details' })).toBeDefined()
      expect(screen.getByTestId('arrow_right')).toBeDefined()
    })

    test('With fineDineIn disabled', () => {
      render(
        <Provider store={mockedStore}>
          <RecipeTileLink {...mockedProps} />
        </Provider>,
      )

      expect(screen.getByText('More details')).toBeDefined()
      expect(screen.getByRole('button', { name: 'More details' })).toBeDefined()
      expect(screen.getByTestId('arrow_right')).toBeDefined()
    })
  })
})
