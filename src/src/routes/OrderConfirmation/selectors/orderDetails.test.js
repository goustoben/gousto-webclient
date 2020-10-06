import Immutable from 'immutable'
import { getOrderRecipes } from './orderDetails'

describe('getOrderRecipes', () => {
  describe('when has recipeItems in order', () => {
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

    test('should return a map with recipe items and quantitiy for each of them', () => {
      const expectedResult = Immutable.Map({
        1234: 1,
        3456: 1
      })
      const result = getOrderRecipes(state)

      expect(result).toEqual(expectedResult)
    })
  })

  describe('when has no recipeItems in order', () => {
    let state
    beforeEach(() => {
      state = {
        basket: Immutable.fromJS({
          orderDetails: {
            recipeItems: [],
            box: {
              numPortions: '2'
            }
          }
        })
      }
    })

    test('should return an empty map', () => {
      const expectedResult = Immutable.Map({})
      const result = getOrderRecipes(state)

      expect(result).toEqual(expectedResult)
    })
  })
})

