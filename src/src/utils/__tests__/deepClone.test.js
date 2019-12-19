import { deepCloneObject } from '../deepClone'

describe('deepCloneObject', () => {
  test('should deepClone object', () => {
    const object = {
      a: {
        b: {
          c: 'c'
        }
      }
    }

    const expectedResult = {
      a: {
        b: {
          c: 'c'
        }
      }
    }

    expect(deepCloneObject(object)).toEqual(expectedResult)
  })
})
