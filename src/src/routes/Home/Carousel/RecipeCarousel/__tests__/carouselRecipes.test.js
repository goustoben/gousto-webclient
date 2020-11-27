import Immutable from 'immutable'
import { ALL_RECIPES_COLLECTION_ID } from 'config/collections'
import { getRecipesFromAllRecipesCollection } from '../carouselRecipes'

describe('getRecipesFromAllRecipesCollection', () => {
  let menuCollections
  let allRecipes
  let isHomePageRedesignEnabled

  describe('when isHomePageRedesignEnabled is false', () => {
    beforeEach(() => {
      menuCollections = Immutable.fromJS({ [ALL_RECIPES_COLLECTION_ID]: { recipesInCollection: ['123', '456']} })
      allRecipes = Immutable.fromJS([{ id: '123', details: 'some details' }])
      isHomePageRedesignEnabled = false
    })

    test('should return a map of recipes from the "all recipes" collection in the order of the collection', () => {
      const result = getRecipesFromAllRecipesCollection.resultFunc(menuCollections, allRecipes, isHomePageRedesignEnabled)
      expect(result.toJSON()).toEqual({
        123: {
          details: 'some details',
          id: '123'
        }
      })
    })

    test('should return an empty map when no recipes details are available', () => {
      const emptyAllRecipes = Immutable.fromJS({})
      const result = getRecipesFromAllRecipesCollection.resultFunc(menuCollections, emptyAllRecipes, isHomePageRedesignEnabled)
      expect(result.toJSON()).toEqual({})
    })
  })

  describe('when isHomePageRedesignEnabled is true', () => {
    describe('and there are no recipes', () => {
      beforeEach(() => {
        menuCollections = Immutable.fromJS({ [ALL_RECIPES_COLLECTION_ID]: { recipesInCollection: ['123', '456', '954']} })
        allRecipes = Immutable.fromJS({})
        isHomePageRedesignEnabled = true
      })

      test('then should return an empty object', () => {
        const result = getRecipesFromAllRecipesCollection.resultFunc(menuCollections, allRecipes, isHomePageRedesignEnabled)
        expect(result.toJSON()).toEqual({})
      })
    })

    describe('and there is a recipe that meet all requirements for redesign', () => {
      beforeEach(() => {
        menuCollections = Immutable.fromJS({ [ALL_RECIPES_COLLECTION_ID]: { recipesInCollection: ['123', '456', '954']} })
        allRecipes = Immutable.fromJS([
          { id: '123', title: 'title', foodBrand: Immutable.Map({ slug: 'slug' }) },
          { id: '456', title: "Charlie Bigham's", foodBrand: Immutable.Map({ slug: 'slug-slug' }) },
          { id: '954', title: 'title title', foodBrand: Immutable.Map({ slug: 'everyday-favourites' }) },
        ])
        isHomePageRedesignEnabled = true
      })

      test('then should return recipe with 123 id only', () => {
        const result = getRecipesFromAllRecipesCollection.resultFunc(menuCollections, allRecipes, isHomePageRedesignEnabled)
        expect(result.toJSON()).toEqual({
          123: {
            title: 'title',
            foodBrand: { slug: 'slug' },
            id: '123'
          }
        })
      })
    })
  })
})
