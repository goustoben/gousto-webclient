import { emailValidator } from 'utils/forms'

describe('emailValidator', () => {
  let value
  let output

  describe('when value is undefined', () => {
    beforeEach(() => {
      value = ''
    })

    test('then should return a warning', () => {
      output = emailValidator(value)
      expect(output).toEqual('Please provide a valid email address')
    })
  })

  describe('when value is defined', () => {
    describe('and has incorrect format', () => {
      beforeEach(() => {
        value = 'test'
      })

      test('then should return a warning', () => {
        output = emailValidator(value)
        expect(output).toEqual('Please provide a valid email address')
      })
    })

    describe('and has correct format', () => {
      beforeEach(() => {
        value = 'test@gmail.com'
      })

      test('then should return undefined', () => {
        output = emailValidator(value)
        expect(output).toBeUndefined()
      })
    })
  })
})
