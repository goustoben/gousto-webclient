import fetch from 'utils/fetch'
import { fetchMenus, fetchMenusWithUserId } from '../menus'

const mockFetchResult = { data: [1, 2, 3] }
jest.mock('utils/fetch', () =>
  jest.fn().mockImplementation(() => {
    const getData = async () => (mockFetchResult)

    return getData()
  })
)

jest.mock('config/endpoint', () =>
  jest.fn().mockImplementation((service, version = '') => `endpoint/${service}/${version}`)
)

jest.mock('config/routes', () => ({
  version: {
    menu: 'v1',
  },
  menu: {
    menus: '/menus'
  }
}))

describe('menus', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('fetchMenus', () => {
    test('should fetch the correct url', async () => {
      await fetchMenus('token')
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint/menu/v1/menus', {}, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchMenus('token')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchMenusWithUserId', function () {
    test('should fetch the correct url', async () => {
      await fetchMenusWithUserId('token', 'e34rder')
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', 'endpoint/menu/v1/menus?userId=e34rder', {}, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchMenusWithUserId('token', 'e34rder')
      expect(result).toEqual(mockFetchResult)
    })
  })
})
