import Immutable, { Map } from 'immutable'
import * as basketActions from 'actions/basket'
import * as boxSummaryActions from 'actions/boxSummary'
import * as menuCheckoutActions from 'routes/Menu/actions/checkout'
import * as orderActions from 'actions/order'
import optimizelySdk from '@optimizely/optimizely-sdk'
import { safeJestMock, returnArgumentsFromMock } from '../../../../_testing/mocks'
import {
  isOrderApiCreateEnabled,
  isOrderApiUpdateEnabled,
  isOrderApiCancelEnabled,
  checkoutBasket,
  clearBasketNotValidError
} from '../menuCheckoutClick'
import * as menuSelectors from '../../selectors/menu'

describe('feature flags', () => {
  const isFeatureEnabled = jest.fn().mockReturnValue(true)
  const getState = jest.fn().mockReturnValue({ auth: Map({ id: 'user_id' }) })
  const dispatch = jest.fn()

  beforeEach(() => {
    jest.spyOn(optimizelySdk, 'createInstance')
      .mockReturnValue({ onReady: () => ({ success: true }), isFeatureEnabled })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('isOrderApiCreateEnabled', () => {
    test('it calls feature enabled with the correct flag', async () => {
      const isEnabled = await isOrderApiCreateEnabled(dispatch, getState)

      expect(isFeatureEnabled).toBeCalledWith('radishes_order_api_create_web_enabled', 'user_id')
      expect(isEnabled).toBe(true)
    })
  })

  describe('isOrderApiUpdateEnabled', () => {
    test('it calls feature enabled with the correct flag', async () => {
      const isEnabled = await isOrderApiUpdateEnabled(dispatch, getState)

      expect(isFeatureEnabled).toBeCalledWith('radishes_order_api_update_web_enabled', 'user_id')
      expect(isEnabled).toBe(true)
    })
  })

  describe('isOrderApiCancelEnabled', () => {
    test('it calls feature enabled with the correct flag', async () => {
      const isEnabled = await isOrderApiCancelEnabled(dispatch, getState)

      expect(isFeatureEnabled).toBeCalledWith('radishes_order_api_cancel_web_enabled', 'user_id')
      expect(isEnabled).toBe(true)
    })
  })
})

describe('checkoutBasket', () => {
  let state
  const dispatch = jest.fn()
  let getState = () => state

  beforeEach(() => {
    state = {
      boxSummaryDeliveryDays: Immutable.fromJS({
        '2020-04-17': {
          id: 'day-id-1234',
          date: '2020-04-17',
          coreDayId: '2314',
          slots: [{
            whenCutoff: '2020-04-14T11:59:59+01:00',
            cutoffDay: 2,
            coreSlotId: 4,
            id: 'slot-id-date-17'
          }]
        }
      }),
      basket: Immutable.fromJS({
        date: '2020-04-17',
        slotId: 'slot-id-date-17',
        orderId: '',
        recipes: {
          123: 1,
          324: 2
        },
        numPortion: 2,
        currentMenuId: 321,
      }),
      user: Immutable.fromJS({
        orders: []
      }),
      auth: Immutable.fromJS({
        isAuthenticated: true
      }),
      menu: Immutable.fromJS({
        menuLimits: {
          321: {
            limits: []
          }
        }
      })
    }
    getState = () => state

    const orderUpdateSpy = safeJestMock(orderActions, 'orderUpdate')
    returnArgumentsFromMock(orderUpdateSpy, 'orderUpdate')

    const checkoutTransactionalOrderSpy = safeJestMock(menuCheckoutActions, 'checkoutTransactionalOrder')
    returnArgumentsFromMock(checkoutTransactionalOrderSpy, 'checkoutTransactionalOrder')

    const basketProceedToCheckoutSpy = safeJestMock(basketActions, 'basketProceedToCheckout')
    returnArgumentsFromMock(basketProceedToCheckoutSpy, 'basketProceedToCheckout')

    const basketCheckedOutSpy = safeJestMock(basketActions, 'basketCheckedOut')
    returnArgumentsFromMock(basketCheckedOutSpy, 'basketCheckedOut')

    const basketCheckoutClickedSpy = safeJestMock(basketActions, 'basketCheckoutClicked')
    returnArgumentsFromMock(basketCheckoutClickedSpy, 'basketCheckoutClicked')

    const boxSummaryVisibilityChangeSpy = safeJestMock(boxSummaryActions, 'boxSummaryVisibilityChange')
    returnArgumentsFromMock(boxSummaryVisibilityChangeSpy, 'boxSummaryVisibilityChange')
  })

  test('should dispatch boxSummaryVisibilityChange with false', () => {
    checkoutBasket('menu', '')(dispatch, getState)
    expect(dispatch).toHaveBeenCalledWith(['boxSummaryVisibilityChange', [false]])
  })

  test('should dispatch basketCheckedOut with false', () => {
    checkoutBasket('menu', '')(dispatch, getState)
    expect(dispatch).toHaveBeenCalledWith(['basketCheckedOut', [2, '']])
  })

  test('should dispatch basketCheckedOut with false', () => {
    checkoutBasket('menu', '')(dispatch, getState)
    expect(dispatch).toHaveBeenCalledWith(['basketCheckoutClicked', ['menu']])
  })

  describe('when no basket rules are broken', () => {
    beforeEach(() => {
      safeJestMock(menuSelectors, 'getMenuLimitsForBasket')

      const validateRecipeAgainstRuleSpy = safeJestMock(menuSelectors, 'validateRecipeAgainstRule')
      validateRecipeAgainstRuleSpy.mockReturnValue([])
    })

    describe('when has orderId', () => {
      beforeEach(() => {
        state = {
          boxSummaryDeliveryDays: Immutable.fromJS({
            '2020-04-17': {
              id: 'day-id-1234',
              date: '2020-04-17',
              coreDayId: '2314',
              slots: [{
                whenCutoff: '2020-04-14T11:59:59+01:00',
                cutoffDay: 2,
                coreSlotId: 4,
                id: 'slot-id-date-17'
              }]
            }
          }),
          basket: Immutable.fromJS({
            date: '2020-04-17',
            slotId: 'slot-id-date-17',
            orderId: '1234567',
            recipes: {
              123: 1,
              324: 2
            },
            numPortions: 2,
            currentMenuId: 321,
          }),
          user: Immutable.fromJS({
            orders: [{
              id: '1234567',
              recipeItems: []
            }]
          }),
          auth: Immutable.fromJS({
            isAuthenticated: true
          }),
          menu: Immutable.fromJS({
            menuLimits: {
              321: {
                limits: []
              }
            }
          })
        }

        getState = () => state
      })

      test('should dispatch orderUpdate', () => {
        checkoutBasket('menu', '')(dispatch, getState)
        expect(dispatch).toHaveBeenCalledWith(['orderUpdate', ['1234567', ['123', '324', '324'], '2314', 4, 2, 'recipe-choice']])
      })
    })

    describe('when no authentificated', () => {
      beforeEach(() => {
        state = {
          boxSummaryDeliveryDays: Immutable.fromJS({
            '2020-04-17': {
              id: 'day-id-1234',
              date: '2020-04-17',
              coreDayId: '2314',
              slots: [{
                whenCutoff: '2020-04-14T11:59:59+01:00',
                cutoffDay: 2,
                coreSlotId: 4,
                id: 'slot-id-date-17'
              }]
            }
          }),
          basket: Immutable.fromJS({
            date: '2020-04-17',
            slotId: 'slot-id-date-17',
            orderId: '',
            recipes: {
              123: 1,
              324: 2
            },
            numPortions: 2,
            currentMenuId: 321,
          }),
          user: Immutable.fromJS({}),
          auth: Immutable.fromJS({
            isAuthenticated: false
          }),
          menu: Immutable.fromJS({
            menuLimits: {
              321: {
                limits: []
              }
            }
          })
        }

        getState = () => state
      })

      test('should dispatch basketProceedToCheckout', () => {
        checkoutBasket('menu', '')(dispatch, getState)
        expect(dispatch).toHaveBeenCalledWith(['basketProceedToCheckout', []])
      })
    })

    describe('when is authentificated', () => {
      beforeEach(() => {
        state = {
          boxSummaryDeliveryDays: Immutable.fromJS({
            '2020-04-17': {
              id: 'day-id-1234',
              date: '2020-04-17',
              coreDayId: '2314',
              slots: [{
                whenCutoff: '2020-04-14T11:59:59+01:00',
                cutoffDay: 2,
                coreSlotId: 4,
                id: 'slot-id-date-17'
              }]
            }
          }),
          basket: Immutable.fromJS({
            date: '2020-04-17',
            slotId: 'slot-id-date-17',
            orderId: '',
            recipes: {
              123: 1,
              324: 2
            },
            numPortions: 2,
          }),
          user: Immutable.fromJS({}),
          auth: Immutable.fromJS({
            isAuthenticated: true
          }),
          menu: Immutable.fromJS({
            menuLimits: {
              321: {
                limits: []
              }
            }
          })
        }

        getState = () => state
      })

      test('should dispatch basketProceedToCheckout', () => {
        checkoutBasket('menu', '')(dispatch, getState)
        expect(dispatch).toHaveBeenCalledWith(['checkoutTransactionalOrder', ['create']])
      })
    })
  })

  describe('when menu has broken rules', () => {
    beforeEach(() => {
      safeJestMock(menuSelectors, 'getMenuLimitsForBasket')

      const validateRecipeAgainstRuleSpy = safeJestMock(menuSelectors, 'validateRecipeAgainstRule')
      validateRecipeAgainstRuleSpy.mockReturnValue([{
        items: ['123'],
        message: 'Only 1 oven ready meal is available per order',
        name: 'charlie-binghams-basket-limit'
      }])
    })

    test('should dispatch BASKET_NOT_VALID with validation response', () => {
      checkoutBasket('menu', '')(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({
        key: 'BASKET_NOT_VALID',
        type: 'ERROR',
        value: {
          errorTitle: 'Basket Not Valid',
          recipeId: null,
          rules: [{
            items: ['123'],
            message: 'Only 1 oven ready meal is available per order',
            name: 'charlie-binghams-basket-limit'
          }]}
      })
    })
  })
})

describe('clearBasketNotValidError', () => {
  test('should dispatch error BASKET_NOT_VALID with null', () => {
    const dispatch = jest.fn()
    clearBasketNotValidError()(dispatch)
    expect(dispatch).toHaveBeenCalledWith({
      key: 'BASKET_NOT_VALID',
      type: 'ERROR',
      value: null
    })
  })
})
