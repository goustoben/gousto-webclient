import Immutable from 'immutable'
import { getCurrentMenuRecipesWithVariantsReplaced, getVariantsForRecipe } from '../variants'

describe('variants selector tests', () => {
  const currentCollectionSlug = 'collectionId'
  const currentCollectionId = '1234'

  describe('getCurrentMenuRecipesWithVariantsReplaced', () => {
    const firstRecipe = '327'
    const secondRecipe = '819'
    const thirdRecipe = '777'
    const variantA = '820'
    const recipesInCollection = Immutable.List([firstRecipe, secondRecipe, thirdRecipe])

    describe('when no variant selected', () => {
      const selectedRecipeVariants = {}

      test('should not replace recipe', () => {
        const result = getCurrentMenuRecipesWithVariantsReplaced.resultFunc(selectedRecipeVariants, currentCollectionId)(recipesInCollection)

        expect(result).toEqual(Immutable.List([firstRecipe, secondRecipe, thirdRecipe]))
      })
    })

    describe('when variant selected', () => {
      const selectedRecipeVariants = {
        [currentCollectionId]: {
          [secondRecipe]: variantA
        }
      }

      test('should replace recipe', () => {
        const result = getCurrentMenuRecipesWithVariantsReplaced.resultFunc(selectedRecipeVariants, currentCollectionId)(recipesInCollection)

        expect(result).toEqual(Immutable.List([firstRecipe, variantA, thirdRecipe]))
      })
    })

    describe('using full state over resultFunc', () => {
      let state

      beforeEach(() => {
        state = {
          menu: Immutable.Map({
            selectedRecipeVariants: {}
          }),
          basket: Immutable.Map({
            numPortions: 2
          }),
          menuCollections: Immutable.Map({
            [currentCollectionId]: Immutable.Map({
              id: currentCollectionId,
              slug: currentCollectionSlug,
              published: true,
            })
          }),
          menuCollectionRecipes: Immutable.Map({
            [currentCollectionId]: Immutable.Map({
              123: {}
            })
          }),
          routing: {
            locationBeforeTransitions: {
              query: {
                collection: currentCollectionSlug
              }
            }
          }
        }
      })

      describe('when variant selected', () => {
        beforeEach(() => {
          const selectedRecipeVariants = {
            [currentCollectionId]: {
              [secondRecipe]: variantA
            }
          }
          const oldState = state

          state = {
            ...oldState,
            menu: oldState.menu.set('selectedRecipeVariants', selectedRecipeVariants)
          }
        })

        test('should replace recipe', () => {
          const result = getCurrentMenuRecipesWithVariantsReplaced(state)(recipesInCollection)

          expect(result).toEqual(Immutable.List([firstRecipe, variantA, thirdRecipe]))
        })
      })
    })
  })
})

describe('getVariantsForRecipe', () => {
  describe('when no variants', () => {
    const variants = null
    const coreRecipeId = '123'

    test('should return null', () => {
      const result = getVariantsForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toBe(null)
    })
  })

  describe('when no recipeVariants', () => {
    const variants = Immutable.Map({
      143: {}
    })
    const coreRecipeId = '123'

    test('should return null', () => {
      const result = getVariantsForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toBe(null)
    })
  })

  describe('when variants exists for recipe id', () => {
    const variants = Immutable.fromJS({
      123: {
        displayName: 'recipe',
        alternatives: [{
          id: 'abd123',
          coreRecipeId: '132',
          displayName: 'recipeVariant'
        }]
      }
    })
    const coreRecipeId = '123'

    test('should return null', () => {
      const result = getVariantsForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toEqual([{
        id: 'abd123',
        coreRecipeId: '132',
        displayName: 'recipeVariant'
      }])
    })
  })
})
