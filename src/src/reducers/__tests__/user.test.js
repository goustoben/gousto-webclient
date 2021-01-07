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
  beforeEach(() => {
    mockState = defaultState
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
      const state = userReducer.user(defaultState, {
        type: actionTypes.UNSUBSCRIBED_USER
      })

      expect(state.get('unsubscribedFromEmail')).toBe(true)
    })
  })

  describe('Given USER_ORDER_CARD_OPEN_CLOSE is dispatched', () => {
    test('Then the orderCardsCollapsedStatus state is updated', () => {
      const state = userReducer.user(defaultState, {
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
      const state = userReducer.user(defaultState, {
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
