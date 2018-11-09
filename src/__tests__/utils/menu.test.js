import Immutable from 'immutable' /* eslint-disable new-cap */

import { isMenuRecommended, isRecommendedRecipe, isFeaturedRecipe, isRecipeInStock, isRecipeInBasket } from 'utils/menu'

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

  describe('isFeatureRecipe', () => {
    const featureRecipe = Immutable.Map({
      id: '10',
      availability: Immutable.fromJS({
        0: {
          id: '6dd1b11d061bab5d38c33604289defc5',
          from: '2018-04-24T12:00:00+01:00',
          until: '2018-05-01T11:59:59+01:00',
          featured: true,
        },
      }),
    })

    const nonFeatureRecipe = Immutable.Map({
      id: '10',
      availability: Immutable.fromJS({
        0: {
          id: 'a308c18031f28123525dcf5e086d1d43',
          from: '2018-06-26T12:00:00+01:00',
          until: '2018-07-03T11:59:59+01:00',
          featured: false,
        },
      }),
    })

    const menuRecieveMenuPending = false
    const cutoffDate = '2018-04-24T12:00:00+01:00'
    const prevCutoffDate = ''

    test('if the recipe is feature recipe, return true', () => {
      expect(isFeaturedRecipe(featureRecipe, menuRecieveMenuPending, cutoffDate, prevCutoffDate)).toBeTruthy()
    })

    test('if the recipe is not feature recipe, return false', () => {
      expect(isFeaturedRecipe(nonFeatureRecipe, menuRecieveMenuPending, cutoffDate, prevCutoffDate)).toBeFalsy()
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
