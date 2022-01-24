import { rest, RestRequest } from 'msw'
import { act } from '@testing-library/react-hooks'
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
import { renderHookWithStore, createStore } from '../../../jest/helper'
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
  rest.get(`${endpoint('subscriptionquery')}/subscriptions/*`, (req, res, ctx) => {
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
    global.localStorage.clear()

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

  const renderUse5RecipesPaintedDoorTest = (
    userId?: Nullable<string>,
    accessToken?: Nullable<string>
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

    return renderHookWithStore(() => use5RecipesPaintedDoorTest(), createStore(state))
  }

  describe('isEnabled', () => {
    describe('when user is authenticated', () => {
      describe('when there is no user id in the store', () => {
        it('should return false', () => {
          const { result } = renderUse5RecipesPaintedDoorTest(null, 'token')

          expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(null)
          expect(result.current.isEnabled).toBe(false)
        })
      })

      describe('when there is no access token in the store', () => {
        it('should return false', () => {
          const { result } = renderUse5RecipesPaintedDoorTest('userId', null)

          expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(null)
          expect(result.current.isEnabled).toBe(false)
        })
      })

      describe('when request for subscriptions fails', () => {
        it('should return false', () => {
          // as this requests fails and we don't use `error` from SWR
          // `waitForNextUpdate` doesn't need to be called as there is no update
          const { result } = renderUse5RecipesPaintedDoorTest()
          expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(null)
          expect(result.current.isEnabled).toBe(false)
        })
      })

      describe('when user has a invalid subscription', () => {
        describe('when user has 2 portions and 3 recipes per box', () => {
          it('should return false', async () => {
            const { result, waitForNextUpdate } = renderUse5RecipesPaintedDoorTest(
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
            const { result, waitForNextUpdate } = renderUse5RecipesPaintedDoorTest(
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
            useIsOptimizelyFeatureEnabled.mockReturnValue(false)

            const { result, waitForNextUpdate } = renderUse5RecipesPaintedDoorTest(
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
            const { result } = renderUse5RecipesPaintedDoorTest(
              user.with2PortionBox4Recipes,
              'token'
            )
            expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(OPTIMIZELY_ENABLE_SUBSCRIBED)
            expect(useIsOptimizelyFeatureEnabled).not.toBeCalledWith(OPTIMIZELY_ENABLE_SIGNUP_FLOW)
            expect(result.current.isEnabled).toBe(true)
          })
        })
      })
    })

    describe('when user is not authenticated', () => {
      describe('when user comes from signup flow', () => {
        describe('when user is NOT in the test', () => {
          beforeEach(() => {
            useIsOptimizelyFeatureEnabled.mockReturnValue(false)
          })

          it('should return false', () => {
            const { result } = renderUse5RecipesPaintedDoorTest()

            expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(OPTIMIZELY_ENABLE_SIGNUP_FLOW)
            expect(result.current.isEnabled).toBe(false)
          })
        })

        describe('when user is in the test', () => {
          beforeEach(() => {
            useIsOptimizelyFeatureEnabled.mockReturnValue(true)
          })

          it('should return true', () => {
            const { result } = renderUse5RecipesPaintedDoorTest()

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
              const { result } = renderUse5RecipesPaintedDoorTest()

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
          global.localStorage.removeItem(HAS_SEEN_TEST_IN_MENU_STORAGE_NAME)
          global.localStorage.setItem(HAS_SEEN_TEST_IN_ORDER_CONFIRMATION_STORAGE_NAME, 'true')

          const { result } = renderUse5RecipesPaintedDoorTest()

          expect(global.localStorage.getItem).toHaveBeenCalledWith(
            HAS_SEEN_TEST_IN_MENU_STORAGE_NAME
          )
          expect(global.localStorage.getItem).toHaveBeenCalledWith(
            HAS_SEEN_TEST_IN_ORDER_CONFIRMATION_STORAGE_NAME
          )
          expect(result.current.hasSeenOnMenu).toBe(false)
        })
      })

      describe('when the user has seen the 5 recipes on the menu', () => {
        it('should return true', () => {
          global.localStorage.setItem(
            HAS_SEEN_TEST_IN_MENU_STORAGE_NAME,
            JSON.stringify('new_user')
          )
          global.localStorage.removeItem(HAS_SEEN_TEST_IN_ORDER_CONFIRMATION_STORAGE_NAME)

          const { result } = renderUse5RecipesPaintedDoorTest()

          expect(global.localStorage.getItem).toHaveBeenNthCalledWith(
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
          global.localStorage.setItem(
            HAS_SEEN_TEST_IN_MENU_STORAGE_NAME,
            JSON.stringify('new_user')
          )
          global.localStorage.removeItem(HAS_SEEN_TEST_IN_ORDER_CONFIRMATION_STORAGE_NAME)

          const { result } = renderUse5RecipesPaintedDoorTest()

          expect(global.localStorage.getItem).toHaveBeenNthCalledWith(
            2,
            HAS_SEEN_TEST_IN_ORDER_CONFIRMATION_STORAGE_NAME
          )
          expect(result.current.hasSeenOnOrderConfirmation).toBe(false)
        })
      })

      describe('when the user has seen the 5 recipes on the order confirmation page', () => {
        it('should return true', () => {
          global.localStorage.removeItem(HAS_SEEN_TEST_IN_MENU_STORAGE_NAME)
          global.localStorage.setItem(HAS_SEEN_TEST_IN_ORDER_CONFIRMATION_STORAGE_NAME, 'true')

          const { result } = renderUse5RecipesPaintedDoorTest()

          expect(global.localStorage.getItem).toHaveBeenNthCalledWith(
            2,
            HAS_SEEN_TEST_IN_ORDER_CONFIRMATION_STORAGE_NAME
          )
          expect(result.current.hasSeenOnOrderConfirmation).toBe(true)
        })
      })
    })

    describe('markMenuAsSeen', () => {
      describe('when user is a new user', () => {
        it('should set the HAS_SEEN_TEST_IN_MENU_STORAGE_NAME to be `new_user`', () => {
          const { result } = renderUse5RecipesPaintedDoorTest()

          expect(result.current.hasSeenOnMenu).toBe(false)

          act(() => {
            result.current.setMenuAsSeen()
          })

          expect(global.localStorage.setItem).toHaveBeenNthCalledWith(
            2,
            HAS_SEEN_TEST_IN_MENU_STORAGE_NAME,
            '"new_user"'
          )
          expect(result.current.hasSeenOnMenu).toBe(true)
          expect(result.current.userSeenOnMenu).toBe('new_user')
        })
      })

      describe('when user is an existing user', () => {
        it('should set the HAS_SEEN_TEST_IN_MENU_STORAGE_NAME to be `existing_user`', async () => {
          useIsOptimizelyFeatureEnabled.mockReturnValue(true)

          const { result } = renderUse5RecipesPaintedDoorTest(user.with2PortionBox4Recipes, 'token')

          expect(result.current.hasSeenOnMenu).toBe(false)

          act(() => {
            result.current.setMenuAsSeen()
          })

          expect(global.localStorage.setItem).toHaveBeenCalledWith(
            HAS_SEEN_TEST_IN_MENU_STORAGE_NAME,
            '"existing_user"'
          )
          expect(result.current.hasSeenOnMenu).toBe(true)
          expect(result.current.userSeenOnMenu).toBe('existing_user')
        })
      })
    })

    describe('setOrderConfirmationAsSeen', () => {
      it('should set the HAS_SEEN_TEST_IN_ORDER_CONFIRMATION_STORAGE_NAME to be true', () => {
        const { result } = renderUse5RecipesPaintedDoorTest()

        expect(result.current.hasSeenOnOrderConfirmation).toBe(false)

        act(() => {
          result.current.setOrderConfirmationAsSeen()
        })

        expect(global.localStorage.setItem).toHaveBeenCalledWith(
          HAS_SEEN_TEST_IN_ORDER_CONFIRMATION_STORAGE_NAME,
          'true'
        )
        expect(result.current.hasSeenOnOrderConfirmation).toBe(true)
      })
    })
  })
})
