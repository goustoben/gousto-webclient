import { TransformedRecipe } from '../../transformer'

import { getSelectedVariantsReplacer } from './getSelectedVariantsReplacer'

const makeRecipe = (id: string): TransformedRecipe => ({
  id
}) as TransformedRecipe

describe('getSelectedVariantsReplacer produces recipe replacer function that', () => {
  const RECIPE_1 = makeRecipe('aaaa')
  const RECIPE_2 = makeRecipe('bbbb')

  describe('when replacementMap contains entry for provided recipeReference', () => {
    const reference = 'some_reference_1'
    const replacer = getSelectedVariantsReplacer({
      recipes: [RECIPE_1, RECIPE_2],
      replacementMap: {
        [reference]: RECIPE_2.id,
      },
    })
    test('returns alternative for given recipe', () => {
      expect(replacer({ reference, recipe: RECIPE_1 })).toEqual({
        recipe: RECIPE_2,
        originalId: RECIPE_1.id,
        reference,
      })
    })
  })

  describe('when replacementMap does not contain mapping', () => {
    const replacer = getSelectedVariantsReplacer({
      recipes: [RECIPE_1, RECIPE_2],
      replacementMap: {},
    })
    test('return original recipe', () => {
      expect(replacer({ recipe: RECIPE_1, reference: 'foo' })).toEqual({
        recipe: RECIPE_1,
        originalId: RECIPE_1.id,
        reference: 'foo',
      })
    })
  })
})
