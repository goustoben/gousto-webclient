import sinon from 'sinon'
import Immutable from 'immutable'

import actionTypes from 'actions/actionTypes'
import reducer from 'reducers/request'

describe('request reducer', () => {
  test('should handle initial state', () => {
    expect(reducer.request(undefined, {})).toEqual(
      Immutable.Map({ browser: 'desktop' }),
    )
  })

  test('should handle unknown actions', () => {
    const state = Immutable.Map({ browser: 'mobile' })
    const result = reducer.request(state, { type: 'unknown' })

    expect(result).toBe(state)
  })

  test('should handle BROWSER_TYPE_CHANGE action types', () => {
    const state = Immutable.Map({ browser: 'mobile' })
    const result = reducer.request(state, {
      type: actionTypes.BROWSER_TYPE_CHANGE,
      browserType: 'tablet',
    })

    expect(result.get('browser')).toBe('tablet')
  })

  test('should set user agent within the action BROWSER_SET_USER_AGENT', () => {
    const state = Immutable.Map({})
    const userAgent = 'Mozilla Facebook'
    const result = reducer.request(state, {
      type: actionTypes.BROWSER_SET_USER_AGENT,
      userAgent: userAgent,
    })

    expect(result.get('userAgent')).toBe(userAgent)
  })
})
