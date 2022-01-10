import Immutable from 'immutable'
import { ALL_RECIPES_COLLECTION_ID } from 'config/collections'
import { getRecipesFromAllRecipesCollection } from '../carouselRecipes'

describe('getRecipesFromAllRecipesCollection', () => {
  let menuCollections
  let allRecipes

  describe('when there are no recipes', () => {
    beforeEach(() => {
      menuCollections = Immutable.fromJS({
        [ALL_RECIPES_COLLECTION_ID]: { recipesInCollection: ['123', '456', '954'] },
      })
      allRecipes = Immutable.fromJS({})
    })

    test('then should return an empty object', () => {
      const result = getRecipesFromAllRecipesCollection.resultFunc(menuCollections, allRecipes)
      expect(result.toJSON()).toEqual({})
    })
  })

  describe('when there is a recipe from everyday-favorites category', () => {
    beforeEach(() => {
      menuCollections = Immutable.fromJS({
        [ALL_RECIPES_COLLECTION_ID]: { recipesInCollection: ['123', '456', '954'] },
      })
      allRecipes = Immutable.fromJS([
        { id: '123', title: 'title', foodBrand: Immutable.Map({ slug: 'slug' }) },
        { id: '456', title: "Charlie Bigham's", foodBrand: Immutable.Map({ slug: 'slug-slug' }) },
        {
          id: '954',
          title: 'title title',
          foodBrand: Immutable.Map({ slug: 'everyday-favourites' }),
        },
      ])
    })

    test('then should return recipe with 123 id only', () => {
      const result = getRecipesFromAllRecipesCollection.resultFunc(menuCollections, allRecipes)
      expect(result.toJSON()).toEqual({
        123: {
          title: 'title',
          foodBrand: { slug: 'slug' },
          id: '123',
        },
      })
    })
  })
})
