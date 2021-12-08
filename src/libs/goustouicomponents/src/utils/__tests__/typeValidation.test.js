import { validateEmail, validatePhone } from '../typeValidation'

describe('typeValidation utils', () => {
  describe('validateEmail', () => {
    describe('when validateEmail is called with a valid email', () => {
      test('it will return true', () => {
        expect(validateEmail('test@test.com')).toEqual(true)
      })
    })

    describe('when validateEmail is called with an invalid email', () => {
      test('it will return false', () => {
        expect(validateEmail('test.test.com')).toEqual(false)
      })
    })
  })

  describe('validatePhone', () => {
    describe('when validatePhone is called with a valid phone number', () => {
      test('it will return true', () => {
        expect(validatePhone('0123456789')).toEqual(true)
      })
    })

    describe('when validateEmail is called with an invalid phone number', () => {
      test('it will return false', () => {
        expect(validatePhone('12345')).toEqual(false)
      })
    })
  })
})
