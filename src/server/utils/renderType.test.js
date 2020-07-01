import { safeJestMock } from '_testing/mocks'
import { isServerSideFetchEligible } from './renderType'

import * as isEnabledImport from './feature/isEnabled'

const isEnabled = safeJestMock(isEnabledImport, 'isEnabled')

describe('isServerSideFetchEligible', () => {
  let headers
  let path

  const featureName = 'prefetchMenu'
  const userId = 'my-user-id'
  const sessionId = 'my-session-id'

  let isEnabledReturnValue

  beforeEach(() => {
    isEnabledReturnValue = false

    isEnabled.mockImplementation((_featureName, _userId, _sessionId) => {
      // this allows us to ensure that isEnabled is called with the correct parameters
      if (_featureName !== featureName || _userId !== userId || _sessionId !== sessionId) {
        throw Error('incorrect parameter passed to isEnabled mock')
      }

      return isEnabledReturnValue
    })
  })

  describe('when x-pre-render header is false', () => {
    beforeEach(() => {
      headers = {
        'x-pre-render': 'false'
      }
      path = '/'
    })

    test('should return false', () => {
      const result = isServerSideFetchEligible(headers, path, userId, sessionId)
      expect(result).toBe(false)
    })
  })

  describe('when x-pre-render is not set', () => {
    beforeEach(() => {
      headers = {}
      path = '/'
    })

    describe('when path is /', () => {
      test('should return true', () => {
        const result = isServerSideFetchEligible(headers, path, userId, sessionId)
        expect(result).toBe(true)
      })
    })

    describe('when path is /menu', () => {
      beforeEach(() => {
        path = '/menu'
      })

      describe('when isEnabled returns true', () => {
        beforeEach(() => {
          isEnabledReturnValue = true
        })

        test('should return true', () => {
          const result = isServerSideFetchEligible(headers, path, userId, sessionId)
          expect(result).toBe(true)
        })
      })

      describe('when isEnabled returns false', () => {
        beforeEach(() => {
          isEnabledReturnValue = false
        })

        test('should return false', () => {
          const result = isServerSideFetchEligible(headers, path, userId, sessionId)
          expect(result).toBe(false)
        })
      })
    })

    describe('when path is /menu/something', () => {
      beforeEach(() => {
        path = '/menu/something'
      })

      describe('when isEnabled returns true', () => {
        beforeEach(() => {
          isEnabledReturnValue = true
        })

        test('should return true', () => {
          const result = isServerSideFetchEligible(headers, path, userId, sessionId)
          expect(result).toBe(true)
        })
      })

      describe('when isEnabled returns false', () => {
        beforeEach(() => {
          isEnabledReturnValue = false
        })

        test('should return false', () => {
          const result = isServerSideFetchEligible(headers, path, userId, sessionId)
          expect(result).toBe(false)
        })
      })
    })
  })
})
