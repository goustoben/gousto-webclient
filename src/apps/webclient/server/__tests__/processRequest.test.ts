import { renderHTML } from '../processRequest'
import { isServer } from '../utils/serverEnvironment'
import htmlTemplate from '../template'

jest.mock('../utils/serverEnvironment')
jest.mock('../../src/utils/browserEnvironment')
jest.mock('react-helmet', () => ({
  Helmet: {
    peek: 'mock helmet peek',
    renderStatic: () => 'mock helmet render static',
  },
}))
jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Record<string, unknown>),
  RouterContext: () => 'mock-router-context',
}))
jest.mock('../template')

const mockStore = {
  getState: () => ({
    mock: 'state',
  }),
  subscribe: () => {},
  dispatch: () => {},
}
const mockRenderProps = {
  routes: undefined,
  param: undefined,
  location: undefined,
  components: undefined,
  router: undefined,
  matchContext: undefined,
}
const mockUrl = 'https://mock-url.com'
const mockUserAgent = 'mock-user-agent'
const mockScripts = {}

const mockIsServer = isServer as jest.Mock
const mockHtmlTemplate = htmlTemplate as jest.Mock

describe('processRequest', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('renderHTML', () => {
    describe('on server', () => {
      beforeEach(() => {
        mockIsServer.mockReturnValue(true)
      })

      test('creates head using Helmet.renderStatic', async () => {
        await renderHTML(mockStore, mockRenderProps, mockUrl, mockUserAgent, mockScripts)

        expect(mockHtmlTemplate).toHaveBeenCalledWith(
          'mock-router-context',
          mockStore.getState(),
          mockUserAgent,
          mockScripts,
          'mock helmet render static'
        )
      })
    })

    describe('in browser', () => {
      beforeEach(() => {
        mockIsServer.mockReturnValue(false)
      })

      test('creates helmet head using Helmet.peek', async () => {
        await renderHTML(mockStore, mockRenderProps, mockUrl, mockUserAgent, mockScripts)

        expect(mockHtmlTemplate).toHaveBeenCalledWith(
          'mock-router-context',
          mockStore.getState(),
          mockUserAgent,
          mockScripts,
          'mock helmet peek'
        )
      })
    })
  })
})
