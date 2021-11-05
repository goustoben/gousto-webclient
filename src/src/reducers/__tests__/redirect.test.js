import { actionTypes } from 'actions/actionTypes'
import { redirectReducers } from 'reducers/redirect'

describe('redirect reducer', () => {
  describe('redirect', () => {
    test('should handle initial state', () => {
      expect(redirectReducers.redirect(undefined, {})).toEqual('')
    })

    test('should handle unknown actions', () => {
      const state = 'url'
      const result = redirectReducers.redirect(state, { type: 'unknown' })

      expect(result).toEqual(state)
    })

    test('should handle SERVER_REDIRECT action types', () => {
      const result = redirectReducers.redirect('', {
        type: actionTypes.SERVER_REDIRECT,
        url: '/redirect-to',
      })
      expect(result).toEqual('/redirect-to')
    })
  })

  describe('clearCookies', () => {
    test('should handle initial state', () => {
      expect(redirectReducers.clearCookies(undefined, {})).toEqual(false)
    })

    test('should handle unknown actions', () => {
      const state = false
      const result = redirectReducers.clearCookies(state, { type: 'unknown' })

      expect(result).toEqual(state)
    })

    test('should handle SERVER_REDIRECT action types', () => {
      const result = redirectReducers.clearCookies('', {
        type: actionTypes.SERVER_REDIRECT,
        clearCookies: true,
      })
      expect(result).toEqual(true)
    })
  })
})
