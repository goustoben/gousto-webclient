import Immutable from 'immutable'
import { TransformedRecipe } from '../../transformer'

import { getOutOfStockRecipeReplacer } from './getOutOfStockRecipeReplacer'

const makeIds = (recipes: { id: string }[]) =>
  new Set(recipes.map(r => r.id))

const makeRecipe = (id: string): TransformedRecipe => ({
  id
}) as TransformedRecipe

describe('getOutOfStockRecipeReplacer produces recipe replacer function that', () => {
  const RECIPE_1 = makeRecipe('aaaa')
  const RECIPE_1_1 = makeRecipe('bbbb')
  const RECIPE_1_2 = makeRecipe('cccc')

  const ALTERNATIVES = Immutable.fromJS({
    [RECIPE_1.id]: {
      type: 'alternatives',
      alternatives: [
        { id: RECIPE_1_1.id, coreRecipeId: RECIPE_1_1.id },
        { id: RECIPE_1_2.id, coreRecipeId: RECIPE_1_2.id },
      ],
    },
  })

  describe('when recipe with alternatives is in stock', () => {
    const replacer = getOutOfStockRecipeReplacer({
      recipes: [RECIPE_1, RECIPE_1_1, RECIPE_1_2],
      recipesVariants: ALTERNATIVES,
      recipesInStockIds: makeIds([RECIPE_1, RECIPE_1_1, RECIPE_1_2]),
      dietaryClaims: [],
    })

    test('it does not replace the recipe', () => {
      expect(replacer({ recipe: RECIPE_1, reference: 'foo' })).toEqual({
        recipe: RECIPE_1,
        originalId: RECIPE_1.id,
        reference: 'foo',
      })
    })
  })

  describe('when recipe with alternatives is out of stock but one alternative is in stock', () => {
    const replacer = getOutOfStockRecipeReplacer({
      recipes: [RECIPE_1, RECIPE_1_1, RECIPE_1_2],
      recipesVariants: ALTERNATIVES,
      recipesInStockIds: makeIds([RECIPE_1_1, RECIPE_1_2]),
      dietaryClaims: [],
    })
    test('it replaces original recipe with that alternative', () => {
      expect(replacer({ recipe: RECIPE_1, reference: 'foo' })).toEqual({
        recipe: RECIPE_1_1,
        originalId: RECIPE_1_1.id,
        reference: 'foo',
      })
    })
  })

  describe('when recipe and all its alternatives are out of stock', () => {
    const replacer = getOutOfStockRecipeReplacer({
      recipes: [RECIPE_1, RECIPE_1_1, RECIPE_1_2],
      recipesVariants: ALTERNATIVES,
      recipesInStockIds: makeIds([]),
      dietaryClaims: [],
    })
    test('it does not replace the recipe', () => {
      expect(replacer({ recipe: RECIPE_1, reference: 'foo' })).toEqual({
        recipe: RECIPE_1,
        originalId: RECIPE_1.id,
        reference: 'foo',
      })
    })
  })

  describe('when recipe is out of stock but does not have alternatives', () => {
    const replacer = getOutOfStockRecipeReplacer({
      recipes: [RECIPE_1, RECIPE_1_1, RECIPE_1_2],
      recipesVariants: Immutable.Map(),
      recipesInStockIds: makeIds([]),
      dietaryClaims: [],
    })
    test('it does not replace recipe', () => {
      expect(replacer({ recipe: RECIPE_1, reference: 'foo' })).toEqual({
        recipe: RECIPE_1,
        originalId: RECIPE_1.id,
        reference: 'foo',
      })
    })
  })
})
