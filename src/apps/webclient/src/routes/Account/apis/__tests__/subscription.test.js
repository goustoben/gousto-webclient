// eslint-disable-next-line import/no-named-as-default
import fetch from 'utils/fetch'
import {
  withMockEnvironmentAndDomain
} from '_testing/isomorphic-environment-test-utils'
import {
  deactivateSubscription,
  fetchProjectedDeliveries,
  fetchSubscription,
  skipDates,
  unSkipDates,
} from '../subscription'

jest.mock('utils/fetch', () =>
  jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
)

jest.mock('config/routes', () => ({
  subscriptionCommand: {
    skip: '/skip',
    unSkip: '/unskip',
    deactivate: '/deactivate',
  },
  subscriptionQuery: {
    subscriptions: '/subscriptions',
    projectedDeliveries: '/projected-deliveries',
  },
}))

describe('subscription endpoints', () => {
  const mockFetchResult = { data: [1, 2, 3] }

  // mock the environment and domain config used by these tests to generate endpoints
  withMockEnvironmentAndDomain('production', 'gousto.co.uk')

  describe('subscription api', () => {
    beforeEach(() => {
      fetch.mockClear()
    })

    describe('deactivateSubscription', () => {
      test('should fetch the correct url', async () => {
        const pauseDate = { pauseDate: '2020-03-25' }
        await deactivateSubscription('token', pauseDate, 'user-id')

        expect(fetch).toHaveBeenCalledWith(
          'token',
          'https://production-api.gousto.co.uk/subscriptioncommand/v1/subscriptions/user-id/deactivate',
          { pauseDate },
          'POST',
          'default',
          {'Content-Type': 'application/json'})
      })
    })

    describe('skipDates', () => {
      test('should fetch the correct url', async () => {
        const reqData = ['2020-02-20']
        await skipDates('token', 'user-id', reqData)

        expect(fetch).toHaveBeenCalledWith(
          'token',
          'https://production-api.gousto.co.uk/subscriptioncommand/v1/subscriptions/user-id/skip',
          {skipDates: reqData},
          'POST',
          'default',
          {'Content-Type': 'application/json'}
        )
      })
    })

    describe('unSkipDates', () => {
      test('should fetch the correct url', async () => {
        const reqData = ['2020-02-20']
        await unSkipDates('token', 'user-id', reqData)

        expect(fetch).toHaveBeenCalledWith(
          'token',
          'https://production-api.gousto.co.uk/subscriptioncommand/v1/subscriptions/user-id/unskip',
          {unskipDates: reqData},
          'POST',
          'default',
          {'Content-Type': 'application/json'}
        )
      })
    })

    describe('fetchSubscription', () => {
      test('should fetch the correct url', async () => {
        await fetchSubscription('token', 'user-id')

        expect(fetch).toHaveBeenCalledWith('token', 'https://production-api.gousto.co.uk/subscriptionquery/v1/subscriptions/user-id', {}, 'GET')
      })
    })

    describe('fetchProjectedDeliveries', () => {
      test('should fetch the correct url', async () => {
        await fetchProjectedDeliveries('token', 'mock-id')
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(
          'token',
          'https://production-api.gousto.co.uk/subscriptionquery/v1/projected-deliveries/mock-id',
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
