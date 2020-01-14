import Immutable from 'immutable'

import {
  getGoToMyGousto,
  getGoToMyDeliveries,
  getRafPositionOnWelcomePage,
  isDeliveryFrequencyFeatureEnabled,
  getWelcomePageAppPromo,
  getPromoBannerEnabled,
  getPromoBannerText,
  getPromoBannerCode,
  getCookingInstruction,
  getNDDFeatureValue,
  getHideBoxSummary,
  getAddOnsBeforeOrderConfirmation,
  getFullScreenBoxSummary,
  getShowStockAlertFlag,
  getUserMenuVariant
} from 'selectors/features'

describe('when features are defined', () => {
  let state = {}

  beforeEach(() => {
    state = {
      features: Immutable.Map({})
    }
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

  describe('getRafPositionOnWelcomePage', () => {
    it('should return value of getRafPositionOnWelcomePage', () => {
      state.features = Immutable.fromJS({
        rafAboveCarouselOnWelcomePage: {
          value: true
        }
      })

      expect(getRafPositionOnWelcomePage(state)).toEqual(true)
    })

    it('should return false if features does not exist', () => {
      state = Immutable.fromJS({})

      expect(getRafPositionOnWelcomePage(state)).toEqual(false)
    })
  })

  describe('isDeliveryFrequencyFeatureEnabled', () => {
    describe('when feature is not set', () => {
      test('should return false', () => {
        expect(isDeliveryFrequencyFeatureEnabled(state)).toEqual(false)
      })
    })

    describe('when feature is set to false', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          wizardDeliveryFrequency: {
            value: false,
          },
        })
      })

      test('should return false', () => {
        expect(isDeliveryFrequencyFeatureEnabled(state)).toEqual(false)
      })
    })

    describe('when feature is set to true', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          wizardDeliveryFrequency: {
            value: true,
          },
        })
      })

      test('should return true', () => {
        expect(isDeliveryFrequencyFeatureEnabled(state)).toEqual(true)
      })
    })
  })

  describe('getWelcomePageAppPromo', () => {
    describe('when feature is not set', () => {
      test('should return false', () => {
        expect(getWelcomePageAppPromo(state)).toEqual(false)
      })
    })

    describe('when feature is set to true', () => {
      const value = true

      beforeEach(() => {
        state.features = Immutable.fromJS({
          welcomePageAppPromo: {
            value,
          },
        })
      })

      test('should return value', () => {
        expect(getWelcomePageAppPromo(state)).toEqual(true)
      })
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
})
