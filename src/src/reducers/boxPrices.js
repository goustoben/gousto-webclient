import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import { pricePerServing } from 'routes/BoxPrices/boxPricesConfig'

const defaultState = Immutable.Map({
  pricePerServing,
  lowestPricePerPortion: {},
})

export const boxPrices = {
  boxPrices: (state = defaultState, action) => {
    switch (action.type) {
    case actionTypes.BOXPRICE_SET_PRICE_PER_SERVING:
      return state
        .set('pricePerServing', action.price)
        .setIn(['lowestPricePerPortion'], action.lowestPricePerPortion)
    default:
      return state
    }
  },
}
