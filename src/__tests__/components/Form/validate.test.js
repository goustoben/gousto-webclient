import React from 'react'

import sinon from 'sinon'

import validate from 'Form/validate'
const ruleMessages = require('validations/ruleMessages')

describe('validate', () => {
  let sandbox
  const rules = {
    email: {
      field: 'email',
      rules: ['isEmail'],
    },

    firstName: {
      field: 'first name',
      rules: [
        { name: 'isLength', options: { min: 5 } },
        { name: 'isLength', options: { max: 20 } },
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

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    sandbox.stub(ruleMessages, 'default', {
      isEmail: 'Please provide a valid email address',
      isLength: (field, { min, max }) => {
        let error = ''
        if (min === 1) {
          error = `${field} is required`
        } else if (min > 1) {
          error = `${field} needs to be at least ${min} characters`
        } else {
          error = `${field} needs to be under ${max} characters`
        }

        return error
      },
    })
  })

  afterEach(() => {
    sandbox.restore()
  })

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
        postcode: 'postcode needs to be at least 5 characters',
      },
    })
  })

  test('should return the first error if multiple rules provided - 2', () => {
    const data = {
      deliveryAddress: {
        postcode: 'W37UP',
      },
      email: 'test@test.com',
      firstName: 'shrt',
      lastName: 'not-tested',
    }
    expect(validate(rules, data)).toEqual({
      firstName: 'first name needs to be at least 5 characters',
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
      firstName: 'first name needs to be under 20 characters',
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
      deliveryAddress: { postcode: 'postcode needs to be under 8 characters' },
      email: 'Please provide a valid email address',
      firstName: 'first name needs to be under 20 characters',
    })
  })
})
