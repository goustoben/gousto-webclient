import Immutable from 'immutable'
import { getRecipeComparatorForOutOfStock } from './getRecipeComparatorForOutOfStock'

describe('getRecipeComparatorForOutOfStock', () => {
  const RECIPE_1 = Immutable.Map({ id: 'aaaa' })
  const RECIPE_2 = Immutable.Map({ id: 'bbbb' })

  describe('when there are no recipes in stock', () => {
    const comparator = getRecipeComparatorForOutOfStock()

    test('should return comparator that does not swap recipes', () => {
      expect([RECIPE_1, RECIPE_2].sort(comparator)).toEqual([RECIPE_1, RECIPE_2])
      expect([RECIPE_2, RECIPE_1].sort(comparator)).toEqual([RECIPE_2, RECIPE_1])
    })
  })

  describe('when all recipes are in stock', () => {
    const comparator = getRecipeComparatorForOutOfStock([RECIPE_1, RECIPE_2])

    test('should return comparator that does not swap recipes', () => {
      expect([RECIPE_1, RECIPE_2].sort(comparator)).toEqual([RECIPE_1, RECIPE_2])
      expect([RECIPE_2, RECIPE_1].sort(comparator)).toEqual([RECIPE_2, RECIPE_1])
    })
  })

  describe('when only part of recipes are in stock', () => {
    const comparator = getRecipeComparatorForOutOfStock([RECIPE_2])

    test('should return comparator that orders recipes such: the ones out of stock are the last', () => {
      expect([RECIPE_1, RECIPE_2].sort(comparator)).toEqual([RECIPE_2, RECIPE_1])
      expect([RECIPE_2, RECIPE_1].sort(comparator)).toEqual([RECIPE_2, RECIPE_1])
    })
  })

  describe('when only part of recipes are in stock', () => {
    const RECIPE_3 = Immutable.Map({ id: 'cccc' })
    const RECIPE_4 = Immutable.Map({ id: 'dddd' })

    const comparator = getRecipeComparatorForOutOfStock([RECIPE_1, RECIPE_3, RECIPE_4])

    test('should return comparator that orders recipes so original order of recipes in stock is maintained', () => {
      expect([RECIPE_1, RECIPE_2, RECIPE_3, RECIPE_4].sort(comparator)).toEqual([RECIPE_1, RECIPE_3, RECIPE_4, RECIPE_2])
    })
  })
})
