// eslint-disable-next-line import/no-named-as-default
import fetch from 'utils/fetch'
import {
  deactivateSubscription,
  fetchSubscription,
  skipDates,
  unSkipDates,
  fetchProjectedDeliveries,
} from '../subscription'

jest.mock('utils/fetch', () =>
  jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
)

jest.mock('config/endpoint', () =>
  jest.fn().mockImplementation((service, version = '') => `endpoint-${service}${version && `/${version}`}`)
)

jest.mock('config/routes', () => ({
  version: {
    recipes: 'v2',
    subscriptionCommand: 'v1',
    subscriptionQuery: 'v1',
  },
  core: {
    deactivateSub: '/deactivateSub',
    currentSubscription: '/currentSubscription'
  },
  subscriptionCommand: {
    skip: '/skip',
    unSkip: '/unskip',
  },
  subscriptionQuery: {
    projectedDeliveries: '/projected-deliveries',
  },
}))

describe('subscription endpoints', () => {
  const mockFetchResult = { data: [1, 2, 3] }

  describe('subscription api', () => {
    beforeEach(() => {
      fetch.mockClear()
    })

    describe('deactivateSubscription', () => {
      test('should fetch the correct url', async () => {
        const reqData = { a: 1, b: 2 }
        await deactivateSubscription('token', reqData)
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith('token', 'endpoint-core/deactivateSub', reqData, 'PUT')
      })

      test('should return the results of the fetch unchanged', async () => {
        const result = await deactivateSubscription('token', {})
        expect(result).toEqual(mockFetchResult)
      })
    })

    describe('fetchSubscription', () => {
      test('should fetch the correct url', async () => {
        const reqData = { c: 3, d: 4 }
        await fetchSubscription('token', reqData)
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith('token', 'endpoint-core/currentSubscription', reqData, 'GET')
      })

      test('should return the results of the fetch unchanged', async () => {
        const result = await fetchSubscription('token', {})
        expect(result).toEqual(mockFetchResult)
      })
    })

    describe('skipDates', () => {
      test('should fetch the correct url', async () => {
        const reqData = ['2020-02-20']
        await skipDates('token', 'user-id', reqData)

        expect(fetch).toHaveBeenCalledWith('token', 'endpoint-subscriptioncommand/v1/subscriptions/user-id/skip', {skipDates: reqData}, 'POST')
      })
    })

    describe('unSkipDates', () => {
      test('should fetch the correct url', async () => {
        const reqData = ['2020-02-20']
        await unSkipDates('token', 'user-id', reqData)

        expect(fetch).toHaveBeenCalledWith('token', 'endpoint-subscriptioncommand/v1/subscriptions/user-id/unskip', {unskipDates: reqData}, 'POST')
      })
    })

    describe('fetchProjectedDeliveries', () => {
      test('should fetch the correct url', async () => {
        await fetchProjectedDeliveries('token', 'mock-id')
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(
          'token',
          'endpoint-subscriptionquery/v1/projected-deliveries/mock-id',
          {},
          'GET',
        )
      })

      test('should return the results of the fetch unchanged', async () => {
        const result = await fetchProjectedDeliveries('token', 'mock-id')
        expect(result).toEqual(mockFetchResult)
      })
    })
  })
})
