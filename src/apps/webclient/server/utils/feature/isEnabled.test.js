import { safeJestMock } from '_testing/mocks'
import { isEnabled } from './isEnabled'

import * as featureData from './featureData'

const getFeatures = safeJestMock(featureData, 'getFeatures')
getFeatures.mockReturnValue(
  new Map([
    ['set-to-0-percent', { percentage: 0 }],
    ['set-to-100-percent', { percentage: 100 }],
    ['hash-greater-than-percentage', { percentage: 20 }],
    ['hash-equal-to-percentage', { percentage: 95 }],
    ['hash-less-than-percentage', { percentage: 41 }],
  ])
)

describe('isEnabled', () => {
  describe('given the experiment name is not defined', () => {
    test('should return false', () => {
      const result = isEnabled('madeup-feature')

      expect(result).toBeFalsy()
    })
  })

  describe('given the experiment name is defined in getFeatures', () => {
    describe('and the user id is not provided', () => {
      const userId = null

      describe('and the session id is provided', () => {
        describe('and feature percentage set to 0%', () => {
          test('should return true', () => {
            const result = isEnabled('set-to-0-percent', userId, 'session-id')

            expect(result).toBeFalsy()
          })
        })

        describe('and feature percentage set to 100%', () => {
          test('should return true', () => {
            const result = isEnabled('set-to-100-percent', userId, 'session-id')

            expect(result).toBeTruthy()
          })
        })

        describe('and session id hash is greater than the feature experiment percentage', () => {
          test('should return false', () => {
            // Hashes to 21 with experiment name
            const sessionId = 'dfsafa'

            const result = isEnabled('hash-greater-than-percentage', userId, sessionId)

            expect(result).toBeFalsy()
          })
        })

        describe('and user hash is equal to the feature experiment percentage', () => {
          test('should return true', () => {
            // Hashes to 95 with experiment name
            const sessionId = 'dfsafa'

            const result = isEnabled('hash-equal-to-percentage', userId, sessionId)

            expect(result).toBeTruthy()
          })
        })

        describe('and user hash is less than the feature experiment percentage', () => {
          test('should return true', () => {
            // Hashes to 40 with experiment name
            const sessionId = 'dfsafa'

            const result = isEnabled('hash-less-than-percentage', userId, sessionId)

            expect(result).toBeTruthy()
          })
        })
      })

      describe('and the session id is not provided', () => {
        test('should return false', () => {
          const result = isEnabled('hash-equal-to-percentage', null, null)

          expect(result).toBeFalsy()
        })
      })
    })

    describe('and the user is provided', () => {
      const sessionId = 'session-id'

      describe('and feature percentage set to 0%', () => {
        test('should return true', () => {
          const result = isEnabled('set-to-0-percent', 'madeup-id', sessionId)

          expect(result).toBeFalsy()
        })
      })

      describe('and feature percentage set to 100%', () => {
        test('should return true', () => {
          const result = isEnabled('set-to-100-percent', 'madeup-id', sessionId)

          expect(result).toBeTruthy()
        })
      })

      describe('and user hash is greater than the feature experiment percentage', () => {
        test('should return false', () => {
          // Hashes to 21 with experiment name
          const userId = 'dfsafa'

          const result = isEnabled('hash-greater-than-percentage', userId, sessionId)

          expect(result).toBeFalsy()
        })
      })

      describe('and user hash is equal to the feature experiment percentage', () => {
        test('should return true', () => {
          // Hashes to 95 with experiment name
          const userId = 'dfsafa'

          const result = isEnabled('hash-equal-to-percentage', userId, sessionId)

          expect(result).toBeTruthy()
        })
      })

      describe('and user hash is less than the feature experiment percentage', () => {
        test('should return true', () => {
          // Hashes to 40 with experiment name
          const userId = 'dfsafa'

          const result = isEnabled('hash-less-than-percentage', userId, sessionId)

          expect(result).toBeTruthy()
        })
      })
    })
  })
})
