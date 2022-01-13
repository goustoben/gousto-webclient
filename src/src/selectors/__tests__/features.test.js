import Immutable from 'immutable'

import {
  isNextDayDeliveryPaintedDoorFeatureEnabled,
  getLogoutUserDisabledSlots,
  getAppBanner,
  isShowNoDiscountCTAFeatureEnabled,
  isSubscriptionPauseOsrFeatureEnabled,
  isOsrOfferFeatureEnabled,
  getAbandonBasket,
  getIsCustomNoticeEnabled,
  getGoToMyGousto,
  getGoToMyDeliveries,
  getPromoBannerEnabled,
  getPromoBannerText,
  getPromoBannerCode,
  getNDDFeatureValue,
  getFullScreenBoxSummary,
  getUserMenuVariant,
  getPromoOfferVariant,
  getIsSignupReductionEnabled,
  getIsCommunicationPanelEnabled,
  getIsTastePreferencesEnabled,
  getIsLoginModalAppAwarenessEnabled,
  getIsMobileTopBannerAppAwarenessEnabled,
  getIsMobileMenuModalAppAwarenessEnabled,
  getIsMyGoustoBannerAppAwarenessEnabled,
  getisNewSSRDeliveriesEnabled,
  getIsMultiSkipEnabled,
  getIsSubscriberPricingEnabled,
  getIsMyGoustoBannerSubscriberPricingEnabled,
  getIsPaymentBeforeChoosingV1Enabled,
  getIsPaymentBeforeChoosingV2Enabled,
  getIsPaymentBeforeChoosingEnabled,
  getIsGoustoOnDemandEnabled,
  getIsAutoAcceptEnabled,
  getSsrTwoComplaintsSameDay,
  getIsCorporateEnquiriesLinkVisible,
  getIsSsrRepetitiveIssues,
  getIsGiftCardsLinkVisible,
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
    [getFullScreenBoxSummary, 'fullScreenBoxSummary'],
    [getGoToMyDeliveries, 'goToMyDeliveries'],
    [getGoToMyGousto, 'goToMyGousto'],
    [getIsCommunicationPanelEnabled, 'isCommunicationPanelEnabled'],
    [getIsSignupReductionEnabled, 'enableSignupReduction'],
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
    [getUserMenuVariant, 'userMenuVariant', [[''], ['menuB']]],
    [isNextDayDeliveryPaintedDoorFeatureEnabled, 'nextDayDeliveryPaintedDoor'],
    [isOsrOfferFeatureEnabled, 'enableOsrOffer'],
    [isShowNoDiscountCTAFeatureEnabled, 'showNoDiscountCTA'],
    [isSubscriptionPauseOsrFeatureEnabled, 'subscriptionPauseOsr'],
    [getIsTastePreferencesEnabled, 'tastePreferences'],
    [getIsCustomNoticeEnabled, 'isCustomNoticeEnabled'],
    [getIsLoginModalAppAwarenessEnabled, 'isLoginModalAppAwarenessEnabled'],
    [getIsMobileTopBannerAppAwarenessEnabled, 'isMobileTopBannerAppAwarenessEnabled'],
    [getIsMobileMenuModalAppAwarenessEnabled, 'isMobileMenuModalAppAwarenessEnabled'],
    [getIsMyGoustoBannerAppAwarenessEnabled, 'isMyGoustoBannerAppAwarenessEnabled'],
    [getisNewSSRDeliveriesEnabled, 'isNewSSRDeliveriesEnabled'],
    [getIsMultiSkipEnabled, 'isMultiSkipEnabled'],
    [getIsSubscriberPricingEnabled, 'isSubscriberPricingEnabled'],
    [getIsMyGoustoBannerSubscriberPricingEnabled, 'isMyGoustoBannerSubscriberPricingEnabled'],
    [getIsSubscriberPricingEnabled, 'isSubscriberPricingEnabled'],
    [getIsPaymentBeforeChoosingV1Enabled, 'isPaymentBeforeChoosingV1Enabled'],
    [getIsPaymentBeforeChoosingV2Enabled, 'isPaymentBeforeChoosingV2Enabled'],
    [getIsGoustoOnDemandEnabled, 'isGoustoOnDemandEnabled'],
    [getIsAutoAcceptEnabled, 'isAutoAcceptEnabled'],
    [getSsrTwoComplaintsSameDay, 'ssrTwoComplaintsSameDay'],
    [getIsCorporateEnquiriesLinkVisible, 'isCorporateEnquiriesLinkVisible'],
    [getIsSsrRepetitiveIssues, 'isSsrRepetitiveIssues'],
    [getIsGiftCardsLinkVisible, 'isGiftCardsLinkVisible'],
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
