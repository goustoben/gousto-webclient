import { getNumPortions, getNumRecipes, getDietaryPreference } from '../box'

describe('box selectors', () => {
  let contextState
  beforeEach(() => {
    contextState = {
      box: {
        numPortions: 2,
        numRecipes: 2,
        dietaryPreference: {
          currentValue: 'gourmet'
        }
      }
    }
  })

  describe('getNumPortions', () => {
    test('should return numPortions', () => {
      expect(getNumPortions(contextState)).toEqual(2)
    })
  })

  describe('getNumRecipes', () => {
    test('should return numRecipes', () => {
      expect(getNumRecipes(contextState)).toEqual(2)
    })
  })

  describe('getDietaryPreference', () => {
    test('should return dietaryPreference currentValue', () => {
      expect(getDietaryPreference(contextState)).toEqual('gourmet')
    })

    describe('When diateryPreferences is not defined', () => {
      beforeEach(() => {
        contextState.dietaryPreference = undefined
      })
      test('should return undefined', () => {
        expect(getDietaryPreference(contextState)).toEqual('gourmet')
      })
    })
  })

  describe('When box is not defined', () => {
    beforeEach(() => {
      contextState = {}
    })

    describe('getNumPortions', () => {
      test('should return undefined', () => {
        expect(getNumPortions(contextState)).toBe(undefined)
      })
    })

    describe('getNumRecipes', () => {
      test('should return undefined', () => {
        expect(getNumRecipes(contextState)).toBe(undefined)
      })
    })

    describe('getDietaryPreference', () => {
      test('should return undefined', () => {
        expect(getDietaryPreference(contextState)).toBe(undefined)
      })
    })
  })
})
