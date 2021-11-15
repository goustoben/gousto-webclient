import { actionTypes } from 'actions/actionTypes'
import { featuresSet } from "actions/features/featuresSet"

describe('features actions', () => {
  describe('featuresSet', () => {
    let featuresToSet

    beforeEach(() => {
      featuresToSet = { feature: 'someFeature', value: true}
    })

    describe('when given one feature', () => {
      test('should return the correct action', () => {
        const result = featuresSet([featuresToSet])
        expect(result).toEqual({
          type: actionTypes.FEATURES_SET,
          features: [
            { feature: 'someFeature', value: true}
          ]
        })
      })

      describe('when value is a string', () => {
        beforeEach(() => {
          featuresToSet.value = 'true'
        })
        describe('value is "true"', () => {
          test('should return the correct action', () => {
            const result = featuresSet([featuresToSet])
            expect(result).toEqual({
              type: actionTypes.FEATURES_SET,
              features: [
                { feature: 'someFeature', value: true}
              ]
            })
          })
        })

        describe('value is "false"', () => {
          beforeEach(() => {
            featuresToSet.value = 'false'
          })
          test('should return the correct action', () => {
            const result = featuresSet([featuresToSet])
            expect(result).toEqual({
              type: actionTypes.FEATURES_SET,
              features: [
                { feature: 'someFeature', value: false}
              ]
            })
          })
        })
      })
    })

    describe('when given two features', () => {
      test('should return the correct action', () => {
        const result = featuresSet([featuresToSet, { feature: 'someOtherFeature', value: false }])
        expect(result).toEqual({
          type: actionTypes.FEATURES_SET,
          features: [
            { feature: 'someFeature', value: true},
            { feature: 'someOtherFeature', value: false}
          ]
        })
      })
    })
  })
})
