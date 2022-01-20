import { renderHook } from '@testing-library/react-hooks'
import moment from 'moment'

import { useSubscriptionData } from '../useSubscriptionData'
import { useFetch } from '../../../../../hooks/useFetch'
import * as getCurrentUserPostcode from '../../context/selectors/currentUser'

jest.mock('config/endpoint', () => () => 'localhost')
jest.mock('../../../../../hooks/useFetch')
jest.mock('moment')

const mockAccessToken = 'mock-access-token'
const mockTriggerDeliveryDays = {
  shouldRequest: false,
  setShouldRequest: () => {},
}
const mockTriggerSubscription = {
  shouldRequest: false,
  setShouldRequest: () => {},
}
const mockState = {
  currentUser: {
    id: '1233',
    shippingAddress: {
      postcode: 'W1A',
    },
    deliveryTariffId: 'a1b2c3-d4e5f6'
  }
}
const mockDispatch = jest.fn()
const getCurrentUserPostcodeSpy = jest.spyOn(getCurrentUserPostcode, 'getCurrentUserPostcode')

describe('Given useSubscriptionData is invoked', () => {
  const mockDeliveriesResponse = { data: [{
    slots: [
      {
        id: 123,
        core_slot_id: 2,
        default_day: 3,
        delivery_start_time: '08:00:00',
        delivery_end_time: '19:00:00',
      }
    ]
  }] }

  const mockSubscriptionResponse = {
    data: {
      subscription: {
        interval: 2,
        deliverySlotStartTime: '08:00:00',
        deliverySlotEndTime: '19:00:00',
        status: 'active',
        numPortions: 4,
        authUserId: 'auth-user-id',
        deliverySlotDay: 3,
        boxType: 'vegetarian',
        userId: '1233',
        numRecipes: 4,
      },
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()

    moment.mockImplementation(() => ({
      startOf: () => ({
        toISOString: () => 'start of day',
        add: () => ({
          toISOString: () => '7 days later'
        })
      })
    }))

    useFetch
      .mockReturnValueOnce([true, mockSubscriptionResponse, false])
      .mockReturnValueOnce([true, mockDeliveriesResponse, false])

    renderHook(() => useSubscriptionData(
      mockAccessToken,
      mockDispatch,
      mockTriggerDeliveryDays,
      mockTriggerSubscription,
      mockState
    ))
  })

  test('Then useFetch makes the expected requests', () => {
    expect(useFetch).toHaveBeenNthCalledWith(1, {
      accessToken: 'mock-access-token',
      needsAuthorization: true,
      url: 'localhost/subscriptions/1233',
      trigger: mockTriggerSubscription,
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
      trigger: mockTriggerDeliveryDays,
    })
  })

  test('Then getCurrentUserPostcode is called', () => {
    expect(getCurrentUserPostcodeSpy).toHaveBeenCalled()
  })

  test('And the expected action is dispatched', () => {
    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SUBSCRIPTION_DATA_RECEIVED',
      data: {
        deliveries: [
          {
            slots: [
              {
                coreSlotId: 2,
                defaultDay: 3,
                deliveryEndTime: '19:00:00',
                deliveryStartTime: '08:00:00',
                id: 123,
              }
            ]
          }
        ],
        subscription: {
          box: {
            boxType: 'vegetarian',
            numPortions: 4,
            numRecipes: 4,
          },
          subscription: {
            deliverySlotId: 2,
            interval: 2,
            state: 'active',
            deliverySlotDay: 3,
            deliverySlotStartTime: '08:00:00',
            deliverySlotEndTime: '19:00:00',
          },
          projected: [],
        }
      }
    })
  })

  describe('When there is an error', () => {
    beforeEach(() => {
      jest.resetAllMocks()

      useFetch.mockReturnValue([false, undefined, true])

      renderHook(() => useSubscriptionData(
        mockAccessToken,
        mockDispatch,
        mockTriggerDeliveryDays,
        mockTriggerSubscription,
        mockState
      ))
    })

    test('Then dispatch is not invoked', () => {
      expect(mockDispatch).not.toHaveBeenCalled()
    })
  })
})
