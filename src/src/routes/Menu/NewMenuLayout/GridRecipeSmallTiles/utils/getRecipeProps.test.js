import Immutable from 'immutable'
import { getRecipeProps } from './getRecipeProps'

jest.mock('utils/recipe')

jest.mock('utils/image')

describe('Given', () => {
  describe('When the number of portions is 2', () => {
    test('Then the cooking time for 2 portions is returned', () => {
      const fakeRecipe = {
        id: '1234',
        rating: {average: 4, count: 45},
        cookingTime: 30,
        shelfLifeDays: 4,
        fiveADay: 3,
        title: 'Recipe',
        boxType: '',
        dietType: 'vegetarian'
      }
      const recipe = Immutable.fromJS(fakeRecipe)
      const result = getRecipeProps(recipe, 2)
      expect(result).toEqual({
        averageRating: 4,
        cookingTime: 30,
        diet: 'vegetarian',
        fiveADay: 3,
        id: '1234',
        media: undefined,
        ratingCount: 45,
        title: undefined,
        useWithin: 4
      })
    })
  })

  describe('When the number of portions is 4', () => {
    test('Then the cooking time for 4 portions is returned', () => {
      const fakeRecipe = {
        id: '1234',
        rating: {average: 4, count: 45},
        cookingTimeFamily: 45,
        shelfLifeDays: 4,
        fiveADay: 3,
        title: 'Recipe',
        boxType: '',
        dietType: 'vegetarian'
      }
      const recipe = Immutable.fromJS(fakeRecipe)
      const result = getRecipeProps(recipe, 4)
      expect(result).toEqual({
        averageRating: 4,
        cookingTime: 45,
        diet: 'vegetarian',
        fiveADay: 3,
        id: '1234',
        media: undefined,
        ratingCount: 45,
        title: undefined,
        useWithin: 4
      })
    })
  })
})
