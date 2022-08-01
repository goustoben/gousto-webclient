import { useAuth } from 'routes/Menu/domains/auth'

import { useDoubleDeckerNav } from '../useDoubleDeckerNav'

jest.mock('routes/Menu/domains/auth', () => ({
  useAuth: jest.fn(),
}))

const defaultUseAuthReturn = {
  isAuthenticated: true,
  isAdmin: false,
  accessToken: '',
  authUserId: '',
}

describe('useDoubleDeckerNav hook', () => {
  afterEach(() => jest.clearAllMocks())

  describe('when user is authenticated (existing customer)', () => {
    test('should return false', () => {
      jest.mocked(useAuth).mockReturnValue({
        ...defaultUseAuthReturn,
        isAuthenticated: true,
      })
      expect(useDoubleDeckerNav()).toBe(false)
    })
  })

  describe('when non-authenticated user (prospect customer)', () => {
    test('should return true', () => {
      jest.mocked(useAuth).mockReturnValue({
        ...defaultUseAuthReturn,
        isAuthenticated: false,
      })
      expect(useDoubleDeckerNav()).toBe(true)
    })
  })
})
