import { isMandatoryBucket, isSignpostingBucket } from './uiSignpostingContext'

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
})
