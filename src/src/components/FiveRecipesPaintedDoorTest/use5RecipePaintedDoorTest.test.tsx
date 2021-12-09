import React from 'react';
import { rest, RestRequest } from 'msw'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { act, renderHook } from '@testing-library/react-hooks';
import Immutable from 'immutable'
import { use5RecipesPaintedDoorTest } from './use5RecipePaintedDoorTest';
import * as UseOptimizely from "../../containers/OptimizelyRollouts/useOptimizely.hook"
import endpoint from '../../config/endpoint'
import { setupServer } from 'msw/node'
import { Nullable } from '../../types'
import 'jest-localstorage-mock';

const user = {
  withError: 'user-with-error',
  with2PortionBox3Recipes: 'with-2-portion-box-3-recipes',
  with4PortionBox4Recipes: 'with-4-portion-box-4-recipes',
  with2PortionBox4Recipes: 'with-2-portion-box-4-recipes',
}

const createSubscriptionResponse = (numPortions: 2 | 4, numRecipes: 2 | 3 | 4) => ({
  status: "OK",
  data: {
    userId: 'user-id',
    subscription: {
      numPortions,
      numRecipes,
    }
  }
})

const getUserId = (req: RestRequest) => req.headers.get('x-gousto-user-id')

const server = setupServer(
  rest.get(`${endpoint('subscriptioncommand')}/subscriptions/*`, (req, res, ctx) => {
    const userId = getUserId(req)

    if (userId === user.withError) {
      return res(
        ctx.status(500),
        ctx.json({}),
      )
    }

    if (userId === user.with2PortionBox3Recipes) {
      return res(
        ctx.json(createSubscriptionResponse(2, 3)),
      )
    }

    if (userId === user.with2PortionBox4Recipes) {
      return res(
        ctx.json(createSubscriptionResponse(2, 4)),
      )
    }

    if (userId === user.with4PortionBox4Recipes) {
      return res(
        ctx.json(createSubscriptionResponse(4, 4)),
      )
    }

    return res(
      ctx.json(createSubscriptionResponse(2, 2)),
    )
  }),
)

