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

    test('should update showcaseMenuSeen properly', () => {
      const result = signup.signup(initialState, action)

      expect(result.get('showcaseMenuSeen')).toBe(true)
    })
  })

  describe('given SIGNUP_SET_SOCIAL_BELONGING_OPTIONS is dispatched', () => {
    const action = {
      type: actionTypes.SIGNUP_SET_SOCIAL_BELONGING_OPTIONS,
      amountOfCustomers: 100,
      district: 'District',
    }
    let initialState

    beforeEach(() => {
      initialState = Immutable.fromJS({
        wizard: {
          district: null,
          amountOfCustomers: null,
        }
      })
    })

    test('then should update parameters properly', () => {
      const result = signup.signup(initialState, action)

      expect(result.getIn(['wizard', 'amountOfCustomers'])).toBe(100)
      expect(result.getIn(['wizard', 'district'])).toBe('District')
    })
  })
})
