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
  getIsHelpCentreActive,
  getIs3DSForSignUpEnabled,
  getIsTastePreferencesEnabled,
  getIsLoginModalAppAwarenessEnabled,
  getIsMobileTopBannerAppAwarenessEnabled,
  getIsMobileMenuModalAppAwarenessEnabled,
  getIsMyGoustoBannerAppAwarenessEnabled,
  getisNewSSRDeliveriesEnabled,
  getIsMultiSkipEnabled,
  getIsMenuRedirectPageEnabled,
  getIsSubscriberPricingEnabled,
  getIsMyGoustoBannerSubscriberPricingEnabled,
  getIsWizardPricePerServingEnabled,
  getIsNewSubscriptionApiEnabled,
  getIsPassStrengthEnabled,
  getIsAdditionalCheckoutErrorsEnabled,
  getIsPaymentBeforeChoosingV1Enabled,
  getIsPaymentBeforeChoosingV2Enabled,
  getIsPaymentBeforeChoosingEnabled,
  getIsDecoupledPaymentEnabled,
  getIsPromoCodeValidationEnabled,
  getIsSSRVisibilityOnMyGoustoEnabled,
  getIsHomepageFreeDeliveryEnabled,
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
    [getIsHelpCentreActive, 'isHelpCentreActive'],
    [getIs3DSForSignUpEnabled, 'enable3DSForSignUp'],
    [getIsTastePreferencesEnabled, 'tastePreferences'],
    [getIsCustomNoticeEnabled, 'isCustomNoticeEnabled'],
    [getIsLoginModalAppAwarenessEnabled, 'isLoginModalAppAwarenessEnabled'],
    [getIsMobileTopBannerAppAwarenessEnabled, 'isMobileTopBannerAppAwarenessEnabled'],
    [getIsMobileMenuModalAppAwarenessEnabled, 'isMobileMenuModalAppAwarenessEnabled'],
    [getIsMyGoustoBannerAppAwarenessEnabled, 'isMyGoustoBannerAppAwarenessEnabled'],
    [getisNewSSRDeliveriesEnabled, 'isNewSSRDeliveriesEnabled'],
    [getIsMultiSkipEnabled, 'isMultiSkipEnabled'],
    [getIsMenuRedirectPageEnabled, 'isMenuRedirectPageEnabled'],
    [getIsSubscriberPricingEnabled, 'isSubscriberPricingEnabled'],
    [getIsMyGoustoBannerSubscriberPricingEnabled, 'isMyGoustoBannerSubscriberPricingEnabled'],
    [getIsSubscriberPricingEnabled, 'isSubscriberPricingEnabled'],
    [getIsWizardPricePerServingEnabled, 'isWizardPricePerServingEnabled'],
    [getIsNewSubscriptionApiEnabled, 'isNewSubscriptionApiEnabled'],
    [getIsPassStrengthEnabled, 'isPassStrengthEnabled'],
    [getIsAdditionalCheckoutErrorsEnabled, 'isAdditionalCheckoutErrorsEnabled'],
    [getIsPaymentBeforeChoosingV1Enabled, 'isPaymentBeforeChoosingV1Enabled'],
    [getIsPaymentBeforeChoosingV2Enabled, 'isPaymentBeforeChoosingV2Enabled'],
    [getIsDecoupledPaymentEnabled, 'isDecoupledPaymentEnabled'],
    [getIsPromoCodeValidationEnabled, 'isPromoCodeValidationEnabled'],
    [getIsSSRVisibilityOnMyGoustoEnabled, 'isSSRVisibilityOnMyGoustoEnabled'],
    [getIsHomepageFreeDeliveryEnabled, 'isHomepageFreeDeliveryEnabled'],
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

  describe('isPaymentBeforeChoosingEnabled', () => {
    const pbcCases = [
      [false, false, false],
      [false, true, true],
      [true, false, true],
      [true, true, true],
    ]

    describe.each(pbcCases)(
      'when v1 is %s and v2 is %s',
      (isPaymentBeforeChoosingV1Enabled, isPaymentBeforeChoosingV2Enabled, expected) => {
        beforeEach(() => {
          state.features = Immutable.fromJS({
            isPaymentBeforeChoosingV1Enabled: {
              value: isPaymentBeforeChoosingV1Enabled,
            },
            isPaymentBeforeChoosingV2Enabled: {
              value: isPaymentBeforeChoosingV2Enabled,
            },
          })
        })

        test(`then isPaymentBeforeChoosingEnabled should be ${expected}`, () => {
          expect(getIsPaymentBeforeChoosingEnabled(state)).toBe(expected)
        })
      }
    )
  })
})
