const mockConfig = {
  apiToken: 'mock-api-token',
  authClientId: 'mock-auth-client-id',
  authClientSecret: 'mock-auth-client-secret',
  recaptchaReferralPrivateKey: 'mock-recaptcha-referral-private-key',
}

describe('env util', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('on the server', () => {
    beforeEach(() => {
      jest.resetModules()

      jest.doMock('utils/serverEnvironment', () => ({
        isServer: () => true,
      }))
    })

    test('returns config from JSON config file', () => {
      jest.doMock('jsonfile', () => ({
        readFileSync: () => mockConfig,
      }))

      // eslint-disable-next-line
      expect(require('../env').default).toEqual(mockConfig)
    })

    test('logs error if there is a problem reading config file', () => {
      const mockCritical = jest.fn()

      jest.doMock('utils/logger', () => ({
        __esModule: true,
        default: {
          critical: mockCritical,
        },
      }))

      jest.doMock('jsonfile', () => ({
        readFileSync: () => {
          throw new Error('some error')
        },
      }))

      // eslint-disable-next-line
      require('../env').default

      expect(mockCritical).toHaveBeenCalledWith({
        message: 'Reading config/env.json',
      })
    })
  })

  describe('in the browser', () => {
    beforeEach(() => {
      jest.doMock('utils/serverEnvironment', () => ({
        isServer: () => false,
      }))
    })

    test('returns undefined', () => {
      // eslint-disable-next-line
      expect(require('../env').default).toEqual(undefined)
    })
  })
})
