import Immutable from 'immutable'
import { getBasketNotValidError } from '../status'

describe('getBasketNotValidError', () => {
  test('should return BASKET_NOT_VALID error', () => {
    const state = {
      error: Immutable.Map({
        BASKET_NOT_VALID: [{
          name: 'rule-name',
          message: 'Only one recipe',
          items: ['123']
        }]
      })
    }
    expect(getBasketNotValidError(state)).toEqual([{
      name: 'rule-name',
      message: 'Only one recipe',
      items: ['123']
    }])
  })
})
