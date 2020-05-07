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
  getCookingInstruction,
  getNDDFeatureValue,
  getAddOnsBeforeOrderConfirmation,
  getFullScreenBoxSummary,
  getUserMenuVariant,
  isAccountTabNameTest,
  getHideMenuBanner,
  getPromoOfferVariant,
  getIsSignupReductionEnabled,
  getIsWelcomePageOnboardingEnabled,
  getIsCommunicationPanelEnabled,
  getBlockedResubscription,
  getBlockedTransactionalOrders,
} from 'selectors/features'

describe('when features are defined', () => {
  let state = {}

  beforeEach(() => {
    state = {
      features: Immutable.Map({})
    }
  })

  describe('isNextDayDeliveryPaintedDoorFeatureEnabled', () => {
    describe('when feature is set to true', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          nextDayDeliveryPaintedDoor: {
            value: true,
          },
        })
      })
      test('should return true', () => {
        expect(isNextDayDeliveryPaintedDoorFeatureEnabled(state)).toEqual(true)
      })
    })

    describe('when feature is set to false', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          nextDayDeliveryPaintedDoor: {
            value: false,
          },
        })
      })

      test('should return value', () => {
        expect(isNextDayDeliveryPaintedDoorFeatureEnabled(state)).toEqual(false)
      })
    })
  })

  describe('getLogoutUserDisabledSlots', () => {
    describe('when feature is set to disable slots', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          logoutUserDisabledSlots: {
            value: '2020-01-20_08-19,2020-02-21_08-12',
          },
        })
      })
      test('should return disable slots', () => {
        expect(getLogoutUserDisabledSlots(state)).toEqual('2020-01-20_08-19,2020-02-21_08-12')
      })
    })

    describe('when feature is set to empty string', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          logoutUserDisabledSlots: {
            value: '',
          },
        })
      })

      test('should return value', () => {
        expect(getLogoutUserDisabledSlots(state)).toEqual('')
      })
    })
  })

  describe('getAppBanner', () => {
    describe('when feature is set to true', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          appBanner: {
            value: true,
          },
        })
      })
      test('should return true', () => {
        expect(getAppBanner(state)).toEqual(true)
      })
    })

    describe('when feature is set to false', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          appBanner: {
            value: false,
          },
        })
      })

      test('should return value', () => {
        expect(getAppBanner(state)).toEqual(false)
      })
    })
  })

  describe('isShowNoDiscountCTAFeatureEnabled', () => {
    describe('when feature is set to true', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          showNoDiscountCTA: {
            value: true,
          },
        })
      })
      test('should return true', () => {
        expect(isShowNoDiscountCTAFeatureEnabled(state)).toEqual(true)
      })
    })

    describe('when feature is set to false', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          showNoDiscountCTA: {
            value: false,
          },
        })
      })

      test('should return value', () => {
        expect(isShowNoDiscountCTAFeatureEnabled(state)).toEqual(false)
      })
    })
  })

  describe('isSubscriptionPauseOsrFeatureEnabled', () => {
    describe('when feature is set to true', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          subscriptionPauseOsr: {
            value: true,
          },
        })
      })
      test('should return true', () => {
        expect(isSubscriptionPauseOsrFeatureEnabled(state)).toEqual(true)
      })
    })

    describe('when feature is set to false', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          subscriptionPauseOsr: {
            value: false,
          },
        })
      })

      test('should return value', () => {
        expect(isSubscriptionPauseOsrFeatureEnabled(state)).toEqual(false)
      })
    })
  })

  describe('isOsrOfferFeatureEnabled', () => {
    describe('when feature is set to true', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          enableOsrOffer: {
            value: true,
          },
        })
      })
      test('should return true', () => {
        expect(isOsrOfferFeatureEnabled(state)).toEqual(true)
      })
    })

    describe('when feature is set to false', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          enableOsrOffer: {
            value: false,
          },
        })
      })

      test('should return value', () => {
        expect(isOsrOfferFeatureEnabled(state)).toEqual(false)
      })
    })
  })

  describe('getAbandonBasket', () => {
    describe('when feature is set to true', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          abandonBasket: {
            value: true,
          },
        })
      })
      test('should return true', () => {
        expect(getAbandonBasket(state)).toEqual(true)
      })
    })

    describe('when feature is set to false', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          abandonBasket: {
            value: false,
          },
        })
      })

      test('should return value', () => {
        expect(getAbandonBasket(state)).toEqual(false)
      })
    })
  })

  describe('isChoosePlanEnabled', () => {
    describe('when feature is set to true', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          choosePlanRoute: {
            value: true,
          },
        })
      })
      test('should return true', () => {
        expect(isChoosePlanEnabled(state)).toEqual(true)
      })
    })

    describe('when feature is set to false', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          choosePlanRoute: {
            value: false,
          },
        })
      })

      test('should return value', () => {
        expect(isChoosePlanEnabled(state)).toEqual(false)
      })
    })
  })

  describe('getShowUserCredit', () => {
    describe('when feature is set to true', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          showUserCredit: {
            value: true,
          },
        })
      })
      test('should return true', () => {
        expect(getShowUserCredit(state)).toEqual(true)
      })
    })

    describe('when feature is set to false', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          showUserCredit: {
            value: false,
          },
        })
      })

      test('should return value', () => {
        expect(getShowUserCredit(state)).toEqual(false)
      })
    })
  })

  describe('getGoToMyGousto', () => {
    it('should return value of goToMyGousto', () => {
      state.features = Immutable.fromJS({
        goToMyGousto: {
          value: true
        }
      })

      expect(getGoToMyGousto(state)).toEqual(true)
    })

    it('should return false if features does not exist', () => {
      state = Immutable.fromJS({})

      expect(getGoToMyGousto(state)).toEqual(false)
    })
  })

  describe('getGoToMyDeliveries', () => {
    it('should return value of goToMyDeliveries', () => {
      state.features = Immutable.fromJS({
        goToMyDeliveries: {
          value: true
        }
      })

      expect(getGoToMyDeliveries(state)).toEqual(true)
    })

    it('should return false if features does not exist', () => {
      state = Immutable.fromJS({})

      expect(getGoToMyDeliveries(state)).toEqual(false)
    })
  })

  describe('getPromoBannerEnabled', () => {
    describe('when feature is not set', () => {
      test('should return true', () => {
        expect(getPromoBannerEnabled(state)).toEqual(true)
      })
    })

    describe('when feature is set to false', () => {
      const value = false

      beforeEach(() => {
        state.features = Immutable.fromJS({
          promoBanner: {
            value,
          },
        })
      })

      test('should return value', () => {
        expect(getPromoBannerEnabled(state)).toEqual(false)
      })
    })
  })

  describe('getPromoBannerText', () => {
    describe('when feature is not set', () => {
      test('should return an empty string', () => {
        expect(getPromoBannerText(state)).toEqual('')
      })
    })

    describe('when feature is set', () => {
      const value = 'Click here to get 50% off your first box and 30% off all other boxes in your first month'

      beforeEach(() => {
        state.features = Immutable.fromJS({
          promoBannerText: {
            value,
          },
        })
      })

      test('should return value', () => {
        expect(getPromoBannerText(state)).toEqual(value)
      })
    })
  })

  describe('getPromoBannerCode', () => {
    describe('when feature is not set', () => {
      test('should return an empty string', () => {
        expect(getPromoBannerCode(state)).toEqual('')
      })
    })

    describe('when feature is set', () => {
      const value = 'DTI-MG-7070'

      beforeEach(() => {
        state.features = Immutable.fromJS({
          promoBannerCode: {
            value,
          },
        })
      })

      test('should return value', () => {
        expect(getPromoBannerCode(state)).toEqual(value)
      })
    })
  })

  describe('getNDDFeatureValue', () => {
    describe('when I get feature value with an NDD value in state', () => {
      test('should return correct experiment value', () => {
        state = {
          features: Immutable.Map({
            ndd: Immutable.fromJS({
              value: 'something',
            })
          })
        }

        expect(getNDDFeatureValue(state)).toEqual('something')
      })
    })
  })

  describe('getCookingInstruction', () => {
    describe('when feature is not set', () => {
      test('should return false', () => {
        expect(getCookingInstruction(state)).toEqual(false)
      })
    })
    describe('when feature is set', () => {
      test('should return true', () => {
        state.features = Immutable.fromJS({
          showCookingInstruction: {
            value: true
          }
        })

        expect(getCookingInstruction(state)).toEqual(true)
      })
    })
  })

  describe('getAddOnsBeforeOrderConfirmation', () => {
    describe('when feature is not set', () => {
      test('should return false', () => {
        expect(getAddOnsBeforeOrderConfirmation(state)).toEqual(false)
      })
    })

    describe('when feature is set', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          addOnsBeforeOrderConfirmation: {
            value: true
          }
        })
      })

      test('should return true', () => {
        expect(getAddOnsBeforeOrderConfirmation(state)).toEqual(true)
      })
    })
  })

  describe('getFullScreenBoxSummary', () => {
    describe('when is NOT set', () => {
      test('should return false', () => {
        expect(getFullScreenBoxSummary(state)).toBe(false)
      })
    })

    describe('when is set', () => {
      test('should return true', () => {
        state.features = Immutable.fromJS({
          fullScreenBoxSummary: {
            value: true
          }
        })
        expect(getFullScreenBoxSummary(state)).toBe(true)
      })
    })
  })

  describe('getUserMenuVariant', () => {
    describe('when is NOT set', () => {
      test('should return an empty string', () => {
        expect(getUserMenuVariant(state)).toBe('')
      })
    })

    describe('when is set', () => {
      test('should return the value which the menu name', () => {
        state.features = Immutable.fromJS({
          userMenuVariant: {
            value: 'menuB'
          }
        })
        expect(getUserMenuVariant(state)).toBe('menuB')
      })
    })
  })

  describe('isAccountTabNameTest', () => {
    describe('when accountTabNameTest is NOT set', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          accountTabNameTest: {
            value: false
          }
        })
      })

      test('should return false', () => {
        expect(isAccountTabNameTest(state)).toBe(false)
      })
    })

    describe('when accountTabNameTest is set', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          accountTabNameTest: {
            value: true
          }
        })
      })

      test('should return true', () => {
        expect(isAccountTabNameTest(state)).toBe(true)
      })
    })
  })

  describe('getHideMenuBanner', () => {
    describe('when hideMenuBanner is NOT set', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          hideMenuBanner: {
            value: false
          }
        })
      })

      test('should return false', () => {
        expect(getHideMenuBanner(state)).toBe(false)
      })
    })

    describe('when hideMenuBanner is set', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          hideMenuBanner: {
            value: true
          }
        })
      })

      test('should return true', () => {
        expect(getHideMenuBanner(state)).toBe(true)
      })
    })
  })

  describe('getPromoOfferVariant', () => {
    describe('when enableTVPromoAds is NOT set', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          enableTVPromoAds: {
            value: false
          }
        })
      })

      test('should be falsy', () => {
        expect(getPromoOfferVariant(state)).toBeFalsy()
      })
    })

    describe('when enableTVPromoAds is set', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          enableTVPromoAds: {
            value: true
          }
        })
      })

      test('should be truthy', () => {
        expect(getPromoOfferVariant(state)).toBeTruthy()
      })
    })
  })

  describe('getIsSignupReductionEnabled', () => {
    describe('when enableSignupReduction is NOT set', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          enableSignupReduction: {
            value: false
          }
        })
      })

      test('should be falsy', () => {
        expect(getIsSignupReductionEnabled(state)).toBeFalsy()
      })
    })

    describe('when enableSignupReduction is set', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          enableSignupReduction: {
            value: true
          }
        })
      })

      test('should be truthy', () => {
        expect(getIsSignupReductionEnabled(state)).toBeTruthy()
      })
    })
  })

  describe('getIsWelcomePageOnboardingEnabled', () => {
    describe('when isWelcomePageOnboardingEnabled is NOT set', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          isWelcomePageOnboardingEnabled: {
            value: false
          }
        })
      })

      test('should be falsy', () => {
        expect(getIsWelcomePageOnboardingEnabled(state)).toBeFalsy()
      })
    })

    describe('when isWelcomePageOnboardingEnabled is set', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          isWelcomePageOnboardingEnabled: {
            value: true
          }
        })
      })

      test('should be truthy', () => {
        expect(getIsWelcomePageOnboardingEnabled(state)).toBeTruthy()
      })
    })
  })

  describe('getIsCommunicationPanelEnabled', () => {
    describe('when isCommunicationPanelEnabled is NOT set', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          isCommunicationPanelEnabled: {
            value: false
          }
        })
      })

      test('should be falsy', () => {
        expect(getIsCommunicationPanelEnabled(state)).toBeFalsy()
      })
    })

    describe('when isCommunicationPanelEnabled is set', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          isCommunicationPanelEnabled: {
            value: true
          }
        })
      })

      test('should be truthy', () => {
        expect(getIsCommunicationPanelEnabled(state)).toBeTruthy()
      })
    })
  })

  describe('getBlockedResubscription', () => {
    const cases = [
      [false, false],
      [true, true],
    ]

    describe.each(cases)('when blockedResubscription value is set to %s', (featureFlagValue, selectorResult) => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          blockedResubscription: {
            value: featureFlagValue
          }
        })
      })

      test(`selector should return ${selectorResult}`, () => {
        expect(getBlockedResubscription(state)).toBe(selectorResult)
      })
    })
  })

  describe('getBlockedTransactionalOrders', () => {
    const cases = [
      [false, false],
      [true, true],
    ]

    describe.each(cases)('when blockedTransactionalOrders value is set to %s', (featureFlagValue, selectorResult) => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          blockedTransactionalOrders: {
            value: featureFlagValue
          }
        })
      })

      test(`selector should return ${selectorResult}`, () => {
        expect(getBlockedTransactionalOrders(state)).toBe(selectorResult)
      })
    })
  })
})
