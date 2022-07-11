import { TransformedRecipe } from '../../transformer'
import { getVariantsForRecipe } from '../../recipeOptions'

import { getOutOfStockRecipeReplacer } from './getOutOfStockRecipeReplacer'

const getVariantsForRecipeMock = getVariantsForRecipe as jest.MockedFunction<typeof getVariantsForRecipe>

const makeIds = (recipes: { id: string }[]) => new Set(recipes.map((r) => r.id))

const makeRecipe = (id: string): TransformedRecipe =>
  ({
    id,
  } as TransformedRecipe)

jest.mock('../../recipeOptions')

describe('getOutOfStockRecipeReplacer produces recipe replacer function that', () => {
  const RECIPE_1 = makeRecipe('aaaa')
  const RECIPE_1_1 = makeRecipe('bbbb')
  const RECIPE_1_2 = makeRecipe('cccc')

  const ALTERNATIVES: NonNullable<ReturnType<typeof getVariantsForRecipe>>['alternatives'] = [
    { id: RECIPE_1_1.id, displayName: 'r1', coreRecipeId: RECIPE_1_1.id },
    { id: RECIPE_1_2.id, displayName: 'r2', coreRecipeId: RECIPE_1_2.id },
  ]

  const makeReplacer = (
    recipes: TransformedRecipe[],
    inStockIds: Set<string>,
    dietaryClaims: string[] = [],
    numPortions = 4,
    alternatives = ALTERNATIVES,
  ) => {
    const isRecipeInStock = (id: string) => inStockIds.has(id)

    getVariantsForRecipeMock.mockReturnValue({
      type: 'alternatives',
      alternatives,
      variantsList: alternatives
    })

    return getOutOfStockRecipeReplacer({
      menu: {} as any,
      recipes,
      numPortions,
      dietaryClaims,
      isRecipeInStock,
    })
  }

  describe('when recipe with alternatives is in stock', () => {
    const inStockIds = makeIds([RECIPE_1, RECIPE_1_1, RECIPE_1_2])

    test('it does not replace the recipe', () => {
      const replacer = makeReplacer([RECIPE_1, RECIPE_1_1, RECIPE_1_2], inStockIds)

      expect(replacer({ recipe: RECIPE_1, reference: 'foo' })).toEqual({
        recipe: RECIPE_1,
        originalId: RECIPE_1.id,
        reference: 'foo',
      })
    })
  })

  describe('when recipe with alternatives is out of stock but one alternative is in stock', () => {
    const inStockIds = makeIds([RECIPE_1_1, RECIPE_1_2])

    test('it replaces original recipe with that alternative', () => {
      const replacer = makeReplacer([RECIPE_1, RECIPE_1_1, RECIPE_1_2], inStockIds)

      expect(replacer({ recipe: RECIPE_1, reference: 'foo' })).toEqual({
        recipe: RECIPE_1_1,
        originalId: RECIPE_1_1.id,
        reference: 'foo',
      })
    })
  })

  describe('when recipe and all its alternatives are out of stock', () => {
    const inStockIds = makeIds([])

    test('it does not replace the recipe', () => {
      const replacer = makeReplacer([RECIPE_1, RECIPE_1_1, RECIPE_1_2], inStockIds)

      expect(replacer({ recipe: RECIPE_1, reference: 'foo' })).toEqual({
        recipe: RECIPE_1,
        originalId: RECIPE_1.id,
        reference: 'foo',
      })
    })
  })

  describe('when recipe is out of stock but does not have alternatives', () => {
    const inStockIds = makeIds([])
    const alternatives = []

    test('it does not replace recipe', () => {
      const replacer = makeReplacer([RECIPE_1, RECIPE_1_1, RECIPE_1_2], inStockIds, [], 4, alternatives)

      expect(replacer({ recipe: RECIPE_1, reference: 'foo' })).toEqual({
        recipe: RECIPE_1,
        originalId: RECIPE_1.id,
        reference: 'foo',
      })
    })
  })
})
