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
  getIsCustomNoticeEnabled,
  getShowUserCredit,
  getGoToMyGousto,
  getGoToMyDeliveries,
  getPromoBannerEnabled,
  getPromoBannerText,
  getPromoBannerCode,
  getNDDFeatureValue,
  getFeatureShorterCompensationPeriod,
  getFullScreenBoxSummary,
  getUserMenuVariant,
  getPromoOfferVariant,
  getIsSignupReductionEnabled,
  getIsWelcomePageOnboardingEnabled,
  getIsCommunicationPanelEnabled,
  getBlockedResubscription,
  getBlockedTransactionalOrders,
  getLimitedCapacity,
  getIsLimitedCapacityChristmas,
  getHomePageRedesign,
  getIsHelpCentreActive,
  getIs3DSForSignUpEnabled,
  getIsTastePreferencesEnabled,
  getBoxPricesPageRedesign,
  getPricingClarityRedesign,
  getIsLoginModalAppAwarenessEnabled,
  getIsMobileTopBannerAppAwarenessEnabled,
  getIsMobileMenuModalAppAwarenessEnabled,
  getIsMyGoustoBannerAppAwarenessEnabled,
  getisNewSSRDeliveriesEnabled,
  getIsMultiSkipEnabled,
  getIsMenuRedirectPageEnabled,
  getIsCheckoutOverhaulEnabled,
  getIsSubscriberPricingEnabled,
  getIsMyGoustoBannerSubscriberPricingEnabled,
  getIsWizardPricePerServingEnabled,
  getIsMenuProgressBarHidden,
  getIsCheckoutOverhaulV1Enabled,
  getIsCheckoutOverhaulV3Enabled,
  getIsCheckoutOverhaulV4Enabled,
  getIsCarouselShiftEnabled,
  getIsNewSubscriptionApiEnabled,
  getIsPassStrengthEnabled,
  getIsAdditionalCheckoutErrorsEnabled,
  getIsHomePageFlexibilityMessageEnabled,
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
    [getNDDFeatureValue, 'ndd', ['something']],
    [getPromoBannerCode, 'promoBannerCode', [[''], ['DTI-MG-7070']]],
    [getPromoBannerEnabled, 'promoBanner'],
    [getPromoBannerText, 'promoBannerText', [
      [''], ['Click here to get 50% off your first box and 30% off all other boxes in your first month']]
    ],
    [getPromoOfferVariant, 'enableTVPromoAds'],
    [getLimitedCapacity, 'limitedCapacity'],
    [getIsLimitedCapacityChristmas, 'isLimitedCapacityChristmas'],
    [getShowUserCredit, 'showUserCredit'],
    [getUserMenuVariant, 'userMenuVariant', [[''], ['menuB']]],
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
    [getIsCustomNoticeEnabled, 'isCustomNoticeEnabled'],
    [getIsLoginModalAppAwarenessEnabled, 'isLoginModalAppAwarenessEnabled'],
    [getIsMobileTopBannerAppAwarenessEnabled, 'isMobileTopBannerAppAwarenessEnabled'],
    [getIsMobileMenuModalAppAwarenessEnabled, 'isMobileMenuModalAppAwarenessEnabled'],
    [getIsMyGoustoBannerAppAwarenessEnabled, 'isMyGoustoBannerAppAwarenessEnabled'],
    [getPricingClarityRedesign, 'isPricingClarityEnabled'],
    [getisNewSSRDeliveriesEnabled, 'isNewSSRDeliveriesEnabled'],
    [getIsMultiSkipEnabled, 'isMultiSkipEnabled'],
    [getIsMenuRedirectPageEnabled, 'isMenuRedirectPageEnabled'],
    [getIsCheckoutOverhaulEnabled, 'isCheckoutOverhaulEnabled'],
    [getIsSubscriberPricingEnabled, 'isSubscriberPricingEnabled'],
    [getIsMyGoustoBannerSubscriberPricingEnabled, 'isMyGoustoBannerSubscriberPricingEnabled'],
    [getIsSubscriberPricingEnabled, 'isSubscriberPricingEnabled'],
    [getIsWizardPricePerServingEnabled, 'isWizardPricePerServingEnabled'],
    [getIsMenuProgressBarHidden, 'isMenuProgressBarHidden'],
    [getIsCheckoutOverhaulV1Enabled, 'isCheckoutOverhaulV1Enabled'],
    [getIsCheckoutOverhaulV3Enabled, 'isCheckoutOverhaulV3Enabled'],
    [getIsCheckoutOverhaulV4Enabled, 'isCheckoutOverhaulV4Enabled'],
    [getIsCarouselShiftEnabled, 'isCarouselShiftEnabled'],
    [getIsNewSubscriptionApiEnabled, 'isNewSubscriptionApiEnabled'],
    [getIsPassStrengthEnabled, 'isPassStrengthEnabled'],
    [getIsAdditionalCheckoutErrorsEnabled, 'isAdditionalCheckoutErrorsEnabled'],
    [getIsHomePageFlexibilityMessageEnabled, 'isHomePageFlexibilityMessageEnabled'],
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
