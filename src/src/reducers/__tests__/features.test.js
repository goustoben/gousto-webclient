import featureToggles, { defaultFeatures } from 'reducers/features'
import { actionTypes } from 'actions/actionTypes'
import Immutable from 'immutable'

describe('features reducers', () => {
  const { features } = featureToggles

  test('should handle initial state', () => {
    const state = undefined
    const action = {}
    const expected = Immutable.fromJS(defaultFeatures())
    const result = features(state, action)

    expect(Immutable.is(expected, result)).toEqual(true)
  })

  test('should handle unknown actions', () => {
    const state = undefined
    const action = { type: 'unknown' }
    const expected = Immutable.fromJS(defaultFeatures())
    const result = features(state, action)
    expect(Immutable.is(expected, result)).toEqual(true)
  })

  describe('handling FEATURES_SET action', () => {
    describe('when given one feature', () => {
      describe('when value is true', () => {
        test('should return correct state', () => {
          const action = {
            type: actionTypes.FEATURES_SET,
            features: [
              { feature: 'someFeature', value: true, experiment: false }
            ]
          }
          const result = features(undefined, action)
          expect(Immutable.is(result.get('someFeature'),Immutable.fromJS({ value: true, experiment: false }))).toEqual(true)
        })
      })

      describe('when value is false', () => {
        test('should return correct state', () => {
          const action = {
            type: actionTypes.FEATURES_SET,
            features: [
              { feature: 'someFeature', value: false, experiment: false }
            ]
          }
          const result = features(undefined, action)
          expect(Immutable.is(result.get('someFeature'),Immutable.fromJS({ value: false, experiment: false }))).toEqual(true)
        })
      })

      describe('when experiment is true', () => {
        test('should return correct state', () => {
          const action = {
            type: actionTypes.FEATURES_SET,
            features: [
              { feature: 'someFeature', value: false, experiment: true }
            ]
          }
          const result = features(undefined, action)
          expect(Immutable.is(result.get('someFeature'),Immutable.fromJS({ value: false, experiment: true }))).toEqual(true)
        })
      })
    })

    describe('when given two features', () => {
      test('should return correct state', () => {
        const action = {
          type: actionTypes.FEATURES_SET,
          features: [
            { feature: 'someFeature', value: true, experiment: false },
            { feature: 'someOtherFeature', value: false, experiment: true }
          ]
        }
        const result = features(undefined, action)
        expect(Immutable.is(result.get('someFeature'),Immutable.fromJS({ value: true, experiment: false }))).toEqual(true)
        expect(Immutable.is(result.get('someOtherFeature'),Immutable.fromJS({ value: false, experiment: true }))).toEqual(true)
      })
    })
  })
})
