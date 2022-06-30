import Immutable from 'immutable'
import 'jest-localstorage-mock'
import useSWR from 'swr'

import { renderHookWithStore, createStore } from '../../../jest/helper'
import * as UseOptimizely from '../../containers/OptimizelyRollouts/useOptimizely.hook'
import { Nullable } from '../../types'
import {
  HAS_SEEN_ON_MENU_STORAGE_NAME,
  OPTIMIZELY_ENABLED_SUBSCRIBED_FLOW,
  use5RecipesAwareness,
} from './use5RecipesAwareness'

const user = {
  with2PortionBox2Recipes: 'with-2-portion-box-3-recipes',
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
    stateOverrides?: Record<string, unknown>,
  ) => {
    const state = {
      user: Immutable.fromJS({
        id: userId || null,
      }),
      auth: Immutable.fromJS({
        accessToken: accessToken || null,
        isAuthenticated: !!(userId || accessToken),
      }),
      ...stateOverrides,
    }

    return renderHookWithStore(() => use5RecipesAwareness(), createStore(state))
  }

  describe('use5RecipesAwareness hook', () => {
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
          describe('when the user is not able to order a 5 recipe box', () => {
            beforeEach(() => {
              useIsOptimizelyFeatureEnabled.mockReturnValue(true)
              mockedUseSWR.mockReturnValue({
                data: createSubscriptionResponse(2, 4),
              })
            })

            it('should return false', async () => {
              const { result } = renderUse5RecipesAwareness(user.with2PortionBox4Recipes, 'token', {
                menuService: {
                  box: {
                    'SKU-GMT-4-2': {
                      type: 'box',
                      id: 'SKU-GMT-4-2',
                      attributes: { number_of_portions: 2, number_of_recipes: 4 },
                    },
                  },
                },
              })

              expect(useIsOptimizelyFeatureEnabled).not.toBeCalledWith(
                OPTIMIZELY_ENABLED_SUBSCRIBED_FLOW,
              )
              expect(result.current.isEnabled).toBe(false)
            })
          })

          describe('when the user is able to order a 5 recipe box', () => {
            describe('when the feature is not enabled for the user', () => {
              beforeEach(() => {
                useIsOptimizelyFeatureEnabled.mockReturnValue(false)
                mockedUseSWR.mockReturnValue({
                  data: createSubscriptionResponse(2, 4),
                })
              })

              it('should return false', async () => {
                const { result } = renderUse5RecipesAwareness(user.with2PortionBox4Recipes, 'token')

                expect(useIsOptimizelyFeatureEnabled).not.toBeCalledWith(
                  OPTIMIZELY_ENABLED_SUBSCRIBED_FLOW,
                )
                expect(result.current.isEnabled).toBe(false)
              })
            })

            describe('when the feature is enabled for 2 portion 4 recipes user', () => {
              beforeEach(() => {
                useIsOptimizelyFeatureEnabled.mockReturnValue(true)
                mockedUseSWR.mockReturnValue({
                  data: createSubscriptionResponse(2, 4),
                })
              })

              it('should return true', () => {
                const { result } = renderUse5RecipesAwareness(
                  user.with2PortionBox4Recipes,
                  'token',
                  {
                    menuService: {
                      box: {
                        'SKU-GMT-4-2': {
                          type: 'box',
                          id: 'SKU-GMT-4-2',
                          attributes: { number_of_portions: 2, number_of_recipes: 4 },
                        },
                        'SKU-GMT-5-2': {
                          type: 'box',
                          id: 'SKU-GMT-5-2',
                          attributes: { number_of_portions: 2, number_of_recipes: 5 },
                        },
                      },
                    },
                  },
                )
                expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(
                  OPTIMIZELY_ENABLED_SUBSCRIBED_FLOW,
                )
                expect(result.current.isEnabled).toBe(true)
              })
            })

            describe('when the feature is enabled for 2 portion 3 recipes user', () => {
              beforeEach(() => {
                useIsOptimizelyFeatureEnabled.mockReturnValue(true)
                mockedUseSWR.mockReturnValue({
                  data: createSubscriptionResponse(2, 3),
                })
              })
              it('should return true', async () => {
                const { result } = renderUse5RecipesAwareness(
                  user.with2PortionBox3Recipes,
                  'token',
                  {
                    menuService: {
                      box: {
                        'SKU-GMT-3-2': {
                          type: 'box',
                          id: 'SKU-GMT-4-2',
                          attributes: { number_of_portions: 2, number_of_recipes: 4 },
                        },
                        'SKU-GMT-4-2': {
                          type: 'box',
                          id: 'SKU-GMT-4-2',
                          attributes: { number_of_portions: 2, number_of_recipes: 4 },
                        },
                        'SKU-GMT-5-2': {
                          type: 'box',
                          id: 'SKU-GMT-5-2',
                          attributes: { number_of_portions: 2, number_of_recipes: 5 },
                        },
                      },
                    },
                  },
                )
                expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(
                  OPTIMIZELY_ENABLED_SUBSCRIBED_FLOW,
                )
                expect(result.current.isEnabled).toBe(true)
              })
            })

            describe('when the feature is enabled for 2 portion 2 recipes user', () => {
              beforeEach(() => {
                useIsOptimizelyFeatureEnabled.mockReturnValue(true)
                mockedUseSWR.mockReturnValue({
                  data: createSubscriptionResponse(2, 2),
                })
              })
              it('should return true', async () => {
                const { result } = renderUse5RecipesAwareness(
                  user.with2PortionBox2Recipes,
                  'token',
                  {
                    menuService: {
                      box: {
                        'SKU-GMT-2-2': {
                          type: 'box',
                          id: 'SKU-GMT-4-2',
                          attributes: { number_of_portions: 2, number_of_recipes: 4 },
                        },
                        'SKU-GMT-3-2': {
                          type: 'box',
                          id: 'SKU-GMT-4-2',
                          attributes: { number_of_portions: 2, number_of_recipes: 4 },
                        },
                        'SKU-GMT-4-2': {
                          type: 'box',
                          id: 'SKU-GMT-4-2',
                          attributes: { number_of_portions: 2, number_of_recipes: 4 },
                        },
                        'SKU-GMT-5-2': {
                          type: 'box',
                          id: 'SKU-GMT-5-2',
                          attributes: { number_of_portions: 2, number_of_recipes: 5 },
                        },
                      },
                    },
                  },
                )
                expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(
                  OPTIMIZELY_ENABLED_SUBSCRIBED_FLOW,
                )
                expect(result.current.isEnabled).toBe(true)
              })
            })
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

    describe('setMenuAsSeen', () => {
      it('should set that the user has seen the menu', () => {
        global.localStorage.removeItem(HAS_SEEN_ON_MENU_STORAGE_NAME)

        const { result } = renderUse5RecipesAwareness()
        const { setMenuAsSeen } = result.current

        setMenuAsSeen()

        expect(global.localStorage.setItem).toHaveBeenCalledWith(
          HAS_SEEN_ON_MENU_STORAGE_NAME,
          'true',
        )
        expect(result.current.hasSeenOnMenu).toBe(true)
      })
    })

    describe('isNewUser', () => {
      describe('when the user is not authenticated', () => {
        it('returns true', () => {
          const { result } = renderUse5RecipesAwareness(null, null)
          expect(result.current.isNewUser).toEqual(true)
        })
      })

      describe('when the user is authenticated', () => {
        it('returns false', () => {
          const userId = '1'
          const token = 'token'
          const { result } = renderUse5RecipesAwareness(userId, token)
          expect(result.current.isNewUser).toEqual(false)
        })
      })
    })
  })
})
