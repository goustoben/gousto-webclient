import Immutable from 'immutable'
import { getOrderRecipeItems, getOrderNumPortion, getOrderRecipes } from '../orderDetails'

describe('orderDetails selectors', () => {
  describe('when recipeItems in order', () => {
    let state

    beforeEach(() => {
      state = {
        basket: Immutable.fromJS({
          orderDetails: {
            recipeItems: [
              {
                itemableId: '1234',
                quantity: '2'
              },
              {
                itemableId: '3456',
                quantity: '2'
              }
            ],
            box: {
              numPortions: '2'
            }
          }
        })
      }
    })

    test('should return recipe items', () => {
      const expectedResult = Immutable.fromJS([
        {
          itemableId: '1234',
          quantity: '2'
        },
        {
          itemableId: '3456',
          quantity: '2'
        }
      ])
      const result = getOrderRecipeItems(state)

      expect(result).toEqual(expectedResult)
    })

    test('should return number of portions', () => {
      const expectedResult = '2'
      const result = getOrderNumPortion(state)

      expect(result).toEqual(expectedResult)
    })

    test('should return a map with recipe items and quantitiy for each of them', () => {
      const expectedResult = Immutable.Map({
        1234: 1,
        3456: 1
      })
      const result = getOrderRecipes(state)

      expect(result).toEqual(expectedResult)
    })
  })

  describe('when recipeItems not in order', () => {
    let state

    beforeEach(() => {
      state = {
        basket: Immutable.fromJS({
          orderDetails: {
            recipeItems: [],
            box: {}
          }
        })
      }
    })

    test('should return an empty list', () => {
      const expectedResult = Immutable.List([])
      const result = getOrderRecipeItems(state)

      expect(result).toEqual(expectedResult)
    })

    test('should return 0', () => {
      const expectedResult = 0
      const result = getOrderNumPortion(state)

      expect(result).toEqual(expectedResult)
    })

    test('should return an empty map', () => {
      const expectedResult = Immutable.Map({})
      const result = getOrderRecipes(state)

      expect(result).toEqual(expectedResult)
    })
  })
})
