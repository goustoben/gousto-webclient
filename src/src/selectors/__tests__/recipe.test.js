import Immutable from 'immutable'
import {
  getRecipeTitle, getRecipeURL, getRecipeImages,
  getDisclaimerForRecipeID, getMicronutrientsForRecipeID,
  getRecipeById
} from '../recipe'

describe('the recipe selectors', () => {
  let recipe

  beforeEach(() => {
    recipe = Immutable.fromJS({
      title: 'recipe title',
      url: 'recipe url',
      media: {
        images: [
          { urls: [{ src: 'image src x50', width: 50 }] },
          { urls: [{ src: 'image src x100', width: 100 }] }
        ]
      }
    })
  })

  describe('getRecipeTitle', () => {
    test('returns the title from the recipe', () => {
      expect(getRecipeTitle(recipe)).toBe('recipe title')
    })
  })
  describe('getRecipeURL', () => {
    test('returns the url from the recipe', () => {
      expect(getRecipeURL(recipe)).toBe('recipe url')
    })
  })
  describe('getRecipeImages', () => {
    test('returns the images from the recipe', () => {
      expect(getRecipeImages(recipe)).toEqual(
        Immutable.fromJS([{ src: 'image src x50', width: 50 }])
      )
    })
  })
})

describe('health kitchen recipe selectors', () => {
  let state
  beforeAll(() => {
    state = {
      recipes: Immutable.fromJS({
        1: {
          nutrtitional_information: {
            micronutrients: [
              {
                name: 'Iron',
                content: {
                  amount: 6.5,
                  unit: 'µg'
                },
                nrv_percent: 46.4
              },
              {
                name: 'Magnesium',
                content: {
                  amount: 197.5,
                  unit: 'mg'
                },
                nrv_percent: 52.7
              }
            ]
          },
          healthKitchen: {
            disclaimer: 'Iron, magnesium and B vitamins reducing tiredness and fatigue',
          }
        }
      })
    }
  })
  describe('getDisclaimerForRecipeID', () => {
    describe('when recipe is health kitchen', () => {
      test('should return the recipe disclaimer', () => {
        expect(getDisclaimerForRecipeID(state, '1')).toEqual('Iron, magnesium and B vitamins reducing tiredness and fatigue')
      })
    })
    describe('when recipe is not health kitchen', () => {
      test('should not return the recipe disclaimer', () => {
        expect(getDisclaimerForRecipeID(state, '2')).toEqual(null)
      })
    })
  })

  describe('getMicronutrientsForRecipeID', () => {
    describe('when recipe is health kitchen', () => {
      test('should return the recipe micronutrients', () => {
        expect(getMicronutrientsForRecipeID(state, '1')).toEqual(state.recipes.getIn(['1', 'nutritional_information', 'micronutrients']))
      })
    })
  })
  describe('when recipe is not health kitchen', () => {
    test('should not return the recipe micronutrients', () => {
      expect(getDisclaimerForRecipeID(state, '2')).toEqual(null)
    })
  })
})

describe('getRecipeById', () => {
  let state = {}
  test('should return recipe with passed id', () => {
    state = {
      recipes: Immutable.fromJS({
        123: {
          id: '123'
        }
      })
    }
    const recipeId = '123'
    const result = getRecipeById(state, recipeId)
    expect(result).toEqual(Immutable.fromJS({
      id: '123'
    }))
  })

  test('should return null', () => {
    state = {
      recipes: Immutable.fromJS({
        123: {
          id: '123'
        }
      })
    }
    const recipeId = '234'
    const result = getRecipeById(state, recipeId)
    expect(result).toEqual(null)
  })
})
