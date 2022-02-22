import { canUseWindow } from 'utils/browserEnvironment'
import { isServer } from 'utils/serverEnvironment'

import { encode, decode } from '../cookieHelper2'

jest.mock('utils/browserEnvironment')
jest.mock('utils/serverEnvironment')

const mockObj = { foo: 'http://foo-bar' }
const stringifiedMockObject = '{"foo":"http://foo-bar"}'
const URIEncodedAndStringifiedMockObject = '%7B%22foo%22%3A%22http%3A%2F%2Ffoo-bar%22%7D'

const mockCanUseWindow = canUseWindow as jest.Mock
const mockIsServer = isServer as jest.Mock

describe('cookieHelper2 utils', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('encode', () => {
    describe('when the window is available', () => {
      beforeEach(() => {
        mockCanUseWindow.mockReturnValue(true)
      })

      test('returns the stringified value', () => {
        const result = encode(mockObj)
        expect(result).toEqual(stringifiedMockObject)
      })
    })

    describe('when the window is not available', () => {
      beforeEach(() => {
        mockCanUseWindow.mockReturnValue(false)
        mockIsServer.mockReturnValue(true)
      })

      test('returns the URIencoded stringified value', () => {
        const result = encode(mockObj)
        expect(result).toEqual(URIEncodedAndStringifiedMockObject)
      })
    })
  })

  describe('decode', () => {
    describe('when the window is available', () => {
      beforeEach(() => {
        mockCanUseWindow.mockReturnValue(true)
        mockIsServer.mockReturnValue(false)
      })

      test('returns the stringified value', () => {
        const result = decode(stringifiedMockObject)
        expect(result).toEqual(mockObj)
      })
    })

    describe('when the window is not available', () => {
      beforeEach(() => {
        mockCanUseWindow.mockReturnValue(false)
        mockIsServer.mockReturnValue(true)
      })

      test('returns the URIencoded stringified value', () => {
        const result = decode(URIEncodedAndStringifiedMockObject)
        expect(result).toEqual(mockObj)
      })
    })
  })
})
