import { proxyAssetRequest, ASSET_PATH } from 'utils/media'
import isomorphicFetch from 'isomorphic-fetch'

jest.mock('isomorphic-fetch')

const mockedIsomorphicFetch = isomorphicFetch as jest.Mock

describe('media.js', () => {
  describe('getAssetRootUrl', () => {
    const originalProcessEnv = process.env

    beforeEach(() => {
      jest.resetModules()
      process.env = { ...originalProcessEnv }
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    afterAll(() => {
      process.env = originalProcessEnv
    })

    test.each([
      ['production', 'gousto.co.uk', `https://production-assets.gousto.co.uk${ASSET_PATH}`],
      ['staging', 'gousto.info', `https://staging-assets.gousto.info${ASSET_PATH}`],
      ['fef', undefined, `https://s3-gousto-fef-assets.s3.amazonaws.com${ASSET_PATH}`],
      ['local', undefined, ASSET_PATH],
    ])('getEnvConfig contains the correct values', (serverEnvironment, domain, expected) => {
      process.env = {
        DOMAIN: domain,
        ENVIRONMENT: serverEnvironment,
      }

      // eslint-disable-next-line
      const { getAssetRootUrl } = require('../media')

      expect(getAssetRootUrl()).toEqual(expected)
    })
  })

  describe('proxyAssetRequest', () => {
    test('proxyAssetRequest successfully processes an asset request', async () => {
      mockedIsomorphicFetch.mockResolvedValue({
        body: 'mock-image-bytes',
      })

      const ctx = {
        request: {
          path: `${ASSET_PATH}/mock-image.jpg`,
        }
      }

      await proxyAssetRequest({ ctx, next: () => {} })

      expect(ctx).toEqual({
        body: 'mock-image-bytes',
        type: 'jpg',
        request: {
          path: `${ASSET_PATH}/mock-image.jpg`,
        },
      })
    })
  })

  test('proxyAssetRequest successfully skips an NON asset request', async () => {
    const ctx = {
      request: {
        path: '/users/current',
      }
    }

    const mockedNext = jest.fn()

    await proxyAssetRequest({ ctx, next: mockedNext })

    expect(mockedNext).toHaveBeenCalled()
  })
})
