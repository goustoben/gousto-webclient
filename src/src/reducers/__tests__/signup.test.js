import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import { signup } from '../signup'

describe('signup reducer', () => {
  describe('given SIGNUP_DISMISS_DISCOUNT_APPLIED_BAR is dispatched', () => {
    const action = {
      type: actionTypes.SIGNUP_DISMISS_DISCOUNT_APPLIED_BAR,
    }
    let initialState

    beforeEach(() => {
      initialState = Immutable.fromJS({})
    })

    test('should remember the fact of dismissal', () => {
      const result = signup.signup(initialState, action)

      expect(result.get('isDiscountAppliedBarDismissed')).toBe(true)
    })
  })

  describe('given SHOWCASE_MENU_SEEN is dispatched', () => {
    const action = {
      type: actionTypes.SHOWCASE_MENU_SEEN,
    }
    let initialState

    beforeEach(() => {
      initialState = Immutable.fromJS({})
    })

    test('should remember the fact of dismissal', () => {
      const result = signup.signup(initialState, action)

      expect(result.get('showcaseMenuSeen')).toBe(true)
    })
  })
})
