import Immutable from 'immutable'

import {
  isCollectionsFeatureEnabled,
  getCollectionFreezeValue,
  getGoToMyGousto,
  getGoToMyDeliveries,
  getJfyTutorial,
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
    it('should return value of goToMyDeliveries', () => {
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
})
