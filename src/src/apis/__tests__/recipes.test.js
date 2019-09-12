import fetch from 'utils/fetch'
import { fetchAvailableDates } from 'apis/recipes'

jest.mock('utils/fetch', () =>
  jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
)

jest.mock('config/endpoint', () =>
  jest.fn().mockReturnValue('gousto-endpoint')
)

jest.mock('config/routes', () => ({
  version: {
    recipes: 'v2',
  },
  recipes: {
    availableDates: '/dates/available'
  }
}))

describe('recipes', () => {
  describe('fetchAvailableDates', () => {
    test('should fetch the correct url', async () => {
      await fetchAvailableDates('token')
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith('token','gousto-endpoint/dates/available', {}, 'GET')
    })
    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchAvailableDates('token')
      expect(result).toEqual({
        data: [1, 2, 3],
      })
    })
  })
})
