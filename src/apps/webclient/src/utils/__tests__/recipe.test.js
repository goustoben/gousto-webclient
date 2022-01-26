import Immutable from 'immutable'
import {
  formatRecipeTitle,
  getCookingTime,
  getSurcharge,
  getSurchargePerPortion,
  roundUp,
  isAvailableRecipeList,
  getRecipeId,
  getDietaryTags } from '../recipe'

jest.mock('config', () => ({
  menu: { stockTagTreshold: 10, stockThreshold: 0 },
  recipes: {
    range: {
      badges: { testRange: { text: 'An Example Range' } },
    },
  },
}))

describe('given recipes utility functions', () => {
  describe('when the getRecipeId is called', () => {
    test('then the recipe id is returned', () => {
      const recipe = Immutable.Map({ id: 'someId'})
      expect(getRecipeId(recipe)).toBe('someId')
    })
  })

  describe('when the getDietaryTags is called', () => {
    describe('when a valid recipe is sent as param', () => {
      let recipe
      beforeEach(() => {
        recipe = Immutable.fromJS({
          dietaryClaims: [{
            slug: 'gluten-free'
          }]
        })
      })
      test('should return recipe dietaryClaims array of tags', () => {
        const result = getDietaryTags(recipe)
        expect(result).toEqual(Immutable.List(['gluten-free']))
      })
    })
    describe('when a null recipe is sent as param', () => {
      let recipe
      beforeEach(() => {
        recipe = null
      })
      test('should return recipe dietaryClaims array of tags', () => {
        const result = getDietaryTags(recipe)
        expect(result).toEqual(Immutable.List([]))
      })
    })
  })
})

describe('formatRecipeTitle', () => {
  const title = 'A Test Recipe'
  let boxType
  let dietType

  test('should return the title if boxType and dietType are empty', () => {
    expect(formatRecipeTitle(title, '', '')).toBe(title)
  })

  test('should append (V) to the title if boxType and dietType are Vegetarian', () => {
    boxType = 'Vegetarian'
    dietType = 'Vegetarian'
    expect(formatRecipeTitle(title, boxType, dietType)).toContain('(V)')
    expect(formatRecipeTitle(title, boxType, dietType)).toContain(title)
  })

  test('should append (V) to the title if dietType is Vegan', () => {
    dietType = 'Vegan'
    expect(formatRecipeTitle(title, boxType, dietType)).toContain('(V)')
    expect(formatRecipeTitle(title, boxType, dietType)).toContain(title)
  })
})

describe('getSurcharge', () => {
  let meals

  test('should return null if no surcharges are passed', () => {
    meals = Immutable.List([])

    expect(getSurcharge(meals, 2)).toBeNull()
  })

  test('should return a surcharge for the correct numPortions', () => {
    const [twoPersonSurcharge, fourPersonSurcharge] = [1.99, 2.99]
    meals = Immutable.fromJS([
      { numPortions: 2, surcharge: { listPrice: twoPersonSurcharge } },
      { numPortions: 4, surcharge: { listPrice: fourPersonSurcharge } },
    ])

    expect(getSurcharge(meals, 2)).toBe(twoPersonSurcharge)
    expect(getSurcharge(meals, 4)).toBe(fourPersonSurcharge)
  })
})

describe('getCookingTime', () => {
  test('should return cooking time under 90 mins correctly ', () => {
    expect(getCookingTime(1)).toBe('1 mins')
  })

  test('should return the cooking time for 1 hr correctly', () => {
    expect(getCookingTime(60)).toBe('60 mins')
  })

  test('should return the cooking time for 89 mins correctly', () => {
    expect(getCookingTime(89)).toBe('89 mins')
  })

  test('should return the cooking over 90 mins time correctly', () => {
    expect(getCookingTime(95)).toBe('1 hr 35 mins')
  })

  test('should return the cooking over 160 mins time correctly', () => {
    expect(getCookingTime(160)).toBe('2 hrs 40 mins')
  })

  test('should return the cooking over 120 mins time correctly', () => {
    expect(getCookingTime(120)).toBe('2 hrs')
  })
})

describe('the getSurchargePerPortion function', () => {
  describe('when the number of portions is 2', () => {
    test('should calculate the surcharge per portion', () => {
      expect(getSurchargePerPortion(1.99, 2)).toBe(1.00)
    })
  })

  describe('when the number of portions is 4', () => {
    test('should calculate the surcharge per portion', () => {
      expect(getSurchargePerPortion(4.99, 4)).toBe(1.25)
    })
  })
})

describe('the roundUp function', () => {
  describe('when using the default precision', () => {
    test('should not round up when the value is already at the default precision', () => {
      expect(roundUp(1.99)).toBe(1.99)
    })

    test('should round up using the default precision', () => {
      expect(roundUp(0.756)).toBe(0.76)
      expect(roundUp(1.543)).toBe(1.55)
    })
  })

  describe('when not using the default precision', () => {
    test('should round up to the specified precision', () => {
      expect(roundUp(0.756, 0.1)).toBe(0.8)
      expect(roundUp(1.543, 0.1)).toBe(1.6)
    })
  })
})

describe('isAvailableRecipeList', () => {
  describe('when recipes are avilable in the store', () => {
    let result
    beforeEach(() => {
      const recipeIds = Immutable.Map({1138: 1})
      const recipesStore = Immutable.Map({1138: Immutable.Map({id: '1138'}), 1: Immutable.Map({id: '1'})})
      result = isAvailableRecipeList(recipeIds, recipesStore)
    })

    test('should return recipes', () => {
      expect(result).toEqual(Immutable.Map({1138: Immutable.Map({id: '1138'})}))
    })
  })

  describe('when receipes are not available in store', () => {
    let result
    beforeEach(() => {
      const recipeIds = Immutable.Map({123: 1})
      const recipesStore = Immutable.Map({1138: Immutable.Map({id: '1138'}), 1: Immutable.Map({id: '1'})})
      result = isAvailableRecipeList(recipeIds, recipesStore)
    })

    test('should return empty map', () => {
      expect(result).toEqual(Immutable.Map({}))
    })
  })
})

