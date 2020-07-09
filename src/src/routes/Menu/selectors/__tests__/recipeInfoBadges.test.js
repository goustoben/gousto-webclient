import Immutable from 'immutable'
import { InfoBadgeSlugs } from '../../Recipe/InfoBadge'
import { getRecipeInfoBadgeSlugs } from '../recipeInfoBadges'

describe('getRecipeInfoBadgeSlugs', () => {
  const recipeId = '123'
  let recipes

  beforeEach(() => {
    recipes = Immutable.Map()
  })

  describe('when recipe exists', () => {
    beforeEach(() => {
      recipes = recipes.set(recipeId, Immutable.Map({ id: recipeId }))
    })

    describe('when recipe is new', () => {
      beforeEach(() => {
        recipes = recipes.setIn([recipeId, 'isNew'], true)
      })

      test('should return array containing NEW_RECIPE slug', () => {
        const result = getRecipeInfoBadgeSlugs.resultFunc(recipes, recipeId)

        expect(result).toContain(InfoBadgeSlugs.NEW_RECIPE)
      })

      describe('when recipe is not new', () => {
        beforeEach(() => {
          recipes = recipes.setIn([recipeId, 'isNew'], false)
        })

        test('should render array without NEW_RECIPE slug', () => {
          const result = getRecipeInfoBadgeSlugs.resultFunc(recipes, recipeId)

          expect(result).not.toContain(InfoBadgeSlugs.NEW_RECIPE)
        })
      })
    })

    describe('when recipe is chef prepared', () => {
      beforeEach(() => {
        recipes = recipes.setIn([recipeId, 'chefPrepared'], true)
      })

      test('should return array containing OVEN_READY slug', () => {
        const result = getRecipeInfoBadgeSlugs.resultFunc(recipes, recipeId)

        expect(result).toContain(InfoBadgeSlugs.OVEN_READY)
      })
    })

    describe('when recipe has promotions', () => {
      const promotions = Immutable.List(['foo', 'bar'])

      beforeEach(() => {
        recipes = recipes.setIn([recipeId, 'promotions'], promotions)
      })

      test('should return array containing slugs from promotions', () => {
        const result = getRecipeInfoBadgeSlugs.resultFunc(recipes, recipeId)

        expect(result).toContain(promotions.get(0))
        expect(result).toContain(promotions.get(1))
      })
    })
  })

  describe('when recipe does not exist', () => {
    beforeEach(() => {
      recipes = Immutable.Map()
    })

    test('should return empty array', () => {
      const result = getRecipeInfoBadgeSlugs.resultFunc(recipes, recipeId)

      expect(result).toEqual([])
    })
  })
})
