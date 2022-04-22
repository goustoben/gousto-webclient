import { actionTypes } from 'actions/actionTypes'
import Immutable from 'immutable'

export const promosReducers = {
  promoCurrent: (state = '', action) => {
    switch (action.type) {
    case actionTypes.PROMO_SET:
      return action.code
    default:
      return state
    }
  },
  promoStore: (state = Immutable.Map({}), action) => {
    switch (action.type) {
    case actionTypes.PROMO_RECEIVE:
      return state.set(action.promo.code, Immutable.fromJS(action.promo))

    case actionTypes.PROMO_STORE_SAVE_ERROR:
      return state.set(action.code, Immutable.fromJS({ errorText: action.errorText }))

    default:
      return state
    }
  },
  promoAgeVerified: (state = false, action) => {
    switch (action.type) {
    case actionTypes.PROMO_AGE_VERIFY:
      return action.ageVerified

    default:
      return state
    }
  },
  promoModalVisible: (state = false, action) => {
    switch (action.type) {
    case actionTypes.PROMO_MODAL_VISIBILITY_CHANGE:
      return !!action.visible

    default:
      return state
    }
  },
}
