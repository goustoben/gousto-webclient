import Immutable from 'immutable'

import { actionTypes } from 'actions/actionTypes'
import { basketNumPortionChange } from 'actions/basket'
import {
  getIsNewSubscriptionApiEnabled
} from 'selectors/features'
import logger from 'utils/logger'

import { subscriptionLoadData } from 'actions/subscription'
import { fetchSubscription, fetchSubscriptionV2 } from '../../routes/Account/apis/subscription'

jest.mock('../../routes/Account/apis/subscription', () => ({
  fetchSubscription: jest.fn(),
  fetchSubscriptionV2: jest.fn(),
}))

jest.mock('actions/basket', () => ({
  basketNumPortionChange: jest.fn(),
}))

jest.mock('utils/logger', () => ({
  notice: jest.fn(),
}))

jest.mock('selectors/features', () => ({
  getIsNewSubscriptionApiEnabled: jest.fn().mockReturnValue(false),
}))

describe('subscription actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()
  const state = {
    auth: Immutable.Map({
      accessToken: 'subscription-load-data'
    }),
    user: Immutable.Map({
      id: 'user-id',
    }),
  }
  let data

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('subscriptionLoadData', () => {
    beforeEach(() => {
      getState.mockReturnValueOnce(state)
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

        expect(logger.notice).toHaveBeenCalledWith(
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

        expect(logger.notice).not.toHaveBeenCalled()
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

    describe('when isNewSubscriptionApiEnabled is true', () => {
      const mockSubscriptionRepsonse = {
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
        getIsNewSubscriptionApiEnabled.mockReturnValueOnce(true)
        fetchSubscriptionV2.mockResolvedValueOnce({
          data: mockSubscriptionRepsonse,
        })
      })

      test('should dispatch a fetchSubscriptionV2 call', async () => {
        await subscriptionLoadData()(dispatch, getState)

        expect(fetchSubscriptionV2).toHaveBeenCalledWith('subscription-load-data', 'user-id')
      })

      test('should call basketNumPortionChange', async () => {
        await subscriptionLoadData()(dispatch, getState)

        expect(basketNumPortionChange).toHaveBeenCalledWith(
          mockSubscriptionRepsonse.data.subscription.numPortions
        )
      })
    })
  })
})
