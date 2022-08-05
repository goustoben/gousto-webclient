import { getAuthToken, AuthToken } from '@library/auth'

import { auth } from './composites'
import { RequestConfig } from '../types'

jest.mock('@library/auth', () => ({
  getAuthToken: jest.fn()
}))

describe('Composite middleware', () => {
  describe('auth middleware', () => {
    const req = {} as RequestConfig

    it('gets authorization headers from @library/auth:getAuthToken', async () => {
      jest.mocked(getAuthToken).mockImplementation(
        () => 'authToken' as AuthToken
      )
      const result = await auth(req)
      expect(result.headers).toStrictEqual({
        Authorization: 'Bearer authToken'
      })
    })

    it('if no auth token, sets header to "Bearer null"', async () => {
      // We don't want to ever get to this stage, but if we do, we want
      // - 401s to occur and therefore be captured by DataDog
      // - easy-to-diagnose HTTP logs
      jest.mocked(getAuthToken).mockImplementation(
        () => null
      )
      const result = await auth(req)
      expect(result.headers).toStrictEqual({
        Authorization: 'Bearer null'
      })
    })
  })
})
