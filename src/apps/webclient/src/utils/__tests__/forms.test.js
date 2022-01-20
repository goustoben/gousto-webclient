import { emailValidator, phoneValidator } from 'utils/forms'

describe('given form utils', () => {
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

  describe('phoneValidator', () => {
    let output
    let value

    describe('when value is undefined', () => {
      beforeEach(() => {
        value = ''
      })

      test('then should return an error', () => {
        output = phoneValidator(value)
        expect(output).toEqual('Enter a UK phone number')
      })
    })

    describe('when value is defined', () => {
      describe('and country code corresponds to India', () => {
        beforeEach(() => {
          value = '+917123456789'
        })

        test('then should return an error', () => {
          output = phoneValidator(value)
          expect(output).toEqual('Enter a UK phone number')
        })
      })

      describe('and has correct format', () => {
        beforeEach(() => {
          value = '07123456789'
        })

        test('then should return undefined', () => {
          output = phoneValidator(value)
          expect(output).toBeUndefined()
        })
      })
    })
  })
})

