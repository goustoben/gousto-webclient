import { canUseWindow } from 'utils/browserEnvironment'

import { encode, decode } from '../cookieHelper2'

jest.mock('utils/browserEnvironment')

const mockObj = { foo: 'http://foo-bar' }
const stringifiedMockObject = '{"foo":"http://foo-bar"}'
const URIEncodedAndStringifiedMockObject = '%7B%22foo%22%3A%22http%3A%2F%2Ffoo-bar%22%7D'

describe('cookieHelper2 utils', () => {
  describe('encode', () => {
    describe('when the window is available', () => {
      beforeEach(() => {
        (canUseWindow as jest.Mock).mockReturnValue(true)
      })

      test('returns the stringified value', () => {
        const result = encode(mockObj)
        expect(result).toEqual(stringifiedMockObject)
      })
    })

    describe('when the window is not available', () => {
      beforeEach(() => {
        (canUseWindow as jest.Mock).mockReturnValue(false);
        // eslint-disable-next-line
        (global as unknown as { __SERVER__: boolean }).__SERVER__ = true
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
        (canUseWindow as jest.Mock).mockReturnValue(true);
        // eslint-disable-next-line
        (global as unknown as { __SERVER__: boolean }).__SERVER__ = false
      })

      test('returns the stringified value', () => {
        const result = decode(stringifiedMockObject)
        expect(result).toEqual(mockObj)
      })
    })

    describe('when the window is not available', () => {
      beforeEach(() => {
        (canUseWindow as jest.Mock).mockReturnValue(false);
        // eslint-disable-next-line
        (global as unknown as { __SERVER__: boolean }).__SERVER__ = true
      })

      test('returns the URIencoded stringified value', () => {
        const result = decode(URIEncodedAndStringifiedMockObject)
        expect(result).toEqual(mockObj)
      })
    })
  })
})
