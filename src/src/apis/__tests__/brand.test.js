import { fetch } from 'utils/fetch'
import { fetchBrandInfo, fetchBrandMenuHeaders } from '../brand'

jest.mock('utils/fetch', () => ({
  fetch: jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
}))

describe('brand api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('fetchBrandInfo', () => {
    test('should fetch the correct url', async () => {
      const expectedReqData = {}

      await fetchBrandInfo('access-token', 'session-id', 'user-id')
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('access-token', 'https://production-api.gousto.co.uk/brand/v1/theme', expectedReqData, 'GET', 'default', { 'x-gousto-device-id': 'session-id', 'x-gousto-user-id': 'user-id' })
    })
  })

  describe('fetchBrandInfo', () => {
    test('should fetch the correct url', async () => {
      const expectedReqData = {}

      await fetchBrandMenuHeaders('access-token', 'session-id', 'user-id')
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('access-token', 'https://production-api.gousto.co.uk/brand/v1/menu-headers', expectedReqData, 'GET', 'default', { 'x-gousto-device-id': 'session-id', 'x-gousto-user-id': 'user-id' })
    })
  })
})
