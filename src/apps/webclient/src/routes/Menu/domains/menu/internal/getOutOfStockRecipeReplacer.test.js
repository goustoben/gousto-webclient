import Immutable from 'immutable'
import { getOutOfStockRecipeReplacer } from './getOutOfStockRecipeReplacer'

describe('getOutOfStockRecipeReplacer produces recipe replacer function that', () => {
  const RECIPE_1 = Immutable.Map({ id: 'aaaa' })
  const RECIPE_1_1 = Immutable.Map({ id: 'bbbb' })
  const RECIPE_1_2 = Immutable.Map({ id: 'cccc' })

  const ALTERNATIVES = Immutable.fromJS({
    [RECIPE_1.get('id')]: {
      type: 'alternatives',
      alternatives: [
        {id: RECIPE_1_1.get('id'), coreRecipeId: RECIPE_1_1.get('id')},
        {id: RECIPE_1_2.get('id'), coreRecipeId: RECIPE_1_2.get('id')},
      ]
    }
  })

  describe('when recipe with alternatives is in stock', () => {
    const replacer = getOutOfStockRecipeReplacer({
      recipes: [ RECIPE_1, RECIPE_1_1, RECIPE_1_2 ],
      recipesVariants: ALTERNATIVES,
      recipesInStock: [RECIPE_1, RECIPE_1_1, RECIPE_1_2],
      dietaryClaims: null,
    })

    test('it does not replace the recipe', () => {
      expect(replacer({recipe: RECIPE_1})).toEqual({recipe: RECIPE_1, originalId: RECIPE_1.get('id')})
    })
  })

  describe('when recipe with alternatives is out of stock but one alternative is in stock', () => {
    const replacer = getOutOfStockRecipeReplacer({
      recipes: [ RECIPE_1, RECIPE_1_1, RECIPE_1_2 ],
      recipesVariants: ALTERNATIVES,
      recipesInStock: [RECIPE_1_1, RECIPE_1_2],
      dietaryClaims: null,
    })
    test('it replaces original recipe with that alternative', () => {
      expect(replacer({recipe: RECIPE_1})).toEqual({recipe: RECIPE_1_1, originalId: RECIPE_1_1.get('id')})
    })
  })

  describe('when recipe and all its alternatives are out of stock', () => {
    const replacer = getOutOfStockRecipeReplacer({
      recipes: [ RECIPE_1, RECIPE_1_1, RECIPE_1_2 ],
      recipesVariants: ALTERNATIVES,
      recipesInStock: [],
      dietaryClaims: null,
    })
    test('it does not replace the recipe', () => {
      expect(replacer({recipe: RECIPE_1})).toEqual({recipe: RECIPE_1, originalId: RECIPE_1.get('id')})
    })
  })

  describe('when recipe is out of stock but does not have alternatives', () => {
    const replacer = getOutOfStockRecipeReplacer({
      recipes: [ RECIPE_1, RECIPE_1_1, RECIPE_1_2 ],
      recipesVariants: Immutable.Map(),
      recipesInStock: [],
      dietaryClaims: null,
    })
    test('it does not replace recipe', () => {
      expect(replacer({recipe: RECIPE_1})).toEqual({recipe: RECIPE_1, originalId: RECIPE_1.get('id')})
    })
  })
})
