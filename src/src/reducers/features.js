import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable'

const defaultFeatures = () => ({
  /*
  * TODO: remove default features
  * once something becomes default behavior, we should update the code rather than continue to drive it by feature flags
  */
  collections: {
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
  queueIt: {
    experiment: false,
    value: false,
  },
  nextDayDeliveryPaintedDoor: {
    experiment: true,
    value: false
  },
  disabledSlots: {
    experiment: false,
    value: '',
  },
  goToMyGousto: {
    experiment: false,
    value: false,
  },
  goToMyDeliveries: {
    experiment: false,
    value: false,
  },
  rafAboveCarouselOnWelcomePage: {
    experiment: false,
    value: false,
  },
  appBanner: {
    experiment: false,
    value: false,
  },
  ndd: {
    experiment: false,
    value: false,
  },
  sortMarketProducts: {
    experiment: false,
    value: false,
  },
  showCookingInstruction: {
    experiment: false,
    value: false,
  },
  menuService: {
    experiment: false,
    value: false,
  },
  addOnsBeforeOrderConfirmation: {
    experiment: false,
    value: false,
  },
  showUserCredit: {
    experiment: false,
    value: false,
  }
})

const initialState = () => Immutable.fromJS(defaultFeatures())

const featureToggles = {
  features: (state = initialState(), action) => {
    switch (action.type) {
    case actionTypes.FEATURES_SET:{
      let interimState = state
      action.features.forEach(f => {
        interimState = interimState.set(f.feature, Immutable.fromJS({
          value: f.value,
          experiment: f.experiment || false,
        }))
      })

      return interimState
    }
    default:
      return state
    }
  },
}

export { defaultFeatures, initialState }
export default featureToggles
