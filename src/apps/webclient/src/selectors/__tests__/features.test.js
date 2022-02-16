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
  getIsLoginModalAppAwarenessEnabled,
  getIsMobileTopBannerAppAwarenessEnabled,
  getIsMobileMenuModalAppAwarenessEnabled,
  getIsMyGoustoBannerAppAwarenessEnabled,
  getisNewSSRDeliveriesEnabled,
  getIsMultiSkipEnabled,
  getIsSubscriberPricingEnabled,
  getIsMyGoustoBannerSubscriberPricingEnabled,
  getIsGoustoOnDemandEnabled,
  getIsAutoAcceptEnabled,
  getSsrTwoComplaintsSameDay,
  getIsCorporateEnquiriesLinkVisible,
  getIsSsrRepetitiveIssues,
  getIsGiftCardsLinkVisible,
  getIsBackClosesModalEnabled,
  getIsSimplifyBasketBarEnabled
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
    [getIsGoustoOnDemandEnabled, 'isGoustoOnDemandEnabled'],
    [getIsAutoAcceptEnabled, 'isAutoAcceptEnabled'],
    [getSsrTwoComplaintsSameDay, 'ssrTwoComplaintsSameDay'],
    [getIsCorporateEnquiriesLinkVisible, 'isCorporateEnquiriesLinkVisible'],
    [getIsSsrRepetitiveIssues, 'isSsrRepetitiveIssues'],
    [getIsGiftCardsLinkVisible, 'isGiftCardsLinkVisible'],
    [getIsBackClosesModalEnabled, 'isBackClosesModalEnabled'],
    [getIsSimplifyBasketBarEnabled, 'isSimplifyBasketBarEnabled']
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
