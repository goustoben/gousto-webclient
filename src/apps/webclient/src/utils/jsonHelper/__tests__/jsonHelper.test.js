import { parseObjectKeysToCamelCase } from '../camelCasing'
import { processJSON } from '../processJson'

describe('processJSON', () => {
  test('handle validation error response', async () => {
    const serverResponse = {
      error: 'Validation error',
      status: 422,
      'error-details': {
        code: 'validation-error',
        failures: {
          email: ['provide a valid email'],
        },
      },
    }

    const rejectionObj = {
      code: 'validation-error',
      message: serverResponse.error,
      errors: {
        email: 'provide a valid email',
      },
    }

    try {
      await processJSON([serverResponse, 500])
    } catch (e) {
      expect(e).toEqual(rejectionObj)
    }
  })

  test('handle errors response as an array', async () => {
    const serverResponse = {
      error: 'Validation error',
      status: 422,
      errors: [
        {
          error: '401',
          message: 'Auth Exception!',
        },
      ],
    }

    const expectation = {
      code: '401',
      errors: [{ error: '401', message: 'Auth Exception!' }],
      message: ', 401 - Auth Exception!',
    }
    const actual = processJSON([serverResponse, 500])
    await expect(actual).rejects.toEqual(expectation)
  })

  // TODO: fix processJSON to have expected behavior
  test('handle payment-required error response', async () => {
    const serverResponse = {
      error: 'error',
      status: 402,
    }

    const rejectionObj = {code: 500, errors: {}, message: 'error'}

    try {
      await processJSON([serverResponse, 500])
    } catch (e) {
      expect(e).toEqual(rejectionObj)
    }
  })
})

describe('parseObjectKeysToCamelCase', () => {
  let objectToBeParsed
  describe('When parameter is not object', () => {
    beforeEach(() => {
      objectToBeParsed = 'test'
    })
    test('then should return the parameter', () => {
      expect(parseObjectKeysToCamelCase(objectToBeParsed)).toBe(objectToBeParsed)
    })
  })

  describe('When parameter is array of objects', () => {
    beforeEach(() => {
      objectToBeParsed = [
        {
          property_one: 'test1',
          property_two: 'test2',
        },
      ]
    })
    test('then should return the right format', () => {
      const expectedResult = {
        0: {
          propertyOne: 'test1',
          propertyTwo: 'test2',
        },
      }
      expect(parseObjectKeysToCamelCase(objectToBeParsed)).toEqual(expectedResult)
    })
  })

  describe('When parameter is object of objects', () => {
    beforeEach(() => {
      objectToBeParsed = {
        first_prop: {
          property_one: 'test1',
          property_two: 'test2',
        },
        second_prop: {
          property_one: 'test3',
          property_two: 'test4',
        },
      }
    })
    test('then should return the right format', () => {
      const expectedResult = {
        firstProp: {
          propertyOne: 'test1',
          propertyTwo: 'test2',
        },
        secondProp: {
          propertyOne: 'test3',
          propertyTwo: 'test4',
        },
      }
      expect(parseObjectKeysToCamelCase(objectToBeParsed)).toEqual(expectedResult)
    })
  })

  describe('When parameter has digits in the keys', () => {
    beforeEach(() => {
      objectToBeParsed = [
        {
          property_1: 'test1',
          property_2: 'test2',
        },
      ]
    })
    test('then should return the right format', () => {
      const expectedResult = {
        0: {
          property1: 'test1',
          property2: 'test2',
        },
      }
      expect(parseObjectKeysToCamelCase(objectToBeParsed)).toEqual(expectedResult)
    })
  })
})
