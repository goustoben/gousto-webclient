import Immutable from 'immutable' /* eslint-disable new-cap */
import actionTypes from 'actions/actionTypes'

const defaultState = Immutable.Map({
  pending: false,
  prices: Immutable.Map({}),
  error: Immutable.Map({}),
})

const pricing = {
  pricing: (state = defaultState, action) => {
    switch (action.type) {
    case actionTypes.PRICING_PENDING:
      return state
        .set('pending', true)
    case actionTypes.PRICING_SUCCESS:
      return state
        .set('pending', false)
        .set('prices', Immutable.fromJS(action.prices))
        .set('error', Immutable.Map({}))
    case actionTypes.PRICING_FAILURE:
      return state
        .set('pending', false)
        .set('error', Immutable.Map({ message: action.message }))
    case actionTypes.PRICING_RESET:
      return state.set('prices', Immutable.Map({}))
    default:
      return state
    }
  },
}

export default pricing
