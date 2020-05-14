import Immutable from 'immutable'
import { isRecipeInBasket, isRecipeInStock } from 'utils/menu'
import { getSortedRecipes, getInStockRecipes } from '../sorting'

jest.mock('utils/menu')

describe('RecipeList selectors', () => {
  const VALID_COLLECTION_ID = '77d1eb54-e3e5-11e7-bf51-06543e25a81c'
  const firstRecipe = Immutable.fromJS({ id: '327' })
  const secondRecipe = Immutable.fromJS({ id: '819' })
  const thirdRecipe = Immutable.fromJS({ id: '777' })
  const variantRecipe = Immutable.fromJS({ id: '820' })
  const menuCollectionRecipes = Immutable.fromJS({
    [VALID_COLLECTION_ID]: ['327', '819']
  })

  const allRecipes = Immutable.fromJS([firstRecipe, secondRecipe, thirdRecipe, variantRecipe])
  const inStockRecipes = Immutable.fromJS([secondRecipe])
  let currentMenuRecipes = Immutable.List([firstRecipe.get('id'), secondRecipe.get('id'),thirdRecipe.get('id'),variantRecipe.get('id')])
  let getCurrentMenuRecipesWithVariantsReplacedFunc = jest.fn().mockReturnValue(currentMenuRecipes)

  describe('getSortedRecipes', () => {
    describe('no collection id provided', () => {
      test('should return all recipes with in stock first', () => {
        const { recipes } = getSortedRecipes.resultFunc(menuCollectionRecipes, allRecipes, inStockRecipes, null, getCurrentMenuRecipesWithVariantsReplacedFunc)(null)
        expect(recipes).toEqual(Immutable.fromJS([
          secondRecipe, firstRecipe, thirdRecipe, variantRecipe
        ]))
      })

      test('should return all recipe ids in original order', () => {
        const { recipeIds } = getSortedRecipes.resultFunc(menuCollectionRecipes, allRecipes, inStockRecipes, null, getCurrentMenuRecipesWithVariantsReplacedFunc)(null)

        expect(recipeIds).toEqual(Immutable.fromJS([
          firstRecipe.get('id'), secondRecipe.get('id'), thirdRecipe.get('id'), variantRecipe.get('id')
        ]))
      })
    })

    describe('wrong collection id provided', () => {
      test('should return all recipes with in stock first', () => {
        const { recipes } = getSortedRecipes.resultFunc(menuCollectionRecipes, allRecipes, inStockRecipes, null, getCurrentMenuRecipesWithVariantsReplacedFunc)('non-existent-collection')

        expect(recipes).toEqual(Immutable.fromJS([
          secondRecipe, firstRecipe, thirdRecipe, variantRecipe
        ]))
      })

      test('should return all recipe ids in original order', () => {
        const { recipeIds } = getSortedRecipes.resultFunc(menuCollectionRecipes, allRecipes, inStockRecipes, null, getCurrentMenuRecipesWithVariantsReplacedFunc)('non-existent-collection')

        expect(recipeIds).toEqual(Immutable.fromJS([
          firstRecipe.get('id'), secondRecipe.get('id'), thirdRecipe.get('id'), variantRecipe.get('id')
        ]))
      })
    })

    describe('collection id provided', () => {
      beforeEach(() => {
        currentMenuRecipes = Immutable.List([firstRecipe.get('id'), secondRecipe.get('id')])
        getCurrentMenuRecipesWithVariantsReplacedFunc = jest.fn().mockReturnValue(currentMenuRecipes)
      })

      test('should return recipes in collection with in stock first', () => {
        const { recipes } = getSortedRecipes.resultFunc(menuCollectionRecipes, allRecipes, inStockRecipes, null, getCurrentMenuRecipesWithVariantsReplacedFunc)(VALID_COLLECTION_ID)

        expect(recipes).toEqual(Immutable.fromJS([
          secondRecipe, firstRecipe
        ]))
      })

      test('should return recipe ids for recipes in collection in original order', () => {
        const { recipeIds } = getSortedRecipes.resultFunc(menuCollectionRecipes, allRecipes, inStockRecipes, null, getCurrentMenuRecipesWithVariantsReplacedFunc)(VALID_COLLECTION_ID)

        expect(recipeIds).toEqual(Immutable.fromJS([
          firstRecipe.get('id'), secondRecipe.get('id')
        ]))
      })

      describe('when menuRecipes in different order than recipesInCollection', () => {
        const reorderedMenuRecipes = Immutable.fromJS([secondRecipe, thirdRecipe, firstRecipe])

        test('should return recipes in recipeInCollection order', () => {
          const { recipeIds } = getSortedRecipes.resultFunc(menuCollectionRecipes, reorderedMenuRecipes, inStockRecipes, null, getCurrentMenuRecipesWithVariantsReplacedFunc)(VALID_COLLECTION_ID)

          expect(recipeIds).toEqual(Immutable.fromJS([
            firstRecipe.get('id'), secondRecipe.get('id')
          ]))
        })
      })

      describe('when collection id is recommendation collection', () => {
        const recommendationCollection = Immutable.fromJS({
          id: VALID_COLLECTION_ID,
          published: true,
          slug: 'recommendations'
        })

        test('should only return in stock recipes', () => {
          const { recipes } = getSortedRecipes.resultFunc(menuCollectionRecipes, allRecipes, inStockRecipes, recommendationCollection, getCurrentMenuRecipesWithVariantsReplacedFunc)(VALID_COLLECTION_ID)

          expect(recipes).toEqual(Immutable.fromJS([
            secondRecipe
          ]))
        })
      })

      describe('when the currentMenuRecipes have variant replaced', () => {
        beforeEach(() => {
          currentMenuRecipes = Immutable.List([firstRecipe.get('id'), variantRecipe.get('id')])
          getCurrentMenuRecipesWithVariantsReplacedFunc = jest.fn().mockReturnValue(currentMenuRecipes)
        })
        test('should display the vaiant instead of the default value', () => {
          const { recipes } = getSortedRecipes.resultFunc(menuCollectionRecipes, allRecipes, inStockRecipes, null, getCurrentMenuRecipesWithVariantsReplacedFunc)(VALID_COLLECTION_ID)

          expect(recipes).toEqual(Immutable.fromJS([
            firstRecipe, variantRecipe
          ]))
        })
      })
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
