import sinon from 'sinon'

import actionTypes from 'actions/actionTypes'
import redirect from 'reducers/redirect'

describe('redirect reducer', () => {
  describe('redirect', () => {
    test('should handle initial state', () => {
      expect(redirect.redirect(undefined, {})).toEqual('')
    })

    test('should handle unknown actions', () => {
      const state = 'url'
      const result = redirect.redirect(state, { type: 'unknown' })

      expect(result).toEqual(state)
    })

    test('should handle SERVER_REDIRECT action types', () => {
      const result = redirect.redirect('', {
        type: actionTypes.SERVER_REDIRECT,
        url: '/redirect-to',
      })
      expect(result).toEqual('/redirect-to')
    })
  })

  describe('clearCookies', () => {
    test('should handle initial state', () => {
      expect(redirect.clearCookies(undefined, {})).toEqual(false)
    })

    test('should handle unknown actions', () => {
      const state = false
      const result = redirect.clearCookies(state, { type: 'unknown' })

      expect(result).toEqual(state)
    })

    test('should handle SERVER_REDIRECT action types', () => {
      const result = redirect.clearCookies('', {
        type: actionTypes.SERVER_REDIRECT,
        clearCookies: true,
      })
      expect(result).toEqual(true)
    })
  })
})
