import Immutable from 'immutable'

import actionTypes from 'actions/actionTypes'
import { fetchSubscription } from 'apis/subscription'
import { basketNumPortionChange } from 'actions/basket'
import { notice } from 'utils/logger'

import { subscriptionLoadData } from 'actions/subscription'

jest.mock('apis/subscription', () => ({
  fetchSubscription: jest.fn(),
}))

jest.mock('actions/basket', () => ({
  basketNumPortionChange: jest.fn(),
}))

jest.mock('utils/logger', () => ({
  notice: jest.fn(),
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

    describe('when fetchSubscription fails', () => {
      beforeEach(() => {
        fetchSubscription.mockReturnValue(Promise.reject(
          new Error('fetch-subscription-fail')
        ))
      })

      test('should not dispatch any actions', async () => {
        await subscriptionLoadData()(dispatch, getState)

        expect(dispatch).not.toHaveBeenCalled()
      })

      test('should log a notice with the error', async () => {
        await subscriptionLoadData()(dispatch, getState)

        expect(notice).toHaveBeenCalledWith(
          'Subscription load error: Error: fetch-subscription-fail'
        )
      })
    })

    describe('when fetchSubscription succeeds with data', () => {
      beforeEach(() => {
        data = { test: 'test-value' }
        fetchSubscription.mockReturnValue(Promise.resolve({
          data,
        }))
      })

      test('should dispatch a SUBSCRIPTION_LOAD_DATA action with returned data', async () => {
        await subscriptionLoadData()(dispatch, getState)

        expect(notice).not.toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
          type: actionTypes.SUBSCRIPTION_LOAD_DATA,
          data,
        }))
      })
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
