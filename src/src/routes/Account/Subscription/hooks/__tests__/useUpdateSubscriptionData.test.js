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
  })
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
          trigger
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
  })

  describe('when response is available', () => {
    test('should dispatch SUBSCRIPTION_UPDATE_DATA_RECEIVED', async () => {
      const { result } = renderHook(
        () => useUpdateSubscription({
          accessToken,
          data,
          trigger
        }),
        fetchWrapper,
      )
      const [, isSuccess, isError] = result.current

      const dispatchedData = {
        type: actionTypes.SUBSCRIPTION_UPDATE_DATA_RECEIVED,
        data: {
          subscription: response.result.data
        }
      }
      expect(mockDispatch).toHaveBeenCalledWith(dispatchedData)
      expect(isSuccess).toBeTruthy()
      expect(isError).toBeFalsy()
    })
  })

  describe('when useFetch is returning error', () => {
    beforeEach(() => {
      error = true
      mockFetchData = [isLoading, response, error]
      useFetch.mockReturnValue(mockFetchData)

      test('should not dispatch', async () => {
        const { result } = renderHook(
          () => useUpdateSubscription({
            accessToken,
            data,
            trigger
          }),
          fetchWrapper,
        )
        const [, isSuccess, isError] = result.current

        expect(mockDispatch).not.toHaveBeenCalled()
        expect(isSuccess).toBeFalsy()
        expect(isError).toBeTruthy()
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
          trigger, }),
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
})
