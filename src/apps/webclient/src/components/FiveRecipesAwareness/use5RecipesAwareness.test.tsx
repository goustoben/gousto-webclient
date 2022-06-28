import { safeJestMock } from '_testing/mocks'
import Immutable from 'immutable'
import 'jest-localstorage-mock'
import useSWR from 'swr'

import * as authSelectors from 'selectors/auth'

import { renderHookWithStore, createStore } from '../../../jest/helper'
import * as UseOptimizely from '../../containers/OptimizelyRollouts/useOptimizely.hook'
import { Nullable } from '../../types'
import {
  HAS_SEEN_ON_MENU_STORAGE_NAME,
  OPTIMIZELY_ENABLED_SUBSCRIBED_FLOW,
  use5RecipesAwareness,
} from './use5RecipesAwareness'

const user = {
  with2PortionBox3Recipes: 'with-2-portion-box-3-recipes',
  with4PortionBox4Recipes: 'with-4-portion-box-4-recipes',
  with2PortionBox4Recipes: 'with-2-portion-box-4-recipes',
}

jest.mock('config/endpoint', () =>
  jest.fn().mockImplementation((service, version = '') => `endpoint-${service}${version}`),
)

jest.mock('swr', () => jest.fn())

const mockedUseSWR = useSWR as jest.MockedFunction<any>

const createSubscriptionResponse = (numPortions: 2 | 4, numRecipes: 2 | 3 | 4) => ({
  status: 'OK',
  data: {
    userId: 'user-id',
    subscription: {
      numPortions,
      numRecipes,
    },
  },
})

const getIsAuthenticated = safeJestMock(authSelectors, 'getIsAuthenticated')

describe('use5RecipesAwareness', () => {
  let useIsOptimizelyFeatureEnabled: jest.SpyInstance<any, [name?: any]>

  beforeEach(() => {
    // to fully reset the state between tests, clear the storage
    global.localStorage.clear()

    useIsOptimizelyFeatureEnabled = jest
      .spyOn(UseOptimizely, 'useIsOptimizelyFeatureEnabled')
      .mockImplementation(() => null)
  })

  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  afterEach(() => {
    jest.clearAllMocks()
  })

  const renderUse5RecipesAwareness = (
    userId?: Nullable<string>,
    accessToken?: Nullable<string>,
  ) => {
    if (userId || accessToken) {
      getIsAuthenticated.mockReturnValue(true)
    } else {
      getIsAuthenticated.mockReturnValue(false)
    }

    const state = {
      user: Immutable.fromJS({
        id: userId || null,
      }),
      auth: Immutable.fromJS({
        accessToken: accessToken || null,
      }),
    }

    return renderHookWithStore(() => use5RecipesAwareness(), createStore(state))
  }

  describe('isEnabled', () => {
    describe('when user is authenticated', () => {
      describe('when there is no user id in the store', () => {
        mockedUseSWR.mockReturnValue({
          data: createSubscriptionResponse(2, 2),
        })
        it('should return false', () => {
          const { result } = renderUse5RecipesAwareness(null, 'token')

          expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(null)
          expect(result.current.isEnabled).toBe(false)
        })
      })

      describe('when there is no access token in the store', () => {
        mockedUseSWR.mockReturnValue({
          data: createSubscriptionResponse(2, 2),
        })
        it('should return false', () => {
          const { result } = renderUse5RecipesAwareness('userId', null)

          expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(null)
          expect(result.current.isEnabled).toBe(false)
        })
      })

      describe('when request for subscription API fails', () => {
        beforeEach(() => {
          mockedUseSWR.mockReturnValue({
            data: {
              errors: [],
            },
          })
        })
        it('should return false', () => {
          // as this requests fails and we don't use `error` from SWR
          // `waitForNextUpdate` doesn't need to be called as there is no update
          const { result } = renderUse5RecipesAwareness()
          expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(null)
          expect(result.current.isEnabled).toBe(false)
        })
      })

      describe('when user has a invalid subscription', () => {
        describe('when user has 2 portions and 3 recipes per box', () => {
          beforeEach(() => {
            mockedUseSWR.mockReturnValue({
              data: createSubscriptionResponse(2, 3),
            })
          })
          it('should return false', async () => {
            const { result } = renderUse5RecipesAwareness(user.with2PortionBox3Recipes, 'token')

            expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(null)
            expect(result.current.isEnabled).toBe(false)
          })
        })

        describe('when user has 4 portions and 4 recipes per box', () => {
          beforeEach(() => {
            mockedUseSWR.mockReturnValue({
              data: createSubscriptionResponse(4, 4),
            })
          })
          it('should return false', async () => {
            const { result } = renderUse5RecipesAwareness(user.with4PortionBox4Recipes, 'token')

            expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(null)
            expect(result.current.isEnabled).toBe(false)
          })
        })
      })

      describe('when user has a valid subscription', () => {
        describe('when the feature is enabled for the user', () => {
          beforeEach(() => {
            useIsOptimizelyFeatureEnabled.mockReturnValue(false)
            mockedUseSWR.mockReturnValue({
              data: createSubscriptionResponse(2, 4),
            })
          })
          it('should return false', async () => {
            const { result } = renderUse5RecipesAwareness(user.with2PortionBox4Recipes, 'token')

            expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(OPTIMIZELY_ENABLED_SUBSCRIBED_FLOW)
            expect(result.current.isEnabled).toBe(false)
          })
        })

        describe('when the feature is enabled for the user', () => {
          beforeEach(() => {
            useIsOptimizelyFeatureEnabled.mockReturnValue(true)
            mockedUseSWR.mockReturnValue({
              data: createSubscriptionResponse(2, 4),
            })
          })

          it('should return true', () => {
            const { result } = renderUse5RecipesAwareness(user.with2PortionBox4Recipes, 'token')
            expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(OPTIMIZELY_ENABLED_SUBSCRIBED_FLOW)
            expect(result.current.isEnabled).toBe(true)
          })
        })
      })
    })

    describe('hasSeenOnMenu', () => {
      describe('when the user has not yet seen the 5 recipes awareness modal on the menu page', () => {
        it('should return false', () => {
          global.localStorage.removeItem(HAS_SEEN_ON_MENU_STORAGE_NAME)

          const { result } = renderUse5RecipesAwareness()

          expect(global.localStorage.getItem).toHaveBeenCalledWith(HAS_SEEN_ON_MENU_STORAGE_NAME)
          expect(result.current.hasSeenOnMenu).toBe(false)
        })
      })

      describe('when the user has seen the 5 recipe awareness modal on the menu page', () => {
        it('should return true', () => {
          global.localStorage.setItem(HAS_SEEN_ON_MENU_STORAGE_NAME, 'true')

          const { result } = renderUse5RecipesAwareness()

          expect(global.localStorage.getItem).toHaveBeenNthCalledWith(
            1,
            HAS_SEEN_ON_MENU_STORAGE_NAME,
          )
          expect(result.current.hasSeenOnMenu).toBe(true)
        })
      })
    })
  })
})
