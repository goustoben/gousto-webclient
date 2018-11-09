import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */

export const subscriptionInitialState = Immutable.fromJS({
  subscription: {},
  box: {},
  projected: [],
})

const subscription = {
  subscription: (state, action) => {
    if (!state) {
      return subscriptionInitialState
    }

    switch (action.type) {

    case actionTypes.SUBSCRIPTION_LOAD_DATA: {
      const subscriptionData = action.data
      let newState = state.set('subscription', Immutable.Map(subscriptionData.subscription))
      newState = newState.set('box', Immutable.Map(subscriptionData.box))
      newState = newState.set('projected', Immutable.List(subscriptionData.projected))

      return newState
    }
    default:
      return state
    }
  },
}

export default subscription
