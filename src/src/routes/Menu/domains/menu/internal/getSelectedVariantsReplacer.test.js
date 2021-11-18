import Immutable from 'immutable'
import { getSelectedVariantsReplacer } from './getSelectedVariantsReplacer'

describe('getSelectedVariantsReplacer produces recipe replacer function that', () => {
  const RECIPE_1 = Immutable.Map({ id: 'aaaa' })
  const RECIPE_2 = Immutable.Map({ id: 'bbbb' })

  describe('when replacementMap contains the mapping', () => {
    const replacer = getSelectedVariantsReplacer({
      recipes: [RECIPE_1, RECIPE_2],
      replacementMap: {
        [RECIPE_1.get('id')]: RECIPE_2.get('id')
      },
    })
    test('returns alternative for given recipe', () => {
      expect(replacer(RECIPE_1)).toEqual({recipe: RECIPE_2, originalId: RECIPE_1.get('id')})
    })
  })

  describe('when replacementMap does not contain mapping', () => {
    const replacer = getSelectedVariantsReplacer({
      recipes: [RECIPE_1, RECIPE_2],
      replacementMap: {},
    })
    test('return original recipe', () => {
      expect(replacer(RECIPE_1)).toEqual({recipe: RECIPE_1, originalId: RECIPE_1.get('id')})
    })
  })
})
