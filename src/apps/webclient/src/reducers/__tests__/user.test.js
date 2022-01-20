import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import userReducer, { defaultState } from '../user'

let mockState

const setPriorMultiSkipState = (data = {}) => {
  mockState = Immutable.fromJS({
    ...defaultState.toObject(),
    multiSkip: {
      ...defaultState.toObject().multiSkip,
      ...data
    }
  })
}

const reduceMultiSkipAction = (action) => userReducer
  .user(mockState, action)
  .get('multiSkip')

let nextState

describe('User reducer', () => {
  const { user } = userReducer

  const shippingAddresses = [
    {
      id: '321250',
      deleted: false,
      user_id: '77213',
      name: 'Home',
      companyname: '',
      line1: 'Flat 4',
      line2: '67 Cloister Road',
      line3: '',
      town: 'London',
      county: 'Greater London',
      postcode: 'W3 0DF',
      delivery_instructions: 'Front Porch',
      shipping_default: true,
      billing_default: false,
      state: 'valid',
      premium_delivery: true,
    },
    {
      id: '325007',
      deleted: false,
      user_id: '77213',
      name: 'work',
      companyname: '',
      line1: 'Unit 2 Issigonis House',
      line2: 'Cowley Road',
      line3: '',
      town: 'London',
      county: 'Greater London',
      postcode: 'W3 7UN',
      delivery_instructions: 'Front Porch',
      shipping_default: false,
      billing_default: false,
      state: 'valid',
      premium_delivery: true,
    },
  ]

  beforeEach(() => {
    mockState = defaultState
  })

  test('should handle initial state', () => {
    const initialState = user(undefined, {})
    expect(Immutable.is(initialState, defaultState)).toBe(true)
  })

  test('should handle unknown actions', () => {
    const state = Immutable.Map({
      email: 'test@email.com',
    })

    const result = user(state, { type: 'unknown' })

    expect(Immutable.is(result, state)).toBe(true)
  })

  describe('USER_AGE_VERIFY', () => {
    test('should set ageVerified', () => {
      const result = user(defaultState, {
        type: actionTypes.USER_AGE_VERIFY,
        verified: true,
      })
      const expected = defaultState.merge(
        Immutable.fromJS({
          ageVerified: true,
        }),
      )
      expect(Immutable.is(result, expected)).toBe(true)
    })
  })

  describe('USER_LOAD_DATA action type', () => {
    test('should set user email', () => {
      const action = {
        type: actionTypes.USER_LOAD_DATA,
        user: { id: '123', email: 'test@email.com' },
      }
      const result = user(defaultState, action)
      const expected = defaultState.merge(
        Immutable.fromJS({
          id: '123',
          email: 'test@email.com',
        }),
      )

      expect(Immutable.is(result, expected)).toBe(true)
    })
  })

  describe('USER_SUBSCRIBE action type', () => {
    test('should set user id & email', () => {
      const action = {
        type: actionTypes.USER_SUBSCRIBE,
        user: { id: '123', email: 'test@email.com' },
      }
      const result = user(defaultState, action)
      const expected = defaultState.merge(
        Immutable.fromJS({
          id: '123',
          email: 'test@email.com',
        }),
      )

      expect(Immutable.is(result, expected)).toBe(true)
    })
  })

  describe('USER_LOAD_ORDERS action type', () => {
    const ordersSample = Immutable.fromJS([
      { id: '123', email: 'test@email.com' },
      { id: '456', email: 'test2@email.com' },
    ])
    const ordersMapSample = Immutable.OrderedMap(
      ordersSample.map(order => [order.get('id'), order]),
    )

    test('should set user orders', () => {
      const action = {
        type: actionTypes.USER_LOAD_ORDERS,
        orders: ordersSample,
      }
      const result = user(defaultState, action)
      const expected = defaultState.merge({
        orders: ordersMapSample,
      })

      expect(Immutable.is(result.get('orders'), expected.get('orders'))).toBe(
        true,
      )
    })

    test('should add new user orders to list of existing user orders', () => {
      const newOrder = Immutable.fromJS([
        { id: '789', email: 'test3@email.com' },
      ])
      const action = {
        type: actionTypes.USER_LOAD_ORDERS,
        orders: newOrder,
      }

      const initialState = Immutable.fromJS({
        orders: ordersSample,
      })
      const result = user(initialState, action)
      const expectedOrders = ordersSample.concat(newOrder)
      const expected = Immutable.fromJS({
        orders: Immutable.OrderedMap(
          expectedOrders.map(order => [order.get('id'), order]),
        ),
      })

      expect(Immutable.is(result.get('orders'), expected.get('orders'))).toBe(
        true,
      )
    })

    test('should update existing orders with new order values', () => {
      const newOrders = Immutable.fromJS([
        { id: '789', email: 'test3@email.com' },
        { id: '456', email: 'new@email.com' },
      ])
      const action = {
        type: actionTypes.USER_LOAD_ORDERS,
        orders: newOrders,
      }

      const initialState = Immutable.fromJS({
        orders: ordersSample,
      })
      const result = user(initialState, action)
      const expectedOrders = Immutable.fromJS([
        { id: '123', email: 'test@email.com' },
        { id: '456', email: 'new@email.com' },
        { id: '789', email: 'test3@email.com' },
      ])
      const expected = Immutable.fromJS({
        orders: Immutable.OrderedMap(
          expectedOrders.map(order => [order.get('id'), order]),
        ),
      })

      expect(Immutable.is(result.get('orders'), expected.get('orders'))).toBe(
        true,
      )
    })
  })

  describe('USER_LOAD_PROJECTED_DELIVERIES action type', () => {
    test('should set projected deliveries to Immutable map keyed by action.projectedDeliveries array ids, adding the fields deliveryDate and state', () => {
      const result = user(defaultState, {
        type: actionTypes.USER_LOAD_PROJECTED_DELIVERIES,
        projectedDeliveries: [
          { deliveryDate: 'date1', skipped: false },
          { deliveryDate: 'date2', skipped: true },
        ]
      })

      const expected = defaultState.merge(
        Immutable.fromJS({
          projectedDeliveries: {
            date1: {
              deliveryDate: 'date1',
              skipped: false,
            },
            date2: {
              deliveryDate: 'date2',
              skipped: true,
            },
          },
        }),
      )

      expect(Immutable.is(result, expected)).toBe(true)
    })
  })

  describe('USER_UNLOAD_ORDERS action type', () => {
    test('should remove orders from Immutable List of orders given array of ids orderIds', () => {
      const initialState = defaultState.merge(
        Immutable.fromJS({
          orders: [
            { id: '1', name: 'one' },
            { id: '2', name: 'two' },
            { id: '3', name: 'three' },
            { id: '4', name: 'four' },
            { id: '5', name: 'five' },
            { id: '6', name: 'six' },
            { id: '7', name: 'seven' },
          ],
        }),
      )

      const result = user(initialState, {
        type: actionTypes.USER_UNLOAD_ORDERS,
        orderIds: ['3', '4', '7'],
      })

      const expected = defaultState.merge(
        Immutable.fromJS({
          orders: [
            { id: '1', name: 'one' },
            { id: '2', name: 'two' },
            { id: '5', name: 'five' },
            { id: '6', name: 'six' },
          ],
        }),
      )

      expect(Immutable.is(result, expected)).toBe(true)
    })

    test('should remove no orders from Immutable List of orders given an empty array', () => {
      const initialState = defaultState.merge(
        Immutable.fromJS({
          orders: [
            { id: '1', name: 'one' },
            { id: '2', name: 'two' },
            { id: '3', name: 'three' },
            { id: '4', name: 'four' },
            { id: '5', name: 'five' },
            { id: '6', name: 'six' },
            { id: '7', name: 'seven' },
          ],
        }),
      )

      const result = user(initialState, {
        type: actionTypes.USER_UNLOAD_ORDERS,
        orderIds: [],
      })

      const expected = defaultState.merge(
        Immutable.fromJS({
          orders: [
            { id: '1', name: 'one' },
            { id: '2', name: 'two' },
            { id: '3', name: 'three' },
            { id: '4', name: 'four' },
            { id: '5', name: 'five' },
            { id: '6', name: 'six' },
            { id: '7', name: 'seven' },
          ],
        }),
      )

      expect(Immutable.is(result, expected)).toBe(true)
    })
  })

  describe('USER_UNLOAD_PROJECTED_DELIVERIES action type', () => {
    test('should remove deliveries from Immutable map of projectedDeliveries given array of ids deliveryDayIds', () => {
      const initialState = defaultState.merge(
        Immutable.fromJS({
          projectedDeliveries: {
            1: { id: '1', name: 'one' },
            2: { id: '2', name: 'two' },
            3: { id: '3', name: 'three' },
            4: { id: '4', name: 'four' },
            5: { id: '5', name: 'five' },
            6: { id: '6', name: 'six' },
            7: { id: '7', name: 'seven' },
          },
        }),
      )

      const result = user(initialState, {
        type: actionTypes.USER_UNLOAD_PROJECTED_DELIVERIES,
        deliveryDayIds: ['3', '4', '7'],
      })

      const expected = defaultState.merge(
        Immutable.fromJS({
          projectedDeliveries: {
            1: { id: '1', name: 'one' },
            2: { id: '2', name: 'two' },
            5: { id: '5', name: 'five' },
            6: { id: '6', name: 'six' },
          },
        }),
      )

      expect(Immutable.is(result, expected)).toBe(true)
    })

    test('should remove deliveries from Immutable map of projectedDeliveries given an empty array', () => {
      const initialState = defaultState.merge(
        Immutable.fromJS({
          projectedDeliveries: {
            1: { id: '1', name: 'one' },
            2: { id: '2', name: 'two' },
            3: { id: '3', name: 'three' },
            4: { id: '4', name: 'four' },
            5: { id: '5', name: 'five' },
            6: { id: '6', name: 'six' },
            7: { id: '7', name: 'seven' },
          },
        }),
      )

      const result = user(initialState, {
        type: actionTypes.USER_UNLOAD_PROJECTED_DELIVERIES,
        deliveryDayIds: [],
      })

      const expected = defaultState.merge(
        Immutable.fromJS({
          projectedDeliveries: {
            1: { id: '1', name: 'one' },
            2: { id: '2', name: 'two' },
            3: { id: '3', name: 'three' },
            4: { id: '4', name: 'four' },
            5: { id: '5', name: 'five' },
            6: { id: '6', name: 'six' },
            7: { id: '7', name: 'seven' },
          },
        }),
      )

      expect(Immutable.is(result, expected)).toBe(true)
    })
  })

  describe('ORDER_CANCEL action type', () => {
    test('should change the status of the specified order to "cancelled"', () => {
      const initialState = defaultState.merge(
        Immutable.fromJS({
          newOrders: {
            1: {
              id: '1',
              name: 'one',
              orderState: 'scheduled',
              restorable: false,
              cancellable: false,
              recipes: Immutable.fromJS({}),
            },
            2: {
              id: '2',
              name: 'two',
              orderState: 'scheduled',
              restorable: false,
              cancellable: false,
              recipes: Immutable.fromJS({}),
            },
            5: {
              id: '5',
              name: 'five',
              orderState: 'scheduled',
              restorable: false,
              cancellable: false,
              recipes: Immutable.fromJS({}),
            },
          },
        }),
      )

      const result = user(initialState, {
        type: actionTypes.ORDER_CANCEL,
        orderId: '2',
      })

      const expected = defaultState.merge(
        Immutable.fromJS({
          newOrders: {
            1: {
              id: '1',
              name: 'one',
              orderState: 'scheduled',
              restorable: false,
              cancellable: false,
              recipes: Immutable.fromJS({}),
            },
            2: {
              id: '2',
              name: 'two',
              orderState: 'cancelled',
              restorable: false,
              cancellable: false,
              recipes: Immutable.fromJS({}),
            },
            5: {
              id: '5',
              name: 'five',
              orderState: 'scheduled',
              restorable: false,
              cancellable: false,
              recipes: Immutable.fromJS({}),
            },
          },
        }),
      )

      expect(Immutable.is(result, expected)).toBe(true)
    })
  })

  describe('PROJECTED_ORDER_CANCEL action type', () => {
    test('should change the status of the specified order to "cancelled"', () => {
      const initialState = defaultState.merge(
        Immutable.fromJS({
          newOrders: {
            1: {
              id: '1',
              name: 'one',
              orderState: 'scheduled',
              cancellable: true,
              restorable: false,
            },
            2: {
              id: '2',
              name: 'two',
              orderState: 'scheduled',
              cancellable: true,
              restorable: false,
            },
            5: {
              id: '5',
              name: 'five',
              orderState: 'scheduled',
              cancellable: true,
              restorable: false,
            },
          },
        }),
      )

      const result = user(initialState, {
        type: actionTypes.PROJECTED_ORDER_CANCEL,
        orderId: '2',
      })

      const expected = defaultState.merge(
        Immutable.fromJS({
          newOrders: {
            1: {
              id: '1',
              name: 'one',
              orderState: 'scheduled',
              cancellable: true,
              restorable: false,
            },
            2: {
              id: '2',
              name: 'two',
              orderState: 'cancelled',
              cancellable: false,
              restorable: true,
            },
            5: {
              id: '5',
              name: 'five',
              orderState: 'scheduled',
              cancellable: true,
              restorable: false,
            },
          },
        }),
      )

      expect(Immutable.is(result, expected)).toBe(true)
    })
  })

  describe('PROJECTED_ORDER_RESTORE action type', () => {
    test('should make the specified order cancellable, not restorable, and set it to state scheduled', () => {
      const initialState = defaultState.merge(
        Immutable.fromJS({
          newOrders: {
            1: {
              id: '1',
              name: 'one',
              orderState: 'cancelled',
              cancellable: false,
              restorable: true,
            },
            2: {
              id: '2',
              name: 'two',
              orderState: 'cancelled',
              cancellable: false,
              restorable: true,
            },
            5: {
              id: '5',
              name: 'five',
              orderState: 'scheduled',
              cancellable: true,
              restorable: false,
            },
          },
        }),
      )

      const result = user(initialState, {
        type: actionTypes.PROJECTED_ORDER_RESTORE,
        orderId: '2',
      })

      const expected = defaultState.merge(
        Immutable.fromJS({
          newOrders: {
            1: {
              id: '1',
              name: 'one',
              orderState: 'cancelled',
              cancellable: false,
              restorable: true,
            },
            2: {
              id: '2',
              name: 'two',
              orderState: 'scheduled',
              cancellable: true,
              restorable: false,
            },
            5: {
              id: '5',
              name: 'five',
              orderState: 'scheduled',
              cancellable: true,
              restorable: false,
            },
          },
        }),
      )

      expect(Immutable.is(result, expected)).toBe(true)
    })
  })

  describe('USER_SHIPPING_ADDRESSES_RECEIVE action type', () => {
    test("should set the shippingAddresses prop of the state to be an immutable map of the action's shippingAddresses property", () => {
      const state = Immutable.Map({})

      const result = user(state, {
        type: actionTypes.USER_SHIPPING_ADDRESSES_RECEIVE,
        shippingAddresses,
      })
      const expected = Immutable.Map({
        shippingAddresses: Immutable.fromJS(shippingAddresses),
      })

      expect(Immutable.is(result, expected)).toBe(true)
    })
  })

  describe('USER_SHIPPING_ADDRESSES_RECEIVE followed by USER_LOAD_DATA', () => {
    test('should merge the objects', () => {
      let state = defaultState
      state = user(state, {
        type: actionTypes.USER_SHIPPING_ADDRESSES_RECEIVE,
        shippingAddresses,
      })
      state = user(state, {
        type: actionTypes.USER_LOAD_DATA,
        user: { id: '123', email: 'test@email.com' },
      })

      const expected = defaultState.merge(
        Immutable.Map({
          id: '123',
          email: 'test@email.com',
          shippingAddresses: Immutable.fromJS(shippingAddresses),
        }),
      )

      expect(Immutable.is(state, expected)).toBe(true)
    })
  })

  describe('USER_CLEAR_DATA', () => {
    test('should clear the state', () => {
      const state = Immutable.Map({
        id: '123',
        email: 'test@email.com',
        shippingAddresses: Immutable.fromJS(shippingAddresses),
      })
      const result = user(state, { type: actionTypes.USER_CLEAR_DATA })
      expect(Immutable.is(result, defaultState)).toBe(true)
    })
  })

  describe('PS_SUBSCRIPTION_PAUSED', () => {
    test('should set the subscription.state prop of the state to "inactive"', () => {
      const state = Immutable.fromJS({ subscription: { state: 'active' } })

      const result = user(state, { type: actionTypes.PS_SUBSCRIPTION_PAUSED })
      const expected = Immutable.fromJS({
        subscription: { state: 'inactive' },
      })

      expect(Immutable.is(result, expected)).toBe(true)
    })
  })

  describe('USER_LOAD_REFERRAL_OFFER', () => {
    test('should set the referral offer prop', () => {
      const state = Immutable.fromJS({})
      const result = user(state, {
        type: actionTypes.USER_LOAD_REFERRAL_OFFER,
        referralOffer: {
          creditFormatted: '£15',
          firstBoxDiscountFormatted: '50%',
          firstMonthDiscountFormatted: '30%',
          expiry: ''
        }
      })
      const expected = {
        referralOffer: {
          creditFormatted: '£15',
          firstBoxDiscountFormatted: '50%',
          firstMonthDiscountFormatted: '30%',
          expiry: ''
        }
      }

      expect(result.toJS()).toEqual(expected)
    })
  })

  describe('ORDER_DELIVERY_DAYS_RECEIVE', () => {
    test('should set the availableDeliveryDays prop of the corresponding order', () => {
      const state = Immutable.fromJS({ newOrders: { 748: {} } })
      const result = user(state, {
        type: actionTypes.ORDER_DELIVERY_DAYS_RECEIVE,
        orderId: '748',
        availableDays: { a: { id: 1 }, b: { id: 2 } },
      })
      const expected = {
        newOrders: {
          748: {
            availableDeliveryDays: {
              a: { id: 1 },
              b: { id: 2 },
            },
          },
        },
      }

      expect(result.toJS()).toEqual(expected)
    })
  })

  describe('ORDER_UPDATE_DELIVERY_DAY_AND_SLOT', () => {
    test('should update the corresponding order with the values passed in the action', () => {
      const state = Immutable.fromJS({
        newOrders: {
          749: {
            coreDeliveryDayId: 0,
            deliverySlotId: 0,
            deliveryDay: { id: 0 },
            humanDeliveryDay: 'something',
            deliverySlotStart: 'something',
            deliverySlotEnd: 'different',
          },
        },
      })
      const result = user(state, {
        type: actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT,
        orderId: '749',
        coreDayId: 8,
        slotId: 9,
        deliveryDay: { id: 7 },
        humanDeliveryDay: 'Saturday 3rd Feb',
        deliverySlotStart: '10:01:01',
        deliverySlotEnd: '12:02:02',
      })
      const expected = {
        newOrders: {
          749: {
            coreDeliveryDayId: 8,
            deliverySlotId: 9,
            deliveryDay: { id: 7 },
            humanDeliveryDay: 'Saturday 3rd Feb',
            deliverySlotStart: '10:01:01',
            deliverySlotEnd: '12:02:02',
          },
        },
      }

      expect(result.toJS()).toEqual(expected)
    })
  })

  describe('USER_ORDER_EDIT_OPEN_CLOSE', () => {
    test('should set the state in orderCardsEditStatus to true if false', () => {
      const state = Immutable.fromJS({
        orderCardsEditStatus: { sdkfj48fhdj: false },
      })

      const result = user(state, {
        type: actionTypes.USER_ORDER_EDIT_OPEN_CLOSE,
        orderId: 'sdkfj48fhdj',
        editDeliveryMode: true,
      })
      expect(JSON.stringify(result)).toContain('{"sdkfj48fhdj":true}')
    })
    test('should set the state in orderCardsEditStatus to false if true', () => {
      const state = Immutable.fromJS({
        orderCardsEditStatus: { sdkfj48fhdj: true },
      })

      const result = user(state, {
        type: actionTypes.USER_ORDER_EDIT_OPEN_CLOSE,
        orderId: 'sdkfj48fhdj',
        editDeliveryMode: false,
      })
      expect(JSON.stringify(result)).toContain('{"sdkfj48fhdj":false}')
    })
  })

  describe('ORDER_ADDRESS_CHANGE', () => {
    test('should update the addressId of the specified order', () => {
      const data = {
        orderId: '2',
        addressId: 44,
      }
      const initialState = defaultState.merge(
        Immutable.fromJS({
          newOrders: {
            1: { id: '1', name: 'one', shippingAddressId: 11 },
            2: { id: '2', name: 'two', shippingAddressId: 12 },
            5: { id: '5', name: 'five', shippingAddressId: 13 },
          },
        }),
      )

      const result = user(initialState, {
        type: actionTypes.ORDER_ADDRESS_CHANGE,
        data,
      })

      const expected = defaultState.merge(
        Immutable.fromJS({
          newOrders: {
            1: { id: '1', name: 'one', shippingAddressId: 11 },
            2: { id: '2', name: 'two', shippingAddressId: 44 },
            5: { id: '5', name: 'five', shippingAddressId: 13 },
          },
        }),
      )

      expect(Immutable.is(result, expected)).toBe(true)
    })
  })

  describe('USER_LOAD_ADDRESSES', () => {
    test('should load Addresses into state', () => {
      const initialState = defaultState

      const data = [
        { id: '1', name: 'home', line1: 'address 1', postcode: 'ss12 1rr' },
        { id: '2', name: 'work', line1: 'address 2', postcode: 'cm11 1rr' },
      ]

      const result = user(initialState, {
        type: actionTypes.USER_LOAD_ADDRESSES,
        data,
      })

      const expectedState = Immutable.Map()
        .set(
          '1',
          Immutable.Map({
            id: '1',
            name: 'home',
            line1: 'address 1',
            postcode: 'ss12 1rr',
          }),
        )
        .set(
          '2',
          Immutable.Map({
            id: '2',
            name: 'work',
            line1: 'address 2',
            postcode: 'cm11 1rr',
          }),
        )
      expect(Immutable.is(result.get('addresses'), expectedState)).toBe(true)
    })
  })

  describe('CANCELLED_ALL_BOXES_MODAL_VISIBILITY_CHANGE', () => {
    test('should toggle the visibility of the modal and store the pending orders dates which need to be shown on it', () => {
      const initialState = defaultState

      const visibility = true
      const pendingOrdersDates = Immutable.Map({
        111: '2001-03-04',
        222: '2001-05-06',
        333: '2001-06-07',
      })
      const result = user(initialState, {
        type: actionTypes.CANCELLED_ALL_BOXES_MODAL_VISIBILITY_CHANGE,
        visibility,
        pendingOrdersDates,
      })

      const expectedState = Immutable.Map()
        .setIn(['cancelledAllBoxesModal', 'visibility'], true)
        .setIn(
          ['cancelledAllBoxesModal', 'pendingOrdersDates'],
          Immutable.Map({
            111: '2001-03-04',
            222: '2001-05-06',
            333: '2001-06-07',
          }),
        )
      expect(
        Immutable.is(
          result.get('cancelledAllBoxesModal'),
          expectedState.get('cancelledAllBoxesModal'),
        ),
      ).toBe(true)
    })
  })

  describe('UNSUBSCRIBED_USER', () => {
    test('updates the user state as unsubscribed from emails', () => {
      const initialState = defaultState
      const result = user(initialState, {
        type: actionTypes.UNSUBSCRIBED_USER,
      })
      expect(result.get('unsubscribedFromEmail')).toBe(true)
    })
  })

  describe('MYDELIVERIES_ORDERS', () => {
    test('adds newOrders to user state', () => {
      const initialState = defaultState
      const expectedState = Immutable.Map()

      const result = user(initialState, {
        type: actionTypes.MYDELIVERIES_ORDERS,
        orders: Immutable.Map()
      })
      expect(Immutable.is(result.get('newOrders'), expectedState)).toBe(true)
    })
  })

  describe('USER_LOAD_ORDER_TRACKING', () => {
    test('adds the tracking URL to user state', () => {
      const initialState = defaultState
      const EXAMPLE_TRACKING_URL = 'https://tracking-url-example.com'

      const result = user(initialState, {
        type: actionTypes.USER_LOAD_ORDER_TRACKING,
        trackingUrl: EXAMPLE_TRACKING_URL,
      })

      expect(result.get('nextOrderTracking')).toBe(EXAMPLE_TRACKING_URL)
    })
  })

  describe('Given an unrelated action is dispatched', () => {
    test('Then the expected default multi-skip state is returned', () => {
      expect(reduceMultiSkipAction({
        type: 'MOCK_TYPE'
      })).toEqual(Immutable.fromJS({
        isError: false,
        isPending: false,
        isSuccess: false,
        lastSkippedCount: null
      }))
    })
  })

  describe('Given CANCEL_MULTIPLE_BOXES_ERROR is dispatched', () => {
    beforeEach(() => {
      setPriorMultiSkipState({
        isError: false,
        isPending: true
      })

      nextState = reduceMultiSkipAction({
        type: actionTypes.CANCEL_MULTIPLE_BOXES_ERROR
      })
    })

    test('Then the expected multi-skip error state is true', () => {
      expect(nextState.get('isError')).toEqual(true)
    })

    test('Then the expected multi-skip pending state is false', () => {
      expect(nextState.get('isPending')).toEqual(false)
    })
  })

  describe('Given CANCEL_MULTIPLE_BOXES_START is dispatched', () => {
    beforeEach(() => {
      setPriorMultiSkipState({
        pending: false,
        isError: true,
        isSuccess: false,
        lastSkippedCount: 10
      })
      nextState = reduceMultiSkipAction({
        type: actionTypes.CANCEL_MULTIPLE_BOXES_START
      })
    })

    test('Then the expected multi-skip pending state is true', () => {
      expect(nextState.get('isPending')).toEqual(true)
    })

    test('Then the multi-skip error state is false', () => {
      expect(nextState.get('isError')).toEqual(false)
    })

    test('Then the multi-skip success state is false', () => {
      expect(nextState.get('isSuccess')).toEqual(false)
    })

    test('Then the multi-skip last skipped count is reset', () => {
      expect(nextState.get('lastSkippedCount')).toEqual(null)
    })
  })

  describe('Given CANCEL_MULTIPLE_BOXES_SUCCESS is dispatched', () => {
    beforeEach(() => {
      setPriorMultiSkipState({
        isSuccess: false,
        isPending: true,
        lastSkippedCount: null
      })

      nextState = reduceMultiSkipAction({
        type: actionTypes.CANCEL_MULTIPLE_BOXES_SUCCESS,
        count: 2
      })
    })

    test('Then the expected multi-skip success state is true', () => {
      expect(nextState.get('isSuccess')).toEqual(true)
    })

    test('Then the expected multi-skip last skipped count is set', () => {
      expect(nextState.get('lastSkippedCount')).toEqual(2)
    })

    test('Then the multi-skip pending state is false', () => {
      expect(nextState.get('isPending')).toEqual(false)
    })
  })

  describe('Given CANCEL_MULTIPLE_BOXES_END is dispatched', () => {
    describe('And multiSkip is not pending', () => {
      beforeEach(() => {
        setPriorMultiSkipState({
          isSuccess: true,
          isPending: false,
          isError: true,
          lastSkippedCount: 2
        })

        nextState = reduceMultiSkipAction({
          type: actionTypes.CANCEL_MULTIPLE_BOXES_END,
        })
      })

      test('Then the expected multi-skip success state is true', () => {
        expect(nextState.get('isSuccess')).toEqual(false)
      })

      test('Then the expected multi-skip last skipped count is unset', () => {
        expect(nextState.get('lastSkippedCount')).toEqual(null)
      })

      test('Then the multi-skip pending state is false', () => {
        expect(nextState.get('isPending')).toEqual(false)
      })

      test('Then the multi-skip error state is false', () => {
        expect(nextState.get('isError')).toEqual(false)
      })
    })

    describe('And multiSkip is pending', () => {
      beforeEach(() => {
        setPriorMultiSkipState({
          isSuccess: true,
          isPending: true,
          isError: true,
          lastSkippedCount: 2
        })

        nextState = reduceMultiSkipAction({
          type: actionTypes.CANCEL_MULTIPLE_BOXES_END,
        })
      })

      test('Then state is returned', () => {
        expect(nextState.get('isSuccess')).toEqual(true)
        expect(nextState.get('isPending')).toEqual(true)
        expect(nextState.get('isError')).toEqual(true)
        expect(nextState.get('lastSkippedCount')).toEqual(2)
      })
    })
  })

  describe('Given UNSUBSCRIBED_USER is dispatched', () => {
    test('Then the user is unsubscribed from emails', () => {
      const state = user(defaultState, {
        type: actionTypes.UNSUBSCRIBED_USER
      })

      expect(state.get('unsubscribedFromEmail')).toBe(true)
    })
  })

  describe('Given USER_ORDER_CARD_OPEN_CLOSE is dispatched', () => {
    test('Then the orderCardsCollapsedStatus state is updated', () => {
      const state = user(defaultState, {
        type: actionTypes.USER_ORDER_CARD_OPEN_CLOSE,
        orderId: 999,
        isCollapsed: true
      })

      expect(state.get('orderCardsCollapsedStatus').toJS()).toEqual({
        999: true,
      })
    })
  })

  describe('Given USER_LOAD_REFERRAL_DETAILS is dispatched', () => {
    test('Then the referralDetails state is updated', () => {
      const state = user(defaultState, {
        type: actionTypes.USER_LOAD_REFERRAL_DETAILS,
        referralDetails: {
          referralCount: 1,
          referralCredit: 2
        }
      })

      expect(state.get('referralDetails').toJS()).toEqual({
        referralCount: 1,
        referralCredit: 2
      })
    })
  })
})
