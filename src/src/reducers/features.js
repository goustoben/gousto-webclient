import { actionTypes } from 'actions/actionTypes'
import Immutable from 'immutable'

const defaultFeatures = () => ({
  /*
  * TODO: remove default features
  * once something becomes default behavior, we should update the code rather than continue to drive it by feature flags
  */
  collections: {
    value: true,
  },
  landingOrder: {
    value: true,
  },
  featureRecommendedRecipe: {
    value: true,
  },
  queueIt: {
    value: false,
  },
  nextDayDeliveryPaintedDoor: {
    value: false
  },
  disabledSlots: {
    value: '',
  },
  goToMyGousto: {
    value: false,
  },
  goToMyDeliveries: {
    value: false,
  },
  rafAboveCarouselOnWelcomePage: {
    value: false,
  },
  appBanner: {
    value: false,
  },
  ndd: {
    value: false,
  },
  sortMarketProducts: {
    value: false,
  },
  addOnsBeforeOrderConfirmation: {
    value: false,
  },
  showUserCredit: {
    value: false,
  },
  userMenuVariant: {
    value: '',
  },
  enableTVPromoAds: {
    value: false,
  },
  blockedResubscription: {
    value: false,
  },
  blockedTransactionalOrders: {
    value: false,
  },
  limitedCapacity: {
    value: false,
  },
  isHelpCentreActive: {
    value: false,
  }
})

const initialState = () => Immutable.fromJS(defaultFeatures())

const featureToggles = {
  features: (state = initialState(), action) => {
    switch (action.type) {
    case actionTypes.FEATURES_SET: {
      let interimState = state
      action.features.forEach(f => {
        interimState = interimState.set(f.feature, Immutable.fromJS({
          value: f.value,
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
