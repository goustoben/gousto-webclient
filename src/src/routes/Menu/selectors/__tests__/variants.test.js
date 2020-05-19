import Immutable from 'immutable'
import { getVariantsForRecipe } from '../variants'

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
