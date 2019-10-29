import sinon from 'sinon'

import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */
import userReducer, { defaultState as defaultInitialState } from 'reducers/user'

describe('user reducer', () => {
  const user = userReducer.user
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

  test('should handle initial state', () => {
    const initialState = user(undefined, {})
    expect(Immutable.is(initialState, defaultInitialState)).toBe(true)
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
      const result = user(defaultInitialState, {
        type: actionTypes.USER_AGE_VERIFY,
        verified: true,
      })
      const expected = defaultInitialState.merge(
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
      const result = user(defaultInitialState, action)
      const expected = defaultInitialState.merge(
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
      const result = user(defaultInitialState, action)
      const expected = defaultInitialState.merge(
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
      const result = user(defaultInitialState, action)
      const expected = defaultInitialState.merge({
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

  describe('USER_LOAD_ORDERS_NEW action type', () => {
    const ordersSample = Immutable.fromJS([
      { id: '123', state: 'scheduled' },
      { id: '456', email: 'cancelled' },
    ])

    test('should set user orders', () => {
      const action = {
        type: actionTypes.USER_LOAD_ORDERS_NEW,
        orders: ordersSample,
      }
      const result = user(defaultInitialState, action)
      const expected = Immutable.fromJS({
        123: { id: '123', state: 'scheduled' },
        456: { id: '456', email: 'cancelled' },
      })

      expect(Immutable.is(result.get('newOrders'), expected)).toBe(true)
    })
  })

  describe('USER_LOAD_PROJECTED_DELIVERIES action type', () => {
    test('should set projected deliveries to Immutable map keyed by action.projectedDeliveries array ids, adding the fields deliveryDate and state', () => {
      const result = user(defaultInitialState, {
        type: actionTypes.USER_LOAD_PROJECTED_DELIVERIES,
        projectedDeliveries: [
          { id: '1', name: 'one', date: 'date1', active: '1' },
          { id: '2', name: 'two', date: 'date2', active: '0' },
        ],
      })

      const expected = defaultInitialState.merge(
        Immutable.fromJS({
          projectedDeliveries: {
            1: {
              id: '1',
              name: 'one',
              date: 'date1',
              active: '1',
              deliveryDate: 'date1',
              state: 'scheduled',
            },
            2: {
              id: '2',
              name: 'two',
              date: 'date2',
              active: '0',
              deliveryDate: 'date2',
              state: 'cancelled',
            },
          },
        }),
      )

      expect(Immutable.is(result, expected)).toBe(true)
    })
  })

  describe('USER_UNLOAD_ORDERS action type', () => {
    test('should remove orders from Immutable List of orders given array of ids orderIds', () => {
      const initialState = defaultInitialState.merge(
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

      const expected = defaultInitialState.merge(
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
  })

  describe('USER_UNLOAD_PROJECTED_DELIVERIES action type', () => {
    test('should remove deliveries from Immutable map of projectedDeliveries given array of ids deliveryDayIds', () => {
      const initialState = defaultInitialState.merge(
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

      const expected = defaultInitialState.merge(
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
  })

  describe('ORDER_CANCEL action type', () => {
    test('should change the status of the specified order to "cancelled"', () => {
      const initialState = defaultInitialState.merge(
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

      const expected = defaultInitialState.merge(
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
      const initialState = defaultInitialState.merge(
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

      const expected = defaultInitialState.merge(
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
      const initialState = defaultInitialState.merge(
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

      const expected = defaultInitialState.merge(
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
      let state = defaultInitialState
      state = user(state, {
        type: actionTypes.USER_SHIPPING_ADDRESSES_RECEIVE,
        shippingAddresses,
      })
      state = user(state, {
        type: actionTypes.USER_LOAD_DATA,
        user: { id: '123', email: 'test@email.com' },
      })

      const expected = defaultInitialState.merge(
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
      expect(Immutable.is(result, defaultInitialState)).toBe(true)
    })
  })

  describe('USER_RATE_COUNT', () => {
    test('should set the rateCount prop of the state', () => {
      const state = Immutable.Map({})

      const result = user(state, {
        type: actionTypes.USER_RATE_COUNT,
        rateCount: 2,
      })
      const expected = Immutable.Map({ rateCount: 2 })

      expect(Immutable.is(result, expected)).toBe(true)
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
        deliverySlotStart: '10:01:01',
        deliverySlotEnd: '12:02:02',
      })
      const expected = {
        newOrders: {
          749: {
            coreDeliveryDayId: 8,
            deliverySlotId: 9,
            deliveryDay: { id: 7 },
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
      const initialState = defaultInitialState.merge(
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

      const expected = defaultInitialState.merge(
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
      const initialState = defaultInitialState

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

  describe('DELIVERY_ADDRESS_MODAL_VISIBILITY_CHANGE', () => {
    test('should toggle the visibility keeping track of which order the modal is for', () => {
      const initialState = defaultInitialState

      const visibility = true
      const orderId = 567
      const result = user(initialState, {
        type: actionTypes.DELIVERY_ADDRESS_MODAL_VISIBILITY_CHANGE,
        visibility,
        orderId,
      })

      const expectedState = Immutable.Map()
        .setIn(['deliveryAddressModal', 'visibility'], true)
        .setIn(['deliveryAddressModal', 'orderId'], 567)
      expect(
        Immutable.is(
          result.get('deliveryAddressModal'),
          expectedState.get('deliveryAddressModal'),
        ),
      ).toBe(true)
    })
  })

  describe('USER_POST_NEW_ADDRESS', () => {
    test('adds new address into the store state and updates the pending form data to pre-select the new address', () => {
      const initialState = defaultInitialState
      const data = {
        company_name: 'companyName',
        county: 'county',
        name: 'name',
        postcode: 'Postcode',
        state: 'state',
        town: 'town',
        deleted: 'deleted',
        customer_id: 'customerId',
        delivery_instructions: 'instructions',
        type: 'type',
        id: 21,
        line1: 'line1',
        line2: 'line2',
        line3: 'line3',
      }

      const immutableData = Immutable.fromJS({
        companyName: 'companyName',
        county: 'county',
        name: 'name',
        postcode: 'Postcode',
        state: 'state',
        town: 'town',
        deleted: 'deleted',
        customerId: 'customerId',
        deliveryInstructions: 'instructions',
        type: 'type',
        id: 21,
        line1: 'line1',
        line2: 'line2',
        line3: 'line3',
      })
      const orderId = 7
      const result = user(initialState, {
        type: actionTypes.USER_POST_NEW_ADDRESS,
        data,
        orderId,
      })

      const expectedState = Immutable.Map()
        .setIn(['addresses', 21], immutableData)
        .setIn(['accountPendingFormData', 7, 'shippingAddressId'], 21)

      expect(
        Immutable.is(result.get('addresses'), expectedState.get('addresses')),
      ).toBe(true)
      expect(
        Immutable.is(
          result.get('accountPendingFormData'),
          expectedState.get('accountPendingFormData'),
        ),
      ).toBe(true)
    })
  })

  describe('SELECTED_ADDRESS_IN_NEW_ADDRESS_MODAL', () => {
    test('updates the pending form data', () => {
      const initialState = defaultInitialState

      const shippingAddressesId = 277
      const orderId = 567
      const result = user(initialState, {
        type: actionTypes.SELECTED_ADDRESS_IN_NEW_ADDRESS_MODAL,
        orderId,
        shippingAddressesId,
      })

      const expectedState = Immutable.Map().setIn(
        ['accountPendingFormData', 567, 'shippingAddressId'],
        277,
      )
      expect(
        Immutable.is(
          result.get('accountPendingFormData'),
          expectedState.get('accountPendingFormData'),
        ),
      ).toBe(true)
    })
  })

  describe('CANCELLED_ALL_BOXES_MODAL_VISIBILITY_CHANGE', () => {
    test('should toggle the visibility of the modal and store the pending orders dates which need to be shown on it', () => {
      const initialState = defaultInitialState

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
      const initialState = defaultInitialState
      const result = user(initialState, {
        type: actionTypes.UNSUBSCRIBED_USER,
      })
      expect(result.get('unsubscribedFromEmail')).toBe(true)
    })
  })

  describe('MYDELIVERIES_ORDERS', () => {
    test('adds newOrders to user state', () => {
      const initialState = defaultInitialState
      const expectedState = Immutable.Map()

      const result = user(initialState, {
        type: actionTypes.MYDELIVERIES_ORDERS,
        orders: Immutable.Map()
      })
      expect(Immutable.is(result.get('newOrders'), expectedState)).toBe(true)
    })
  })
})
