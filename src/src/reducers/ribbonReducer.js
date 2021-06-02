import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'

export const initialState = () =>
  Immutable.fromJS({
    isRibbonTriggered: false,
  })

export const ribbonReducer = {
  ribbon: (state = initialState(), action) => {
    switch (action.type) {
    case actionTypes.SET_RIBBON_TRIGGERED: {
      return state.set('isRibbonTriggered', true)
    }
    default:
      return state
    }
  },
}
