import Immutable from 'immutable'
import { ALL_RECIPES_COLLECTION_ID } from 'config/collections'
import { getRecipesFromAllRecipesCollection } from '../carouselRecipes'

describe('carouselRecipe', () => {
  let menuCollectionRecipes
  let allRecipes

  beforeEach(() => {
    menuCollectionRecipes = Immutable.Map({ [ALL_RECIPES_COLLECTION_ID]: ['123', '456'] })
    allRecipes = Immutable.fromJS([Immutable.Map({ id: '123', details: 'some details' })])
  })

  test('should return a map of recipes from the "all recipes" collection in the order of the collection', () => {
    const result = getRecipesFromAllRecipesCollection.resultFunc(menuCollectionRecipes, allRecipes)
    expect(result.toJSON()).toEqual({
      123: {
        details: 'some details',
        id: '123'
      }
    })
  })

  test('should return an empty map when no recipes details are available', () => {
    const emptyAllRecipes = Immutable.fromJS({})
    const result = getRecipesFromAllRecipesCollection.resultFunc(menuCollectionRecipes, emptyAllRecipes)
    expect(result.toJSON()).toEqual({})
  })
})
