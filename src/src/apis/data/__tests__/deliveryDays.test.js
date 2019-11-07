const mockFetchDeliveryDays = jest.fn()

jest.mock('apis/deliveries', () => ({
  fetchDeliveryDays: mockFetchDeliveryDays,
}))

describe('delivery days', () => {
  describe('getDeliveryDays', () => {
    const { getDeliveryDays } = require('../deliveryDays')

    const days = [
      {
        id: 'day1',
        date: '2016-06-26',
      },
    ]

    beforeEach(() => {
      mockFetchDeliveryDays.mockReset()
      mockFetchDeliveryDays.mockResolvedValue({data: days})
    }),

    test('should call fetchDeliveryDays with correct data', async () => {
      await getDeliveryDays(
        'a-token',
        'NW1 8RJ',
        '2019-01-01 10:00:00',
        '2019-01-02',
        true,
        'some-uuid',
      )

      const requestData = mockFetchDeliveryDays.mock.calls[0][1]
      const token = mockFetchDeliveryDays.mock.calls[0][0]

      const expectedReqData = {
        postcode: 'NW1 8RJ',
        'filters[cutoff_datetime_from]': '2019-01-01 10:00:00',
        'filters[cutoff_datetime_until]': '2019-01-02',
        ndd: 'true',
        delivery_tariff_id: 'some-uuid',
        sort: 'date',
        direction: 'asc',
      }

      expect(requestData).toEqual(expectedReqData)
      expect(token).toEqual('a-token')
    })
  })
})
