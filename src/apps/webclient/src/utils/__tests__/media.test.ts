import { proxyAssetRequest, ASSET_PATH } from 'utils/media'
import isomorphicFetch from 'isomorphic-fetch'
import { getEnvironment, getProtocol, getDomain } from 'utils/isomorphicEnvironment'

jest.mock('isomorphic-fetch')
jest.mock('utils/isomorphicEnvironment')

const mockedIsomorphicFetch = isomorphicFetch as jest.Mock

describe('media.js', () => {
  describe('getAssetRootUrl', () => {
    test.each([
      ['production', 'gousto.co.uk', `https://production-assets.gousto.co.uk${ASSET_PATH}`],
      ['staging', 'gousto.info', `https://staging-assets.gousto.info${ASSET_PATH}`],
      ['fef', undefined, `https://s3-gousto-fef-assets.s3.amazonaws.com${ASSET_PATH}`],
      ['local', undefined, ASSET_PATH],
    ])('getAssetRootUrl contains the correct values', (serverEnvironment, domain, expected) => {
      (getProtocol as jest.Mock).mockReturnValue('https:');
      (getDomain as jest.Mock).mockReturnValue(domain);
      (getEnvironment as jest.Mock).mockReturnValue(serverEnvironment);

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
