import * as React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'
import { createMockBasketStore } from './testing/createMockBasketStore'
import { useNumPortions } from './useNumPortions'

jest.mock('actions/basket', () => ({
  ...jest.requireActual('actions/basket'),
  basketNumPortionChange: jest
    .fn()
    .mockImplementation((newNumPortions) => ['call_basketNumPortionChange', newNumPortions]),
}))

describe('basket domain / useNumPortions', () => {
  const numPortions = 4
  const store = createMockBasketStore({ numPortions })

  const wrapper: React.FC = ({ children }) => <Provider store={store}>{children}</Provider>

  test('returns num portions from store', () => {
    const { result } = renderHook(() => useNumPortions(), { wrapper })

    expect(result.current.numPortions).toEqual(numPortions)
  })

  test('setNumPortions should dispatch to redux store', () => {
    const { result } = renderHook(() => useNumPortions(), { wrapper })

    const newNumPortions = 2

    result.current.setNumPortions(newNumPortions)

    expect(store.dispatch).toHaveBeenCalledWith(['call_basketNumPortionChange', newNumPortions])
  })
})
