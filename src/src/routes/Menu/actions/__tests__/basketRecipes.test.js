import Immutable from 'immutable'
import * as basketUtils from 'utils/basket'
import * as basketSelectors from 'selectors/basket'
import * as loggingmanagerActions from 'actions/loggingmanager'
import { actionTypes } from '../../../../actions/actionTypes'
import * as trackingKeys from '../../../../actions/trackingKeys'
import * as basketActions from '../basketRecipes'
import * as menuCheckoutClickActions from '../menuCheckoutClick'
import { safeJestMock, multiReturnMock, returnArgumentsFromMock } from '../../../../_testing/mocks'
import pricingActions from '../../../../actions/pricing'
import * as menuActions from '../../../../actions/menu'
import * as menuSelectors from '../../selectors/menu'
import * as menuRecipeDetailsActions from '../menuRecipeDetails'
import * as clientMetrics from '../../apis/clientMetrics'

jest.mock('actions/loggingmanager')

describe('validBasketRecipeAdd when added at least 2 recipe', () => {
  let getStateSpy
  const dispatch = jest.fn()
  const pricingRequestAction = Symbol('Pricing request')
  let pricingRequestSpy

  beforeEach(() => {
    const limitReachSpy = safeJestMock(basketUtils, 'limitReached')
    limitReachSpy.mockReturnValue(false)
    pricingRequestSpy = safeJestMock(pricingActions, 'pricingRequest')
    getStateSpy = jest.fn().mockReturnValueOnce({
      auth: Immutable.Map({
        id: ''
      }),
      tracking: Immutable.fromJS({}),
      basket: Immutable.Map({
        recipes: Immutable.Map([['123', 1]]),
        numPortions: 2,
        limitReached: false,
        promoCode: 'test-promo-code',
        slotId: 'test-slot-id',
      }),
      menuRecipeStock: Immutable.fromJS({
        123: { 2: 30, 4: 10 },
        234: { 2: 50, 4: 10 },
      }),
      menuRecipes: Immutable.fromJS({
        123: {},
        234: {},
      }),
      menuCollections: Immutable.fromJS({
        '1365e0ac-5b1a-11e7-a8dc-001c421e38fa': {
          id: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
          published: true,
          default: true,
          slug: 'foo',
          recipesInCollection: ['123', '234']
        }
      }),
      routing: {
        locationBeforeTransitions: {
          query: {
            collection: 'foo'
          }
        }
      }
    }).mockReturnValueOnce({
      basket: Immutable.Map({
        recipes: Immutable.Map([['123', 1], ['234', 1]]),
        numPortions: 2,
        limitReached: false,
        promoCode: 'test-promo-code',
        slotId: 'test-slot-id',
      }),
      menuRecipeStock: Immutable.fromJS({
        123: { 2: 30, 4: 10 },
        234: { 2: 50, 4: 10 },
      }),
      menuRecipes: Immutable.fromJS({
        123: {},
        234: {},
      }),
      menuCollections: Immutable.fromJS({
        '1365e0ac-5b1a-11e7-a8dc-001c421e38fa': {
          id: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
          published: true,
          default: true,
          slug: 'foo',
          recipesInCollection: ['123', '234']
        }
      }),
      routing: {
        locationBeforeTransitions: {
          query: {
            collection: 'foo'
          }
        }
      }
    })
    pricingRequestSpy.mockReturnValue(pricingRequestAction)
  })

  test('`BASKET_ELIGIBLE_TRACK` should be dispatched', () => {
    basketActions.validBasketRecipeAdd('234', 'boxsummary', { position: '57' })(dispatch, getStateSpy)

    expect(dispatch).toHaveBeenNthCalledWith(4, {
      type: actionTypes.BASKET_ELIGIBLE_TRACK,
      trackingData: {
        actionType: trackingKeys.basketEligible,
        promoCode: 'test-promo-code',
        recipes: Immutable.Map([['123', 1], ['234', 1]]),
      },
    })
  })
})

