import * as React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'
import { createMockBasketStore } from './testing/createMockBasketStore'
import { useNumPortions } from './useNumPortions'

describe('basket domain / useNumPortions', () => {
  const numPortions = 4
  const store = createMockBasketStore({ numPortions })

  const wrapper: React.FC = ({ children }) => <Provider store={store}>{children}</Provider>

  test('returns num portions from store', () => {
    const { result } = renderHook(() => useNumPortions(), { wrapper })

    expect(result.current).toEqual(numPortions)
  })
})
