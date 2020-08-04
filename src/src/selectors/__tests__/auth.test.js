import Immutable from 'immutable'
import { getIsRecaptchaEnabled, getAuthUserId } from '../auth'

describe('auth selectors', () => {
  let state

  beforeEach(() => {
    state = {
      auth: Immutable.fromJS({
        isRecaptchaEnabled: false
      })
    }
  })

  describe('given getIsRecaptchaEnabled is called', () => {
    describe('when isRecaptchaEnabled is true', () => {
      beforeEach(() => {
        state.auth = state.auth.set('isRecaptchaEnabled', true)
      })

      it('then the result should be true', () => {
        const result = getIsRecaptchaEnabled(state)

        expect(result).toEqual(true)
      })
    })

    describe('when isRecaptchaEnabled is false', () => {
      beforeEach(() => {
        state.auth = state.auth.set('isRecaptchaEnabled', false)
      })

      it('then the result should be false', () => {
        const result = getIsRecaptchaEnabled(state)

        expect(result).toEqual(false)
      })
    })
  })

  describe('getAuthUserId', () => {
    beforeEach(() => {
      state = {
        auth: Immutable.fromJS({
          id: ''
        })
      }
    })
    describe('when auth id is empty', () => {
      test('should return empty string', () => {
        expect(getAuthUserId(state)).toEqual('')
      })
    })

    describe('when auth id has value', () => {
      beforeEach(() => {
        state = {
          auth: Immutable.fromJS({
            id: 'auth-123-user-id'
          })
        }
      })
      test('should return valeu', () => {
        expect(getAuthUserId(state)).toEqual('auth-123-user-id')
      })
    })
  })
})
