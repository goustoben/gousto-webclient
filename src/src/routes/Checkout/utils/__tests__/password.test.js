import { validator } from '../password'

describe('password utils', () => {
  describe('given validator', () => {
    let output
    let password

    describe('when password is not passed', () => {
      beforeEach(() => {
        password = ''
        output = validator(password)
      })

      test('then should return undefined', () => {
        expect(output).toBeUndefined()
      })
    })

    describe('when password value meets all the requirements', () => {
      beforeEach(() => {
        password = 't3st!Wpassw0rd'
        output = validator(password)
      })

      test('then should return undefined', () => {
        expect(output).toBeUndefined()
      })
    })

    describe('when password does not meet all the requirements', () => {
      beforeEach(() => {
        password = 'Aaarrrrrrrr'
        output = validator(password)
      })

      test('then should return an array of errors', () => {
        expect(output).toEqual(['digits', 'symbols'])
      })
    })
  })
})
