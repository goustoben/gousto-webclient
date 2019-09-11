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
  forceSignupWizard: {
    experiment: false,
    value: false,
  },
  goToMyGousto: {
    experiment: false,
    value: false,
  },
  goToMyDeliveries: {
    experiment: false,
    value: false,
  },
  jfyTutorial: {
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
  collapsedRaf: {
    experiment: false,
    value: false,
  },
  ssrValidationV2: {
    experiment: false,
    value: false,
  },
  shortlist: {
    experiment: false,
    value: false,
  },
  ndd: {
    experiment: false,
    value: false,
  },
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

export { defaultFeatures }
export default featureToggles
