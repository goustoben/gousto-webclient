import { List, Map, OrderedMap, fromJS } from 'immutable'
import { storeGetHelpOrder } from 'routes/GetHelp/actions/getHelp'
import { actionTypes } from 'routes/GetHelp/actions/actionTypes'
import { actionTypes as webclientActionTypes } from 'actions/actionTypes'
import { getHelp, getHelpInitialState } from 'reducers/getHelp'

const MOCK_ORDERS = [
  {
    id: '101',
    deliveryDate: '2019-09-07 00:00:00',
    deliverySlot: { id: '6', deliveryStart: '08:00:00', deliveryEnd: '19:00:00' },
    recipeItems: [
      {
        id: '43656080',
        recipeGoustoReference: '123',
        recipeId: '4001',
        recipeUuid: '4b77e742-fe81-46b1-ba27-075473ee2e8e',
        productId: null,
      },
      {
        id: '43656081',
        recipeGoustoReference: '456',
        recipeId: '4002',
        recipeUuid: '4b77e742-fe81-46b1-ba27-075473ee2e8f',
        productId: null,
      },
    ],
  },
  {
    id: '102',
    deliveryDate: '2019-09-14 00:00:00',
    deliverySlot: { id: '6', deliveryStart: '08:00:00', deliveryEnd: '19:00:00' },
    recipeItems: [
      {
        id: '43656082',
        recipeGoustoReference: '342',
        recipeId: '4003',
        recipeUuid: '4b77e742-fe81-46b1-ba27-075473ee2e90',
        productId: null,
      },
      {
        id: '43656083',
        recipeGoustoReference: '198',
        recipeId: '4004',
        recipeUuid: '4b77e742-fe81-46b1-ba27-075473ee2e91',
        productId: null,
      },
    ],
  },
]

describe('getHelp reducer', () => {
  let newState

  describe('given the action generated by storeGetHelpOrder is received', () => {
    const ORDER = {
      id: '100',
      recipeIds: ['10', '20', '30'],
      recipeDetailedItems: {
        10: '456',
        20: '123',
        30: '456',
      },
      deliverySlot: {
        deliveryEnd: '18:59:59',
        deliveryStart: '08:00:00',
      },
    }

    beforeEach(() => {
      newState = getHelp(getHelpInitialState, storeGetHelpOrder(ORDER))
    })

    test('the new state.order has the order stored, renaming recipeIds to recipeItems', () => {
      expect(newState.get('order')).toEqual(Map({
        id: ORDER.id,
        recipeItems: List(ORDER.recipeIds),
        recipeDetailedItems: Map(ORDER.recipeDetailedItems),
        deliverySlot: Map(ORDER.deliverySlot)
      }))
    })
  })

  describe('given a GET_HELP_LOAD_ORDERS action type is received', () => {
    beforeEach(() => {
      newState = getHelp(getHelpInitialState, {
        type: actionTypes.GET_HELP_LOAD_ORDERS,
        orders: MOCK_ORDERS
      })
    })

    test('the new state.orders has the orders of the action stored', () => {
      const EXPECTED_REDUCED_ORDERS = OrderedMap({
        101: Map({
          deliveryDate: '2019-09-07 00:00:00',
          deliverySlot: Map({ deliveryEnd: '19:00:00', deliveryStart: '08:00:00' }),
          id: '101',
          recipeIds: List(['4001', '4002']),
          recipeDetailedItems: Map({
            4001: '123',
            4002: '456',
          }),
        }),
        102: Map({
          deliveryDate: '2019-09-14 00:00:00',
          deliverySlot: Map({ deliveryEnd: '19:00:00', deliveryStart: '08:00:00' }),
          id: '102',
          recipeIds: List(['4003', '4004']),
          recipeDetailedItems: Map({
            4003: '342',
            4004: '198',
          }),
        }),
      })
      expect(newState.get('orders')).toEqual(EXPECTED_REDUCED_ORDERS)
    })
  })

  describe('given an action with type GET_HELP_LOAD_ORDERS_BY_ID is received', () => {
    beforeEach(() => {
      newState = getHelp(getHelpInitialState, {
        type: webclientActionTypes.GET_HELP_LOAD_ORDERS_BY_ID,
        order: MOCK_ORDERS[0]
      })
    })

    test('the new state.order has the order of the action stored', () => {
      const EXPECTED_REDUCED_ORDER = fromJS({
        deliverySlot: {
          deliveryStart: '08:00:00',
          deliveryEnd: '19:00:00' ,
        },
        id: '',
        recipeDetailedItems: { 4001: '123', 4002: '456' },
        recipeItems: ['4001', '4002'],
        deliveryDate: '2019-09-07 00:00:00',
        trackingUrl: '',
      })
      expect(newState.get('order')).toEqual(EXPECTED_REDUCED_ORDER)
    })
  })

  describe('given an action with type GET_HELP_LOAD_TRACKING_URL is received', () => {
    const TRACKING_URL = 'https://nice-courier.com/order/12345'

    beforeEach(() => {
      newState = getHelp(getHelpInitialState, {
        type: actionTypes.GET_HELP_LOAD_TRACKING_URL,
        payload: {
          trackingUrl: TRACKING_URL,
        }
      })
    })

    test('the tracking url in the action payload is stored in the new state.order.trackingUrl', () => {
      expect(newState.getIn(['order', 'trackingUrl']))
        .toEqual(TRACKING_URL)
    })
  })
})
