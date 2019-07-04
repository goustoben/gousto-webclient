import Immutable from 'immutable'

import {
  isCollectionsFeatureEnabled,
  getCollectionFreezeValue,
  getGoToMyGousto,
  getGoToMyDeliveries,
  getJfyTutorial,
  getOrderConfirmation,
  getRafPositionOnWelcomePage,
  isDeliveryFrequencyFeatureEnabled
} from 'selectors/features'

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

  describe('getOrderConfirmation', () => {
    it('should return value of getOrderConfirmation', () => {
      state.features = Immutable.fromJS({
        orderConfirmation: {
          value: true
        }
      })

      expect(getOrderConfirmation(state)).toEqual(true)
    })

    it('should return false if features does not exist', () => {
      state = Immutable.fromJS({})

      expect(getOrderConfirmation(state)).toEqual(false)
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
})
