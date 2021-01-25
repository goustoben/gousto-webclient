import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import config from 'config/boxprices'

const defaultState = Immutable.Map({
  pricePerServing: config.pricePerServing,
})

export const boxPrices = {
  boxPrices: (state = defaultState, action) => {
    switch (action.type) {
    case actionTypes.BOXPRICE_SET_PRICE_PER_SERVING:
      return state
        .set('pricePerServing', action.price)
    default:
      return state
    }
  },
}
