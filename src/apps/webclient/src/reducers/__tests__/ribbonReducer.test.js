import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import { ribbonReducer } from '../ribbonReducer'

describe('ribbonReducer', () => {
  let initialState
  beforeEach(() => {
    initialState = Immutable.fromJS({
      isRibbonTriggered: false,
    })
  })

  describe('given SET_RIBBON_TRIGGERED is dispatched', () => {
    const action = {
      type: actionTypes.SET_RIBBON_TRIGGERED,
    }

    test('then it should set the flag to true', () => {
      const result = ribbonReducer.ribbon(initialState, action)

      expect(result.get('isRibbonTriggered')).toBe(true)
    })
  })

  describe('given any other action is dispatched', () => {
    const action = {
      type: actionTypes.AFFILIATE_SOURCE_SET,
    }

    test('then it should do nothing', () => {
      const result = ribbonReducer.ribbon(initialState, action)

      expect(result.get('isRibbonTriggered')).toBe(false)
    })
  })
})
