import { createIsomorphicConfig } from 'utils/isomorphicEnvironment'
import { canUseWindow } from 'utils/browserEnvironment'

jest.mock('utils/browserEnvironment')

const mockCanUseWindow = canUseWindow as jest.Mock

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
})
