import Immutable from 'immutable'
import { isRecipeInBasket, isRecipeInStock } from 'utils/menu'
import { getSortedRecipes, getCurrentMenuRecipes, getInStockRecipes } from '../sorting'

jest.mock('utils/menu')

describe('RecipeList selectors', () => {
  const VALID_COLLECTION_ID = '77d1eb54-e3e5-11e7-bf51-06543e25a81c'
  const firstRecipe = Immutable.fromJS({ id: '327' })
  const secondRecipe = Immutable.fromJS({ id: '819' })
  const thirdRecipe = Immutable.fromJS({ id: '777' })
  const menuCollectionRecipes = Immutable.fromJS({
    [VALID_COLLECTION_ID]: [ '327', '819' ]
  })
  let currentMenuRecipes = Immutable.fromJS([firstRecipe, secondRecipe, thirdRecipe])
  const inStockRecipes = Immutable.fromJS([secondRecipe])

  describe('getSortedRecipes', () => {
    describe('no collection id provided', () => {
      test('should return all recipes with in stock first', () => {
        const { recipes } = getSortedRecipes.resultFunc(menuCollectionRecipes, currentMenuRecipes, inStockRecipes)(null)

        expect(recipes).toEqual(Immutable.fromJS([
          secondRecipe, firstRecipe, thirdRecipe
        ]))
      })

      test('should return all recipe ids in original order', () => {
        const { recipeIds } = getSortedRecipes.resultFunc(menuCollectionRecipes, currentMenuRecipes, inStockRecipes)(null)

        expect(recipeIds).toEqual(Immutable.fromJS([
          firstRecipe.get('id'), secondRecipe.get('id'), thirdRecipe.get('id')
        ]))
      })
    })

    describe('wrong collection id provided', () => {
      test('should return all recipes with in stock first', () => {
        const { recipes } = getSortedRecipes.resultFunc(menuCollectionRecipes, currentMenuRecipes, inStockRecipes)('non-existent-collection')

        expect(recipes).toEqual(Immutable.fromJS([
          secondRecipe, firstRecipe, thirdRecipe
        ]))
      })

      test('should return all recipe ids in original order', () => {
        const { recipeIds } = getSortedRecipes.resultFunc(menuCollectionRecipes, currentMenuRecipes, inStockRecipes)('non-existent-collection')

        expect(recipeIds).toEqual(Immutable.fromJS([
          firstRecipe.get('id'), secondRecipe.get('id'), thirdRecipe.get('id')
        ]))
      })
    })

    describe('collection id provided', () => {
      test('should return recipes in collection with in stock first', () => {
        const { recipes } = getSortedRecipes.resultFunc(menuCollectionRecipes, currentMenuRecipes, inStockRecipes)(VALID_COLLECTION_ID)

        expect(recipes).toEqual(Immutable.fromJS([
          secondRecipe, firstRecipe
        ]))
      })

      test('should return recipe ids for recipes in collection in original order', () => {
        const { recipeIds } = getSortedRecipes.resultFunc(menuCollectionRecipes, currentMenuRecipes, inStockRecipes)(VALID_COLLECTION_ID)

        expect(recipeIds).toEqual(Immutable.fromJS([
          firstRecipe.get('id'), secondRecipe.get('id')
        ]))
      })

      describe('when menuRecipes in different order than recipesInCollection', () => {
        beforeEach(() => {
          currentMenuRecipes = Immutable.fromJS([secondRecipe, thirdRecipe, firstRecipe])
        })
        test('should return recipes in recipeInCollection order', () => {
          const { recipeIds } = getSortedRecipes.resultFunc(menuCollectionRecipes, currentMenuRecipes, inStockRecipes)(VALID_COLLECTION_ID)

          expect(recipeIds).toEqual(Immutable.fromJS([
            firstRecipe.get('id'), secondRecipe.get('id')
          ]))
        })
      })
    })
  })

  describe('getCurrentMenuRecipes', () => {
    test('should return only recipes in the current menu', () => {
      const allRecipes = Immutable.fromJS({ recipeId1: { desc: 'recipe1Desc'}, recipeId2: { desc: 'recipe2Desc' }})
      const currentMenuIds = ['recipeId1']
      const result = getCurrentMenuRecipes.resultFunc(allRecipes, currentMenuIds)
      expect(result).toEqual([Immutable.fromJS({ desc: 'recipe1Desc' })])
    })
  })

  describe('getInStockRecipes', () => {
    const recipes = [Immutable.fromJS({ desc: 'recipe1Desc' })]
    const stock = []
    const basketRecipes = []
    const numPortions = []
    test('should return recipes when isRecipeInBasket is true', () => {
      isRecipeInBasket.mockImplementationOnce(() => true)
      const result = getInStockRecipes.resultFunc(recipes, stock, basketRecipes, numPortions)
      expect(result).toEqual([Immutable.fromJS({ desc: 'recipe1Desc' })])
    })

    test('should return recipes when isRecipeInStock is true', () => {
      isRecipeInStock.mockImplementationOnce(() => true)

      const result = getInStockRecipes.resultFunc(recipes, stock, basketRecipes, numPortions)
      expect(result).toEqual([Immutable.fromJS({ desc: 'recipe1Desc' })])
    })
  })
})
