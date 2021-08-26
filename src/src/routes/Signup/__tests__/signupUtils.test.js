import { formatPrice } from '../signupUtils'

describe('signupUtils', () => {
  describe('given formatPrice is invoked', () => {
    describe('when price is zero', () => {
      test('then it should format is as FREE', () => {
        expect(formatPrice('0.00')).toBe('FREE')
      })
    })

    describe('when price is non-zero', () => {
      test('then it should format it with the pound sign', () => {
        expect(formatPrice('12.50')).toBe('£12.50')
      })
    })
  })
})
