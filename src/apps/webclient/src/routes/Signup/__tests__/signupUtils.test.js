import Immutable from 'immutable'

import { getStepFromPathname, formatPrice } from 'routes/Signup/signupUtils'

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

describe('signup utils', () => {
  describe('given getStepFromPathname is called', () => {
    let output
    const pathname = '/signup/delivery-options'

    beforeEach(() => {
      output = getStepFromPathname(pathname)
    })

    test('then proper response should be returned', () => {
      const expected = Immutable.Map({ name: 'delivery', slug: 'delivery-options' })
      expect(output).toEqual(expected)
    })
  })
})
