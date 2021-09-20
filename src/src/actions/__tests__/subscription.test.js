import Immutable from 'immutable'

import { actionTypes } from 'actions/actionTypes'
import { basketNumPortionChange } from 'actions/basket'
import logger from 'utils/logger'

import { subscriptionLoadData } from 'actions/subscription'
import { fetchSubscription } from '../../routes/Account/apis/subscription'
import { mapSubscriptionPayload } from '../../routes/Account/Subscription/utils/mapping'

jest.mock('../../routes/Account/apis/subscription', () => ({
  fetchSubscription: jest.fn(),
}))

jest.mock('../../routes/Account/apis/subscription')

jest.mock('../../routes/Account/Subscription/utils/mapping')

jest.mock('actions/basket', () => ({
  basketNumPortionChange: jest.fn(),
}))

jest.mock('utils/logger', () => ({
  notice: jest.fn(),
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
    getState.mockReturnValueOnce(state)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('subscriptionLoadData', () => {
    test('calls the subscription API method fetchSubscription', () => {
      subscriptionLoadData()(dispatch, getState)
      expect(fetchSubscription)
        .toHaveBeenCalledWith('subscription-load-data', 'user-id')
    })

    describe('if API call succeeds', () => {
      beforeEach(() => {
        fetchSubscription.mockResolvedValueOnce({
          data: mockSubscriptionResponse,
        })
      })

      test('maps the API response into SUBSCRIPTION_LOAD_DATA action', async () => {
        const mapped = Symbol('mapped-data')
        mapSubscriptionPayload.mockReturnValue(mapped)

        await subscriptionLoadData()(dispatch, getState)

        expect(dispatch)
          .toHaveBeenCalledWith(expect.objectContaining({
            type: actionTypes.SUBSCRIPTION_LOAD_DATA,
            data: mapped,
          }))
      })

      test('logs no error', async () => {
        await subscriptionLoadData()(dispatch, getState)

        expect(logger.notice)
          .not
          .toHaveBeenCalled()
      })
    })

    describe('if API response contains subscription numPortions', () => {
      const subscriptionValue = Symbol('subscription-data')
      const basketAction = Symbol('basket-action')

      beforeEach(() => {
        fetchSubscription.mockResolvedValueOnce({
          data: mockSubscriptionResponse,
        })
        basketNumPortionChange.mockReturnValue(basketAction)
        mapSubscriptionPayload.mockReturnValue({
          box: {
            numPortions: subscriptionValue
          }
        })
      })

      test('updates basket with subscription numPortions', async () => {
        await subscriptionLoadData()(dispatch, getState)

        expect(basketNumPortionChange)
          .toHaveBeenCalledWith(subscriptionValue)
        expect(dispatch)
          .toHaveBeenCalledWith(basketAction)
      })
    })

    describe('if API response contains no subscription numPortions', () => {
      const basketAction = Symbol('basket-action')

      beforeEach(() => {
        fetchSubscription.mockResolvedValueOnce({
          data: mockSubscriptionResponse,
        })
        basketNumPortionChange.mockReturnValue(basketAction)
        mapSubscriptionPayload.mockReturnValue({})
      })

      test('does not update basket numPortions', async () => {
        await subscriptionLoadData()(dispatch, getState)

        expect(dispatch)
          .not
          .toHaveBeenCalledWith(basketAction)
      })
    })

    describe('if API call fails', () => {
      beforeEach(() => {
        fetchSubscription.mockReturnValue(Promise.reject(
          new Error('fetch-subscription-fail')
        ))
      })

      test('dispatches no actions', async () => {
        await subscriptionLoadData()(dispatch, getState)

        expect(dispatch)
          .not
          .toHaveBeenCalled()
      })

      test('logs a "Subscription load error"', async () => {
        await subscriptionLoadData()(dispatch, getState)

        expect(logger.notice)
          .toHaveBeenCalledWith(
            'Subscription load error: Error: fetch-subscription-fail'
          )
      })
    })
  })
})