describe('validBasketRecipeAdd', () => {
  let getStateSpy
  const dispatch = jest.fn()
  const authId = 'test-auth-id'
  let limitReachSpy

  describe('when the basket is empty and the first recipe is added', () => {
    let mockSendClientMetrics

    beforeEach(() => {
      limitReachSpy = safeJestMock(basketUtils, 'limitReached')
      mockSendClientMetrics = safeJestMock(clientMetrics, 'sendClientMetric')
      getStateSpy = jest.fn().mockReturnValue({
        auth: Immutable.Map({
          id: authId
        }),
        tracking: Immutable.fromJS({}),
        basket: Immutable.Map({
          recipes: Immutable.Map(),
          numPortions: 2,
          hasAddedFirstRecipe: false
        }),
        menuRecipeStock: Immutable.fromJS({
          123: { 2: 30, 4: 10 },
          234: { 2: 0, 4: 10 },
        }),
        menuCollections: Immutable.fromJS({
          '1365e0ac-5b1a-11e7-a8dc-001c421e38fa': {
            id: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
            published: true,
            default: true,
            slug: 'foo',
            recipesInCollection: ['123', '234']
          }
        })
      })
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    describe('when there is an orderId', () => {
      const orderId = '12345'

      test('then it should not call', () => {
        basketActions.validBasketRecipeAdd('123', 'boxsummary', { position: '57' }, undefined, orderId)(dispatch, getStateSpy)

        expect(mockSendClientMetrics).not.toHaveBeenCalled()
      })
    })

    describe('when there is no orderId', () => {
      const orderId = undefined

      test('then it should call sendClientMetric with the correct info', () => {
        basketActions.validBasketRecipeAdd('123', 'boxsummary', { position: '57' }, undefined, orderId)(dispatch, getStateSpy)

        expect(mockSendClientMetrics).toHaveBeenCalledWith('menu-first-recipe-add', 1, 'Count')
      })
    })
  })

  describe('when the first recipe has been added and additional recipes are added', () => {
    let mockSendClientMetrics

    beforeEach(() => {
      limitReachSpy = safeJestMock(basketUtils, 'limitReached')
      mockSendClientMetrics = safeJestMock(clientMetrics, 'sendClientMetric')
      getStateSpy = jest.fn().mockReturnValue({
        auth: Immutable.Map({
          id: authId
        }),
        tracking: Immutable.fromJS({}),
        basket: Immutable.Map({
          recipes: Immutable.Map([['123', 1]]),
          numPortions: 2,
          hasAddedFirstRecipe: true
        }),
        menuRecipeStock: Immutable.fromJS({
          123: { 2: 30, 4: 10 },
          234: { 2: 0, 4: 10 },
        }),
        menuCollections: Immutable.fromJS({
          '1365e0ac-5b1a-11e7-a8dc-001c421e38fa': {
            id: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
            published: true,
            default: true,
            slug: 'foo',
            recipesInCollection: ['123', '234']
          }
        })
      })

      basketActions.validBasketRecipeAdd('123', 'boxsummary', { position: '57' })(dispatch, getStateSpy)
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    test('should not make a metrics call', () => {
      expect(mockSendClientMetrics).not.toHaveBeenCalled()
    })
  })

  describe('given a non-full basket with recipes for 2 portions', () => {
    const pricingRequestAction = Symbol('Pricing request')

    beforeEach(() => {
      limitReachSpy = safeJestMock(basketUtils, 'limitReached')
      limitReachSpy.mockReturnValue(false)
      getStateSpy = jest.fn().mockReturnValue({
        auth: Immutable.Map({
          id: authId
        }),
        tracking: Immutable.fromJS({}),
        basket: Immutable.Map({
          recipes: Immutable.Map([['123', 1]]),
          numPortions: 2,
          limitReached: false
        }),
        menuRecipeStock: Immutable.fromJS({
          123: { 2: 30, 4: 10 },
          234: { 2: 0, 4: 10 },
        }),
        menuRecipes: Immutable.fromJS({
          123: {},
        }),
        menuCollections: Immutable.fromJS({
          '1365e0ac-5b1a-11e7-a8dc-001c421e38fa': {
            id: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
            published: true,
            default: true,
            slug: 'foo',
            recipesInCollection: ['123', '234']
          }
        }),
        routing: {
          locationBeforeTransitions: {
            query: {
              collection: 'foo'
            }
          }
        }
      })
      const pricingRequestSpy = safeJestMock(pricingActions, 'pricingRequest')

      pricingRequestSpy.mockReturnValue(pricingRequestAction)
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    describe('when call `validBasketRecipeAdd` with recipe already within the basket which is in stock', () => {
      beforeEach(() => {
        basketActions.validBasketRecipeAdd('123', 'boxsummary', { position: '57' })(dispatch, getStateSpy)
      })

      test('then state should have been retrieved two times', () => {
        expect(getStateSpy).toHaveBeenCalledTimes(2)
      })

      test('then 3 actions should have been dispatched', () => {
        expect(dispatch).toHaveBeenCalledTimes(3)
      })

      test('then the `BASKET_RECIPE_ADD` action should have been dispatched first', () => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: actionTypes.BASKET_RECIPE_ADD,
          recipeId: '123',
          position: '57',
          collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
          trackingData: {
            view: 'boxsummary',
            actionType: trackingKeys.addRecipe,
            recipeId: '123',
            position: '57',
            collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
            recipe_count: 2
          },
        })
      })

      test('then the `MENU_RECIPE_STOCK_CHANGE` should have been dispatched second', () => {
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
          stock: { 123: { 2: -1 } },
        })
      })

      test('then pricing action should have been dispatched third', () => {
        expect(dispatch).toHaveBeenNthCalledWith(3, pricingRequestAction)
      })
    })

    describe('when call `validBasketRecipeAdd` with recipe that is out of stock', () => {
      beforeEach(() => {
        basketActions.validBasketRecipeAdd('234', 'healthkitchen', { position: '23' })(dispatch, getStateSpy)
      })

      test('then no actions should have been dispatched', () => {
        expect(dispatch).toHaveBeenCalledTimes(0)
      })
    })
  })

  describe('given a basket with one space for 4 portions', () => {
    const pricingRequestAction = Symbol('Pricing request')
    beforeEach(() => {
      limitReachSpy = safeJestMock(basketUtils, 'limitReached')
    })
    beforeEach(() => {
      getStateSpy = jest.fn().mockReturnValue({
        auth: Immutable.Map({
          id: authId
        }),
        tracking: Immutable.fromJS({}),
        basket: Immutable.Map({
          recipes: Immutable.Map([['123', 1], ['234', 1]]),
          numPortions: 4,
          limitReached: false
        }),
        menuRecipeStock: Immutable.fromJS({
          123: { 2: 30, 4: 10 },
          234: { 2: 10, 4: 10 },
        }),
        menuRecipes: Immutable.fromJS({
          123: {},
          234: {},
        }),
        menuCollections: Immutable.fromJS({
          '1365e0ac-5b1a-11e7-a8dc-001c421e38fa': {
            id: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
            published: true,
            default: true,
            slug: 'foo',
            recipesInCollection: ['123', '234']
          }
        }),
        routing: {
          locationBeforeTransitions: {
            query: {
              collection: 'foo'
            }
          }
        }
      })

      limitReachSpy.mockImplementation(multiReturnMock([false, true]))
      const pricingRequestSpy = safeJestMock(pricingActions, 'pricingRequest')
      pricingRequestSpy.mockReturnValue(pricingRequestAction)
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    describe('when call `validBasketRecipeAdd`', () => {
      beforeEach(() => {
        basketActions.validBasketRecipeAdd('123', 'boxsummary', { position: '57' })(dispatch, getStateSpy)
      })

      test('then state should have been retrieved two times', () => {
        expect(getStateSpy).toHaveBeenCalledTimes(2)
      })

      test('then 4 actions should have been dispatched', () => {
        expect(dispatch).toHaveBeenCalledTimes(4)
      })

      test('then the `BASKET_RECIPE_ADD` action should have been dispatched first', () => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: actionTypes.BASKET_RECIPE_ADD,
          recipeId: '123',
          position: '57',
          collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
          trackingData: {
            view: 'boxsummary',
            actionType: trackingKeys.addRecipe,
            recipeId: '123',
            position: '57',
            collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
            recipe_count: 3
          },
        })
      })

      test('then the `MENU_RECIPE_STOCK_CHANGE` should have been dispatched second', () => {
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
          stock: { 123: { 4: -1 } },
        })
      })

      test('then the `BASKET_LIMIT_REACHED` should have been dispatched third', () => {
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: actionTypes.BASKET_LIMIT_REACHED,
          limitReached: true,
          trackingData: {
            actionType: trackingKeys.basketLimit,
            limitReached: true,
            view: 'boxsummary',
            source: actionTypes.RECIPE_ADDED,
          }
        })
      })

      test('then pricing action should have been dispatched fourth', () => {
        expect(dispatch).toHaveBeenNthCalledWith(4, pricingRequestAction)
      })
    })
  })

  describe('given a full basket', () => {
    beforeEach(() => {
      getStateSpy = jest.fn().mockReturnValue({
        auth: Immutable.Map({
          id: authId
        }),
        basket: Immutable.Map({
          recipes: Immutable.Map([['123', 1], ['234', 2], ['345', 1]]),
          numPortions: 2,
          limitReached: true
        }),
        newBasket: Immutable.Map({
          recipes: Immutable.Map([['123', 1], ['234', 2], ['345', 1]]),
          slotId: 'test-id',
        }),
        menuRecipeStock: Immutable.fromJS({
          123: { 2: 30, 4: 10 },
          234: { 2: 10, 4: 10 },
          345: { 2: 10, 4: 10 },
        }),
        menuRecipes: Immutable.fromJS({
          123: {},
          234: {},
          345: {},
        }),
        menuCollections: Immutable.fromJS({
          '1365e0ac-5b1a-11e7-a8dc-001c421e38fa': {
            id: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
            published: true,
            default: true,
            slug: 'foo',
            recipesInCollection: ['123', '234']
          }
        }),
        routing: {
          locationBeforeTransitions: {
            query: {
              collection: 'foo'
            }
          }
        }
      })

      basketUtils.limitReached = jest.fn(() => true)
    })

    describe('when call  `validBasketRecipeAdd`', () => {
      beforeEach(() => {
        basketActions.validBasketRecipeAdd('123', 'boxsummary', { position: '57' })(dispatch, getStateSpy)
      })

      test('then no actions should have been dispatched', () => {
        expect(dispatch).toHaveBeenCalledTimes(0)
      })
    })
  })
})

