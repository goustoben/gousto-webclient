import React from 'react'

import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { RecipeTileLink } from 'routes/Menu/components/RecipeTile/RecipeTileLink'

const onClickTileMock = jest.fn()
const mockedProps = {
  isFineDineIn: false,
  onClickTile: onClickTileMock,
}

describe('Given: RecipeTileLink component', () => {
  // describe('When: User clicks on "More description ->" button', () => {
  //   test('Click event should trigger dispatch', () => {
  //     // const wrapper = render(<RecipeTileLink {...mockedProps} />)
  //     //
  //     // screen.logTestingPlaygroundURL()
  //     //
  //     // link.simulate('click', { stopPropagation() {} })
  //     //
  //     // expect(onClickTileMock).toHaveBeenCalledTimes(1)
  //   })
  // })

  describe('When: user sees different kind of recipes', () => {
    test('With fineDineIn enabled', () => {
      const updatedProps = { ...mockedProps, isFineDineIn: true }
      render(<RecipeTileLink {...updatedProps} />)

      screen.logTestingPlaygroundURL()
    })

    test('With fineDineIn disabled', () => {
      render(<RecipeTileLink {...mockedProps} />)
    })
  })
})
