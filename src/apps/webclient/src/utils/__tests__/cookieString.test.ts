import { canUseWindow } from 'utils/browserEnvironment'
import globals from 'config/globals'

import { cookieString } from '../cookieString'

jest.mock('utils/browserEnvironment')
jest.mock('config/globals')

const mockReqCookies = {
  request: {
    headers: {
      cookie: 'server=cookie'
    }
  }
}

let doc: typeof document

describe('cookieString util', () => {
  beforeAll(() => {
    doc = document
  })

  afterAll(() => {
    document = doc
  })

  describe('when window is available', () => {
    beforeEach(() => {
      globals.server = false;
      (canUseWindow as jest.Mock).mockReturnValue(true)

      document.cookie = 'document=cookie'
    })

    test('returns cookies from the document', () => {
      expect(cookieString()).toEqual(['document=cookie'])
    })
  })

  describe('when window is not available', () => {
    beforeEach(() => {
      globals.server = true;
      (canUseWindow as jest.Mock).mockReturnValue(false)
    })

    test('returns cookies from request headers', () => {
      expect(cookieString(mockReqCookies)).toEqual(['server=cookie'])
    })
  })
})
