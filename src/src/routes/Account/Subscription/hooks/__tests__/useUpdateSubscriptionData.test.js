import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import logger from 'utils/logger'
import { useUpdateSubscription } from '../useUpdateSubscription'
import { useFetch } from '../../../../../hooks/useFetch'

import {
  actionTypes
} from '../../context/reducers'

jest.mock('../../../../../hooks/useFetch')
jest.mock('config/endpoint', () => () => 'localhost')
jest.mock('../../context/selectors/subscription', () => ({
  getSubscriptionUpdatePayload: () => ({
    num_portions: 2,
    num_recipes: 2,
    box_type: 'vegetarian',
    delivery_slot_id: '11',
    interval: 1
  }),
  getSubscriptionUpdateV2Payload: () => ({
    numRecipes: 2,
    numPortions: 2,
    boxType: 'vegetarian',
    interval: 1,
    intervalUnit: 'weeks',
    deliverySlotStartTime: '08:00:00',
    deliverySlotEndTime: '18:59:59',
    deliverySlotDay: 2,
  }),
}))

jest.mock('../../context/selectors/deliveries', () => ({
  getDeliverySlots: () => [
    {
      coreSlotId: 'mock-delivery-slot-id',
      deliveryStartTime: '08:00:00',
      deliveryEndTime: '19:00:00',
      defaultDay: 2,
    },
    {
      coreSlotId: 'mock-delivery-slot-id-2',
      deliveryStartTime: '08:00:00',
      deliveryEndTime: '18:59:59',
      defaultDay: 1,
    },
  ],
}))

const mockTrackingFn = jest.fn()
jest.mock('../../tracking/subscriptionSettings.js', () => ({
  trackSubscriptionSettingsChange: (args) => () => mockTrackingFn(args)
}))

const realContext = React.useContext

