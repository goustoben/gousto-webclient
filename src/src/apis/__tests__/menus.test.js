import * as fetchModule from 'utils/fetch'
import { fetchMenus, fetchMenusWithUserId } from '../menus'

const mockFetchResult = { data: [1, 2, 3] }

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
    fetchModule.fetchRaw = jest.fn().mockImplementation(() => {
      const getData = async () => (mockFetchResult)

      return getData()
    })
  })

  afterEach(() => {
    fetchModule.fetchRaw.mockClear()
  })

  describe('fetchMenus', () => {
    test('should fetch the correct url', async () => {
      await fetchMenus('token')
      expect(fetchModule.fetchRaw).toHaveBeenCalledTimes(1)
      expect(fetchModule.fetchRaw).toHaveBeenCalledWith('endpoint/menu/v1/menus',
        { include: 'ingredients' },
        { accessToken: 'token' ,
          cache: "default",
          headers: {},
          includeCookies: false,
          includeExperiments: true,
          method: "GET",
          timeout: null,
          useMenuService: true,
        })
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchMenus('token')
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('fetchMenusWithUserId', function () {
    test('should fetch the correct url', async () => {
      await fetchMenusWithUserId('token', 'e34rder')
      expect(fetchModule.fetchRaw).toHaveBeenCalledTimes(1)
      expect(fetchModule.fetchRaw).toHaveBeenCalledWith('endpoint/menu/v1/menus',
        { include: 'ingredients', userId: 'e34rder' },
        { accessToken: 'token' ,
          cache: "default",
          headers: {},
          includeCookies: false,
          includeExperiments: true,
          method: "GET",
          timeout: null,
          useMenuService: true,
        })
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchMenusWithUserId('token', 'e34rder')
      expect(result).toEqual(mockFetchResult)
    })
  })
})
