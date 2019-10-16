import Immutable from 'immutable'

import {
  isCollectionsFeatureEnabled,
  getCollectionFreezeValue,
  getGoToMyGousto,
  getGoToMyDeliveries,
  getJfyTutorial,
  getRafPositionOnWelcomePage,
  isDeliveryFrequencyFeatureEnabled,
  getPromoBannerText,
  getPromoBannerCode,
  getShortlist,
  isNDDFeatureEnabled,
  getCookingInstruction,
} from 'selectors/features'

import { DeliveryTariffTypes } from 'utils/deliveries'

describe('when features are undefined', () => {
  const state = {}

  it('isCollectionsFeatureEnabled should return false', () => {
    expect(isCollectionsFeatureEnabled(state)).toBe(false)
  })

  it('getCollectionFreezeValue should return empty string', () => {
    expect(getCollectionFreezeValue(state)).toBe('')
  })
})

describe('when features are defined', () => {
  let state = {}

  beforeEach(() => {
    state = {
      features: Immutable.Map({})
    }
  })

  describe('isCollectionsFeatureEnabled', () => {
    describe('when collections feature is set to true', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          collections: {
            value: true
          }
        })
      })

      it('should return true', () => {
        expect(isCollectionsFeatureEnabled(state)).toBe(true)
      })
    })

    describe('when forceCollections feature is set to true', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          forceCollections: {
            value: true
          }
        })
      })

      it('should return true', () => {
        expect(isCollectionsFeatureEnabled(state)).toBe(true)
      })
    })

    describe('when both collections and forceCollections are false', () => {
      beforeEach(() => {
        state.features = Immutable.fromJS({
          collections: {
            value: false
          },
          forceCollections: {
            value: false
          }
        })
      })

      it('should return false', () => {
        expect(isCollectionsFeatureEnabled(state)).toBe(false)
      })
    })
  })

  describe('getCollectionFreezeValue', () => {
    it('should return value of collection freeze', () => {
      state.features = Immutable.fromJS({
        collectionFreeze: {
          value: 'test-value'
        }
      })

      expect(getCollectionFreezeValue(state)).toEqual('test-value')
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

  describe('getJfyTutorial', () => {
    it('should return value of getJfyTutorial', () => {
      state.features = Immutable.fromJS({
        jfyTutorial: {
          value: true
        }
      })

      expect(getJfyTutorial(state)).toEqual(true)
    })

    it('should return false if features does not exist', () => {
      state = Immutable.fromJS({})

      expect(getJfyTutorial(state)).toEqual(false)
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

  describe('getPromoBannerText', () => {
    describe('when feature is not set', () => {
      test('should return an empty string', () => {
        expect(getPromoBannerText(state)).toEqual('')
      })
    })

    describe('when feature is set', () => {
      const value = 'Click here to get 30% off all boxes in your first month!'

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

  describe('getShortlist', () => {
    describe('when feature is not set', () => {
      test('should return false', () => {
        expect(getShortlist(state)).toEqual(false)
      })
    })
    describe('when feature is set', () => {
      test('should return true', () => {
        state.features = Immutable.fromJS({
          shortlist: {
            value: true
          }
        })

        expect(getShortlist(state)).toEqual(true)
      })
    })
  })

  describe('isNDDFeatureEnabled', () => {
    describe('when feature is not set AND users deliveryTariffId is free ndd', () => {
      test('should return true', () => {
        state = {
          features: Immutable.Map({}),
          user: Immutable.fromJS({
            deliveryTariffId: DeliveryTariffTypes.FREE_NDD
          })
        }
        expect(isNDDFeatureEnabled(state)).toEqual(true)
      })
    })
    describe('when feature is not set AND users deliveryTariffId is non ndd', () => {
      test('should return false', () => {
        state = {
          features: Immutable.Map({}),
          user: Immutable.fromJS({
            deliveryTariffId: DeliveryTariffTypes.NON_NDD
          })
        }
        expect(isNDDFeatureEnabled(state)).toEqual(false)
      })
    })
    describe('when feature is not set AND users deliveryTariffId is not set', () => {
      test('should return false', () => {
        expect(isNDDFeatureEnabled(state)).toEqual(false)
      })
    })
    describe('when feature is set and users deliveryTariffId is free ndd', () => {
      test('should return true', () => {
        state = {
          features: Immutable.fromJS({
            ndd: {
              value: true
            }
          }),
          user: Immutable.fromJS({
            deliveryTariffId: DeliveryTariffTypes.FREE_NDD
          })
        }
        expect(isNDDFeatureEnabled(state)).toEqual(true)
      })
    })
    describe('when feature is set and users deliveryTariffId is non ndd', () => {
      test('should return true', () => {
        state = {
          features: Immutable.fromJS({
            ndd: {
              value: true
            }
          }),
          user: Immutable.fromJS({
            deliveryTariffId: DeliveryTariffTypes.NON_NDD
          })
        }
        expect(isNDDFeatureEnabled(state)).toEqual(false)
      })
    })
    describe('when feature is set and users deliveryTariffId is not set', () => {
      test('should return true', () => {
        state = {
          features: Immutable.fromJS({
            ndd: {
              value: true
            }
          })
        }
        expect(isNDDFeatureEnabled(state)).toEqual(true)
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
})
