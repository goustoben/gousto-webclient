import Immutable from 'immutable'
import { isRedirectEnabled } from '../PageContainer'

describe('isRedirectEnabled', () => {
  let output
  let state = {}

  beforeAll(() => {
    output = false
    state = {
      features: Immutable.Map({})
    }
  })

  describe('when pathname does not match signup/*, check-out/*', () => {
    beforeEach(() => {
      output = false
    })

    describe('and enableSignupReduction is falsy', () => {
      beforeEach(() => {
        state = {
          features: Immutable.fromJS({
            enableSignupReduction: {
              value: false,
            },
          }),
          routing: {
            locationBeforeTransitions: {
              pathname: 'home-page'
            }
          }
        }
      })

      test('then isRedirectEnabled should return false', () => {
        output = isRedirectEnabled(state)
        expect(output).toBeFalsy()
      })
    })

    describe('and when enableSignupReduction is truthy', () => {
      beforeEach(() => {
        state = {
          features: Immutable.fromJS({
            enableSignupReduction: {
              value: true,
            },
          }),
          routing: {
            locationBeforeTransitions: {
              pathname: 'home-page'
            }
          }
        }
      })

      test('then isRedirectEnabled should return false', () => {
        output = isRedirectEnabled(state)
        expect(output).toBeFalsy()
      })
    })
  })

  describe('when pathname does match signup/*, check-out/*', () => {
    beforeEach(() => {
      output = false
    })

    describe('and enableSignupReduction is truthy', () => {
      beforeEach(() => {
        state = {
          features: Immutable.fromJS({
            enableSignupReduction: {
              value: true,
            },
          }),
          routing: {
            locationBeforeTransitions: {
              pathname: '/signup/box-size'
            }
          }
        }
      })

      test('then isRedirectEnabled should return true', () => {
        output = isRedirectEnabled(state)
        expect(output).toBeTruthy()
      })
    })
  })
})
