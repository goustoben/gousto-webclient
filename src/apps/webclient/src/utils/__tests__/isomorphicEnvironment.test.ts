import {
  createIsomorphicConfig,
  getEnvironment,
  getDomain,
  getProtocol,
  getRecaptchaPublicKey,
  getRecaptchaRAFPublicKey,
  getCheckoutComPublicKey,
} from 'utils/isomorphicEnvironment'
import {
  getClientCheckoutComPublicKey,
  getClientRecaptchaPublicKey,
  getClientRecaptchaRAFPublicKey,
} from 'utils/configFromWindow'
import {
  getServerEnvironment,
  getServerDomain,
  getServerProtocol,
  getServerCheckoutComPublicKey,
  getServerRecaptchaPublicKey,
  getServerRecaptchaRAFPublicKey,
} from '../../../server/utils/serverEnvironment'
import {
  getClientEnvironment,
  getDomain as getClientDomain,
  getClientProtocol,
} from '../browserEnvironment'

jest.mock('../../../server/utils/serverEnvironment')
jest.mock('../browserEnvironment', () => ({
  ...jest.requireActual('../browserEnvironment'),
  getClientEnvironment: jest.fn(),
  getDomain: jest.fn(),
  getClientProtocol: jest.fn(),
}))
jest.mock('utils/configFromWindow')

const mockGetServerEnvironment = getServerEnvironment as jest.Mock

const mockBrowserGetter = () => 'browser'
const mockServerGetter = () => 'server'

let getConfig: () => string

const createGetConfig = ({ testFn }: { testFn?: () => boolean } = {}) => {
  getConfig = createIsomorphicConfig({
    browserConfigFn: mockBrowserGetter,
    serverConfigFn: mockServerGetter,
    ...(testFn && { testFn }),
  })
}

const windowSpy = jest.spyOn(window, 'window', 'get')

describe('isomorphicEnvironment utils', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe('createIsomorphicConfig', () => {
    describe('with default environment test fn', () => {
      test('returns expected fn if in browser environment', () => {
        windowSpy.mockReturnValue({
          document: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            createElement: () => null,
          },
        })

        createGetConfig()

        expect(getConfig()).toEqual('browser')
      })

      test('returns expected fn if in server environment', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        windowSpy.mockReturnValue(undefined)
        createGetConfig()

        expect(getConfig()).toEqual('server')
      })
    })

    describe('when passed environment test fn', () => {
      test('returns expected fn if in test fn returns true', () => {
        createGetConfig({
          testFn: () => true,
        })

        expect(getConfig()).toEqual('browser')
      })

      test('returns expected fn if in test fn returns false', () => {
        createGetConfig({
          testFn: () => false,
        })

        expect(getConfig()).toEqual('server')
      })
    })
  })

  describe('getEnvironment', () => {
    test('returns expected fn if in browser', () => {
      const mockBrowserEnvironment = 'mock browser environment'

      windowSpy.mockReturnValue({
        document: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          createElement: () => null,
        },
      })
      ;(getClientEnvironment as jest.Mock).mockReturnValue(mockBrowserEnvironment)

      expect(getEnvironment()).toEqual(mockBrowserEnvironment)
    })

    test('returns expected fn if on server', () => {
      const mockServerEnvironment = 'mock server environment'

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      windowSpy.mockReturnValue(undefined)
      mockGetServerEnvironment.mockReturnValue(mockServerEnvironment)

      expect(getEnvironment()).toEqual(mockServerEnvironment)
    })
  })

  describe('getDomain', () => {
    it('should call the getClientDomain when running on the client', () => {
      windowSpy.mockReturnValue({
        document: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          createElement: () => null,
        },
      })

      const stubDomainResponse = 'mockclientdomain.com'
      ;(getClientDomain as jest.Mock).mockReturnValue(stubDomainResponse)

      expect(getDomain()).toEqual(stubDomainResponse)
    })

    it('should call the getServerDomain when running on the server', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      windowSpy.mockReturnValue(undefined)

      const stubDomainResponse = 'mockserverdomain.com'
      ;(getServerDomain as jest.Mock).mockReturnValue(stubDomainResponse)

      expect(getDomain()).toEqual(stubDomainResponse)
    })
  })

  describe('getProtocol', () => {
    it('should call the getClientProtocol when running on the client', () => {
      windowSpy.mockReturnValue({
        document: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          createElement: () => null,
        },
      })

      const stubProtocolValue = 'stubProtocolValue:http'
      ;(getClientProtocol as jest.Mock).mockReturnValue(stubProtocolValue)

      expect(getProtocol()).toEqual(stubProtocolValue)
    })

    it('should call the getServerProtocol when running on the server', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      windowSpy.mockReturnValue(undefined)

      const stubProtocolValue = 'stubProtocolValue:https'
      ;(getServerProtocol as jest.Mock).mockReturnValue(stubProtocolValue)

      expect(getProtocol()).toEqual(stubProtocolValue)
    })
  })

  describe('getRecaptchaPublicKey', () => {
    it('should call getClientRecaptchaPublicKey when running in client', () => {
      const expected = 'client-recaptcha-public-key'

      windowSpy.mockReturnValue({
        document: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          createElement: () => null,
        },
      })
      ;(getClientRecaptchaPublicKey as jest.Mock).mockReturnValue(expected)

      expect(getRecaptchaPublicKey()).toEqual(expected)
    })

    it('should call getServerRecaptchaPublicKey when running in server', () => {
      const expected = 'server-recaptcha-public-key'

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      windowSpy.mockReturnValue(undefined)
      ;(getServerRecaptchaPublicKey as jest.Mock).mockReturnValue(expected)

      expect(getRecaptchaPublicKey()).toEqual(expected)
    })
  })

  describe('getRecaptchaRAFPublicKey', () => {
    it('should call getClientRecaptchaRAFPublicKey when running in client', () => {
      const expected = 'client-recaptcha-raf-public-key'

      windowSpy.mockReturnValue({
        document: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          createElement: () => null,
        },
      })
      ;(getClientRecaptchaRAFPublicKey as jest.Mock).mockReturnValue(expected)

      expect(getRecaptchaRAFPublicKey()).toEqual(expected)
    })

    it('should call getServerRecaptchaRAFPublicKey when running in server', () => {
      const expected = 'server-recaptcha-raf-public-key'

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      windowSpy.mockReturnValue(undefined)
      ;(getServerRecaptchaRAFPublicKey as jest.Mock).mockReturnValue(expected)

      expect(getRecaptchaRAFPublicKey()).toEqual(expected)
    })
  })

  describe('getCheckoutComPublicKey', () => {
    it('should call getClientCheckoutComPublicKey when running in client', () => {
      const expected = 'client-checkout-com-public-key'

      windowSpy.mockReturnValue({
        document: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          createElement: () => null,
        },
      })
      ;(getClientCheckoutComPublicKey as jest.Mock).mockReturnValue(expected)

      expect(getCheckoutComPublicKey()).toEqual(expected)
    })

    it('should call getServerCheckoutComPublicKey when running in server', () => {
      const expected = 'server-checkout-com-public-key'

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      windowSpy.mockReturnValue(undefined)
      ;(getServerCheckoutComPublicKey as jest.Mock).mockReturnValue(expected)

      expect(getCheckoutComPublicKey()).toEqual(expected)
    })
  })
})
