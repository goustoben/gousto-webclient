import * as React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'
import { createMockBasketStore } from './testing/createMockBasketStore'
import { useMenuId } from './useMenuId'

describe('basket domain / useMenuId', () => {
  const currentMenuId = '12345'
  const store = createMockBasketStore({ currentMenuId })

  const wrapper: React.FC = ({ children }) => <Provider store={store}>{children}</Provider>

  test('returns menu id from store', () => {
    const { result } = renderHook(() => useMenuId(), { wrapper })

    expect(result.current).toEqual(currentMenuId)
  })
})
