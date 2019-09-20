import fetch from 'utils/fetch'
import { saveBasket } from '../checkout'

const mockFetchResult = { data: [1, 2, 3] }
jest.mock('utils/fetch', () =>
  jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
)

describe('checkout api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('saveBasket', () => {
    test('should fetch the correct url', async () => {
      const reqData = { a: 1, b: 2 }
      await saveBasket('token', 'path', reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token', '/checkout/path', reqData, 'POST')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await saveBasket('token', 'path', {})
      expect(result).toEqual(mockFetchResult)
    })
  })
})
