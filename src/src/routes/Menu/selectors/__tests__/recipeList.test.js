import Immutable from 'immutable'
import { isRecipeInBasket } from 'utils/menu'
import * as recipeListSelectors from '../recipeList'

jest.mock('utils/menu')

// this code is replicated from sorting.js so that it's not using the same code under test
const createRecipeView = (originalId, recipe) => ({ originalId, recipe })
const createStandardRecipeView = (recipe) => ({ originalId: recipe.get('id'), recipe })

describe('RecipeList selectors', () => {
  const VALID_COLLECTION_ID = '77d1eb54-e3e5-11e7-bf51-06543e25a81c'
  const dietaryClaims = [
    {
      name: 'Gluten free',
      slug: 'gluten-free',
    }
  ]
  const firstRecipe = Immutable.fromJS({ id: '327', sortOrder: 1, dietaryClaims})
  const secondRecipe = Immutable.fromJS({ id: '819', sortOrder: 2, dietaryClaims })
  const thirdRecipe = Immutable.fromJS({ id: '777', sortOrder: 3, dietaryClaims })
  const variantRecipe = Immutable.fromJS({ id: '820', sortOrder: 4, dietaryClaims })

  const allRecipes = Immutable.fromJS([firstRecipe, secondRecipe, thirdRecipe, variantRecipe])

  let inStockRecipes
  let getMenuCollections
  let currentMenuVariants

  beforeEach(() => {
    inStockRecipes = Immutable.fromJS([firstRecipe, secondRecipe])

    getMenuCollections = Immutable.fromJS({
      [VALID_COLLECTION_ID]: { recipesInCollection: [firstRecipe.get('id'), secondRecipe.get('id')] }
    })

    currentMenuVariants = Immutable.fromJS({
      [firstRecipe.get('id')]: {
        alternatives: [
          {
            coreRecipeId: variantRecipe.get('id')
          }
        ]
      }
    })
  })

  describe('getRecipeComparatorFactory', () => {
    let comparator

    beforeEach(() => {
      comparator = recipeListSelectors.getRecipeComparatorFactory.resultFunc(inStockRecipes)(allRecipes)
    })

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

      describe('when A is missing from original order', () => {
        const a = firstRecipe
        const b = secondRecipe

        beforeEach(() => {
          const filteredRecipes = allRecipes.filter(recipe => recipe !== a)

          comparator = recipeListSelectors.getRecipeComparatorFactory.resultFunc(inStockRecipes)(filteredRecipes)
        })

        test('should return 1 (B first)', () => {
          const result = comparator(a, b)

          expect(result).toEqual(1)
        })
      })

      describe('when B is missing from original order', () => {
        const a = firstRecipe
        const b = secondRecipe

        beforeEach(() => {
          const filteredRecipes = allRecipes.filter(recipe => recipe !== b)

          comparator = recipeListSelectors.getRecipeComparatorFactory.resultFunc(inStockRecipes)(filteredRecipes)
        })

        test('should return -1 (A first)', () => {
          const result = comparator(a, b)

          expect(result).toEqual(-1)
        })
      })

      describe('when A and B are the same recipe', () => {
        const a = firstRecipe
        const b = a

        test('should return -1 (A first)', () => {
          const result = comparator(a, b)

          expect(result).toEqual(-1)
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
        const result = recipeListSelectors.getFilterFn.resultFunc(collectionId, recommendationCollection, inStockRecipes)

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
        const result = recipeListSelectors.getFilterFn.resultFunc(collectionId, recommendationCollection, inStockRecipes)

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
        const filterFn = recipeListSelectors.getFilterFn.resultFunc(currentCollectionId, recommendationCollection, inStockRecipes)

        const passedFilter = filterFn(firstRecipe)
        expect(passedFilter).toEqual(true)
      })

      test('should return false for out-of-stock recipe', () => {
        const filterFn = recipeListSelectors.getFilterFn.resultFunc(currentCollectionId, recommendationCollection, inStockRecipes)

        const passedFilter = filterFn(thirdRecipe)
        expect(passedFilter).toEqual(false)
      })
    })
  })

  describe('getRecipeListRecipes', () => {
    let selectedRecipeVariants
    let collectionDietaryClaims

    beforeEach(() => {
      selectedRecipeVariants = {}
      collectionDietaryClaims = null
    })

    describe('no collection id provided', () => {
      const collectionId = null

      // and sort in ascending order
      const comparatorFactory = () => (a, b) => a.get('sortOrder') - b.get('sortOrder')

      test('should return all recipes, applying comparator', () => {
        const { recipes } = recipeListSelectors.getRecipeListRecipes.resultFunc(collectionDietaryClaims, allRecipes, getMenuCollections, inStockRecipes, currentMenuVariants, selectedRecipeVariants, collectionId, null, comparatorFactory)

        expect(recipes).toEqual(Immutable.List([
          createStandardRecipeView(firstRecipe), createStandardRecipeView(secondRecipe),
          createStandardRecipeView(thirdRecipe), createStandardRecipeView(variantRecipe)
        ]))
      })

      describe('when filterFn provided', () => {
        const filterFn = (recipe) => recipe !== secondRecipe

        test('should return all recipes with filterFn applied', () => {
          const { recipes } = recipeListSelectors.getRecipeListRecipes.resultFunc(collectionDietaryClaims, allRecipes, getMenuCollections, inStockRecipes, currentMenuVariants, selectedRecipeVariants, collectionId, filterFn, comparatorFactory)

          expect(recipes).toEqual(Immutable.List([
            createStandardRecipeView(firstRecipe), createStandardRecipeView(thirdRecipe), createStandardRecipeView(variantRecipe)
          ]))
        })
      })

      test('should return all recipe ids in original order', () => {
        const { originalOrderRecipeIds } = recipeListSelectors.getRecipeListRecipes.resultFunc(collectionDietaryClaims, allRecipes, getMenuCollections, inStockRecipes, currentMenuVariants, selectedRecipeVariants, collectionId, null, comparatorFactory)

        expect(originalOrderRecipeIds).toEqual(Immutable.fromJS([
          firstRecipe.get('id'), secondRecipe.get('id'), thirdRecipe.get('id'), variantRecipe.get('id')
        ]))
      })
    })

    describe('invalid collection id provided', () => {
      const collectionId = 'non-existent-collection'

      // sort in ascending order
      const comparatorFactory = () => (a, b) => a.get('sortOrder') - b.get('sortOrder')

      test('should return all recipes, applying comparator', () => {
        const { recipes } = recipeListSelectors.getRecipeListRecipes.resultFunc(collectionDietaryClaims ,allRecipes, getMenuCollections, inStockRecipes, currentMenuVariants, selectedRecipeVariants, collectionId, null, comparatorFactory)

        expect(recipes).toEqual(Immutable.List([
          createStandardRecipeView(firstRecipe), createStandardRecipeView(secondRecipe),
          createStandardRecipeView(thirdRecipe), createStandardRecipeView(variantRecipe)
        ]))
      })

      describe('when filterFn provided', () => {
        const filterFn = (recipe) => recipe !== secondRecipe

        test('should return all recipes with filterFn applied', () => {
          const { recipes } = recipeListSelectors.getRecipeListRecipes.resultFunc(collectionDietaryClaims, allRecipes, getMenuCollections, inStockRecipes, currentMenuVariants, selectedRecipeVariants, collectionId, filterFn, comparatorFactory)

          expect(recipes).toEqual(Immutable.List([
            createStandardRecipeView(firstRecipe), createStandardRecipeView(thirdRecipe), createStandardRecipeView(variantRecipe)
          ]))
        })
      })

      test('should return all recipe ids in original order', () => {
        const { originalOrderRecipeIds } = recipeListSelectors.getRecipeListRecipes.resultFunc(collectionDietaryClaims, allRecipes, getMenuCollections, inStockRecipes, currentMenuVariants, selectedRecipeVariants, collectionId, null, comparatorFactory)

        expect(originalOrderRecipeIds).toEqual(Immutable.List([
          firstRecipe.get('id'), secondRecipe.get('id'), thirdRecipe.get('id'), variantRecipe.get('id')
        ]))
      })
    })

    describe('collection id provided', () => {
      const collectionId = VALID_COLLECTION_ID

      // sort in descending order
      const comparatorFactory = () => (a, b) => b.get('sortOrder') - a.get('sortOrder')

      test('should return all recipes in collection, applying comparator', () => {
        const { recipes } = recipeListSelectors.getRecipeListRecipes.resultFunc(collectionDietaryClaims, allRecipes, getMenuCollections, inStockRecipes, currentMenuVariants, selectedRecipeVariants, collectionId, null, comparatorFactory)

        expect(recipes).toEqual(Immutable.List([
          createStandardRecipeView(secondRecipe), createStandardRecipeView(firstRecipe)
        ]))
      })

      describe('when filterFn provided', () => {
        const filterFn = (recipe) => recipe !== secondRecipe

        test('should return all recipes in collection with filterFn applied', () => {
          const { recipes } = recipeListSelectors.getRecipeListRecipes.resultFunc(collectionDietaryClaims, allRecipes, getMenuCollections, inStockRecipes, currentMenuVariants, selectedRecipeVariants, collectionId, filterFn, comparatorFactory)

          expect(recipes).toEqual(Immutable.List([
            createStandardRecipeView(firstRecipe)
          ]))
        })
      })

      test('should return all recipe ids in for recipes in collection original order', () => {
        const { originalOrderRecipeIds } = recipeListSelectors.getRecipeListRecipes.resultFunc(collectionDietaryClaims, allRecipes, getMenuCollections, inStockRecipes, currentMenuVariants, selectedRecipeVariants, collectionId, null, comparatorFactory)

        expect(originalOrderRecipeIds).toEqual(Immutable.List([
          firstRecipe.get('id'), secondRecipe.get('id')
        ]))
      })

      describe('when menuRecipes in different order than recipesInCollection', () => {
        const reorderedMenuRecipes = Immutable.fromJS([secondRecipe, thirdRecipe, firstRecipe])

        test('should return recipes in recipeInCollection order', () => {
          const { originalOrderRecipeIds } = recipeListSelectors.getRecipeListRecipes.resultFunc(collectionDietaryClaims, reorderedMenuRecipes, getMenuCollections, inStockRecipes, currentMenuVariants, selectedRecipeVariants, collectionId, null, comparatorFactory)

          expect(originalOrderRecipeIds).toEqual(Immutable.List([
            firstRecipe.get('id'), secondRecipe.get('id')
          ]))
        })
      })

      describe('when in-stock variant selected', () => {
        beforeEach(() => {
          selectedRecipeVariants = {
            [collectionId]: {
              [firstRecipe.get('id')]: variantRecipe.get('id')
            }
          }

          inStockRecipes = Immutable.fromJS([firstRecipe, secondRecipe, variantRecipe])
        })

        test('should return all recipes in collection with variants replaced', () => {
          const { recipes } = recipeListSelectors.getRecipeListRecipes.resultFunc(collectionDietaryClaims, allRecipes, getMenuCollections, inStockRecipes, currentMenuVariants, selectedRecipeVariants, collectionId, null, comparatorFactory)

          expect(recipes).toEqual(Immutable.List([
            createStandardRecipeView(secondRecipe),
            createRecipeView(firstRecipe.get('id'), variantRecipe), // first recipe was replaced with variant
          ]))
        })
      })

      describe('when out-of-stock variant selected', () => {
        beforeEach(() => {
          selectedRecipeVariants = {
            [collectionId]: {
              [firstRecipe.get('id')]: variantRecipe.get('id')
            }
          }

          inStockRecipes = Immutable.fromJS([firstRecipe, secondRecipe])
        })

        test('should return all recipes in collection with variants replaced', () => {
          const { recipes } = recipeListSelectors.getRecipeListRecipes.resultFunc(collectionDietaryClaims, allRecipes, getMenuCollections, inStockRecipes, currentMenuVariants, selectedRecipeVariants, collectionId, null, comparatorFactory)

          expect(recipes).toEqual(Immutable.List([
            createStandardRecipeView(secondRecipe),
            createRecipeView(firstRecipe.get('id'), variantRecipe), // first recipe was replaced with variant
          ]))
        })
      })

      describe('when recipe is out of stock', () => {
        beforeEach(() => {
          inStockRecipes = inStockRecipes.filter(recipe => recipe !== firstRecipe)
        })

        describe('when recipe has variant', () => {
          describe('when variant is already selected', () => {
            beforeEach(() => {
              inStockRecipes = inStockRecipes.push(variantRecipe)

              selectedRecipeVariants = {
                [collectionId]: {
                  [firstRecipe.get('id')]: variantRecipe.get('id')
                }
              }
            })

            test('should return variant in place of recipe', () => {
              const { recipes } = recipeListSelectors.getRecipeListRecipes.resultFunc(collectionDietaryClaims, allRecipes, getMenuCollections, inStockRecipes, currentMenuVariants, selectedRecipeVariants, collectionId, null, comparatorFactory)

              expect(recipes).toEqual(Immutable.List([
                createStandardRecipeView(secondRecipe),
                createRecipeView(firstRecipe.get('id'), variantRecipe), // first recipe was replaced with variant
              ]))
            })
          })

          describe('when there is an in-stock variant', () => {
            beforeEach(() => {
              inStockRecipes = inStockRecipes.push(variantRecipe)
            })

            test('should return variant in place of recipe', () => {
              const { recipes } = recipeListSelectors.getRecipeListRecipes.resultFunc(collectionDietaryClaims, allRecipes, getMenuCollections, inStockRecipes, currentMenuVariants, selectedRecipeVariants, collectionId, null, comparatorFactory)

              expect(recipes).toEqual(Immutable.List([
                createRecipeView(firstRecipe.get('id'), variantRecipe), // first recipe was replaced with variant
                createStandardRecipeView(secondRecipe)
              ]))
            })
          })

          describe('when there is no in-stock variant', () => {
            beforeEach(() => {
              inStockRecipes = inStockRecipes.filter(recipe => recipe !== variantRecipe)
            })

            test('should return original recipe', () => {
              const { recipes } = recipeListSelectors.getRecipeListRecipes.resultFunc(collectionDietaryClaims, allRecipes, getMenuCollections, inStockRecipes, currentMenuVariants, selectedRecipeVariants, collectionId, null, comparatorFactory)

              expect(recipes).toEqual(Immutable.List([
                createStandardRecipeView(secondRecipe),
                createStandardRecipeView(firstRecipe)
              ]))
            })
          })
        })

        describe('when recipe alternatives array is empty', () => {
          beforeEach(() => {
            currentMenuVariants = Immutable.fromJS({
              [firstRecipe.get('id')]: {
                alternatives: []
              }
            })
          })

          test('should return original recipe', () => {
            const { recipes } = recipeListSelectors.getRecipeListRecipes.resultFunc(collectionDietaryClaims, allRecipes, getMenuCollections, inStockRecipes, currentMenuVariants, selectedRecipeVariants, collectionId, null, comparatorFactory)

            expect(recipes).toEqual(Immutable.List([
              createStandardRecipeView(secondRecipe),
              createStandardRecipeView(firstRecipe)
            ]))
          })
        })

        describe('when recipe variant info is null', () => {
          beforeEach(() => {
            currentMenuVariants = Immutable.fromJS({
              [firstRecipe.get('id')]: null
            })
          })

          test('should return original recipe', () => {
            const { recipes } = recipeListSelectors.getRecipeListRecipes.resultFunc(collectionDietaryClaims, allRecipes, getMenuCollections, inStockRecipes, currentMenuVariants, selectedRecipeVariants, collectionId, null, comparatorFactory)

            expect(recipes).toEqual(Immutable.List([
              createStandardRecipeView(secondRecipe),
              createStandardRecipeView(firstRecipe)
            ]))
          })
        })

        describe('when currentMenuVariants is null', () => {
          beforeEach(() => {
            currentMenuVariants = null
          })

          test('should return original recipe', () => {
            const { recipes } = recipeListSelectors.getRecipeListRecipes.resultFunc(collectionDietaryClaims, allRecipes, getMenuCollections, inStockRecipes, currentMenuVariants, selectedRecipeVariants, collectionId, null, comparatorFactory)

            expect(recipes).toEqual(Immutable.List([
              createStandardRecipeView(secondRecipe),
              createStandardRecipeView(firstRecipe)
            ]))
          })
        })
      })

      describe('when a recipe isnt found for id in collection (error state)', () => {
        beforeEach(() => {
          getMenuCollections = Immutable.fromJS({
            [VALID_COLLECTION_ID]: { recipesInCollection: [firstRecipe.get('id'), secondRecipe.get('id'), 'some-invalid-recipe-id']}
          })
        })

        test('should return all recipes that can be found', () => {
          const { recipes } = recipeListSelectors.getRecipeListRecipes.resultFunc(collectionDietaryClaims, allRecipes, getMenuCollections, inStockRecipes, currentMenuVariants, selectedRecipeVariants, collectionId, null, comparatorFactory)

          expect(recipes).toEqual(Immutable.List([
            createStandardRecipeView(secondRecipe), createStandardRecipeView(firstRecipe)
          ]))
        })
      })
    })

    describe('full state test', () => {
      const CURRENT_MENU_ID = '400'
      const CURRENT_COLLECTION_ID = VALID_COLLECTION_ID
      let state

      beforeEach(() => {
        state = {
          recipes: Immutable.fromJS({
            [firstRecipe.get('id')]: firstRecipe,
            [secondRecipe.get('id')]: secondRecipe,
            [thirdRecipe.get('id')]: thirdRecipe,
            [variantRecipe.get('id')]: variantRecipe,
          }),
          menuRecipes: Immutable.fromJS([firstRecipe.get('id'), secondRecipe.get('id'), thirdRecipe.get('id'), variantRecipe.get('id')]),
          menuRecipeStock: Immutable.fromJS({
            [firstRecipe.get('id')]: { 2: 1000, 4: 1000, 8: 0 },
            [secondRecipe.get('id')]: { 2: 1000, 4: 1000, 8: 0 },
            [thirdRecipe.get('id')]: { 2: 1000, 4: 1000, 8: 0 },
            [variantRecipe.get('id')]: { 2: 1000, 4: 1000, 8: 0 },
          }),
          basket: Immutable.fromJS({
            recipes: {},
            numPortions: 2,
            currentMenuId: CURRENT_MENU_ID
          }),
          menu: Immutable.Map({
            menuVariants: Immutable.fromJS({
              [CURRENT_MENU_ID]: {
                [firstRecipe.get('id')]: {
                  alternatives: [
                    {
                      coreRecipeId: variantRecipe.get('id')
                    }
                  ]
                }
              }
            }),
            selectedRecipeVariants: {
              [CURRENT_COLLECTION_ID]: {
                [firstRecipe.get('id')]: variantRecipe.get('id')
              }
            }
          }),
          menuCollections: Immutable.fromJS({
            [CURRENT_COLLECTION_ID]: {
              id: CURRENT_COLLECTION_ID,
              slug: 'current-collection',
              published: true,
              requirements: {
                dietary_claims: ['gluten-free']
              },
              recipesInCollection: [firstRecipe.get('id'), secondRecipe.get('id'), 'some-invalid-recipe-id']
            }
          }),
          routing: {
            locationBeforeTransitions: {
              query: {
                collection: 'current-collection'
              }
            }
          }
        }
      })

      describe('when props contains collection id', () => {
        const props = { collectionId: CURRENT_COLLECTION_ID }

        test('should return correct list', () => {
          const { recipes, originalOrderRecipeIds } = recipeListSelectors.getRecipeListRecipes(state, props)

          expect(recipes).toEqual(Immutable.List([
            createRecipeView(firstRecipe.get('id'), variantRecipe),
            createStandardRecipeView(secondRecipe)
          ]))

          expect(originalOrderRecipeIds).toEqual(Immutable.List([
            variantRecipe.get('id'), secondRecipe.get('id')
          ]))
        })
      })

      describe('when props is null', () => {
        const props = null

        test('should return correct list', () => {
          const { recipes, originalOrderRecipeIds } = recipeListSelectors.getRecipeListRecipes(state, props)

          expect(recipes).toEqual(Immutable.List([
            createRecipeView(firstRecipe.get('id'), variantRecipe),
            createStandardRecipeView(secondRecipe)
          ]))

          expect(originalOrderRecipeIds).toEqual(Immutable.List([
            variantRecipe.get('id'), secondRecipe.get('id')
          ]))
        })
      })

      describe('when props.collectionId is null', () => {
        const props = { collectionId: null }

        test('should return correct list', () => {
          const { recipes, originalOrderRecipeIds } = recipeListSelectors.getRecipeListRecipes(state, props)

          expect(recipes).toEqual(Immutable.List([
            createRecipeView(firstRecipe.get('id'), variantRecipe),
            createStandardRecipeView(secondRecipe)
          ]))

          expect(originalOrderRecipeIds).toEqual(Immutable.List([
            variantRecipe.get('id'), secondRecipe.get('id')
          ]))
        })
      })

      describe('when collection requirements are not part of recipe dietary-attributes', () => {
        const props = { collectionId: CURRENT_COLLECTION_ID }
        beforeEach(() => {
          state.menuCollections = Immutable.fromJS({
            [CURRENT_COLLECTION_ID]: {
              id: CURRENT_COLLECTION_ID,
              slug: 'current-collection',
              published: true,
              requirements: {
                dietary_claims: ['dairy-free']
              },
              recipesInCollection: [firstRecipe.get('id'), secondRecipe.get('id'), 'some-invalid-recipe-id']
            }
          })
          state.menu = Immutable.Map({
            menuVariants: Immutable.fromJS({
              [CURRENT_MENU_ID]: {
                [firstRecipe.get('id')]: {
                  alternatives: [
                    {
                      coreRecipeId: variantRecipe.get('id')
                    }
                  ]
                }
              }
            }),
            selectedRecipeVariants: {}
          })
        })

        test('should return correct list', () => {
          const { recipes, originalOrderRecipeIds } = recipeListSelectors.getRecipeListRecipes(state, props)

          expect(recipes).toEqual(Immutable.List([
            createStandardRecipeView(firstRecipe),
            createStandardRecipeView(secondRecipe)
          ]))

          expect(originalOrderRecipeIds).toEqual(Immutable.List([
            firstRecipe.get('id'), secondRecipe.get('id')
          ]))
        })
      })
    })
  })

  describe('getInStockRecipes', () => {
    const recipes = [
      Immutable.fromJS({
        id: 'recipe1',
        desc: 'recipe1Desc'
      })
    ]
    const stock = Immutable.fromJS({
      recipe1: {
        2: 100,
        4: 100
      }
    })
    const basketRecipes = []
    const numPortions = 2
    test('should return recipes when isRecipeInBasket is true', () => {
      isRecipeInBasket.mockImplementationOnce(() => true)
      const result = recipeListSelectors.getInStockRecipes.resultFunc(recipes, stock, basketRecipes, numPortions)
      expect(result).toEqual([Immutable.fromJS({
        id: 'recipe1',
        desc: 'recipe1Desc'
      })])
    })

    test('should return recipes when isOutOfStock is true', () => {
      const result = recipeListSelectors.getInStockRecipes.resultFunc(recipes, stock, basketRecipes, numPortions)
      expect(result).toEqual([Immutable.fromJS({ id: 'recipe1',
        desc: 'recipe1Desc'
      })])
    })
  })

  describe('getBaseRecipeSides', () => {
    describe('When there is no currentMenuVariant', () => {
      beforeEach(() => {
        currentMenuVariants = undefined
      })

      test('then it should return null', () => {
        const expected = null
        expect(recipeListSelectors.getBaseRecipeSides.resultFunc(currentMenuVariants)).toEqual(expected)
      })
    })

    describe('When there are side recipes in currentMenuVariant', () => {
      beforeEach(() => {
        currentMenuVariants = Immutable.Map({
          123: {
            sides: [{
              coreRecipeId: 987
            }]
          },
          456: {
            sides: [{
              coreRecipeId: 765
            }]
          }
        })
      })

      test('then it should return a mapping of the recipe sides and their base recipe', () => {
        const expected = Immutable.Map({
          987: '123',
          765: '456'
        })

        expect(recipeListSelectors.getBaseRecipeSides.resultFunc(currentMenuVariants)).toEqual(expected)
      })
    })

    describe('When there are no side recipes in currentMenuVariant', () => {
      beforeEach(() => {
        currentMenuVariants = Immutable.Map({
          123: {},
          456: {},
          789: {
            sides: [{
              coreRecipeId: 999
            }]
          }
        })
      })

      test('then it should not add to the side recipe mapping', () => {
        const expected = Immutable.Map({
          999: '789'
        })

        expect(recipeListSelectors.getBaseRecipeSides.resultFunc(currentMenuVariants)).toEqual(expected)
      })
    })
  })

  describe('getBasketRecipeWithSidesBaseId', () => {
    let basketRecipes
    let recipeSides

    describe('When there is no recipe sides', () => {
      beforeEach(() => {
        basketRecipes = Immutable.Map({
          987: 1,
          456: 1
        })

        recipeSides = null
      })

      test('then it should return basketRecipes', () => {
        const expected = Immutable.Map({
          987: 1,
          456: 1
        })
        expect(recipeListSelectors.getBasketRecipeWithSidesBaseId.resultFunc(basketRecipes, recipeSides)).toEqual(expected)
      })
    })

    describe('When recipes with sides have been selected from the menu', () => {
      beforeEach(() => {
        basketRecipes = Immutable.Map({
          987: 1,
          456: 1
        })
        recipeSides = Immutable.Map({
          987: '123'
        })
      })

      test('then it should return the base recipe id instead of the side recipe id', () => {
        const expected = Immutable.Map({
          123: 1,
          456: 1
        })
        expect(recipeListSelectors.getBasketRecipeWithSidesBaseId.resultFunc(basketRecipes, recipeSides)).toEqual(expected)
      })
    })
  })

  describe('replaceSideRecipeIdWithBaseRecipeId', () => {
    let recipeId
    let recipeSides

    describe('When there is no recipe sides', () => {
      beforeEach(() => {
        recipeId = '123'
        recipeSides = null
      })

      test('then it should return recipeId', () => {
        const expected = '123'
        expect(recipeListSelectors.replaceSideRecipeIdWithBaseRecipeId.resultFunc(recipeId, recipeSides)).toEqual(expected)
      })
    })

    describe('When recipesId is a side recipe', () => {
      beforeEach(() => {
        recipeId = '123'
        recipeSides = Immutable.Map({
          123: '456'
        })
      })

      test('then it should return the base recipe id instead of the side recipe id', () => {
        const expected = '456'

        expect(recipeListSelectors.replaceSideRecipeIdWithBaseRecipeId.resultFunc(recipeId, recipeSides)).toEqual(expected)
      })
    })

    describe('When recipesId is not a side recipe', () => {
      beforeEach(() => {
        recipeId = '123'
        recipeSides = Immutable.Map({
          789: '987'
        })
      })

      test('then it should return the passed in recipeId', () => {
        const expected = '123'
        expect(recipeListSelectors.replaceSideRecipeIdWithBaseRecipeId.resultFunc(recipeId, recipeSides)).toEqual(expected)
      })
    })
  })
})
