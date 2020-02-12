import Immutable from 'immutable'

import {
  isNextDayDeliveryPaintedDoorFeatureEnabled,
  getDisabledSlots,
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
  getHideBoxSummary,
  getAddOnsBeforeOrderConfirmation,
  getFullScreenBoxSummary,
  getShowStockAlertFlag,
  getUserMenuVariant,
  isAccountTabNameTest
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

  describe('getDisabledSlots', () => {
    describe('when feature is set to true', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          disabledSlots: {
            value: true,
          },
        })
      })
      test('should return true', () => {
        expect(getDisabledSlots(state)).toEqual(true)
      })
    })

    describe('when feature is set to false', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          disabledSlots: {
            value: false,
          },
        })
      })

      test('should return value', () => {
        expect(getDisabledSlots(state)).toEqual(false)
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

  describe('getHideBoxSummary', () => {
    describe('when feature flag is set', () => {
      test('should return true', () => {
        state = {
          features: Immutable.Map({
            hideBoxSummary: Immutable.fromJS({
              value: true
            })
          })
        }

        expect(getHideBoxSummary(state)).toEqual(true)
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

  describe('getShowStockAlertFlag', () => {
    describe('when is NOT set', () => {
      test('should return false', () => {
        expect(getShowStockAlertFlag(state)).toBe(false)
      })
    })

    describe('when is set', () => {
      test('should return true', () => {
        state.features = Immutable.fromJS({
          showStockAlert: {
            value: true
          }
        })
        expect(getShowStockAlertFlag(state)).toBe(true)
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
})
