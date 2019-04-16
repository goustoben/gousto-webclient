import Immutable from 'immutable' /* eslint-disable new-cap */

import { isMenuRecommended, isRecommendedRecipe, isRecipeInStock, isRecipeInBasket } from 'utils/menu'

describe('menu utils', () => {
  describe('isMenuRecommended', () => {
    const recipesUnrecommendedMock = Immutable.fromJS({
      121: {
        isRecommended: false,
      },
      1771: {
        isRecommended: false,
      },
    })

    const recipesRecommendedMock = Immutable.fromJS({
      121: {
        isRecommended: false,
      },
      1771: {
        isRecommended: true,
      },
    })

    test('if no recipes are recommended, returns false', () => {
      const expectedResult = isMenuRecommended(recipesUnrecommendedMock)
      expect(expectedResult).toEqual(false)
    })

    test('if one or more recipes are recommended returns true', () => {
      const expectedResult = isMenuRecommended(recipesRecommendedMock)
      expect(expectedResult).toEqual(true)
    })
  })

  describe('isRecommendedRecipe', () => {
    const allRecipesListMock = Immutable.fromJS([234, 543, 252, 444, 451])

    const recipesRecommendedMock = Immutable.fromJS({
      121: {
        isRecommended: false,
      },
      1771: {
        isRecommended: true,
      },
    })

    test('if recipe is in recommended list, in the collection', () => {
      const expectedResult = isRecommendedRecipe(
        234,
        allRecipesListMock,
        recipesRecommendedMock,
      )
      expect(expectedResult).toEqual(true)
    })

    test('if recipe is NOT in recommended list, in the collection', () => {
      const expectedResult = isRecommendedRecipe(
        1,
        allRecipesListMock,
        recipesRecommendedMock,
      )
      expect(expectedResult).toEqual(false)
    })
  })

  describe('isRecipeInStock', function () {
    const recipe = Immutable.Map({
      id: '10',
    })

    test('-browse mode, if recipe is in stock, return true', () => {
      expect(isRecipeInStock(recipe, Immutable.fromJS({
        10: {
          2: null,
        },
      }), 2)).toEqual(true)
    })
  })

  describe('isRecipeInBasket', function () {
    const recipe = Immutable.Map({
      id: '10',
    })
    const basketRecipes = Immutable.Map({
      10: 1,
    })

    test('if recipe is in the basket, return true', () => {
      expect(isRecipeInBasket(recipe, basketRecipes)).toBeTruthy()
    })
  })
})
