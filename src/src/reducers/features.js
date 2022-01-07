import { actionTypes } from 'actions/actionTypes'
import Immutable from 'immutable'

export const defaultFeatures = () => ({
  /*
  * TODO: remove default features
  * once something becomes default behavior, we should update the code rather than continue to drive it by feature flags
  */
  collections: {
    value: true,
  },
  featureRecommendedRecipe: {
    value: true,
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
  userMenuVariant: {
    value: '',
  },
  enableTVPromoAds: {
    value: false,
  },
  isAppAwarenessEnabled: {
    value: false
  },
  isLoginModalAppAwarenessEnabled: {
    value: false
  },
  isMobileTopBannerAppAwarenessEnabled: {
    value: false
  },
  isMobileMenuModalAppAwarenessEnabled: {
    value: false
  },
  isMyGoustoBannerAppAwarenessEnabled: {
    value: false
  },
  isNewSSRDeliveriesEnabled: {
    value: false
  },
  isDecoupledPaymentEnabled: {
    value: false
  },
  isGoustoOnDemandEnabled: {
    value: false
  },
  isAutoAcceptEnabled: {
    value: false
  },
  ssrTwoComplaintsSameDay: {
    value: false
  },
  isCorporateEnquiriesLinkVisible: {
    value: true
  },
  isSsrRepetitiveIssues: {
    value: false
  },
})

export const initialState = () => Immutable.fromJS(defaultFeatures())

export const featuresReducers = {
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
