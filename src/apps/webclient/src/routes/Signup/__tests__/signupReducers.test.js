import Immutable from 'immutable'

import { actionTypes } from 'actions/actionTypes'
import { signupReducers } from 'routes/Signup/signupReducers'

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
      const result = signupReducers.signup(initialState, action)

      expect(result.get('isDiscountAppliedBarDismissed')).toBe(true)
    })
  })

  describe('given SIGNUP_SET_SOCIAL_BELONGING_OPTIONS is dispatched', () => {
    const action = {
      type: actionTypes.SIGNUP_SET_SOCIAL_BELONGING_OPTIONS,
      count: 100,
      district: 'District',
    }
    let initialState

    beforeEach(() => {
      initialState = Immutable.fromJS({
        wizard: {
          district: null,
          amountOfCustomers: null,
        },
      })
    })

    test('then should update parameters properly', () => {
      const result = signupReducers.signup(initialState, action)

      expect(result.getIn(['wizard', 'amountOfCustomers'])).toBe(100)
      expect(result.getIn(['wizard', 'district'])).toBe('District')
    })
  })

  describe('given PAGE_CHANGED is dispatched', () => {
    const action = {
      type: actionTypes.PAGE_CHANGED,
      newLocation: '',
    }

    describe("when wizard hasn't been seen", () => {
      let initialState

      beforeEach(() => {
        initialState = Immutable.fromJS({
          isInWizardFunnel: false,
        })
      })

      test("then signup, checkout and menu routes also won't update funnel flag to true", () => {
        action.newLocation = '/signup'
        let result = signupReducers.signup(initialState, action)
        expect(result.get('isInWizardFunnel')).toBeFalsy()

        action.newLocation = '/menu'
        result = signupReducers.signup(initialState, action)
        expect(result.get('isInWizardFunnel')).toBeFalsy()

        action.newLocation = '/check-out'
        result = signupReducers.signup(initialState, action)
        expect(result.get('isInWizardFunnel')).toBeFalsy()

        action.newLocation = '/check-out/account'
        result = signupReducers.signup(initialState, action)
        expect(result.get('isInWizardFunnel')).toBeFalsy()
      })

      test("then any kind of route won't set funnel to true", () => {
        action.newLocation = '/test'
        let result = signupReducers.signup(initialState, action)
        expect(result.get('isInWizardFunnel')).toBeFalsy()

        action.newLocation = '/'
        result = signupReducers.signup(initialState, action)
        expect(result.get('isInWizardFunnel')).toBeFalsy()

        action.newLocation = '/test/test/abc'
        result = signupReducers.signup(initialState, action)
        expect(result.get('isInWizardFunnel')).toBeFalsy()
      })
    })

    describe("when wizard hasn't been seen", () => {
      let initialState

      beforeEach(() => {
        initialState = Immutable.fromJS({
          isInWizardFunnel: true,
        })
      })

      test('then signup, checkout and menu routes will persist funnel flag to be truthy', () => {
        action.newLocation = '/signup'
        let result = signupReducers.signup(initialState, action)
        expect(result.get('isInWizardFunnel')).toBeTruthy()

        action.newLocation = '/menu'
        result = signupReducers.signup(initialState, action)
        expect(result.get('isInWizardFunnel')).toBeTruthy()

        action.newLocation = '/check-out'
        result = signupReducers.signup(initialState, action)
        expect(result.get('isInWizardFunnel')).toBeTruthy()

        action.newLocation = '/check-out/account'
        result = signupReducers.signup(initialState, action)
        expect(result.get('isInWizardFunnel')).toBeTruthy()
      })

      test('then any other route will break funnel and set flag to false', () => {
        action.newLocation = '/box-prices'
        const result = signupReducers.signup(initialState, action)
        expect(result.get('isInWizardFunnel')).toBeFalsy()
      })

      test('then any other route will break funnel and set flag to false', () => {
        action.newLocation = '/'
        const result = signupReducers.signup(initialState, action)
        expect(result.get('isInWizardFunnel')).toBeFalsy()
      })

      test('then any other route will break funnel and set flag to false', () => {
        action.newLocation = '/test/test/abc'
        const result = signupReducers.signup(initialState, action)
        expect(result.get('isInWizardFunnel')).toBeFalsy()
      })
    })
  })
})
