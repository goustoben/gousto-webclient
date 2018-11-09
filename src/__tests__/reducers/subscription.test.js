import sinon from 'sinon'

import Immutable from 'immutable' /* eslint-disable new-cap */
import subReducer from 'reducers/subscription'

describe('USER_IDENTIFIED action type', () => {
  test('should put the user details into the state', () => {
    const state = Immutable.fromJS({
      subscription: {},
      box: {},
      projected: [],
    })
    const action = {
      type: 'SUBSCRIPTION_LOAD_DATA',
      data: {
        subscription: {
          state: 'inactive',
          reason: null,
          updated_at: '2017-10-27 12:37:58',
          payment_failed_at: null,
          delivery_slot_id: '1',
          next_delivery_week_id: '113',
          interval: '1',
          pause_date: null,
        },
        box: {
          num_portions: '2',
          num_recipes: '3',
          box_type: 'gourmet',
          price: '34.99',
          sku: 'SKU-GMT-3-2',
        },
        projected: [],
      },
    }
    const result = subReducer.subscription(state, action)
    const expected = Immutable.fromJS({
      subscription: {
        state: 'inactive',
        reason: null,
        updated_at: '2017-10-27 12:37:58',
        payment_failed_at: null,
        delivery_slot_id: '1',
        next_delivery_week_id: '113',
        interval: '1',
        pause_date: null,
      },
      box: {
        num_portions: '2',
        num_recipes: '3',
        box_type: 'gourmet',
        price: '34.99',
        sku: 'SKU-GMT-3-2',
      },
      projected: [],
    })
    expect(JSON.stringify(expected)).toEqual(JSON.stringify(result))
  })
})