describe('useUpdateSubscription', () => {
  let mockDispatch
  let isLoading
  let error
  let mockFetchData

  const fetchWrapper = {
    wrapper: ({ children }) => children
  }

  const accessToken = 'access-token'
  const settingName = 'mock-setting-name'
  const data = {
    interval: 4
  }
  const trigger = {
    shouldRequest: true,
    setShouldRequest: () => { }
  }

  const response = {
    result: {
      data: {
        box: {
          box_type: 'gourmet',
          num_portions: 2,
          num_recipes: 4,
        },
        frequency: 'Weekly',
        interval: 1,
        slot: {
          cutoff_day: 6,
          cutoff_time: '11:59:59',
          default_day: 2,
          delivery_end: '18:59:59',
          delivery_start: '08:00:00',
          human_delivery_day_time: 'Tuesday 08:00 - 18:59',
          id: 11,
          number: 4,
        },
        state: {
          description: 'Active'
        }
      }
    }

  }

  beforeEach(() => {
    jest.clearAllMocks()

    isLoading = false
    error = null
    mockDispatch = jest.fn()

    React.useContext = jest.fn().mockImplementation(() => ({
      state: {},
      dispatch: mockDispatch
    }))

    mockFetchData = [isLoading, response, error]
    useFetch.mockReturnValue(mockFetchData)
  })

  afterAll(() => {
    React.useContext = realContext
  })

  describe('When calling useUpdateSubscription', () => {
    test('should call useFetch with expected arguments', async () => {
      renderHook(
        () => useUpdateSubscription({
          accessToken,
          data,
          trigger,
          settingName
        }),
        fetchWrapper,
      )

      const useFetchArgs = {
        url: 'localhost/user/current/subscription',
        trigger,
        needsAuthorization: true,
        accessToken,
        options: {
          method: 'PUT',
        },
        parameters: {
          num_portions: 2,
          num_recipes: 2,
          box_type: 'vegetarian',
          delivery_slot_id: '11',
          interval: 1,
          ...data
        }
      }

      expect(useFetch).toHaveBeenCalledWith(useFetchArgs)
    })

    describe('And request has not yet completed', () => {
      beforeEach(() => {
        useFetch.mockReturnValue([true, undefined, undefined])
      })

      test('Then the expected array is returned', () => {
        expect.assertions(3)

        const { result } = renderHook(
          () => useUpdateSubscription({
            accessToken,
            data,
            trigger,
            settingName
          }),
          fetchWrapper,
        )

        const [updateLoading, updateResponse, updateError] = result.current

        expect(updateLoading).toBeTruthy()
        expect(updateResponse).toEqual(undefined)
        expect(updateError).toEqual(undefined)
      })
    })
  })

  describe('when response is available', () => {
    let updateResponseSuccess
    let updateResponseError

    beforeEach(() => {
      mockFetchData = [isLoading, response, error]
      useFetch.mockReturnValue(mockFetchData)

      const { result } = renderHook(
        () => useUpdateSubscription({
          accessToken,
          data,
          trigger,
          settingName
        }),
        fetchWrapper,
      )

      const [, isSuccess, isError ] = result.current
      updateResponseSuccess = isSuccess
      updateResponseError = isError
    })

    test('then it should dispatch SUBSCRIPTION_UPDATE_DATA_RECEIVED', async () => {
      const dispatchedData = {
        type: actionTypes.SUBSCRIPTION_UPDATE_DATA_RECEIVED,
        data: {
          subscription: response.result.data
        }
      }

      expect(mockDispatch).toHaveBeenCalledWith(dispatchedData)
      expect(updateResponseSuccess).toEqual(response)
      expect(updateResponseError).toBeFalsy()
    })

    test('then it should call the tracking with update_success', async () => {
      expect(mockTrackingFn).toHaveBeenCalledWith({
        action: 'update_success',
        settingName,
      })
    })
  })

  describe('when useFetch returns an error', () => {
    let updateResponseSuccess
    let updateResponseError

    beforeEach(() => {
      error = true
      mockFetchData = [isLoading, null, error]
      useFetch.mockReturnValue(mockFetchData)

      const { result } = renderHook(
        () => useUpdateSubscription({
          accessToken,
          data,
          trigger,
          settingName
        }),
        fetchWrapper,
      )

      const [, isSuccess, isError ] = result.current
      updateResponseSuccess = isSuccess
      updateResponseError = isError
    })

    test('then it should not dispatch', async () => {
      expect(mockDispatch).not.toHaveBeenCalled()
      expect(updateResponseSuccess).toBeFalsy()
      expect(updateResponseError).toBeTruthy()
    })

    test('then it should call the tracking with update_error', async () => {
      expect(mockTrackingFn).toHaveBeenCalledWith({
        action: 'update_error',
        settingName,
      })
    })
  })

  describe('when data is invalid', () => {
    let warningSpy
    let newData
    beforeEach(() => {
      newData = {
        nonValidProp: 'text'
      }
      warningSpy = jest.spyOn(logger, 'warning')
    })

    test('then should call logger warning', () => {
      renderHook(
        () => useUpdateSubscription({
          accessToken,
          data: newData,
          trigger,
          settingName
        }),
        fetchWrapper,
      )
      const payload = {
        num_portions: 2,
        num_recipes: 2,
        box_type: 'vegetarian',
        delivery_slot_id: '11',
        interval: 1,
        nonValidProp: 'text'
      }

      expect(warningSpy).toHaveBeenCalledWith(`Update subscription payload not valid: ${JSON.stringify(payload)}`)
    })
  })

  describe('when new subscription api is enabled', () => {
    beforeEach(() => {
      React.useContext = jest.fn().mockImplementation(() => ({
        state: {currentUser: {id: 3}, isNewSubscriptionApiEnabled: true},
        dispatch: mockDispatch
      }))
      const subscriptionFunctionResponse = {
        data: {
          subscription: {
            numRecipes: 3,
            numPortions: 2,
            boxType: 'vegetarian',
            interval: 1,
            intervalUnit: 'week',
            deliverySlotStartTime: '08:00:00',
            deliverySlotEndTime: '18:59:59',
            deliverySlotDay: 1,
          }
        }
      }
      mockFetchData = [isLoading, subscriptionFunctionResponse, error]
      useFetch.mockReturnValue(mockFetchData)
    })
    test('should call useFetch with expected arguments', async () => {
      renderHook(
        () => useUpdateSubscription({
          accessToken,
          data,
          trigger,
          settingName
        }),
        fetchWrapper,
      )

      const useFetchArgs = {
        url: 'localhost/subscriptions/3',
        trigger,
        needsAuthorization: true,
        accessToken,
        options: {
          method: 'PUT',
          body: JSON.stringify({
            numRecipes: 2,
            numPortions: 2,
            boxType: 'vegetarian',
            interval: 1,
            intervalUnit: 'weeks',
            deliverySlotStartTime: '08:00:00',
            deliverySlotEndTime: '18:59:59',
            deliverySlotDay: 2,
            ...data
          })
        },
      }

      expect(useFetch).toHaveBeenCalledWith(useFetchArgs)
    })
  })
})
