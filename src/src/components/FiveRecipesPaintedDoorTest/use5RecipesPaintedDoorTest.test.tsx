import React from 'react'
import { rest, RestRequest } from 'msw'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { act, renderHook } from '@testing-library/react-hooks'
import Immutable from 'immutable'
import * as modalSelectors from 'selectors/modals'
import * as authSelectors from 'selectors/auth'
import { setupServer } from 'msw/node'
import { safeJestMock } from '_testing/mocks'
import {
  HAS_SEEN_TEST_IN_MENU_STORAGE_NAME,
  HAS_SEEN_TEST_IN_ORDER_CONFIRMATION_STORAGE_NAME,
  OPTIMIZELY_ENABLE_SIGNUP_FLOW,
  OPTIMIZELY_ENABLE_SUBSCRIBED,
  use5RecipesPaintedDoorTest,
} from './use5RecipesPaintedDoorTest'
import * as UseOptimizely from '../../containers/OptimizelyRollouts/useOptimizely.hook'

import endpoint from '../../config/endpoint'
import { Nullable } from '../../types'
import 'jest-localstorage-mock'

const user = {
  with2PortionBox3Recipes: 'with-2-portion-box-3-recipes',
  with4PortionBox4Recipes: 'with-4-portion-box-4-recipes',
  with2PortionBox4Recipes: 'with-2-portion-box-4-recipes',
}

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
const getPromoModalVisible = safeJestMock(modalSelectors, 'getPromoModalVisible')
const getIsAuthenticated = safeJestMock(authSelectors, 'getIsAuthenticated')

const getUserId = (req: RestRequest) => req.headers.get('x-gousto-user-id')

const server = setupServer(
  rest.get(`${endpoint('subscriptioncommand')}/subscriptions/*`, (req, res, ctx) => {
    const userId = getUserId(req)

    if (userId === user.with2PortionBox3Recipes) {
      return res(ctx.json(createSubscriptionResponse(2, 3)))
    }

    if (userId === user.with2PortionBox4Recipes) {
      return res(ctx.json(createSubscriptionResponse(2, 4)))
    }

    if (userId === user.with4PortionBox4Recipes) {
      return res(ctx.json(createSubscriptionResponse(4, 4)))
    }

    return res(ctx.json(createSubscriptionResponse(2, 2)))
  })
)

