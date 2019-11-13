import Immutable from 'immutable'
import { getUserRecentRecipesIds, getUsersOrdersDaySlotLeadTimeIds } from '../user'

describe('user selectors', () => {
  describe('getUserRecentRecipesIds', () => {
    const state = {
      user: Immutable.fromJS({
        orders: {
          1234: {
            recipeItems: [
              { itemableType: 'Recipe', recipeId: '1' },
              { itemableType: 'Recipe', recipeId: '2' },
              { itemableType: 'Recipe', recipeId: '3' },
              { itemableType: 'Recipe', recipeId: '4' }
            ]
          },
          5678: {
            recipeItems: [
              { itemableType: 'Recipe', recipeId: '5' },
              { itemableType: 'Recipe', recipeId: '5' },
              { itemableType: 'Recipe', recipeId: '6' },
              { itemableType: 'Recipe', recipeId: '6' }
            ]
          }
        }
      })
    }

    test('should return 6 recipes by default', () => {
      expect(getUserRecentRecipesIds(state).length).toEqual(6)
    })

    test('should return the number of recipes passed in as a prop', () => {
      expect(getUserRecentRecipesIds(state, 4).length).toEqual(4)
    })

    test('should return no duplicates', () => {
      expect(getUserRecentRecipesIds(state)).not.toEqual(['1', '2', '3', '4', '5', '5'])
      expect(getUserRecentRecipesIds(state)).toEqual(['1', '2', '3', '4', '5', '6'])
    })
  })

  describe('getUsersOrdersDaySlotLeadTimeIds', () => {
    test('should return an array of day slot lead time ids for the users orders', () => {
      const state = {
        user: Immutable.fromJS({
          orders: {
            1234: {
              daySlotLeadTimeId: 'a1b2c3d4e5'
            },
            4567: {
              daySlotLeadTimeId: 'a7b8c9d10e11'
            }
          }
        })
      }

      expect(getUsersOrdersDaySlotLeadTimeIds(state)).toEqual(['a1b2c3d4e5', 'a7b8c9d10e11'])

    })
  })
})
