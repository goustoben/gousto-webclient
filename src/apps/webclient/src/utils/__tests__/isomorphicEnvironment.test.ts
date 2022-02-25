import { createIsomorphicConfig, getEnvironment, isProd } from 'utils/isomorphicEnvironment'
import { canUseWindow, getClientEnvironment } from 'utils/browserEnvironment'
import { getServerEnvironment } from '../../../server/utils/serverEnvironment'

jest.mock('utils/browserEnvironment')
jest.mock('../../../server/utils/serverEnvironment')

const mockCanUseWindow = canUseWindow as jest.Mock
const mockGetClientEnvironment = getClientEnvironment as jest.Mock
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

describe('isomorphicEnvironment utils', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('createIsomorphicConfig', () => {
    describe('with default environment test fn', () => {
      test('returns expected fn if in browser environment', () => {
        mockCanUseWindow.mockReturnValue(true)
        createGetConfig()

        expect(getConfig()).toEqual('browser')
      })

      test('returns expected fn if in server environment', () => {
        mockCanUseWindow.mockReturnValue(false)
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

      mockCanUseWindow.mockReturnValue(true)
      mockGetClientEnvironment.mockReturnValue(mockBrowserEnvironment)

      expect(getEnvironment()).toEqual(mockBrowserEnvironment)
    })

    test('returns expected fn if on server', () => {
      const mockServerEnvironment = 'mock server environment'

      mockCanUseWindow.mockReturnValue(false)
      mockGetServerEnvironment.mockReturnValue(mockServerEnvironment)

      expect(getEnvironment()).toEqual(mockServerEnvironment)
    })
  })

  describe('isProd', () => {
    describe('in the browser', () => {
      beforeEach(() => {
        mockCanUseWindow.mockReturnValue(true)
      })

      test('returns true if environment is production', () => {
        mockGetClientEnvironment.mockReturnValue('production')

        expect(isProd()).toEqual(true)
      })

      test('returns false if environment is not production', () => {
        mockGetClientEnvironment.mockReturnValue('not production')

        expect(isProd()).toEqual(false)
      })
    })

    describe('in the server', () => {
      beforeEach(() => {
        mockCanUseWindow.mockReturnValue(false)
      })

      test('returns true if environment is production', () => {
        mockGetServerEnvironment.mockReturnValue('production')

        expect(isProd()).toEqual(true)
      })

      test('returns false if environment is not production', () => {
        mockGetServerEnvironment.mockReturnValue('not production')

        expect(isProd()).toEqual(false)
      })
    })
  })
})
