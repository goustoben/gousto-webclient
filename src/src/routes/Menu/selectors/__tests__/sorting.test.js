import Immutable from 'immutable'
import { isRecipeInBasket, isRecipeInStock } from 'utils/menu'
import { getInStockRecipes, getRecipeListRecipes, getRecipeComparatorFactory, getFilterFn } from '../sorting'

jest.mock('utils/menu')

// this code is replicated from sorting.js so that it's not using the same code under test
const createRecipeView = (originalId, recipe) => ({ originalId, recipe })
const createStandardRecipeView = (recipe) => ({ originalId: recipe.get('id'), recipe })

describe('RecipeList selectors', () => {
  const VALID_COLLECTION_ID = '77d1eb54-e3e5-11e7-bf51-06543e25a81c'
  const firstRecipe = Immutable.fromJS({ id: '327', sortOrder: 1 })
  const secondRecipe = Immutable.fromJS({ id: '819', sortOrder: 2 })
  const thirdRecipe = Immutable.fromJS({ id: '777', sortOrder: 3 })
  const variantRecipe = Immutable.fromJS({ id: '820', sortOrder: 4 })
  const menuCollectionRecipes = Immutable.fromJS({
    [VALID_COLLECTION_ID]: ['327', '819']
  })

  const allRecipes = Immutable.fromJS([firstRecipe, secondRecipe, thirdRecipe, variantRecipe])
  const inStockRecipes = Immutable.fromJS([firstRecipe, secondRecipe])

  describe('getRecipeComparatorFactory', () => {
    const comparator = getRecipeComparatorFactory.resultFunc(inStockRecipes)(allRecipes)

    describe('when comparator given two in stock recipes', () => {
      describe('when A is first in original order', () => {
        const a = firstRecipe
        const b = secondRecipe

        test('should return -1 (A first)', () => {
          const result = comparator(a, b)

          expect(result).toEqual(-1)
        })
      })

      describe('when B is first in original order', () => {
        const a = secondRecipe
        const b = firstRecipe

        test('should return 1 (B first)', () => {
          const result = comparator(a, b)

          expect(result).toEqual(1)
        })
      })
    })

    describe('when comparator given in stock recipe as A and out-of-stock recipe as B', () => {
      const a = firstRecipe
      const b = thirdRecipe

      test('should return -1 (A first)', () => {
        const result = comparator(a, b)

        expect(result).toEqual(-1)
      })
    })

    describe('when comparator given out-of-stock recipe as A and in-stock recipe as B', () => {
      const a = thirdRecipe
      const b = firstRecipe

      test('should return 1 (B first)', () => {
        const result = comparator(a, b)

        expect(result).toEqual(1)
      })
    })

    describe('when comparator given out-of-stock recipe as A and out-of-stock recipe as B', () => {
      describe('when A is first in original order', () => {
        const a = thirdRecipe
        const b = variantRecipe

        test('should return -1 (A first)', () => {
          const result = comparator(a, b)

          expect(result).toEqual(-1)
        })
      })

      describe('when B is first in original order', () => {
        const a = variantRecipe
        const b = thirdRecipe

        test('should return 1 (B first)', () => {
          const result = comparator(a, b)

          expect(result).toEqual(1)
        })
      })
    })
  })

  describe('getFilterFn', () => {
    describe('when no recommendations collection', () => {
      const recommendationCollection = null
      const collectionId = 'not-recommmendations-collection'

      test('should return null', () => {
        const result = getFilterFn.resultFunc(collectionId, recommendationCollection, inStockRecipes)

        expect(result).toEqual(null)
      })
    })

    describe('when not on recommendations collection', () => {
      const recommendationCollection = Immutable.fromJS({
        id: 'recommendations-collection',
        published: true,
        slug: 'recommendations'
      })
      const collectionId = 'not-recommmendations-collection'

      test('should return null', () => {
        const result = getFilterFn.resultFunc(collectionId, recommendationCollection, inStockRecipes)

        expect(result).toEqual(null)
      })
    })

    describe('when on recommendations collection', () => {
      const recommendationCollection = Immutable.fromJS({
        id: 'recommendations-collection',
        published: true,
        slug: 'recommendations'
      })
      const currentCollectionId = 'recommendations-collection'

      test('should return true for in-stock recipe', () => {
        const filterFn = getFilterFn.resultFunc(currentCollectionId, recommendationCollection, inStockRecipes)

        const passedFilter = filterFn(firstRecipe)
        expect(passedFilter).toEqual(true)
      })

      test('should return false for out-of-stock recipe', () => {
        const filterFn = getFilterFn.resultFunc(currentCollectionId, recommendationCollection, inStockRecipes)

        const passedFilter = filterFn(thirdRecipe)
        expect(passedFilter).toEqual(false)
      })
    })
  })

  describe('getRecipeListRecipes', () => {
    let selectedRecipeVariants

    beforeEach(() => {
      selectedRecipeVariants = {}
    })

    describe('no collection id provided', () => {
      const collectionId = null

      // and sort in ascending order
      const comparatorFactory = () => (a, b) => a.get('sortOrder') - b.get('sortOrder')

      test('should return all recipes, applying comparator', () => {
        const { recipes } = getRecipeListRecipes.resultFunc(allRecipes, menuCollectionRecipes, selectedRecipeVariants, collectionId, null, comparatorFactory)

        expect(recipes).toEqual(Immutable.List([
          createStandardRecipeView(firstRecipe), createStandardRecipeView(secondRecipe),
          createStandardRecipeView(thirdRecipe), createStandardRecipeView(variantRecipe)
        ]))
      })

      describe('when filterFn provided', () => {
        const filterFn = (recipe) => recipe !== secondRecipe

        test('should return all recipes with filterFn applied', () => {
          const { recipes } = getRecipeListRecipes.resultFunc(allRecipes, menuCollectionRecipes, selectedRecipeVariants, collectionId, filterFn, comparatorFactory)

          expect(recipes).toEqual(Immutable.List([
            createStandardRecipeView(firstRecipe), createStandardRecipeView(thirdRecipe), createStandardRecipeView(variantRecipe)
          ]))
        })
      })

      test('should return all recipe ids in original order', () => {
        const { recipeIds } = getRecipeListRecipes.resultFunc(allRecipes, menuCollectionRecipes, selectedRecipeVariants, collectionId, null, comparatorFactory)

        expect(recipeIds).toEqual(Immutable.fromJS([
          firstRecipe.get('id'), secondRecipe.get('id'), thirdRecipe.get('id'), variantRecipe.get('id')
        ]))
      })
    })

    describe('invalid collection id provided', () => {
      const collectionId = 'non-existent-collection'

      // sort in ascending order
      const comparatorFactory = () => (a, b) => a.get('sortOrder') - b.get('sortOrder')

      test('should return all recipes, applying comparator', () => {
        const { recipes } = getRecipeListRecipes.resultFunc(allRecipes, menuCollectionRecipes, selectedRecipeVariants, collectionId, null, comparatorFactory)

        expect(recipes).toEqual(Immutable.List([
          createStandardRecipeView(firstRecipe), createStandardRecipeView(secondRecipe),
          createStandardRecipeView(thirdRecipe), createStandardRecipeView(variantRecipe)
        ]))
      })

      describe('when filterFn provided', () => {
        const filterFn = (recipe) => recipe !== secondRecipe

        test('should return all recipes with filterFn applied', () => {
          const { recipes } = getRecipeListRecipes.resultFunc(allRecipes, menuCollectionRecipes, selectedRecipeVariants, collectionId, filterFn, comparatorFactory)

          expect(recipes).toEqual(Immutable.List([
            createStandardRecipeView(firstRecipe), createStandardRecipeView(thirdRecipe), createStandardRecipeView(variantRecipe)
          ]))
        })
      })

      test('should return all recipe ids in original order', () => {
        const { recipeIds } = getRecipeListRecipes.resultFunc(allRecipes, menuCollectionRecipes, selectedRecipeVariants, collectionId, null, comparatorFactory)

        expect(recipeIds).toEqual(Immutable.List([
          firstRecipe.get('id'), secondRecipe.get('id'), thirdRecipe.get('id'), variantRecipe.get('id')
        ]))
      })
    })

    describe('collection id provided', () => {
      const collectionId = VALID_COLLECTION_ID

      // sort in descending order
      const comparatorFactory = () => (a, b) => b.get('sortOrder') - a.get('sortOrder')

      test('should return all recipes in collection, applying comparator', () => {
        const { recipes } = getRecipeListRecipes.resultFunc(allRecipes, menuCollectionRecipes, selectedRecipeVariants, collectionId, null, comparatorFactory)

        expect(recipes).toEqual(Immutable.List([
          createStandardRecipeView(secondRecipe), createStandardRecipeView(firstRecipe)
        ]))
      })

      describe('when filterFn provided', () => {
        const filterFn = (recipe) => recipe !== secondRecipe

        test('should return all recipes in collection with filterFn applied', () => {
          const { recipes } = getRecipeListRecipes.resultFunc(allRecipes, menuCollectionRecipes, selectedRecipeVariants, collectionId, filterFn, comparatorFactory)

          expect(recipes).toEqual(Immutable.List([
            createStandardRecipeView(firstRecipe)
          ]))
        })
      })

      test('should return all recipe ids in for recipes in collection original order', () => {
        const { recipeIds } = getRecipeListRecipes.resultFunc(allRecipes, menuCollectionRecipes, selectedRecipeVariants, collectionId, null, comparatorFactory)

        expect(recipeIds).toEqual(Immutable.List([
          firstRecipe.get('id'), secondRecipe.get('id')
        ]))
      })

      describe('when menuRecipes in different order than recipesInCollection', () => {
        const reorderedMenuRecipes = Immutable.fromJS([secondRecipe, thirdRecipe, firstRecipe])

        test('should return recipes in recipeInCollection order', () => {
          const { recipeIds } = getRecipeListRecipes.resultFunc(reorderedMenuRecipes, menuCollectionRecipes, selectedRecipeVariants, collectionId, null, comparatorFactory)

          expect(recipeIds).toEqual(Immutable.List([
            firstRecipe.get('id'), secondRecipe.get('id')
          ]))
        })
      })

      describe('when variant selected', () => {
        beforeEach(() => {
          selectedRecipeVariants = {
            [collectionId]: {
              [firstRecipe.get('id')]: variantRecipe.get('id')
            }
          }
        })

        test('should return all recipes in collection, applying comparator, with variants replaced', () => {
          const { recipes } = getRecipeListRecipes.resultFunc(allRecipes, menuCollectionRecipes, selectedRecipeVariants, collectionId, null, comparatorFactory)

          expect(recipes).toEqual(Immutable.List([
            createRecipeView(firstRecipe.get('id'), variantRecipe), // first recipe was replaced with variant
            createStandardRecipeView(secondRecipe)
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
