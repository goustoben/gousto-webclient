import { renderHook } from '@testing-library/react-hooks'

import { useAuth } from 'routes/Menu/domains/auth'

import { useIsProspect } from '../useIsProspect'

jest.mock('routes/Menu/domains/auth')
const mockedUseAuthReturn = {
  accessToken: 'mocked-access-token',
  authUserId: undefined,
  isAdmin: false,
}

const useAuthMock = jest.mocked(useAuth)

describe('Given: useIsProspect hook', () => {
  describe('When: useAuth returning not authenticated', () => {
    beforeEach(() => {
      useAuthMock.mockImplementation(() => ({ ...mockedUseAuthReturn, isAuthenticated: false }))
    })

    test('Then: useIsProspect should return true, meaning that user is prospect', () => {
      const { result } = renderHook(() => useIsProspect())

      expect(result.current).toBe(true)
    })
  })

  describe('When: useAuth returning true', () => {
    beforeEach(() => {
      useAuthMock.mockImplementation(() => ({
        ...mockedUseAuthReturn,
        authUserId: 'mocked-user-id',
        isAuthenticated: true,
      }))
    })

    test('Then: useIsProspect should return false, meaning that user is logged in', () => {
      const { result } = renderHook(() => useIsProspect())

      expect(result.current).toBe(false)
    })
  })
})
