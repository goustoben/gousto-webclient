import { renderHook } from '@testing-library/react-hooks'
import { withMockEnvironmentAndDomain } from '_testing/isomorphic-environment-test-utils'
import isomorphicFetch from 'isomorphic-fetch'

import { useDeliveryDays } from './useDeliveryDays'

jest.mock('isomorphic-fetch', () => jest.fn())

const mockedIsomorphicFetch = isomorphicFetch as jest.MockedFunction<any>

describe('useDeliveryDays', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // mock the environment and domain config used by these tests to generate endpoints
  withMockEnvironmentAndDomain('production', 'gousto.co.uk')

  describe('when passed all necessary arguments', () => {
    mockedIsomorphicFetch.mockResolvedValueOnce({
      json: () => ({ data: {} }),
      status: 200,
    })

    it('should pass them to the server side APIs', async () => {
      const { waitForNextUpdate } = renderHook(() =>
        useDeliveryDays({
          accessToken: 'access token',
          cutoffFrom: '2021-12-21T00:00:00',
          cutoffUntil: '2021-12-31T23:59:59',
          deliveryTariffId: 'tariff ID',
          isNDDExperiment: false,
          userId: 'user one',
          usersOrdersDaySlotLeadTimeIds: [],
          postcode: 'RH19 1AA',
        }),
      )

      await waitForNextUpdate()

      expect(mockedIsomorphicFetch).toBeCalledWith(
        'https://production-api.gousto.co.uk/deliveries/v1.0/days?filters%5Bcutoff_datetime_from%5D=2021-12-21T00%3A00%3A00&filters%5Bcutoff_datetime_until%5D=2021-12-31T23%3A59%3A59&ndd=false&delivery_tariff_id=tariff%20ID&sort=date&direction=asc&postcode=rh19',
        {
          headers: {
            Authorization: 'Bearer access token',
            'Content-Type': 'application/json',
            'x-gousto-user-id': 'user one',
          },
          method: 'GET',
        },
      )
    })
  })
})
