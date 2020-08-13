import Immutable from 'immutable'

import {
  isNextDayDeliveryPaintedDoorFeatureEnabled,
  getLogoutUserDisabledSlots,
  getAppBanner,
  isShowNoDiscountCTAFeatureEnabled,
  isSubscriptionPauseOsrFeatureEnabled,
  isOsrOfferFeatureEnabled,
  getAbandonBasket,
  isChoosePlanEnabled,
  getShowUserCredit,
  getGoToMyGousto,
  getGoToMyDeliveries,
  getPromoBannerEnabled,
  getPromoBannerText,
  getPromoBannerCode,
  getNDDFeatureValue,
  getAddOnsBeforeOrderConfirmation,
  getFeatureShorterCompensationPeriod,
  getFullScreenBoxSummary,
  getUserMenuVariant,
  isAccountTabNameTest,
  getPromoOfferVariant,
  getIsSignupReductionEnabled,
  getIsWelcomePageOnboardingEnabled,
  getIsCommunicationPanelEnabled,
  getBlockedResubscription,
  getBlockedTransactionalOrders,
  getLimitedCapacity,
  getHomePageRedesign,
  getIsHelpCentreActive,
  getIs3DSForSignUpEnabled,
  getIsTastePreferencesEnabled,
  getBoxPricesPageRedesign
} from 'selectors/features'

describe('when features are defined', () => {
  let state = {}

  beforeEach(() => {
    state = {
      features: Immutable.Map({})
    }
  })

  const cases = [
    [getAbandonBasket, 'abandonBasket'],
    [getAddOnsBeforeOrderConfirmation, 'addOnsBeforeOrderConfirmation'],
    [getAppBanner, 'appBanner'],
    [getBlockedResubscription, 'blockedResubscription'],
    [getBlockedTransactionalOrders, 'blockedTransactionalOrders'],
    [getFeatureShorterCompensationPeriod, 'ssrShorterCompensationPeriod'],
    [getFullScreenBoxSummary, 'fullScreenBoxSummary'],
    [getGoToMyDeliveries, 'goToMyDeliveries'],
    [getGoToMyGousto, 'goToMyGousto'],
    [getIsCommunicationPanelEnabled, 'isCommunicationPanelEnabled'],
    [getIsSignupReductionEnabled, 'enableSignupReduction'],
    [getIsWelcomePageOnboardingEnabled, 'isWelcomePageOnboardingEnabled'],
    [getLogoutUserDisabledSlots, 'logoutUserDisabledSlots', [
      [''], ['2020-01-20_08-19,2020-02-21_08-12']]
    ],
    [ getNDDFeatureValue, 'ndd', ['something']],
    [getPromoBannerCode, 'promoBannerCode', [[''], ['DTI-MG-7070']]],
    [getPromoBannerEnabled, 'promoBanner'],
    [getPromoBannerText, 'promoBannerText', [
      [''], ['Click here to get 50% off your first box and 30% off all other boxes in your first month']]
    ],
    [getPromoOfferVariant, 'enableTVPromoAds'],
    [getLimitedCapacity, 'limitedCapacity'],
    [getShowUserCredit, 'showUserCredit'],
    [getUserMenuVariant, 'userMenuVariant', [[''], ['menuB']]],
    [isAccountTabNameTest, 'accountTabNameTest'],
    [isChoosePlanEnabled, 'choosePlanRoute'],
    [isNextDayDeliveryPaintedDoorFeatureEnabled, 'nextDayDeliveryPaintedDoor'],
    [isOsrOfferFeatureEnabled, 'enableOsrOffer'],
    [isShowNoDiscountCTAFeatureEnabled, 'showNoDiscountCTA'],
    [isSubscriptionPauseOsrFeatureEnabled, 'subscriptionPauseOsr'],
    [getHomePageRedesign, 'isHomePageRedesignEnabled'],
    [getIsHelpCentreActive, 'isHelpCentreActive'],
    [getIs3DSForSignUpEnabled, 'enable3DSForSignUp'],
    [getIsTastePreferencesEnabled, 'tastePreferences'],
    [getBoxPricesPageRedesign, 'isBoxPricesPageRedesignEnabled'],
  ]

  describe.each(cases)('Selector', (selector, featureFlagName, featureFlagValues = [[true], [false]]) => {
    describe.each(featureFlagValues)(`${selector.name}: when ${featureFlagName} value is set to %s`, (featureFlagValue) => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          [featureFlagName]: {
            value: featureFlagValue
          }
        })
      })

      test(`should return ${featureFlagValue}`, () => {
        expect(selector(state)).toBe(featureFlagValue)
      })
    })
  })
})
