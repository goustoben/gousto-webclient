import sinon from 'sinon'

import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */

describe('features reducers', () => {
  describe('features', () => {
    let clock
    let features
    beforeEach(() => {
      clock = sinon.useFakeTimers(new Date(2010, 12, 27).getTime())
      features = require('reducers/features').default
    })
    afterEach(() => {
      clock.restore()
    })
    test('should handle initial state', () => {
      const state = undefined
      const action = {}
      const expected = Immutable.fromJS({
        collections: {
          experiment: false,
          value: true,
        },
        landingOrder: {
          experiment: false,
          value: true,
        },
        recommendedBadge: {
          experiment: false,
          value: false,
        },
        featureRecommendedRecipe: {
          experiment: false,
          value: true,
        },
        filterMenu: {
          experiment: false,
          value: false,
        },
        queueIt: {
          experiment: false,
          value: false,
        },
        nextDayDeliveryPaintedDoor: {
          experiment: true,
          value: false
        },
        disabledSlots: {
          experiment: false,
          value: '',
        },
      })
      const result = features.features(state, action)
      expect(Immutable.is(expected, result)).toEqual(true)
    })

    test('should handle unknown actions', () => {
      const state = undefined
      const action = { type: 'unknown' }
      const expected = Immutable.fromJS({
        collections: {
          experiment: false,
          value: true,
        },
        landingOrder: {
          experiment: false,
          value: true,
        },
        recommendedBadge: {
          experiment: false,
          value: false,
        },
        featureRecommendedRecipe: {
          experiment: false,
          value: true,
        },
        filterMenu: {
          experiment: false,
          value: false,
        },
        queueIt: {
          experiment: false,
          value: false,
        },
        disabledSlots: {
          experiment: false,
          value: '',
        },
        nextDayDeliveryPaintedDoor: {
          experiment: true,
          value: false
        },
      })
      const result = features.features(state, action)
      expect(Immutable.is(expected, result)).toEqual(true)
    })

    test('should handle FEATURE_SET action types with values', () => {
      const state = undefined
      const action = {
        type: actionTypes.FEATURE_SET,
        feature: 'something',
        value: 'another thing',
      }
      const expected = Immutable.fromJS({
        collections: {
          experiment: false,
          value: true,
        },
        something: {
          experiment: false,
          value: 'another thing',
        },
        landingOrder: {
          experiment: false,
          value: true,
        },
        recommendedBadge: {
          experiment: false,
          value: false,
        },
        featureRecommendedRecipe: {
          experiment: false,
          value: true,
        },
        filterMenu: {
          experiment: false,
          value: false,
        },
        queueIt: {
          experiment: false,
          value: false,
        },
        disabledSlots: {
          experiment: false,
          value: '',
        },
        nextDayDeliveryPaintedDoor: {
          experiment: true,
          value: false
        },
      })
      const result = features.features(state, action)
      expect(Immutable.is(expected, result)).toEqual(true)
    })

    test('should handle both boolean and value feature flags', () => {
      const state = Immutable.fromJS({
        something: {
          experiment: false,
          value: true,
        },
      })
      const action = {
        type: actionTypes.FEATURE_SET,
        feature: 'somethingMore',
        value: 'another thing',
      }
      const expected = Immutable.fromJS({
        something: {
          experiment: false,
          value: true,
        },
        somethingMore: {
          experiment: false,
          value: 'another thing',
        },
      })
      const result = features.features(state, action)
      expect(Immutable.is(expected, result)).toEqual(true)
    })

    test('should handle experiment flag for features', () => {
      const state = Immutable.fromJS({
        something: {
          experiment: false,
          value: true,
        },
      })
      const action = {
        type: actionTypes.FEATURE_SET,
        feature: 'somethingMore',
        value: 'another thing',
        experiment: true,
      }
      const expected = Immutable.fromJS({
        something: {
          experiment: false,
          value: true,
        },
        somethingMore: {
          experiment: true,
          value: 'another thing',
        },
      })
      const result = features.features(state, action)
      expect(Immutable.is(expected, result)).toEqual(true)
    })
  })
})
