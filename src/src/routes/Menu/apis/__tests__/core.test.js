import { fetch } from 'utils/fetch'
import {
  saveUserOrder,
  updateUserOrder,
} from '../core'

const mockFetchResult = { data: [1, 2, 3] }
jest.mock('utils/fetch', () => ({
  fetch: jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
}))

jest.mock('config/endpoint', () =>
  jest.fn().mockImplementation((service, version = '') => `endpoint-${service}${version}`)
)

jest.mock('config/routes', () => ({
  core: {
    userOrder: '/userOrder',
  }
}))

describe('user api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('saveUserOrder', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      const reqData = { a: 1 }
      await saveUserOrder(accessToken, reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, 'endpoint-core/userOrder', reqData, 'POST')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await saveUserOrder('token', {})
      expect(result).toEqual(mockFetchResult)
    })
  })

  describe('updateUserOrder', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      const reqData = { a: 1 }
      await updateUserOrder(accessToken, reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, 'endpoint-core/userOrder', reqData, 'PUT')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await updateUserOrder('token', {})
      expect(result).toEqual(mockFetchResult)
    })
  })
})
