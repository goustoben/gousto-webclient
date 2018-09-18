import Immutable from 'immutable'

import actionTypes from 'actions/actionTypes'

import orderSkipRecovery from 'reducers/orderSkipRecovery'

describe('orderSkipRecovery reducer', () => {
  let state
  describe('test initialState orderSkipRecovery', () => {
    const initialState = Immutable.Map({
      triggered: false,
      modalVisibility: false,
      orderId: '',
      dayId: '',
      boxNumber: '',
      orderType: '',
      orderDate: '',
      title: '',
      valueProposition: null,
      callToActions: null,
    })

    test('orderSkipRecovery initialState', () => {
      expect(Immutable.is(initialState, orderSkipRecovery.orderSkipRecovery(undefined, null))).toBe(true)
    })
  })
})
