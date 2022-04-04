import { createIsomorphicConfig, getEnvironment, getDomain, getProtocol } from 'utils/isomorphicEnvironment'
import { getServerEnvironment, getServerDomain, getServerProtocol } from '../../../server/utils/serverEnvironment'
import { getClientEnvironment, getDomain as getClientDomain, getClientProtocol} from '../browserEnvironment'

jest.mock('../../../server/utils/serverEnvironment')
jest.mock('../browserEnvironment', () => ({
  ...jest.requireActual('../browserEnvironment'),
  getClientEnvironment: jest.fn(),
  getDomain: jest.fn(),
  getClientProtocol: jest.fn()
}))

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
      });

      (getClientEnvironment as jest.Mock).mockReturnValue(mockBrowserEnvironment)

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

      const stubDomainResponse = 'mockclientdomain.com';
      (getClientDomain as jest.Mock).mockReturnValue(stubDomainResponse)

      expect(getDomain()).toEqual(stubDomainResponse)
    })

    it('should call the getServerDomain when running on the server', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      windowSpy.mockReturnValue(undefined)

      const stubDomainResponse = 'mockserverdomain.com';
      (getServerDomain as jest.Mock).mockReturnValue(stubDomainResponse)

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

      const stubProtocolValue = 'stubProtocolValue:http';
      (getClientProtocol as jest.Mock).mockReturnValue(stubProtocolValue)

      expect(getProtocol()).toEqual(stubProtocolValue)
    })

    it('should call the getServerProtocol when running on the server', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      windowSpy.mockReturnValue(undefined)

      const stubProtocolValue = 'stubProtocolValue:https';
      (getServerProtocol as jest.Mock).mockReturnValue(stubProtocolValue)

      expect(getProtocol()).toEqual(stubProtocolValue)
    })
  })
})
