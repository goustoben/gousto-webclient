import actionTypes from 'actions/actionTypes'
import { brand } from 'reducers/brand'

describe('brand reducer', () => {
  describe('BRAND_DATA_RECEIVED', () => {
    test('response is set in state', () => {
      const result = brand({}, {
        type: actionTypes.BRAND_DATA_RECEIVED,
        response: { test: 'test' },
      })

      const expectedResult = {
        test: 'test'
      }

      expect(result).toEqual(expectedResult)
    })
  })
})
