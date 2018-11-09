import sinon from 'sinon'

import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */
import accountReducer from 'reducers/account'

describe('account reducer', () => {
  test('should handle initial state', () => {
    const initialState = Immutable.fromJS({
      orderId: null,
      visibility: false,
    })
    expect(
      Immutable.is(
        accountReducer.orderCancelledModalVisibility(undefined, {}),
        initialState,
      ),
    ).toEqual(true)
  })

  describe('ORDER_CANCELLED_MODAL_VISIBILITY_CHANGE', () => {
    test('should load the data into state', () => {
      const result = accountReducer.orderCancelledModalVisibility(
        Immutable.Map({}),
        {
          type: actionTypes.ORDER_CANCELLED_MODAL_VISIBILITY_CHANGE,
          data: { orderId: 4, visibility: true },
        },
      )
      const expectedState = Immutable.Map()
        .set('orderId', 4)
        .set('visibility', true)
      expect(Immutable.is(result, expectedState)).toEqual(true)
    })
  })
})
