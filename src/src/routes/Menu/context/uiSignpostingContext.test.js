import Immutable from 'immutable'
import { getBucket, isMandatoryBucket, isSignpostingBucket } from './uiSignpostingContext'

describe('SignpostingExperimentContext', () => {
  describe('isSignpostingBucket', () => {
    describe.each([
      'variant_a', 'variant_c'
    ])(
      'when bucket is %s [is signposting]', (bucket) => {
        test('should return true', () => {
          const result = isSignpostingBucket(bucket)
          expect(result).toBeTruthy()
        })
      }
    )

    describe.each([
      'control', 'variant_b'
    ])(
      'when bucket is %s [is not signposting]', (bucket) => {
        test('should return false', () => {
          const result = isSignpostingBucket(bucket)
          expect(result).toBeFalsy()
        })
      }
    )
  })

  describe('isMandatoryBucket', () => {
    describe.each([
      'variant_b', 'variant_c'
    ])(
      'when bucket is %s [is mandatory]', (bucket) => {
        test('should return true', () => {
          const result = isMandatoryBucket(bucket)
          expect(result).toBeTruthy()
        })
      }
    )

    describe.each([
      'control', 'variant_a'
    ])(
      'when bucket is %s [is not mandatory]', (bucket) => {
        test('should return false', () => {
          const result = isMandatoryBucket(bucket)
          expect(result).toBeFalsy()
        })
      }
    )
  })

  describe('getBucket', () => {
    let experiment

    describe('when experiment is null', () => {
      beforeEach(() => {
        experiment = null
      })

      test('should return "control"', () => {
        const result = getBucket(experiment)
        expect(result).toBe('control')
      })
    })

    describe('when withinExperiment is false', () => {
      beforeEach(() => {
        experiment = Immutable.Map({
          withinExperiment: false,
          name: 'fooExperiment',
          bucket: 'blablabla'
        })
      })

      test('should return "control"', () => {
        const result = getBucket(experiment)
        expect(result).toBe('control')
      })
    })

    describe('when withinExperiment is true', () => {
      beforeEach(() => {
        experiment = Immutable.Map({
          withinExperiment: true,
          name: 'fooExperiment',
          bucket: 'blablabla'
        })
      })

      describe.each([
        'variant_a', 'variant_b', 'some_other_variant'
      ])(
        'when bucket is %s', (bucket) => {
          beforeEach(() => {
            experiment = experiment.set('bucket', bucket)
          })

          test('should return bucket', () => {
            const result = getBucket(experiment)
            expect(result).toBe(bucket)
          })
        }
      )

      describe('when bucket is control', () => {
        beforeEach(() => {
          experiment = experiment.set('bucket', 'control')
        })

        test('should return "control"', () => {
          const result = getBucket(experiment)
          expect(result).toBe('control')
        })
      })
    })
  })
})