describe('use5RecipesPaintedDoorTest', () => {
  let useIsOptimizelyFeatureEnabled: jest.SpyInstance<any, [name?: any]>

  beforeEach(() => {
    // to fully reset the state between tests, clear the storage
    localStorage.clear()

    useIsOptimizelyFeatureEnabled = jest
      .spyOn(UseOptimizely, 'useIsOptimizelyFeatureEnabled')
      .mockImplementation(() => null)
  })

  // Establish API mocking before all tests.
  beforeAll(() => {
    server.listen()
  })

  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  afterEach(() => {
    jest.clearAllMocks()
    server.resetHandlers()
  })

  // Clean up after the tests are finished.
  afterAll(() => server.close())

  const createStore = (userId?: Nullable<string>, accessToken?: Nullable<string>) => {
    const initialState = {
      user: Immutable.fromJS({
        id: userId || null,
      }),
      auth: Immutable.fromJS({
        accessToken: accessToken || null,
      }),
    }

    const mockStore = configureMockStore()

    const store = mockStore(initialState)

    // eslint-disable-next-line no-undef
    store.dispatch = jest.fn().mockReturnValue(Promise.resolve())

    return store
  }

  const createWrapper =
    (userId?: Nullable<string>, accessToken?: Nullable<string>) =>
    ({ children }: { children: React.ReactNode }) =>
      <Provider store={createStore(userId, accessToken)}>{children}</Provider>

  const renderHookWithStore = (userId?: Nullable<string>, accessToken?: Nullable<string>) =>
    renderHook(() => use5RecipesPaintedDoorTest(), { wrapper: createWrapper(userId, accessToken) })

  describe('isEnabled', () => {
    describe('when user is authenticated', () => {
      beforeEach(() => {
        getIsAuthenticated.mockReturnValue(true)
      })
      describe('when there is no user id in the store', () => {
        it('should return false', () => {
          const { result } = renderHookWithStore(null, 'token')

          expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(null)
          expect(result.current.isEnabled).toBe(false)
        })
      })

      describe('when there is no access token in the store', () => {
        it('should return false', () => {
          const { result } = renderHookWithStore('userId', null)

          expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(null)
          expect(result.current.isEnabled).toBe(false)
        })
      })

      describe('when request for subscriptions fails', () => {
        it('should return false', () => {
          // as this requests fails and we don't use `error` from SWR
          // `waitForNextUpdate` doesn't need to be called as there is no update
          const { result } = renderHookWithStore()
          expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(null)
          expect(result.current.isEnabled).toBe(false)
        })
      })

      describe('when user has a invalid subscription', () => {
        describe('when user has 2 portions and 3 recipes per box', () => {
          it('should return false', async () => {
            const { result, waitForNextUpdate } = renderHookWithStore(
              user.with2PortionBox3Recipes,
              'token'
            )

            await waitForNextUpdate()

            expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(null)
            expect(result.current.isEnabled).toBe(false)
          })
        })

        describe('when user has 4 portions and 4 recipes per box', () => {
          it('should return false', async () => {
            const { result, waitForNextUpdate } = renderHookWithStore(
              user.with4PortionBox4Recipes,
              'token'
            )

            await waitForNextUpdate()

            expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(null)
            expect(result.current.isEnabled).toBe(false)
          })
        })
      })

      describe('when user has a valid subscription', () => {
        describe('when user is not in the test', () => {
          it('should return false', async () => {
            useIsOptimizelyFeatureEnabled = jest
              .spyOn(UseOptimizely, 'useIsOptimizelyFeatureEnabled')
              .mockReturnValue(false)

            const { result, waitForNextUpdate } = renderHookWithStore(
              user.with2PortionBox4Recipes,
              'token'
            )

            await waitForNextUpdate()

            expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(OPTIMIZELY_ENABLE_SUBSCRIBED)
            expect(result.current.isEnabled).toBe(false)
          })
        })

        describe('when user is in the test', () => {
          beforeEach(() => {
            useIsOptimizelyFeatureEnabled.mockReturnValue(true)
          })

          it('should return true', () => {
            const { result } = renderHookWithStore(user.with2PortionBox4Recipes, 'token')
            expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(OPTIMIZELY_ENABLE_SUBSCRIBED)
            expect(useIsOptimizelyFeatureEnabled).not.toBeCalledWith(OPTIMIZELY_ENABLE_SIGNUP_FLOW)
            expect(result.current.isEnabled).toBe(true)
          })
        })
      })
    })

    describe('when user is not authenticated', () => {
      beforeEach(() => {
        getIsAuthenticated.mockReturnValue(false)
      })
      describe('when user comes from signup flow', () => {
        describe('when user is NOT in the test', () => {
          beforeEach(() => {
            useIsOptimizelyFeatureEnabled.mockReturnValue(false)
          })

          it('should return false', () => {
            const { result } = renderHookWithStore()

            expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(OPTIMIZELY_ENABLE_SIGNUP_FLOW)
            expect(result.current.isEnabled).toBe(false)
          })
        })

        describe('when user is in the test', () => {
          beforeEach(() => {
            useIsOptimizelyFeatureEnabled.mockReturnValue(true)
          })

          it('should return true', () => {
            const { result } = renderHookWithStore()

            expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(OPTIMIZELY_ENABLE_SIGNUP_FLOW)
            expect(useIsOptimizelyFeatureEnabled).not.toBeCalledWith(OPTIMIZELY_ENABLE_SUBSCRIBED)
            expect(result.current.isEnabled).toBe(true)
          })
          describe('when user has promo active', () => {
            beforeEach(() => {
              useIsOptimizelyFeatureEnabled.mockReturnValue(false)
              getPromoModalVisible.mockReturnValue(true)
            })

            it('should return false', () => {
              const { result } = renderHookWithStore()

              expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(null)
              expect(result.current.isEnabled).toBe(false)
            })
          })
        })
      })
    })

    describe('hasSeenOnMenu', () => {
      describe('when the user has not yet seen the 5 recipes on the menu', () => {
        it('should return false', () => {
          localStorage.removeItem(HAS_SEEN_TEST_IN_MENU_STORAGE_NAME)
          localStorage.setItem(HAS_SEEN_TEST_IN_ORDER_CONFIRMATION_STORAGE_NAME, 'true')

          const { result } = renderHookWithStore()

          expect(localStorage.getItem).toBeCalledTimes(2)
          expect(localStorage.getItem).toHaveBeenNthCalledWith(
            1,
            HAS_SEEN_TEST_IN_MENU_STORAGE_NAME
          )
          expect(result.current.hasSeenOnMenu).toBe(false)
        })
      })

      describe('when the user has seen the 5 recipes on the menu', () => {
        it('should return true', () => {
          localStorage.setItem(HAS_SEEN_TEST_IN_MENU_STORAGE_NAME, 'true')
          localStorage.removeItem(HAS_SEEN_TEST_IN_ORDER_CONFIRMATION_STORAGE_NAME)

          const { result } = renderHookWithStore()

          expect(localStorage.getItem).toBeCalledTimes(2)
          expect(localStorage.getItem).toHaveBeenNthCalledWith(
            1,
            HAS_SEEN_TEST_IN_MENU_STORAGE_NAME
          )
          expect(result.current.hasSeenOnMenu).toBe(true)
        })
      })
    })

    describe('hasSeenOnOrderConfirmation', () => {
      describe('when the user has not yet seen the 5 recipes on the order confirmation page', () => {
        it('should return false', () => {
          localStorage.setItem(HAS_SEEN_TEST_IN_MENU_STORAGE_NAME, 'true')
          localStorage.removeItem(HAS_SEEN_TEST_IN_ORDER_CONFIRMATION_STORAGE_NAME)

          const { result } = renderHookWithStore()

          expect(localStorage.getItem).toBeCalledTimes(2)
          expect(localStorage.getItem).toHaveBeenNthCalledWith(
            2,
            HAS_SEEN_TEST_IN_ORDER_CONFIRMATION_STORAGE_NAME
          )
          expect(result.current.hasSeenOnOrderConfirmation).toBe(false)
        })
      })

      describe('when the user has seen the 5 recipes on the order confirmation page', () => {
        it('should return true', () => {
          localStorage.removeItem(HAS_SEEN_TEST_IN_MENU_STORAGE_NAME)
          localStorage.setItem(HAS_SEEN_TEST_IN_ORDER_CONFIRMATION_STORAGE_NAME, 'true')

          const { result } = renderHookWithStore()

          expect(localStorage.getItem).toBeCalledTimes(2)
          expect(localStorage.getItem).toHaveBeenNthCalledWith(
            2,
            HAS_SEEN_TEST_IN_ORDER_CONFIRMATION_STORAGE_NAME
          )
          expect(result.current.hasSeenOnOrderConfirmation).toBe(true)
        })
      })
    })

    describe('markMenuAsSeen', () => {
      it('should set the HAS_SEEN_TEST_IN_MENU_STORAGE_NAME to be true', () => {
        const { result } = renderHookWithStore()

        expect(result.current.hasSeenOnMenu).toBe(false)

        act(() => {
          result.current.setMenuAsSeen()
        })

        expect(localStorage.setItem).toHaveBeenNthCalledWith(
          1,
          HAS_SEEN_TEST_IN_MENU_STORAGE_NAME,
          'true'
        )
        expect(result.current.hasSeenOnMenu).toBe(true)
      })
    })

    describe('setOrderConfirmationAsSeen', () => {
      it('should set theHAS_SEEN_TEST_IN_ORDER_CONFIRMATION_STORAGE_NAME to be true', () => {
        const { result } = renderHookWithStore()

        expect(result.current.hasSeenOnOrderConfirmation).toBe(false)

        act(() => {
          result.current.setOrderConfirmationAsSeen()
        })

        expect(localStorage.setItem).toHaveBeenNthCalledWith(
          1,
          HAS_SEEN_TEST_IN_ORDER_CONFIRMATION_STORAGE_NAME,
          'true'
        )
        expect(result.current.hasSeenOnOrderConfirmation).toBe(true)
      })
    })
  })
})
