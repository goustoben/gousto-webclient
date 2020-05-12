import Immutable from 'immutable'
import { getCurrentMenuRecipesWithVariantsReplaced } from '../variants'

describe('variants selector tests', () => {
  describe('getCurrentMenuRecipesWithVariantsReplaced', () => {
    const firstRecipe = Immutable.fromJS({ id: '327' })
    const secondRecipe = Immutable.fromJS({ id: '819' })
    const thirdRecipe = Immutable.fromJS({ id: '777' })
    const variantA = Immutable.fromJS({ id: '820' })

    const allRecipes = Immutable.fromJS({
      [firstRecipe.get('id')]: firstRecipe,
      [secondRecipe.get('id')]: secondRecipe,
      [thirdRecipe.get('id')]: thirdRecipe,
      [variantA.get('id')]: variantA
    })
    const currentMenuRecipes = Immutable.fromJS([firstRecipe, secondRecipe, thirdRecipe])

    describe('when no variant selected', () => {
      const selectedRecipeVariants = {}

      test('should not replace recipe', () => {
        const result = getCurrentMenuRecipesWithVariantsReplaced.resultFunc(allRecipes, currentMenuRecipes, selectedRecipeVariants)

        expect(result).toEqual(Immutable.List([firstRecipe, secondRecipe, thirdRecipe]))
      })
    })

    describe('when variant selected', () => {
      const selectedRecipeVariants = {
        [secondRecipe.get('id')]: variantA.get('id')
      }

      test('should replace recipe', () => {
        const result = getCurrentMenuRecipesWithVariantsReplaced.resultFunc(allRecipes, currentMenuRecipes, selectedRecipeVariants)

        expect(result).toEqual(Immutable.List([firstRecipe, variantA, thirdRecipe]))
      })
    })

    describe('using full state over resultFunc', () => {
      let state

      beforeEach(() => {
        state = {
          recipes: allRecipes,
          menuRecipes: currentMenuRecipes.map(recipe => recipe.get('id')),
          menu: Immutable.Map({
            selectedRecipeVariants: {}
          })
        }
      })

      describe('when variant selected', () => {
        const selectedRecipeVariants = {
          [secondRecipe.get('id')]: variantA.get('id')
        }

        beforeEach(() => {
          const oldState = state

          state = {
            ...oldState,
            menu: oldState.menu.set('selectedRecipeVariants', selectedRecipeVariants)
          }
        })

        test('should replace recipe', () => {
          const result = getCurrentMenuRecipesWithVariantsReplaced(state)

          expect(result).toEqual(Immutable.List([firstRecipe, variantA, thirdRecipe]))
        })
      })
    })
  })
})
