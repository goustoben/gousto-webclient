import React from 'react'
import { render, fireEvent, screen, RenderResult } from '@testing-library/react'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import { ExpandBoxSummaryButton } from '../ExpandBoxSummaryButton'

jest.mock('routes/Menu/components/BoxSummary/Banner/PriceAndDiscountTip', () => ({
  PriceAndDiscountTip: jest.fn().mockReturnValue(<div>price and discount tip</div>),
}))

const mockStore = configureMockStore()
const state = {
  boxSummaryShow: Immutable.fromJS({
    show: false,
  }),
}
const mockedStore = mockStore(state)

describe('given ExpandBoxSummaryButton is rendered', () => {
  let rendered: RenderResult

  const onClick = jest.fn()

  beforeEach(() => {
    rendered = render(
      <Provider store={mockedStore}>
        <ExpandBoxSummaryButton showBrowseCTA={false} numRecipes={2} onClick={onClick} />
      </Provider>,
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
