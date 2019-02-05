import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */

const defaultFeatures = () => ({
  /*
	* TODO: remove default features
	* once something becomes default behavior, we should update the code rather than continue to drive it by feature flags
	*/
  collections: {
    experiment: false,
    value: true,
  },
  checkoutPayment: {
    experiment: false,
    value: true,
  },
  landingOrder: {
    experiment: false,
    value: true,
  },
  recommendedBadge: {
    experiment: false,
    value: false,
  },
  featureRecommendedRecipe: {
    experiment: false,
    value: true,
  },
  filterMenu: {
    experiment: false,
    value: false,
  },
  skipRecovery: {
    experiment: false,
    value: true,
  },
  queueIt: {
    experiment: false,
    value: false,
  },
  nextDayDeliveryPaintedDoor: {
    experiment: true,
    value: false
  },
  unavailableSlots: {
    experiment: false,
    value: '',
  }
})

const featureToggles = {
  features: (state = Immutable.fromJS(defaultFeatures()), action) => {
    switch (action.type) {
    case actionTypes.FEATURE_SET:
      return state.set(action.feature, Immutable.fromJS({
        value: action.value,
        experiment: action.experiment || false,
      }))
    default:
      return state
    }
  },
}

export default featureToggles
