import Immutable from 'immutable'
import * as recipeUtils from 'utils/recipe'
import { safeJestMock } from '../../../../_testing/mocks'
import { getRecipeTitle } from '../recipe'

describe('menu recipe selectors', () => {
  describe('getRecipeTitle', () => {
    beforeEach(() => {
      const formatRecipeTitle = safeJestMock(recipeUtils, 'formatRecipeTitle')
      formatRecipeTitle.mockImplementation((title, box, diet) => `${title} - ${box} - ${diet}`)
    })

    const allRecipes = Immutable.fromJS({
      123: {
        title: 'foo',
        boxType: 'bar',
        dietType: 'quz'
      }
    })

    describe('when recipe id is null', () => {
      const recipeId = null

      test('should return null', () => {
        const result = getRecipeTitle.resultFunc(allRecipes, recipeId)

        expect(result).toEqual(null)
      })
    })

    describe('when recipe id is not a recipe', () => {
      const recipeId = '567'

      test('should return null', () => {
        const result = getRecipeTitle.resultFunc(allRecipes, recipeId)

        expect(result).toEqual(null)
      })
    })

    describe('when recipe id is valid', () => {
      const recipeId = '123'

      test('should return title', () => {
        const result = getRecipeTitle.resultFunc(allRecipes, recipeId)

        expect(result).toEqual('foo - bar - quz')
      })
    })
  })
})
