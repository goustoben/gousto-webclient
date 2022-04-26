import { actionTypes } from 'actions/actionTypes'
import Immutable from 'immutable'
import { promosReducers } from 'reducers/promos'

describe('promos reducer', () => {
  describe('promoCurrent', () => {
    test('should handle initial state', () => {
      const initialState = ''
      expect(promosReducers.promoCurrent(undefined, {})).toEqual(initialState)
    })

    test('should handle unknown actions', () => {
      const state = 'promo-code'
      const result = promosReducers.promoCurrent(state, { type: 'unknown' })

      expect(result).toEqual(state)
    })

    test('should handle PROMO_SET action types', () => {
      const state = ''
      const result = promosReducers.promoCurrent(state, {
        type: actionTypes.PROMO_SET,
        code: 'promo-code',
      })

      expect(result).toEqual('promo-code')
    })
  })

  describe('promoStore', () => {
    test('should handle initial state', () => {
      const initialState = Immutable.Map({})
      expect(
        Immutable.is(promosReducers.promoStore(undefined, {}), initialState),
      ).toEqual(true)
    })

    test('should handle unknown actions', () => {
      const state = Immutable.Map({ code: 'promo-code' })
      const result = promosReducers.promoStore(state, { type: 'unknown' })

      expect(Immutable.is(result, state)).toEqual(true)
    })

    test('should handle PROMO_RECEIVE action types', () => {
      const state = Immutable.Map()
      const result = promosReducers.promoStore(state, {
        type: actionTypes.PROMO_RECEIVE,
        promo: { code: 'promo-code', campaign: 'campaign-1' },
      })

      expect(
        Immutable.is(
          result,
          Immutable.fromJS({
            'promo-code': { code: 'promo-code', campaign: 'campaign-1' },
          }),
        ),
      ).toEqual(true)
    })

    test('should handle PROMO_STORE_SAVE_ERROR', () => {
      const state = Immutable.Map()
      const result = promosReducers.promoStore(state, {
        type: actionTypes.PROMO_STORE_SAVE_ERROR,
        code: 'ZZZ',
        errorText: 'not-exist'
      })

      expect(
        Immutable.is(
          result,
          Immutable.fromJS({
            ZZZ: { errorText: 'not-exist'},
          }),
        ),
      ).toEqual(true)
    })
  })

  describe('promoAgeVerified', () => {
    test('should handle initial state', () => {
      const initialState = false
      expect(promosReducers.promoAgeVerified(undefined, {})).toEqual(initialState)
    })

    test('should handle unknown actions', () => {
      const state = true
      const result = promosReducers.promoAgeVerified(state, { type: 'unknown' })

      expect(result).toEqual(state)
    })

    test('should handle PROMO_AGE_VERIFY action types', () => {
      const state = ''
      const result = promosReducers.promoAgeVerified(state, {
        type: actionTypes.PROMO_AGE_VERIFY,
        ageVerified: true,
      })

      expect(result).toEqual(true)
    })
  })

  describe('promoModalVisible', () => {
    test('should handle initial state', () => {
      const initialState = false
      expect(promosReducers.promoModalVisible(undefined, {})).toEqual(initialState)
    })

    test('should handle unknown actions', () => {
      const state = true
      const result = promosReducers.promoModalVisible(state, { type: 'unknown' })

      expect(result).toEqual(state)
    })

    test('should handle PROMO_MODAL_VISIBILITY_CHANGE action types', () => {
      const state = ''
      const result = promosReducers.promoModalVisible(state, {
        type: actionTypes.PROMO_MODAL_VISIBILITY_CHANGE,
        visible: true,
      })

      expect(result).toEqual(true)
    })
  })
})
