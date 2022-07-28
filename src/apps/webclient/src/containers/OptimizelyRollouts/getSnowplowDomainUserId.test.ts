import { getSnowplowDomainUserId } from 'containers/OptimizelyRollouts/getSnowplowDomainUserId'
import { mockSnowplowCallbackAPI } from 'containers/OptimizelyRollouts/mockSnowplowCallbackAPI'
import { canUseWindow } from 'utils/browserEnvironment'

jest.mock('utils/browserEnvironment')

describe('getSnowplowDomainUserId', () => {
  describe('when window is not available', () => {
    beforeEach(() => {
      jest.mocked(canUseWindow).mockReturnValue(false)
    })

    test('then it rejects with error', async () => {
      await expect(getSnowplowDomainUserId()).rejects.toThrow('Can not use window')
    })
  })

  describe('when window.snowplow is not available', () => {
    beforeEach(() => {
      jest.mocked(canUseWindow).mockReturnValue(true)
      window.snowplow = undefined
    })

    test('then it rejects with error', async () => {
      expect.assertions(1)
      try {
        await getSnowplowDomainUserId()
      } catch (error) {
        expect((error as Error).message).toBe('Snowplow failed to initialize in 3000 ms')
      }
    })
  })

  describe('when window and window.snowplow exist', () => {
    const expectedDomainUserId = 'expectedDomainUserId'

    beforeEach(() => {
      jest.mocked(canUseWindow).mockReturnValue(true)
      mockSnowplowCallbackAPI(expectedDomainUserId)
    })

    afterEach(() => {
      window.snowplow = undefined
    })

    test('returns expected user id', async () => {
      const userId = await getSnowplowDomainUserId()
      expect(userId).toBe(expectedDomainUserId)
    })
  })
})