describe('use5RecipesPaintedDoorTest', () => {
  let useIsOptimizelyFeatureEnabled: jest.SpyInstance<any, [name?: any]>;

  beforeEach(() => {
    // to fully reset the state between tests, clear the storage
    localStorage.clear();

    useIsOptimizelyFeatureEnabled = jest.spyOn(UseOptimizely, 'useIsOptimizelyFeatureEnabled').mockImplementation(() => null)
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
  
  const createWrapper = (userId?: Nullable<string>, accessToken?: Nullable<string>) => ({ children }: { children: React.ReactNode }) => <Provider store={createStore(userId, accessToken)}>{children}</Provider>

  const renderHookWithStore = (userId?: Nullable<string>, accessToken?: Nullable<string>) => renderHook(() => use5RecipesPaintedDoorTest(), { wrapper: createWrapper(userId, accessToken) }) 

  describe('isEnabled', () => {
    describe('when there is no user id in the store', () => {
      it('should return false', () => {
        const { result } = renderHookWithStore(null, 'token');
  
        expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(null)
        expect(result.current.isEnabled).toBe(false);
      });
    });

    describe('when there is no access token in the store', () => {
      it('should return false', () => {
        const { result } = renderHookWithStore('userId', null);
  
        expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(null)
        expect(result.current.isEnabled).toBe(false);
      });
    })

    describe('when request for subscriptions fails', () => {
      it('should return false', () => {
        // as this requests fails and we don't use `error` from SWR
        // `waitForNextUpdate` doesn't need to be called as there is no update
        const { result } = renderHookWithStore(user.withError, 'token');
  
        expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(null)
        expect(result.current.isEnabled).toBe(false);
      });
    })

    describe('when user has a invalid subscription', () => {
      describe('when user has 2 portions and 3 recipes per box', () => {
        it('should return false', async () => {
          const { result, waitForNextUpdate } = renderHookWithStore(user.with2PortionBox3Recipes, 'token');
    
          await waitForNextUpdate();

          expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(null)
          expect(result.current.isEnabled).toBe(false);
        });
      });

      describe('when user has 4 portions and 4 recipes per box', () => {
        it('should return false', async () => {
          const { result, waitForNextUpdate } = renderHookWithStore(user.with4PortionBox4Recipes, 'token');
    
          await waitForNextUpdate();

          expect(useIsOptimizelyFeatureEnabled).toBeCalledWith(null)
          expect(result.current.isEnabled).toBe(false);
        });
      });
    })

    describe('when user has a valid subscription', () => {
      describe('when user is not in the test', () => {
        it('should return false', async () => {
          useIsOptimizelyFeatureEnabled = jest.spyOn(UseOptimizely, 'useIsOptimizelyFeatureEnabled').mockReturnValue(false)

          const { result, waitForNextUpdate } = renderHookWithStore(user.with2PortionBox4Recipes, 'token');
          
          await waitForNextUpdate();

          expect(useIsOptimizelyFeatureEnabled).toBeCalledWith('5_recipes_painted_door_test')
          expect(result.current.isEnabled).toBe(false);
        });
      })

      describe('when user is in the test', () => {
        it('should return true', () => {
          useIsOptimizelyFeatureEnabled = jest.spyOn(UseOptimizely, 'useIsOptimizelyFeatureEnabled').mockReturnValue(true)

          const { result } = renderHookWithStore(user.with2PortionBox4Recipes, 'token');
    
          expect(useIsOptimizelyFeatureEnabled).toBeCalledWith('5_recipes_painted_door_test')
          expect(result.current.isEnabled).toBe(true);
        });
      })
    })
  })

  describe('hasSeenOnMenu', () => {
    describe('when the user has not yet seen the 5 recipes on the menu', () => {
      it('should return false', () => {
        localStorage.removeItem('gousto_has_seen_test_in_menu');
        localStorage.setItem('gousto_has_seen_test_in_order_confirmation', 'true');

        const { result } = renderHookWithStore();
  
        expect(localStorage.getItem).toBeCalledTimes(2)
        expect(localStorage.getItem).toHaveBeenNthCalledWith(1, 'gousto_has_seen_test_in_menu')
        expect(result.current.hasSeenOnMenu).toBe(false);
      });
    });

    describe('when the user has seen the 5 recipes on the menu', () => {
      it('should return true', () => {
        localStorage.setItem('gousto_has_seen_test_in_menu', 'true');
        localStorage.removeItem('gousto_has_seen_test_in_order_confirmation');

        const { result } = renderHookWithStore();
  
        expect(localStorage.getItem).toBeCalledTimes(2)
        expect(localStorage.getItem).toHaveBeenNthCalledWith(1, 'gousto_has_seen_test_in_menu')
        expect(result.current.hasSeenOnMenu).toBe(true);
      });
    })
  })

  describe('hasSeenOnOrderConfirmation', () => {
    describe('when the user has not yet seen the 5 recipes on the order confirmation page', () => {
      it('should return false', () => {
        localStorage.setItem('gousto_has_seen_test_in_menu', 'true');
        localStorage.removeItem('gousto_has_seen_test_in_order_confirmation');

        const { result } = renderHookWithStore();
  
        expect(localStorage.getItem).toBeCalledTimes(2)
        expect(localStorage.getItem).toHaveBeenNthCalledWith(2, 'gousto_has_seen_test_in_order_confirmation')
        expect(result.current.hasSeenOnOrderConfirmation).toBe(false);
      });
    });

    describe('when the user has seen the 5 recipes on the order confirmation page', () => {
      it('should return true', () => {
        localStorage.removeItem('gousto_has_seen_test_in_menu');
        localStorage.setItem('gousto_has_seen_test_in_order_confirmation', 'true');

        const { result } = renderHookWithStore();
  
        expect(localStorage.getItem).toBeCalledTimes(2)
        expect(localStorage.getItem).toHaveBeenNthCalledWith(2, 'gousto_has_seen_test_in_order_confirmation')
        expect(result.current.hasSeenOnOrderConfirmation).toBe(true);
      });
    })
  })

  describe('markMenuAsSeen', () => {
    it('should set the `gousto_has_seen_test_in_menu` to be true', () => {
      const { result } = renderHookWithStore();

      expect(result.current.hasSeenOnMenu).toBe(false);

      act(() => {
        result.current.setMenuAsSeen()
      })

      expect(localStorage.setItem).toHaveBeenNthCalledWith(1, 'gousto_has_seen_test_in_menu', "true")
      expect(result.current.hasSeenOnMenu).toBe(true);
    });
  });

  describe('setOrderConfirmationAsSeen', () => {
    it('should set the `gousto_has_seen_test_in_order_confirmation` to be true', () => {
      const { result } = renderHookWithStore();

      expect(result.current.hasSeenOnOrderConfirmation).toBe(false);

      act(() => {
        result.current.setOrderConfirmationAsSeen()
      })

      expect(localStorage.setItem).toHaveBeenNthCalledWith(1, 'gousto_has_seen_test_in_order_confirmation', "true")
      expect(result.current.hasSeenOnOrderConfirmation).toBe(true);
    });
  });
});
