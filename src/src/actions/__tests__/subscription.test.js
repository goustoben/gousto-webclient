import Immutable from 'immutable'

import actionTypes from 'actions/actionTypes'
import { fetchSubscription } from 'apis/subscription'
import { basketNumPortionChange } from 'actions/basket'

import { subscriptionLoadData } from 'actions/subscription'

jest.mock('apis/subscription', () => ({
  fetchSubscription: jest.fn(),
}))

jest.mock('actions/basket', () => ({
  basketNumPortionChange: jest.fn(),
}))

describe('subscription actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()
  let data

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('subscriptionLoadData', () => {
    beforeEach(() => {
      getState.mockReturnValueOnce({
        auth: Immutable.Map({
          accessToken: 'subscription-load-data'
        })
      })
    })

    test('should dispatch a fetchSubscription call', () => {
      subscriptionLoadData()(dispatch, getState)

      expect(fetchSubscription).toHaveBeenCalledWith('subscription-load-data')
    })

    test('should dispatch a SUBSCRIPTION_LOAD_DATA action with returned data', async () => {
      data = { test: 'test-value' }
      fetchSubscription.mockReturnValue(Promise.resolve({
        data,
      }))

      await subscriptionLoadData()(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
        type: actionTypes.SUBSCRIPTION_LOAD_DATA,
        data,
      }))
    })

    describe('when data does not contain box numPortions', () => {
      beforeEach(() => {
        data = { test: 'test-value' }
        fetchSubscription.mockReturnValue(Promise.resolve({
          data,
        }))
      })

      test('should not call basketNumPortionChange', async () => {
        await subscriptionLoadData()(dispatch, getState)

        expect(basketNumPortionChange).not.toHaveBeenCalled()
      })
    })

    describe('when data contains box numPortions', () => {
      const numPortions = 4

      beforeEach(() => {
        data = {
          box: {
            numPortions,
          }
        }
        fetchSubscription.mockReturnValue(Promise.resolve({
          data,
        }))
      })

      test('should call basketNumPortionChange', async () => {
        await subscriptionLoadData()(dispatch, getState)

        expect(basketNumPortionChange).toHaveBeenCalledWith(numPortions)
      })
    })
  })
})
