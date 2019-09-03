import Immutable from 'immutable'

import {
  filterRecipesByNew,
  formatRecipeTitle,
  isNew,
  getCookingTime,
  getFoodBrand,
  getLowStockTag,
  getSurcharge,
  getSurchargePerPortion,
  getTaxonomyTags,
  roundUp,
  isAvailableRecipeList
} from 'utils/recipe'

jest.mock('config', () => ({
  menu: { stockTagTreshold: 10, stockThreshold: 0 },
  recipes: {
    range: {
      badges: { testRange: { text: 'An Example Range' } },
    },
  },
}))

describe('recipes', () => {
  describe('getLowStockTag', () => {
    test('should return nothing if theres enough stock and not new', () => {
      expect(getLowStockTag(100, 10)).toBe('')
    })

    test('should return new when no rating count', () => {
      expect(getLowStockTag(100, 0)).toBe('New Recipe')
    })

    test('should return new recipe when no rating count and view is simple', () => {
      expect(getLowStockTag(100, 0, 'simple')).toBe('New Recipe')
    })

    test('should show sold out when no stock', () => {
      expect(getLowStockTag(0, 10)).toBe('Sold Out')
    })

    test('should show #no left when below treshold', () => {
      expect(getLowStockTag(4, 10)).toBe('Just 4 left')
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
      boxType = dietType = 'Vegetarian'
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

    test('should return the cooking over 120 mins time correctly', () => {
      expect(getCookingTime(160)).toBe('2 hrs 40 mins')
    })
  })

  describe('getFoodBrand', () => {
    test('should return null if no item is found', () => {
      expect(getFoodBrand('test')).toBe(Immutable.Map())
    })

    test('should return an object if food brand matches', () => {
      const recipe = Immutable.fromJS({
        taxonomy: [
          {
            id: 2,
            name: "Food Brands",
            slug: "food-brands",
            tags: [
              {
                id: "9",
                name: "Fine Dine In",
                properties: { ribbon_color: "#333D47", border_color: "#282B2F", text_color: "#FFFFFF" },
                slug: "fine-dine-in"
              }
            ]
          }
        ]
      })
      expect(getFoodBrand(recipe)).toEqual(Immutable.fromJS({
        id: "9",
        name: "Fine Dine In",
        properties: { ribbon_color: "#333D47", border_color: "#282B2F", text_color: "#FFFFFF" },
        slug: "fine-dine-in"
      }))
    })
  })

  describe('getTaxonomyTags', () => {
    let recipe

    test('if no taxonomy is found should return an empty Immutable.List', () => {
      recipe = Immutable.fromJS({
        id: '327',
        dietType: 'Meat',
        taxonomy: [
          {
            id: 1,
            name: 'Dietary attributes',
            slug: 'dietary-attributes',
            tags: [],
          },
        ],
      })

      expect(getTaxonomyTags(recipe, 'test-category')).toEqual(Immutable.List([]))
    })

    test('should return taxonomy tags in the given category', () => {
      recipe = Immutable.fromJS({
        id: '327',
        dietType: 'Meat',
        taxonomy: [
          {
            id: 1,
            name: 'Test Category',
            slug: 'test-category',
            tags: [
              { slug: 'test-attribute' },
            ],
          },
          {
            id: 2,
            name: 'Alternate Category',
            slug: 'alternate-category',
            tags: [
              { slug: 'alternate-attribute-1' },
              { slug: 'alternate-attribute-2' },
            ],
          },
        ],
      })

      expect(getTaxonomyTags(recipe, 'test-category').size).toEqual(1)
      expect(getTaxonomyTags(recipe, 'alternate-category').size).toEqual(2)
    })
  })

  describe('isNew', () => {
    test('should only return true for recipes that have an offset of 0 or a positive number', () => {
      const recipe1 = Immutable.fromJS({
        availability: [
          {
            id: "123456789",
            offset: -12,
          },
          {
            id: "098765432",
            offset: 0,
          },
        ],
      })
      const recipe2 = Immutable.fromJS({
        availability: [
          {
            id: "5454545454",
            offset: 0,
          },
          {
            id: "6767676767",
            offset: 5,
          },
        ],
      })

      expect(isNew(recipe1)).toBe(false)
      expect(isNew(recipe2)).toBe(true)
    })
  })

  describe('filterRecipesByNew', () => {
    test('should only return recipes if they have an offset of 0 or a positive number', () => {
      const recipes = Immutable.fromJS({
        recipe1: {
          availability: [
            {
              id: "123456789",
              offset: -12,
            },
            {
              id: "098765432",
              offset: 0,
            },
          ]
        },
        recipe2: {
          availability: [
            {
              id: "5454545454",
              offset: 0,
            },
            {
              id: "6767676767",
              offset: 5,
            },
          ]
        }
      })

      expect(filterRecipesByNew(recipes).size).toBe(1)
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
    test('should return recipes if available in store', () => {
      const recipeIds = Immutable.Map({'1138': 1})
      const recipesStore = Immutable.Map({'1138': Immutable.Map({"id": "1138"}), '1': Immutable.Map({"id": "1"})})
      const result = isAvailableRecipeList(recipeIds, recipesStore)

      expect(result).toEqual(Immutable.Map({'1138': Immutable.Map({"id": "1138"})}))
    })

    test('should return empty map if not available in store', () => {
      const recipeIds = Immutable.Map({'123': 1})
      const recipesStore = Immutable.Map({'1138': Immutable.Map({"id": "1138"}), '1': Immutable.Map({"id": "1"})})
      const result = isAvailableRecipeList(recipeIds, recipesStore)

      expect(result).toEqual(Immutable.Map({}))
    })
  })
})
