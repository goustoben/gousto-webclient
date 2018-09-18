import Immutable from 'immutable'

import actionTypes from 'actions/actionTypes'

import orderSkipRecovery from 'reducers/orderSkipRecovery'

describe('orderSkipRecovery reducer', () => {
  let state
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
  describe('test initialState orderSkipRecovery', () => {
    state = undefined
    test('orderSkipRecovery initialState', () => {
      expect(Immutable.is(initialState, orderSkipRecovery.orderSkipRecovery(state, null))).toBe(true)
    })
  })

  describe('orderSkipRecovery dispatch ORDER_SKIP_RECOVERY_TRIGGERED', () => {
    state = undefined
    test('orderSkipRecovery dispatch trigger with orderId', () => {
      const expected = Immutable.Map({
        triggered: true,
        modalVisibility: false,
        orderId: '1234',
        dayId: '',
        boxNumber: '',
        orderType: 'pending',
        orderDate: '',
        title: '',
        valueProposition: null,
        callToActions: null,
      })
      const actionToCall = {
        type: actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED,
        triggered: true,
        orderId: '1234',
        orderType: 'pending',
      }

      const result = orderSkipRecovery.orderSkipRecovery(initialState, actionToCall)
			expect(result).toEqual(expected)
    })

    test('orderSkipRecovery dispatch trigger with dayId', () => {
      const expected = Immutable.Map({
        triggered: true,
        modalVisibility: false,
        orderId: '',
        dayId: '1234',
        boxNumber: '',
        orderType: 'projected',
        orderDate: '',
        title: '',
        valueProposition: null,
        callToActions: null,
      })
      const actionToCall = {
        type: actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED,
        triggered: true,
        dayId: '1234',
        orderType: 'projected',
      }

      const result = orderSkipRecovery.orderSkipRecovery(initialState, actionToCall)
			expect(result).toEqual(expected)
    })

    test('orderSkipRecovery dispatch trigger with orderDate', () => {
      const expected = Immutable.Map({
        triggered: true,
        modalVisibility: false,
        orderId: '',
        dayId: '1234',
        boxNumber: '',
        orderType: 'projected',
        orderDate: '2018-09-18 00:00:00',
        title: '',
        valueProposition: null,
        callToActions: null,
      })
      const actionToCall = {
        type: actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED,
        triggered: true,
        dayId: '1234',
        orderType: 'projected',
        orderDate: '2018-09-18 00:00:00',
      }

      const result = orderSkipRecovery.orderSkipRecovery(initialState, actionToCall)
			expect(result).toEqual(expected)
    })
  })
})
