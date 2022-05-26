import * as React from 'react'

import { renderHook } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'

import { createMockBasketStore } from './testing/createMockBasketStore'
import { useOrderId } from './useOrderId'

describe('basket domain / useOrderId', () => {
  const orderId = '12345'
  const store = createMockBasketStore({ orderId })

  const wrapper: React.FC = ({ children }) => <Provider store={store}>{children}</Provider>

  test('returns order id from store', () => {
    const { result } = renderHook(() => useOrderId(), { wrapper })

    expect(result.current).toEqual(orderId)
  })
})
