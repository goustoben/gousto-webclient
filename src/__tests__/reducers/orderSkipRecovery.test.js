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

  describe('orderSkipRecovery dispatch ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE', () => {
    state = undefined
    test('orderSkipRecovery dispatch trigger with modalVisibility false', () => {
      const expected = Immutable.Map({
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
      const actionToCall = {
        type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
        modalVisibility: false,
    }

      const result = orderSkipRecovery.orderSkipRecovery(initialState, actionToCall)
			expect(result).toEqual(expected)
    })

    test('orderSkipRecovery dispatch trigger with modalVisibility true and orderId', () => {
      const expected = Immutable.Map({
        triggered: false,
        modalVisibility: true,
        orderId: '123',
        dayId: '',
        boxNumber: '',
        orderType: 'pending',
        orderDate: '',
        title: 'Title',
        valueProposition: null,
        callToActions: null,
      })
      const actionToCall = {
        type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
        modalVisibility: true,
        orderId: '123',
        title: 'Title',
        orderType: 'pending'
    }

      const result = orderSkipRecovery.orderSkipRecovery(initialState, actionToCall)
			expect(result).toEqual(expected)
    })

    test('orderSkipRecovery dispatch trigger with modalVisibility true and dayId', () => {
      const expected = Immutable.Map({
        triggered: false,
        modalVisibility: true,
        orderId: '',
        dayId: '123',
        boxNumber: '',
        orderType: 'projected',
        orderDate: '',
        title: 'Title',
        valueProposition: null,
        callToActions: null,
      })
      const actionToCall = {
        type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
        modalVisibility: true,
        dayId: '123',
        title: 'Title',
        orderType: 'projected'
    }

      const result = orderSkipRecovery.orderSkipRecovery(initialState, actionToCall)
			expect(result).toEqual(expected)
    })

    test('orderSkipRecovery dispatch trigger with modalVisibility true and value proposition', () => {
      const expected = Immutable.Map({
        triggered: false,
        modalVisibility: true,
        orderId: '',
        dayId: '123',
        boxNumber: '',
        orderType: 'projected',
        orderDate: '',
        title: 'Title',
        valueProposition: 'Value prop',
        callToActions: null,
      })
      const actionToCall = {
        type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
        modalVisibility: true,
        dayId: '123',
        title: 'Title',
        valueProposition: 'Value prop',
        orderType: 'projected'
    }

      const result = orderSkipRecovery.orderSkipRecovery(initialState, actionToCall)
			expect(result).toEqual(expected)
    })


    test('orderSkipRecovery dispatch trigger with modalVisibility true and callToActions', () => {
      const expected = Immutable.Map({
        triggered: false,
        modalVisibility: true,
        orderId: '',
        dayId: '123',
        boxNumber: '',
        orderType: 'projected',
        orderDate: '',
        title: 'Title',
        valueProposition: null,
        callToActions: 'Call to action',
      })
      const actionToCall = {
        type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
        modalVisibility: true,
        dayId: '123',
        title: 'Title',
        callToActions: 'Call to action',
        orderType: 'projected'
    }

      const result = orderSkipRecovery.orderSkipRecovery(initialState, actionToCall)
			expect(result).toEqual(expected)
    })
  })

  describe('orderSkipRecovery dispatch ORDER_SKIP_RECOVERY_BOX_NUMBER_CHANGE', () => {
    test('orderSkipRecovery dispatch trigger with orderDate', () => {
      const expected = Immutable.Map({
        triggered: false,
        modalVisibility: false,
        orderId: '',
        dayId: '',
        boxNumber: '5',
        orderType: '',
        orderDate: '',
        title: '',
        valueProposition: null,
        callToActions: null,
      })
      const actionToCall = {
        type: actionTypes.ORDER_SKIP_RECOVERY_BOX_NUMBER_CHANGE,
				boxNumber: '5',
      }

      const result = orderSkipRecovery.orderSkipRecovery(initialState, actionToCall)
			expect(result).toEqual(expected)
    })
  })
})