describe('basketRecipeAdd', () => {
  let validateRecipeAgainstRuleSpy
  let state
  let getStateSpy
  let dispatch

  beforeEach(() => {
    safeJestMock(menuSelectors, 'getMenuLimitsForBasket')
    validateRecipeAgainstRuleSpy = safeJestMock(menuSelectors, 'validateRecipeAgainstRule')
    state = {
      basket: Immutable.Map({
        123: 1,
        345: 1
      }),
      menuRecipeDetails: Immutable.Map({
        recipeId: null
      })
    }
    getStateSpy = () => (state)
    dispatch = jest.fn()
  })

  describe('when there are no rules that will break the basket ', () => {
    beforeEach(() => {
      safeJestMock(loggingmanagerActions, 'trackUserAddRemoveRecipe')
      safeJestMock(basketActions, 'validBasketRecipeAdd')
        .mockReturnValue('mockedValidBasketRecipeAddReturn')
      validateRecipeAgainstRuleSpy.mockReturnValue([])
      basketActions.basketRecipeAdd('123', 'view', {}, 4)(dispatch, getStateSpy)
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    test('then it should dispatch validBasketRecipeAdd', () => {
      expect(dispatch).toHaveBeenCalledWith('mockedValidBasketRecipeAddReturn')
    })

    test('then trackUserAddRemoveRecipe is called correctly', () => {
      expect(loggingmanagerActions.trackUserAddRemoveRecipe).toHaveBeenCalledTimes(1)
    })
  })

  describe('when there are rules that will break the basket ', () => {
    beforeEach(() => {
      safeJestMock(basketActions, 'validBasketRecipeAdd')
        .mockReturnValue('mockedValidBasketRecipeAddReturn')
      validateRecipeAgainstRuleSpy.mockReturnValue([
        {
          items: ['3037'],
          message: 'Only 1 oven ready meal is available per order',
          name: 'charlie-binghams-basket-limit'
        },
        {
          items: ['3037'],
          message: 'Only 1 new-rule meal is available per order',
          name: 'new-rule'
        }
      ])
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    test('then it should dispatch validBasketRecipeAdd', () => {
      basketActions.basketRecipeAdd('123', 'view', {}, 4)(dispatch, getStateSpy)
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(
        {
          key: 'BASKET_NOT_VALID',
          type: 'ERROR',
          value: {
            errorTitle: 'Oven Ready meals',
            recipeId: '123',
            rules: [{
              items: ['3037'],
              message: 'Only 1 oven ready meal is available per order',
              name: 'charlie-binghams-basket-limit'
            }, {
              items: ['3037'],
              message: 'Only 1 new-rule meal is available per order',
              name: 'new-rule'
            }
            ]
          }
        })
    })

    describe('when details screen is opened', () => {
      beforeEach(() => {
        const menuRecipeDetailVisibilityChangeSpy = safeJestMock(menuRecipeDetailsActions, 'menuRecipeDetailVisibilityChange')
        returnArgumentsFromMock(menuRecipeDetailVisibilityChangeSpy, 'menuRecipeDetailVisibilityChange')
        state = {
          basket: Immutable.Map({
            123: 1,
            345: 1
          }),
          menuRecipeDetails: Immutable.Map({
            recipeId: '1234'
          })
        }
        getStateSpy = () => (state)
        dispatch = jest.fn()
      })

      test('should dispatch menuRecipeDetailVisibilityChange', () => {
        basketActions.basketRecipeAdd('1234', 'view', {}, 4)(dispatch, getStateSpy)
        expect(dispatch).toHaveBeenCalledWith(['menuRecipeDetailVisibilityChange', []])
      })
    })
  })
})

describe('basketRecipeRemove', () => {
  let getStateSpy
  const dispatch = jest.fn()
  beforeEach(() => {
    getStateSpy = jest.fn().mockReturnValue({
      basket: Immutable.Map({
        recipes: Immutable.Map([['111', 3]]),
        numPortions: 2,
        limitReached: true,
      }),
      filters: Immutable.Map({
      }),
      menuCollections: Immutable.fromJS({
        '1365e0ac-5b1a-11e7-a8dc-001c421e38fa': {
          id: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
          published: true,
          default: true,
          slug: 'foo',
          recipesInCollection: ['123', '234']
        }
      }),
      routing: {
        locationBeforeTransitions: {
          query: {
            collection: 'foo'
          }
        }
      }
    })
    const limitReachSpy = safeJestMock(basketUtils, 'limitReached')
    limitReachSpy.mockReturnValue(false)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('when basketRecipeRemove is called passing recipeId only', () => {
    beforeEach(() => {
      basketActions.basketRecipeRemove('123')(dispatch, getStateSpy)
    })

    test('should dispatch BASKET_LIMIT_REACHED, MENU_RECIPE_STOCK_CHANGE and BASKET_RECIPE_REMOVE action types with correct recipe id and limit reached', () => {
      expect(getStateSpy.mock.calls).toHaveLength(3)
      expect(dispatch.mock.calls).toHaveLength(5)

      expect(dispatch.mock.calls[0]).toEqual([{
        type: actionTypes.BASKET_RECIPE_REMOVE,
        recipeId: '123',
        trackingData: {
          actionType: trackingKeys.removeRecipe,
          recipeId: '123',
          view: undefined,
          position: undefined,
          collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
          recipe_count: 0
        },
      }])

      expect(dispatch.mock.calls[1]).toEqual([{
        type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
        stock: { 123: { 2: 1 } },
      }])

      expect(dispatch.mock.calls[2]).toEqual([{
        type: actionTypes.BASKET_LIMIT_REACHED,
        limitReached: false,
        trackingData: {
          view: undefined,
          source: actionTypes.RECIPE_REMOVED,
          actionType: trackingKeys.basketLimit,
          limitReached: false,
        },
      }])
    })

    test('then trackUserAddRemoveRecipe is called correctly', () => {
      expect(loggingmanagerActions.trackUserAddRemoveRecipe).toHaveBeenCalledTimes(1)
    })
  })

  test('should dispatch a pricing pricingRequest action', () => {
    const pricingRequestResponse = Symbol('Pricing request')
    const pricingRequestSpy = safeJestMock(pricingActions, 'pricingRequest')
    pricingRequestSpy.mockReturnValue(pricingRequestResponse)

    basketActions.basketRecipeRemove('123')(dispatch, getStateSpy)

    expect(dispatch).toHaveBeenCalledWith(pricingRequestResponse)
  })

  test('should map through the given view argument through to trackingData', () => {
    basketActions.basketRecipeRemove('123', 'boxsummary')(dispatch, getStateSpy)

    expect(getStateSpy.mock.calls).toHaveLength(3)
    expect(dispatch.mock.calls).toHaveLength(5)

    expect(dispatch.mock.calls[0]).toEqual([{
      type: actionTypes.BASKET_RECIPE_REMOVE,
      recipeId: '123',
      trackingData: {
        actionType: trackingKeys.removeRecipe,
        recipeId: '123',
        view: 'boxsummary',
        position: undefined,
        collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
        recipe_count: 0
      },
    }])

    expect(dispatch.mock.calls[1]).toEqual([{
      type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
      stock: { 123: { 2: 1 } },
    }])

    expect(dispatch.mock.calls[2]).toEqual([{
      type: actionTypes.BASKET_LIMIT_REACHED,
      limitReached: false,
      trackingData: {
        view: 'boxsummary',
        source: actionTypes.RECIPE_REMOVED,
        actionType: trackingKeys.basketLimit,
        limitReached: false,
      },
    }])
  })

  test('should dispatch BASKET_LIMIT_REACHED, MENU_RECIPE_STOCK_CHANGE and BASKET_RECIPE_REMOVE when portion and recipe limit is reached', () => {
    getStateSpy = jest.fn().mockReturnValue({
      basket: Immutable.Map({
        recipes: Immutable.Map([['111', 1], ['222', 1], ['333', 1]]),
        numPortions: 2,
        limitReached: true,
      }),
      filters: Immutable.Map({
      }),
      menuCollections: Immutable.fromJS({
        '1365e0ac-5b1a-11e7-a8dc-001c421e38fa': {
          id: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
          published: true,
          default: true,
          slug: 'foo',
          recipesInCollection: ['123', '234']
        }
      }),
      routing: {
        locationBeforeTransitions: {
          query: {
            collection: 'foo'
          }
        }
      }
    })
    basketActions.basketRecipeRemove('123')(dispatch, getStateSpy)

    expect(getStateSpy.mock.calls).toHaveLength(3)
    expect(dispatch.mock.calls).toHaveLength(5)

    expect(dispatch.mock.calls[0]).toEqual([{
      type: actionTypes.BASKET_RECIPE_REMOVE,
      recipeId: '123',
      trackingData: {
        actionType: trackingKeys.removeRecipe,
        recipeId: '123',
        view: undefined,
        position: undefined,
        collection: '1365e0ac-5b1a-11e7-a8dc-001c421e38fa',
        recipe_count: 2
      },
    }])

    expect(dispatch.mock.calls[1]).toEqual([{
      type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
      stock: { 123: { 2: 1 } },
    }])

    expect(dispatch.mock.calls[2]).toEqual([{
      type: actionTypes.BASKET_LIMIT_REACHED,
      limitReached: false,
      trackingData: {
        view: undefined,
        source: actionTypes.RECIPE_REMOVED,
        actionType: trackingKeys.basketLimit,
        limitReached: false,
      },
    }])
  })
})

describe('basketRecipeSwap', () => {
  let state
  let getStateSpy
  let dispatch

  describe('When there is no basket valid error', () => {
    beforeEach(() => {
      state = {
        error: Immutable.Map({})
      }
      getStateSpy = () => (state)
      dispatch = jest.fn()
    })
    test('then it should not dispatch anything', () => {
      basketActions.basketRecipeSwap()(dispatch, getStateSpy)
      expect(dispatch).not.toHaveBeenCalled()
    })
  })

  describe('When there is a basket valid error', () => {
    beforeEach(() => {
      state = {
        error: Immutable.Map({
          BASKET_NOT_VALID: {
            errorTitle: 'This is an error',
            recipeId: '234',
            rules: [
              {
                name: 'Rule one',
                message: 'You cannot add two of these',
                items: ['678']
              }
            ]
          }
        }),
      }
      getStateSpy = () => (state)
      dispatch = jest.fn()

      safeJestMock(basketActions, 'validBasketRecipeAdd')
        .mockReturnValue('mockedValidBasketRecipeAddReturn')

      safeJestMock(basketActions, 'basketRecipeRemove')
        .mockReturnValue('mockedBasketRecipeRemoveReturn')

      safeJestMock(menuCheckoutClickActions, 'clearBasketNotValidError')
        .mockReturnValue('mockedClearBasketNotValidErrorReturn')
    })

    test('then it should dipatch basketRecipeRemove', () => {
      basketActions.basketRecipeSwap()(dispatch, getStateSpy)
      expect(dispatch).toHaveBeenCalledWith('mockedBasketRecipeRemoveReturn')
    })

    test('then it should dipatch validBasketRecipeAdd', () => {
      basketActions.basketRecipeSwap()(dispatch, getStateSpy)
      expect(dispatch).toHaveBeenCalledWith('mockedValidBasketRecipeAddReturn')
    })

    test('then it should dipatch clearBasketNotValidError', () => {
      basketActions.basketRecipeSwap()(dispatch, getStateSpy)
      expect(dispatch).toHaveBeenCalledWith('mockedClearBasketNotValidErrorReturn')
    })
  })
})

describe('basketRecipeAddAttempt', () => {
  let state
  let getStateSpy
  let dispatch

  beforeEach(() => {
    state = {
      basket: Immutable.Map({
        recipes: Immutable.Map([['123', 1]]),
        numPortions: 2,
        limitReached: false,
        promoCode: 'test-promo-code',
        slotId: 'test-slot-id',
      }),
      menuRecipeDetails: Immutable.Map({
        recipeId: '123'
      })
    }
    getStateSpy = () => (state)
    dispatch = jest.fn()
  })

  describe('when there is a postcode ', () => {
    afterEach(() => {
      jest.resetAllMocks()
    })

    test('then it should dispatch basketRecipeAdd', () => {
      safeJestMock(basketSelectors, 'getBasketPostcode').mockReturnValue('SE13 4RT')
      const basketRecipeAddSpy = safeJestMock(basketActions, 'basketRecipeAdd').mockReturnValue('basketRecipeAddResponse')

      basketActions.basketRecipeAddAttempt('123')(dispatch, getStateSpy)
      expect(basketRecipeAddSpy).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith('basketRecipeAddResponse')
    })
  })

  describe('when there is no postcode', () => {
    beforeEach(() => {
      state = {
        basket: Immutable.Map({
          recipes: Immutable.Map([['123', 1]]),
          postcode: null,
        }),
      }
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    test('then it should dispatch menuBrowseCTAVisibilityChange', () => {
      const menuBrowseCTAVisibilityChangeSpy = safeJestMock(menuActions, 'menuBrowseCTAVisibilityChange')
      menuBrowseCTAVisibilityChangeSpy.mockReturnValue('menuBrowseCTAVisibilityChangeResponse')

      basketActions.basketRecipeAddAttempt('123')(dispatch, getStateSpy)
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith('menuBrowseCTAVisibilityChangeResponse')
    })
  })
})
