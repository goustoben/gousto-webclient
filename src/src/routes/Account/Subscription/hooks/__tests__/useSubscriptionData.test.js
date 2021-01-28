import { renderHook } from '@testing-library/react-hooks'
import moment from 'moment'

import { useSubscriptionData } from '../useSubscriptionData'
import { useFetch } from '../../../../../hooks/useFetch'
import * as getCurrentUserPostcode from '../../context/selectors/currentUser'

jest.mock('config/endpoint', () => () => 'localhost')
jest.mock('../../../../../hooks/useFetch')
jest.mock('moment')

const mockAccessToken = 'mock-access-token'
const mockTrigger = {
  shouldRequest: false,
  setShouldRequest: () => {},
}
const mockState = {
  currentUser: {
    shippingAddress: {
      postcode: 'W1A',
    },
    deliveryTariffId: 'a1b2c3-d4e5f6'
  }
}
const mockDispatch = jest.fn()
const getCurrentUserPostcodeSpy = jest.spyOn(getCurrentUserPostcode, 'getCurrentUserPostcode')

describe('Given useSubscriptionData is invoked', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    useFetch.mockReturnValue([true, undefined, false])
    moment.mockImplementation(() => ({
      startOf: () => ({
        toISOString: () => 'start of day',
        add: () => ({
          toISOString: () => '7 days later'
        })
      })
    }))

    renderHook(() => useSubscriptionData(mockAccessToken, mockDispatch, mockTrigger, mockState))
  })

  test('Then useFetch makes the expected requests', () => {
    expect(useFetch).toHaveBeenNthCalledWith(1, {
      accessToken: 'mock-access-token',
      needsAuthorization: true,
      url: 'localhost/user/current/subscription'
    })

    expect(useFetch).toHaveBeenNthCalledWith(2, {
      accessToken: 'mock-access-token',
      parameters: {
        direction: 'asc',
        'filters[cutoff_datetime_from]': 'start of day',
        'filters[cutoff_datetime_until]': '7 days later',
        postcode: 'W1A',
        delivery_tariff_id: 'a1b2c3-d4e5f6',
        sort: 'date'
      },
      url: 'localhost/days',
      trigger: mockTrigger,
    })
  })

  test('Then getCurrentUserPostcode is called', () => {
    expect(getCurrentUserPostcodeSpy).toHaveBeenCalled()
  })

  test('Then dispatch is not yet invoked', () => {
    expect(mockDispatch).not.toHaveBeenCalled()
  })

  describe('When both http requests resolve data', () => {
    const mockDeliveriesResponse = { data: 'delivery data' }
    const mockSubscriptionRepsonse = { result: { data: 'subscription data' } }

    beforeEach(() => {
      useFetch.mockReturnValueOnce([false, mockSubscriptionRepsonse, false])
      useFetch.mockReturnValueOnce([false, mockDeliveriesResponse, false])

      renderHook(() => useSubscriptionData(mockAccessToken, mockDispatch, mockTrigger, mockState))
    })

    test('Then the expected action is dispatched', () => {
      expect(mockDispatch).toHaveBeenCalledTimes(1)
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SUBSCRIPTION_DATA_RECEIVED',
        data: {
          deliveries: mockDeliveriesResponse.data,
          subscription: mockSubscriptionRepsonse.result.data
        }
      })
    })
  })

  describe('When there is an error', () => {
    beforeEach(() => {
      useFetch.mockReturnValue([false, undefined, true])

      renderHook(() => useSubscriptionData(mockAccessToken, mockDispatch, mockTrigger, mockState))
    })

    test('Then dispath is not invoked', () => {
      expect(mockDispatch).not.toHaveBeenCalled()
    })
  })
})
