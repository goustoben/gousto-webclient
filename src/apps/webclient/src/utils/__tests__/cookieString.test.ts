import { canUseWindow } from 'utils/browserEnvironment'
import { isServer } from 'utils/serverEnvironment'

import { cookieString } from '../cookieString'

jest.mock('utils/browserEnvironment')
jest.mock('utils/serverEnvironment')

const mockCanUseWindow = canUseWindow as jest.Mock
const mockIsServer = isServer as jest.Mock

const mockReqCookies = {
  request: {
    headers: {
      cookie: 'server=cookie',
    },
  },
}

let doc: typeof document

describe('cookieString util', () => {
  beforeAll(() => {
    doc = document
  })

  afterAll(() => {
    document = doc
  })

  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('when window is available', () => {
    beforeEach(() => {
      mockIsServer.mockReturnValue(false)
      mockCanUseWindow.mockReturnValue(true)

      document.cookie = 'document=cookie'
    })

    test('returns cookies from the document', () => {
      expect(cookieString()).toEqual(['document=cookie'])
    })
  })

  describe('when on the server', () => {
    beforeEach(() => {
      mockIsServer.mockReturnValue(true)
    })

    test('returns cookies from request headers', () => {
      expect(cookieString(mockReqCookies)).toEqual(['server=cookie'])
    })
  })
})
