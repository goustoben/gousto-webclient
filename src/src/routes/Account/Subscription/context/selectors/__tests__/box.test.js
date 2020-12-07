import {
  getNumPortions,
  getDietaryPreference,
  getIsBoxLoaded,
  getMealsPerBox,
  getBoxPricesNumPortion,
  getIsBoxPricesLoaded,
  getIsBoxAndPricesLoaded,
  getPricePerPortionDiscounted,
  getTotalBoxPriceDiscounted
} from '../box'

describe('box selectors', () => {
  let contextState
  beforeEach(() => {
    contextState = {
      box: {
        numPortions: 2,
        numRecipes: 2,
        dietaryPreference: {
          currentValue: 'gourmet'
        },
        mealsPerBox: {
          currentValue: '2'
        },
        requestState: {
          isLoaded: true,
          isLoading: false
        }
      },
      boxPrices: {
        2: {
          2: {
            gourmet: {
              pricePerPortionDiscounted: '3.99',
              recipeTotalDiscounted: '24.59'
            }
          }
        },
        requestState: {
          isLoaded: true,
          isLoading: false
        }
      },
    }
  })

  describe('getIsBoxLoaded', () => {
    test('should return false if there is no box data', () => {
      expect(getIsBoxLoaded({})).toEqual(false)
    })

    test('should return true if there is box data and is loaded', () => {
      expect(getIsBoxLoaded(contextState)).toEqual(true)
    })
  })

  describe('getIsBoxPricesLoaded', () => {
    test('should return false if there is no box data', () => {
      expect(getIsBoxPricesLoaded({})).toEqual(false)
    })

    test('should return true if there is box prices data and is loaded', () => {
      expect(getIsBoxPricesLoaded(contextState)).toEqual(true)
    })
  })

  describe('getNumPortions', () => {
    test('should return numPortions', () => {
      expect(getNumPortions(contextState)).toEqual(2)
    })
  })

  describe('getDietaryPreference', () => {
    test('should return dietaryPreference currentValue', () => {
      expect(getDietaryPreference(contextState)).toEqual('gourmet')
    })

    describe('When dietaryPreferences is not defined', () => {
      beforeEach(() => {
        contextState.dietaryPreference = undefined
      })
      test('should reselect from box_type', () => {
        expect(getDietaryPreference(contextState)).toEqual('gourmet')
      })
    })
  })

  describe('getMealsPerBox', () => {
    test('should return mealsPerBox currentValue', () => {
      expect(getMealsPerBox(contextState)).toEqual('2')
    })

    describe('When mealsPerBox is not defined', () => {
      beforeEach(() => {
        contextState.mealsPerBox = undefined
      })
      test('should reselect from num_recipes', () => {
        expect(getMealsPerBox(contextState)).toEqual('2')
      })
    })
  })

  describe('getBoxPricesNumPortion', () => {
    test('should return mealsPerBox currentValue', () => {
      expect(getBoxPricesNumPortion(contextState)).toEqual({ 2: { gourmet: { pricePerPortionDiscounted: '3.99', recipeTotalDiscounted: '24.59' }}})
    })

    describe('When getBoxPricesNumPortion is not defined', () => {
      beforeEach(() => {
        contextState.getBoxPricesNumPortion = undefined
      })
      test('should reselect from box prices', () => {
        expect(getBoxPricesNumPortion(contextState)).toEqual({ 2: { gourmet: { pricePerPortionDiscounted: '3.99', recipeTotalDiscounted: '24.59' }}})
      })
    })
  })

  describe('getIsBoxAndPricesLoaded', () => {
    test('should return true', () => {
      expect(getIsBoxAndPricesLoaded(contextState)).toEqual(true)
    })
  })

  describe('getPricePerPortionDiscounted', () => {
    test('should return pricePerPortionDiscounted', () => {
      expect(getPricePerPortionDiscounted(contextState)).toEqual('3.99')
    })
  })

  describe('getPricePerPortionDiscounted', () => {
    test('should return recipeTotalDiscounted', () => {
      expect(getTotalBoxPriceDiscounted(contextState)).toEqual('24.59')
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

    describe('getDietaryPreference', () => {
      test('should return undefined', () => {
        expect(getDietaryPreference(contextState)).toBe(undefined)
      })
    })

    describe('getMealsPerBox', () => {
      test('should return undefined', () => {
        expect(getMealsPerBox(contextState)).toBe(undefined)
      })
    })

    describe('getBoxPricesNumPortion', () => {
      test('should return undefined', () => {
        expect(getBoxPricesNumPortion(contextState)).toBe(undefined)
      })
    })

    describe('getIsBoxAndPricesLoaded', () => {
      test('should return false', () => {
        expect(getIsBoxAndPricesLoaded(contextState)).toEqual(false)
      })
    })
  })
})
