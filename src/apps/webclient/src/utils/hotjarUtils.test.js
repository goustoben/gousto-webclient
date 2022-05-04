import { identifyHotjarUser, invokeHotjarEvent } from './hotjarUtils'

describe('hotjarUtils', () => {
  const hj = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('given invokeHotjarEvent is called', () => {
    beforeEach(() => {
      global.hj = hj
    })

    test('then it should invoke the hotjar event', () => {
      invokeHotjarEvent('skip_wizard_variant')

      expect(hj).toHaveBeenCalledWith('event', 'skip_wizard_variant')
    })

    describe('when hj is not defined', () => {
      beforeEach(() => {
        delete global.hj
      })

      test('then it should not throw an error', () => {
        expect(() => {
          invokeHotjarEvent('skip_wizard_variant')
        }).not.toThrow()
      })
    })
  })

  describe('given identifyHotjarUser is called', () => {
    beforeEach(() => {
      global.hj = hj
    })

    const userId = 'user-id-1234'
    const snowplowUserId = 'snowplow-user-id-1234'

    test('then it should identify the user to hotjar', () => {
      identifyHotjarUser({ userId, snowplowUserId })

      expect(hj).toHaveBeenCalledWith('identify', userId, { snowplowUserId })
    })

    describe('when userId is undefined', () => {
      const undefinedUser = undefined

      test('then it should identify the user to hotjar', () => {
        identifyHotjarUser({ userId: undefinedUser, snowplowUserId })

        expect(hj).toHaveBeenCalledWith('identify', undefined, { snowplowUserId })
      })
    })

    describe('when snowplowUserId is undefined', () => {
      const undefinedSnowplowUserId = undefined

      test('then it should identify the user to hotjar', () => {
        identifyHotjarUser({ userId, snowplowUserId: undefinedSnowplowUserId })

        expect(hj).toHaveBeenCalledWith('identify', userId, { snowplowUserId: undefined })
      })
    })

    describe('when hj is not defined', () => {
      beforeEach(() => {
        delete global.hj
      })

      test('then it should not throw an error', () => {
        expect(() => {
          identifyHotjarUser({ userId, snowplowUserId })
        }).not.toThrow()
      })
    })
  })
})
