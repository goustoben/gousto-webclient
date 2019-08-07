import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable'
import { abandonBasket, initialState } from 'reducers/abandonBasket'

describe('abandon basket reducer', () => {
  test('initial state', () => {
    expect(Immutable.is(abandonBasket.abandonBasket(undefined, {}), initialState)).toEqual(true)
  })

  describe('SET_FIRST_LOAD_OF_SESSION', () => {
    test('isFirstLoadOfSession set to true in the state', () => {
      const result = abandonBasket.abandonBasket(initialState, {
        type: actionTypes.SET_FIRST_LOAD_OF_SESSION,
        value: true
      })

      expect(result.get('isFirstLoadOfSession')).toEqual(true)
    })

    test('isFirstLoadOfSession set to false in the state', () => {
      const result = abandonBasket.abandonBasket(initialState, {
        type: actionTypes.SET_FIRST_LOAD_OF_SESSION,
        value: false
      })

      expect(result.get('isFirstLoadOfSession')).toEqual(false)
    })
  })
})
