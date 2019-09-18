const mockFetchAvailableDates = jest.fn()

jest.mock('apis/recipes', () => ({
  fetchAvailableDates: mockFetchAvailableDates
}))

describe('available dates', () => {
  const dates = [
    { until: '2019-09-17T00:00:00+01:00' },
    { until: '2019-10-22T00:00:00+01:00' }
  ]

  beforeEach(() => {
    mockFetchAvailableDates.mockReset()
    mockFetchAvailableDates.mockResolvedValue({ data: dates })
  })

  describe('getAvailableDates', () => {
    // this require here is so that the mock above is picked up correctly
    const { getAvailableDates } = require('../availableDates')

    describe('when useMenuService is false', () => {
      test('should call fetchAvailableDates with access code', async () => {
        await getAvailableDates('abc', false)

        expect(mockFetchAvailableDates).toHaveBeenCalledWith('abc')
      })

      test('should return the result of fetchAvailableDates.data', async () => {
        const response = await getAvailableDates('abc', false)

        expect(response).toEqual(dates)
      })
    })
  })
})
