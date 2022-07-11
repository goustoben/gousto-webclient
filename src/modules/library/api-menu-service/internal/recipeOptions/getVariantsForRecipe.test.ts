import { TransformedRecipe } from '../transformer'
import {
  RECIPE_CORE_ID_1,
  RECIPE_UUID_1,
  RECIPE_NAME_1,
  RECIPE_UUID_2,
  RECIPE_CORE_ID_2,
  RECIPE_NAME_2,
  MENU_1,
} from '../_testing/mocks'
import { getVariantsForRecipe } from './getVariantsForRecipe'

describe('getVariantsForRecipe', () => {
  describe('when collection has dietary claims', () => {
    const collectionDietaryClaims = ['gluten-free']

    describe('when all recipes meet the dietary claim', () => {
      const transformedRecipes: TransformedRecipe[] = [
        {
          id: RECIPE_CORE_ID_1,
          dietaryClaims: [ { slug: 'gluten-free' }],
        } as unknown as TransformedRecipe,
        {
          id: RECIPE_CORE_ID_2,
          dietaryClaims: [ { slug: 'gluten-free' }],
        } as unknown as TransformedRecipe,
      ]

      test('should return all recipes', () => {
        const result = getVariantsForRecipe(MENU_1, RECIPE_CORE_ID_1, transformedRecipes, collectionDietaryClaims)

        const expectedAlternatives = [
          { id: RECIPE_UUID_2, coreRecipeId: RECIPE_CORE_ID_2, displayName: RECIPE_NAME_2 },
        ]

        expect(result).toEqual({
          type: 'alternatives',
          alternatives: expectedAlternatives,
          variantsList: expectedAlternatives,
        })
      })
    })

    describe('when not all recipes meet the dietary claim', () => {
      const transformedRecipes: TransformedRecipe[] = [
        {
          id: RECIPE_CORE_ID_1,
          dietaryClaims: [ { slug: 'gluten-free' }],
        } as unknown as TransformedRecipe,
        {
          id: RECIPE_CORE_ID_2,
          dietaryClaims: [],
        } as unknown as TransformedRecipe,
      ]

      test('should return all recipes which match', () => {
        const result = getVariantsForRecipe(MENU_1, RECIPE_CORE_ID_1, transformedRecipes, collectionDietaryClaims)

        const expectedAlternatives = []

        expect(result).toEqual({
          type: 'alternatives',
          alternatives: expectedAlternatives,
          variantsList: expectedAlternatives,
        })
      })
    })
  })

  describe('when collection has no dietary claims', () => {
    const collectionDietaryClaims: string[] = []

    const transformedRecipes: TransformedRecipe[] = [
      {
        id: RECIPE_CORE_ID_1,
        dietaryClaims: [ { slug: 'gluten-free' }],
      } as unknown as TransformedRecipe,
      {
        id: RECIPE_CORE_ID_2,
        dietaryClaims: [ { slug: 'gluten-free' }],
      } as unknown as TransformedRecipe,
    ]

    test('should return all recipes', () => {
      const result = getVariantsForRecipe(MENU_1, RECIPE_CORE_ID_1, transformedRecipes, collectionDietaryClaims)

      const expectedAlternatives = [
        { id: RECIPE_UUID_2, coreRecipeId: RECIPE_CORE_ID_2, displayName: RECIPE_NAME_2 },
      ]

      expect(result).toEqual({
        type: 'alternatives',
        alternatives: expectedAlternatives,
        variantsList: expectedAlternatives,
      })
    })
  })
})
