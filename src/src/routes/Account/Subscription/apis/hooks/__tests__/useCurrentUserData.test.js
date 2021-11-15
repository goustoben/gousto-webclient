import { renderHook } from '@testing-library/react-hooks'

import { useCurrentUserData } from '../useCurrentUserData'
import { useFetch } from 'hooks/useFetch'

jest.mock('config/endpoint', () => () => 'localhost')
jest.mock('../../../../../hooks/useFetch')
jest.mock('moment')

const mockAccessToken = 'mock-access-token'
const mockDispatch = jest.fn()

describe('Given useCurrentUserData is invoked', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    useFetch.mockReturnValue([true, undefined, false])

    renderHook(() => useCurrentUserData(mockAccessToken, mockDispatch))
  })

  test('Then useFetch makes the expected requests', () => {
    expect(useFetch).toHaveBeenCalledWith({
      accessToken: 'mock-access-token',
      needsAuthorization: true,
      url: 'localhost/user/current'
    })
  })

  test('Then dispatch is not yet invoked', () => {
    expect(mockDispatch).not.toHaveBeenCalled()
  })

  describe('When the http request resolves data', () => {
    const mockCurrentUserResponse = { result: { data: 'current user data' } }

    beforeEach(() => {
      useFetch.mockReturnValueOnce([false, mockCurrentUserResponse, false])

      renderHook(() => useCurrentUserData(mockAccessToken, mockDispatch))
    })

    test('Then the expected action is dispatched', () => {
      expect(mockDispatch).toHaveBeenCalledTimes(1)
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'CURRENT_USER_DATA_RECEIVED',
        data: mockCurrentUserResponse.result.data,
      })
    })
  })

  describe('When there is an error', () => {
    beforeEach(() => {
      useFetch.mockReturnValue([false, undefined, true])

      renderHook(() => useCurrentUserData(mockAccessToken, mockDispatch))
    })

    test('Then dispath is not invoked', () => {
      expect(mockDispatch).not.toHaveBeenCalled()
    })
  })
})
