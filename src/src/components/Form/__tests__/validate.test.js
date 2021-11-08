import { validate } from 'Form/validate'
import { regularExpressions } from 'validations/regularExpressions'

describe('validate', () => {
  const rules = {
    email: {
      field: 'email',
      rules: ['isEmail'],
    },

    firstName: {
      field: 'first name',
      rules: [
        { name: 'isLength', options: { min: 1 } },
        { name: 'isLength', options: { max: 20 } },
        { name: 'matches', options: regularExpressions.name },
      ],
    },
    'deliveryAddress.postcode': {
      field: 'postcode',
      rules: [
        { name: 'isLength', options: { min: 5 } },
        { name: 'isLength', options: { max: 8 } },
      ],
    },
  }

  test('should not return an error if data is valid', () => {
    const data = {
      deliveryAddress: {
        postcode: 'W37UP',
      },
      email: 'test@test.com',
      firstName: 'firstname',
      lastName: 'not-tested',
    }
    expect(validate(rules, data)).toEqual({})
  })

  test('should return the first error if multiple rules provided - 1', () => {
    const data = {
      deliveryAddress: {
        postcode: 'W3',
      },
      email: 'test@test.com',
      firstName: 'firstname',
      lastName: 'not-tested',
    }
    expect(validate(rules, data)).toEqual({
      deliveryAddress: {
        postcode: 'postcode must be at least 5 characters',
      },
    })
  })

  test('should return the first error if multiple rules provided - 2', () => {
    const data = {
      deliveryAddress: {
        postcode: 'W37UP',
      },
      email: 'test@test.com',
      firstName: '',
      lastName: 'not-tested',
    }
    expect(validate(rules, data)).toEqual({
      firstName: 'first name is required',
    })
  })

  test('should return the first error if multiple rules provided - 3', () => {
    const data = {
      deliveryAddress: {
        postcode: 'W37UP',
      },
      email: 'test@test.com',
      firstName: 'tooooooooooooooooo long name',
      lastName: 'not-tested',
    }
    expect(validate(rules, data)).toEqual({
      firstName: 'first name must be under 20 characters',
    })
  })

  test('should return error messages for all failing fields', () => {
    const data = {
      deliveryAddress: {
        postcode: 'W37766565445',
      },
      email: 'not-an-email',
      firstName: 'tooooooooooooooooo long name',
      lastName: 'not-tested',
    }
    expect(validate(rules, data)).toEqual({
      deliveryAddress: { postcode: 'postcode must be under 8 characters' },
      email: 'Please provide a valid email address',
      firstName: 'first name must be under 20 characters',
    })
  })

  test('should return correct error message for name regexp validation', () => {
    const data = {
      deliveryAddress: {
        postcode: 'W37UP',
      },
      email: 'test@test.com',
      firstName: 'gQ££@^£%',
      lastName: 'not-tested',
    }
    expect(validate(rules, data)).toEqual({
      firstName: "Please use only letters (a-z), hyphens (-), apostrophes (' and ‘) and European special characters.",
    })
  })
})
