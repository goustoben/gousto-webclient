import Immutable from 'immutable'
import { getBucket } from './utils'

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
