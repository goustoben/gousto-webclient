import sinon from 'sinon'

import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */
import temp from 'reducers/temp'

describe('temp reducer', () => {
  test('should handle initial state', () => {
    const state = undefined
    const action = {}
    const expected = Immutable.Map({})
    const result = temp.temp(state, action)
    expect(Immutable.is(expected, result)).toEqual(true)
  })

  test('should handle unknown actions', () => {
    const state = undefined
    const action = { type: 'unknown' }
    const expected = Immutable.Map({})
    const result = temp.temp(state, action)
    expect(Immutable.is(expected, result)).toEqual(true)
  })

  test('should handle TEMP action types', () => {
    const state = undefined
    const action = {
      type: actionTypes.TEMP,
      key: 'something',
      value: 'something else',
    }
    const expected = Immutable.Map({
      something: 'something else',
    })
    const result = temp.temp(state, action)
    expect(Immutable.is(expected, result)).toEqual(true)
  })

  test('should handle add to the state action types', () => {
    const state = Immutable.Map({
      something: 'something else',
    })
    const action = {
      type: actionTypes.TEMP,
      key: 'somethingMore',
      value: 'something more else',
    }
    const expected = Immutable.Map({
      something: 'something else',
      somethingMore: 'something more else',
    })
    const result = temp.temp(state, action)
    expect(Immutable.is(expected, result)).toEqual(true)
  })
})
