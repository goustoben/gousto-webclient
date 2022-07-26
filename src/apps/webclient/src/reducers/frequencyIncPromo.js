import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'

export const defaultState = Immutable.fromJS({
  frequencyModalIsViewed: false,
  frequencyProgress: null
})

const frequencyIncPromo = {
  frequencyIncPromo: (state = defaultState, action) => {
    switch (action.type) {
    case actionTypes.LOAD_FREQUENCY_INC_PROMO_PROGRESS: {
      return state.set('frequencyProgress', Immutable.fromJS(action.frequencyProgress))
    }

    case actionTypes.FREQUENCY_INC_PROMO_MODAL_IS_VIEWED: {
      return state
        .set('frequencyModalIsViewed', true)
    }

    default:
      return state
    }
  },
}

export default frequencyIncPromo
