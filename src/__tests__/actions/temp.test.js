import sinon from 'sinon'

import temp from 'actions/temp'
import actionTypes from 'actions/actionTypes'

describe('temp action', () => {
  test('should return a TEMP action', () => {
    expect(temp.temp('a', 'b').type).toEqual(actionTypes.TEMP)
  })
  test('should return a PENDING action with the arguments mapped through to the `key` and `value`', () => {
    const result = temp.temp('a', 'b')
    expect(result.type).toEqual(actionTypes.TEMP)
    expect(result.key).toEqual('a')
    expect(result.value).toEqual('b')
  })
})
