import Immutable from 'immutable'
import { getVariantsForRecipe, getAlternativesForRecipe, getSidesForRecipe } from '../variants'

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

    test('should return variant', () => {
      const result = getVariantsForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toEqual({
        type: 'alternatives',
        alternatives: Immutable.fromJS(
          [
            {
              id: 'abd123',
              coreRecipeId: '132',
              displayName: 'recipeVariant'
            }
          ]
        )
      })
    })
  })
})

describe('getAlternativesForRecipe', () => {
  describe('when no variants', () => {
    const variants = null
    const coreRecipeId = '123'

    test('should return null', () => {
      const result = getAlternativesForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toBe(null)
    })
  })

  describe('when no recipeVariants', () => {
    const variants = Immutable.Map({
      143: {}
    })
    const coreRecipeId = '123'

    test('should return null', () => {
      const result = getAlternativesForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toBe(null)
    })
  })

  describe('when alternative variants exists for recipe id', () => {
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

    test('should return variant', () => {
      const result = getAlternativesForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toEqual(Immutable.fromJS(
        [
          {
            id: 'abd123',
            coreRecipeId: '132',
            displayName: 'recipeVariant'
          }
        ]
      ))
    })
  })

  describe('when side variants exists for recipe id', () => {
    const variants = Immutable.fromJS({
      123: {
        displayName: 'recipe',
        sides: [{
          id: 'abd123',
          coreRecipeId: '132',
          displayName: 'recipeVariant'
        }]
      }
    })
    const coreRecipeId = '123'

    test('should return null', () => {
      const result = getAlternativesForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toEqual(null)
    })
  })
})

describe('getSidesForRecipe', () => {
  describe('when no variants', () => {
    const variants = null
    const coreRecipeId = '123'

    test('should return null', () => {
      const result = getSidesForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toBe(null)
    })
  })

  describe('when no recipeVariants', () => {
    const variants = Immutable.Map({
      143: {}
    })
    const coreRecipeId = '123'

    test('should return null', () => {
      const result = getSidesForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toBe(null)
    })
  })

  describe('when side variants exists for recipe id', () => {
    const variants = Immutable.fromJS({
      123: {
        displayName: 'recipe',
        sides: [{
          id: 'abd123',
          coreRecipeId: '132',
          displayName: 'recipeVariant'
        }]
      }
    })
    const coreRecipeId = '123'

    test('should return variant', () => {
      const result = getSidesForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toEqual(Immutable.fromJS(
        [
          {
            id: 'abd123',
            coreRecipeId: '132',
            displayName: 'recipeVariant'
          }
        ]
      ))
    })
  })

  describe('when alternative variants exists for recipe id', () => {
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
      const result = getSidesForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toEqual(null)
    })
  })
})
