import { TransformedRecipe } from '../../transformer'
import { getRecipeComparatorForOutOfStock } from './getRecipeComparatorForOutOfStock'

const makeIds = (recipes: { id: string }[]) =>
  new Set(recipes.map(r => r.id))

describe('getRecipeComparatorForOutOfStock', () => {
  const RECIPE_1 = { id: 'aaaa' } as TransformedRecipe
  const RECIPE_2 = { id: 'bbbb' } as TransformedRecipe

  const wrapRecipes = (recipes: TransformedRecipe[]) =>
    recipes.map((recipe) => ({ recipe }))

  describe('when there are no recipes in stock', () => {
    const comparator = getRecipeComparatorForOutOfStock(makeIds([]))

    test('should return comparator that does not swap recipes', () => {
      expect(wrapRecipes([RECIPE_1, RECIPE_2]).sort(comparator)).toEqual(
        wrapRecipes([RECIPE_1, RECIPE_2]),
      )
      expect(wrapRecipes([RECIPE_2, RECIPE_1]).sort(comparator)).toEqual(
        wrapRecipes([RECIPE_2, RECIPE_1]),
      )
    })
  })

  describe('when all recipes are in stock', () => {
    const comparator = getRecipeComparatorForOutOfStock(makeIds([RECIPE_1, RECIPE_2]))

    test('should return comparator that does not swap recipes', () => {
      expect(wrapRecipes([RECIPE_1, RECIPE_2]).sort(comparator)).toEqual(
        wrapRecipes([RECIPE_1, RECIPE_2]),
      )
      expect(wrapRecipes([RECIPE_2, RECIPE_1]).sort(comparator)).toEqual(
        wrapRecipes([RECIPE_2, RECIPE_1]),
      )
    })
  })

  describe('when only part of recipes are in stock', () => {
    const comparator = getRecipeComparatorForOutOfStock(makeIds([RECIPE_2]))

    test('should return comparator that orders recipes such: the ones out of stock are the last', () => {
      expect(wrapRecipes([RECIPE_1, RECIPE_2]).sort(comparator)).toEqual(
        wrapRecipes([RECIPE_2, RECIPE_1]),
      )
      expect(wrapRecipes([RECIPE_2, RECIPE_1]).sort(comparator)).toEqual(
        wrapRecipes([RECIPE_2, RECIPE_1]),
      )
    })
  })

  describe('when only part of recipes are in stock', () => {
    const RECIPE_3 = { id: 'cccc' } as TransformedRecipe
    const RECIPE_4 = { id: 'dddd' } as TransformedRecipe

    const comparator = getRecipeComparatorForOutOfStock(makeIds([RECIPE_1, RECIPE_3, RECIPE_4]))

    test('should return comparator that orders recipes so original order of recipes in stock is maintained', () => {
      expect(wrapRecipes([RECIPE_1, RECIPE_2, RECIPE_3, RECIPE_4]).sort(comparator)).toEqual(
        wrapRecipes([RECIPE_1, RECIPE_3, RECIPE_4, RECIPE_2]),
      )
    })
  })
})
