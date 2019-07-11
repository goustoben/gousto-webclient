import Immutable from 'immutable'

import actionTypes from 'actions/actionTypes'

import onScreenRecovery from 'reducers/onScreenRecovery'

describe('onScreenRecovery reducer', () => {
  let state
  const initialState = Immutable.Map({
    triggered: false,
    modalVisibility: false,
    orderId: '',
    deliveryDayId: '',
    boxNumber: '',
    orderType: '',
    modalType: '',
    orderDate: '',
    title: '',
    offer: null,
    valueProposition: null,
    callToActions: null,
  })
  describe('test initialState onScreenRecovery', () => {
    state = undefined
    test('onScreenRecovery initialState', () => {
      expect(Immutable.is(initialState, onScreenRecovery.onScreenRecovery(state, null))).toBe(true)
    })
  })

  describe('onScreenRecovery dispatch ORDER_SKIP_RECOVERY_TRIGGERED', () => {
    state = undefined
    test('onScreenRecovery dispatch trigger with orderId', () => {
      const expected = {
        triggered: true,
        modalVisibility: false,
        orderId: '1234',
        orderType: 'pending',
      }
      const actionToCall = {
        type: actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED,
        triggered: true,
        orderId: '1234',
        orderType: 'pending',
      }

      const result = onScreenRecovery.onScreenRecovery(initialState, actionToCall)
      expect(result.toJS()).toEqual(expect.objectContaining(expected))
    })

    test('onScreenRecovery dispatch trigger with deliveryDayId', () => {
      const expected = {
        triggered: true,
        modalVisibility: false,
        deliveryDayId: '1234',
        orderType: 'projected',
      }
      const actionToCall = {
        type: actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED,
        triggered: true,
        deliveryDayId: '1234',
        orderType: 'projected',
      }

      const result = onScreenRecovery.onScreenRecovery(initialState, actionToCall)
      expect(result.toJS()).toEqual(expect.objectContaining(expected))
    })

    test('onScreenRecovery dispatch trigger with orderDate', () => {
      const expected = {
        triggered: true,
        modalVisibility: false,
        deliveryDayId: '1234',
        orderType: 'projected',
        orderDate: '2018-09-18 00:00:00',
      }
      const actionToCall = {
        type: actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED,
        triggered: true,
        deliveryDayId: '1234',
        orderType: 'projected',
        orderDate: '2018-09-18 00:00:00',
      }

      const result = onScreenRecovery.onScreenRecovery(initialState, actionToCall)
      expect(result.toJS()).toEqual(expect.objectContaining(expected))
    })

    test('onScreenRecovery dispatch trigger with modalType', () => {
      const expected = {
        triggered: true,
        modalType: 'order',
      }
      const actionToCall = {
        type: actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED,
        triggered: true,
        modalType: 'order',
      }

      const result = onScreenRecovery.onScreenRecovery(initialState, actionToCall)
      expect(result.toJS()).toEqual(expect.objectContaining(expected))
    })
  })

  describe('onScreenRecovery dispatch ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE', () => {
    state = undefined
    test('onScreenRecovery dispatch trigger with modalVisibility false', () => {
      const expected = {
        triggered: false,
        modalVisibility: false,
      }
      const actionToCall = {
        type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
        modalVisibility: false,
      }

      const result = onScreenRecovery.onScreenRecovery(initialState, actionToCall)
      expect(result.toJS()).toEqual(expect.objectContaining(expected))
    })

    test('onScreenRecovery dispatch trigger with modalVisibility true and orderId', () => {
      const expected = {
        triggered: false,
        modalVisibility: true,
        orderId: '123',
        orderType: 'pending',
        title: 'Title',
      }
      const actionToCall = {
        type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
        modalVisibility: true,
        orderId: '123',
        title: 'Title',
        orderType: 'pending'
      }

      const result = onScreenRecovery.onScreenRecovery(initialState, actionToCall)
      expect(result.toJS()).toEqual(expect.objectContaining(expected))
    })

    test('onScreenRecovery dispatch trigger with modalVisibility true and deliveryDayId', () => {
      const expected = {
        triggered: false,
        modalVisibility: true,
        deliveryDayId: '123',
        orderType: 'projected',
        title: 'Title',
      }
      const actionToCall = {
        type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
        modalVisibility: true,
        deliveryDayId: '123',
        title: 'Title',
        orderType: 'projected'
      }

      const result = onScreenRecovery.onScreenRecovery(initialState, actionToCall)
      expect(result.toJS()).toEqual(expect.objectContaining(expected))
    })

    test('onScreenRecovery dispatch trigger with modalVisibility true and value proposition', () => {
      const expected = {
        triggered: false,
        modalVisibility: true,
        deliveryDayId: '123',
        orderType: 'projected',
        title: 'Title',
        valueProposition: 'Value prop',
      }
      const actionToCall = {
        type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
        modalVisibility: true,
        deliveryDayId: '123',
        title: 'Title',
        valueProposition: 'Value prop',
        orderType: 'projected'
      }

      const result = onScreenRecovery.onScreenRecovery(initialState, actionToCall)
      expect(result.toJS()).toEqual(expect.objectContaining(expected))
    })

    test('onScreenRecovery dispatch trigger with modalVisibility true and callToActions', () => {
      const expected = {
        triggered: false,
        modalVisibility: true,
        deliveryDayId: '123',
        orderType: 'projected',
        title: 'Title',
        callToActions: 'Call to action',
      }
      const actionToCall = {
        type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
        modalVisibility: true,
        deliveryDayId: '123',
        title: 'Title',
        callToActions: 'Call to action',
        orderType: 'projected'
      }

      const result = onScreenRecovery.onScreenRecovery(initialState, actionToCall)
      expect(result.toJS()).toEqual(expect.objectContaining(expected))
    })

    test('should dispatch trigger with modalVisibility true and offer', () => {
      const offer = {
        basis: 'percentage_discount',
        details: {
          message: 'You only have 10% on all your orders until the 19th of October',
          formattedValue: '10%',
          rawMessage: {
            text: 'You only have {:value:} on all your orders until the {:date:}',
            values: [
              { key: 'date', value: '19th of October' },
              { key: 'value', value: '£13' }
            ]
          }
        }
      }
      const expected = {
        triggered: false,
        modalVisibility: true,
        deliveryDayId: '123',
        orderType: 'projected',
        title: 'Title',
        offer: offer.details,
        callToActions: 'Call to action',
      }
      const actionToCall = {
        type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
        modalVisibility: true,
        deliveryDayId: '123',
        title: 'Title',
        offer,
        callToActions: 'Call to action',
        orderType: 'projected',
      }

      const result = onScreenRecovery.onScreenRecovery(initialState, actionToCall)
      expect(result.toJS()).toEqual(expect.objectContaining(expected))
    })

    test('should not update offer in state when offer.details is undefined', () => {
      const offer = {
        basis: 'percentage_discount',
        details: undefined
      }
      const expected = {
        triggered: false,
        modalVisibility: true,
        deliveryDayId: '123',
        orderType: 'projected',
        title: 'Title',
        callToActions: 'Call to action',
      }
      const actionToCall = {
        type: actionTypes.ORDER_SKIP_RECOVERY_MODAL_VISIBILITY_CHANGE,
        modalVisibility: true,
        deliveryDayId: '123',
        title: 'Title',
        offer,
        callToActions: 'Call to action',
        orderType: 'projected',
      }

      const result = onScreenRecovery.onScreenRecovery(initialState, actionToCall)
      expect(result.toJS()).toEqual(expect.objectContaining(expected))
    })
  })

  describe('onScreenRecovery dispatch ORDER_SKIP_RECOVERY_BOX_NUMBER_CHANGE', () => {
    test('onScreenRecovery dispatch trigger with orderDate', () => {
      const expected = {
        triggered: false,
        modalVisibility: false,
        boxNumber: '5',
      }
      const actionToCall = {
        type: actionTypes.ORDER_SKIP_RECOVERY_BOX_NUMBER_CHANGE,
        boxNumber: '5',
      }

      const result = onScreenRecovery.onScreenRecovery(initialState, actionToCall)
      expect(result.toJS()).toEqual(expect.objectContaining(expected))
    })
  })
})
