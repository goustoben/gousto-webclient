import { renderHook } from '@testing-library/react-hooks'

import { useOrdersData } from '../useOrdersData'
import { useFetch } from 'hooks/useFetch'

jest.mock('config/endpoint', () => () => 'localhost')
jest.mock('../../../../../hooks/useFetch')

const mockAccessToken = 'mock-access-token'
const mockDispatch = jest.fn()

describe('Given useOrdersData is invoked', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    useFetch.mockReturnValue([true, undefined, false])

    renderHook(() => useOrdersData(mockAccessToken, mockDispatch))
  })

  test('Then useFetch makes the expected request', () => {
    expect(useFetch).toHaveBeenCalledWith({
      accessToken: 'mock-access-token',
      needsAuthorization: true,
      url: 'localhost/user/current/orders',
      parameters: { limit: 10, sort_order: 'desc', state: 'pending' }
    })
  })

  test('Then dispatch is not yet invoked', () => {
    expect(mockDispatch).not.toHaveBeenCalled()
  })

  describe('When the http request resolves data', () => {
    const mockBoxPricesResponse = { result: { data: 'current box prices data' } }

    beforeEach(() => {
      useFetch.mockReturnValueOnce([false, mockBoxPricesResponse, false])

      renderHook(() => useOrdersData(mockAccessToken, mockDispatch))
    })

    test('Then the expected action is dispatched', () => {
      expect.assertions(2)

      expect(mockDispatch).toHaveBeenCalledTimes(1)
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'ORDERS_DATA_RECEIVED',
        data: mockBoxPricesResponse.result.data,
      })
    })
  })

  describe('When there is an error', () => {
    beforeEach(() => {
      useFetch.mockReturnValue([false, undefined, true])

      renderHook(() => useOrdersData(mockAccessToken, mockDispatch))
    })

    test('Then dispath is not invoked', () => {
      expect(mockDispatch).not.toHaveBeenCalled()
    })
  })
})
