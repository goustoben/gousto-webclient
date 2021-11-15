import { renderHook } from '@testing-library/react-hooks'

import { useBoxPricesData } from '../useBoxPricesData'
import { useFetch } from 'hooks/useFetch'

jest.mock('config/endpoint', () => () => 'localhost')
jest.mock('../../../../../hooks/useFetch')
jest.mock('moment')

const mockAccessToken = 'mock-access-token'
const mockDispatch = jest.fn()

describe('Given useBoxPricesData is invoked', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    useFetch.mockReturnValue([true, undefined, false])

    renderHook(() => useBoxPricesData(mockAccessToken, mockDispatch))
  })

  test('Then useFetch makes the expected requests', () => {
    expect(useFetch).toHaveBeenCalledWith({
      accessToken: 'mock-access-token',
      needsAuthorization: true,
      url: 'localhost/boxPrices'
    })
  })

  test('Then dispatch is not yet invoked', () => {
    expect(mockDispatch).not.toHaveBeenCalled()
  })

  describe('When the http request resolves data', () => {
    const mockBoxPricesResponse = { result: { data: 'current box prices data' } }

    beforeEach(() => {
      useFetch.mockReturnValueOnce([false, mockBoxPricesResponse, false])

      renderHook(() => useBoxPricesData(mockAccessToken, mockDispatch))
    })

    test('Then the expected action is dispatched', () => {
      expect(mockDispatch).toHaveBeenCalledTimes(1)
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'BOX_PRICES_DATA_RECEIVED',
        data: mockBoxPricesResponse.result.data,
      })
    })
  })

  describe('When there is an error', () => {
    beforeEach(() => {
      useFetch.mockReturnValue([false, undefined, true])

      renderHook(() => useBoxPricesData(mockAccessToken, mockDispatch))
    })

    test('Then dispath is not invoked', () => {
      expect(mockDispatch).not.toHaveBeenCalled()
    })
  })
})
