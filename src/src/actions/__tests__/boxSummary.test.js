import Immutable from 'immutable' /* eslint-disable new-cap */
import boxSummary from 'actions/boxSummary'
import fetchDeliveryDays from 'apis/deliveries'

jest.mock('apis/deliveries', () => ({
  fetchDeliveryDays: jest.fn()
}))

describe('boxSummary actions', () => {
  describe('boxSummaryDeliveryDaysLoad', () => {

    const from = '2017-12-05'
    const to = '2017-12-30'
    const getStateArgs = {
      auth: Immutable.fromJS({ accessToken: 'access token' }),
      basket: Immutable.fromJS({}),
    }

    const dispatchSpy = jest.fn()

    it('should fetch delivery days with menu cutoff date', function() {
      const menuCutoffUntil = '2017-12-30T00:00:00.000Z'
      const expectedRequestData = {
        'direction': 'asc',
        'filters[cutoff_datetime_from]': '2017-12-05T00:00:00.000Z',
        'filters[cutoff_datetime_until]': menuCutoffUntil,
        'sort': 'date',
        'ndd': 'false',
      }

      const getStateSpy = jest.fn().mockReturnValue({
        ...getStateArgs,
        menuCutoffUntil,
      })

      boxSummary.boxSummaryDeliveryDaysLoad(from)(dispatchSpy, getStateSpy)

      expect(fetchDeliveryDays.fetchDeliveryDays).toHaveBeenCalledWith('access token', expectedRequestData)
    })

    it('should fetch delivery days with requested cut off dates', function() {
      const expectedRequestData = {
        'direction': 'asc',
        'filters[cutoff_datetime_from]': '2017-12-05T00:00:00.000Z',
        'filters[cutoff_datetime_until]': '2017-12-30T23:59:59.999Z',
        'sort': 'date',
        'ndd': 'false',
      }
      const getStateSpy = jest.fn().mockReturnValue(getStateArgs)
      boxSummary.boxSummaryDeliveryDaysLoad(from, to)(dispatchSpy, getStateSpy)

      expect(fetchDeliveryDays.fetchDeliveryDays).toHaveBeenCalledWith('access token', expectedRequestData)
    })

    it('should fetch next day delivery days with requested cut off dates when feature flag is enabled', () => {
      const expectedRequestData = {
        'direction': 'asc',
        'filters[cutoff_datetime_from]': '2017-12-05T00:00:00.000Z',
        'filters[cutoff_datetime_until]': '2017-12-30T23:59:59.999Z',
        'sort': 'date',
        'ndd': 'true',
      }

      const getStateSpy = jest.fn().mockReturnValue({
        ...getStateArgs,
        features: Immutable.fromJS({
          ndd: {
            value: true,
            experiment: false,
          }
        }
        ),
      })

      boxSummary.boxSummaryDeliveryDaysLoad(from, to)(dispatchSpy, getStateSpy)

      expect(fetchDeliveryDays.fetchDeliveryDays).toHaveBeenCalledWith('access token', expectedRequestData)
    })
  })
})
