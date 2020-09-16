import Immutable from 'immutable'
import {
  getUserId,
  getUserPhoneNumber,
  getUserRecentRecipesIds,
  getUsersOrdersDaySlotLeadTimeIds,
  getUserOpenOrders
} from '../user'

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

  describe('when getUserId is called', () => {
    test('returns user id from the store', () => {
      const state = {
        user: Immutable.fromJS({
          id: '123'
        })
      }

      expect(getUserId(state)).toBe('123')
    })
  })

  describe('when getUserPhoneNumber is called', () => {
    test('returns user phone number from the store', () => {
      const state = {
        user: Immutable.fromJS({
          phone: 'phone-number'
        })
      }

      expect(getUserPhoneNumber(state)).toBe('phone-number')
    })
  })

  describe('when getUserOpenOrders is called', () => {
    describe('and user has an upcoming order', () => {
      let expected
      const state = {
        user: Immutable.fromJS({
          orders: {
            1234: {
              phase: 'awaiting_choices'
            },
            4567: {
              phase: 'commited'
            }
          }
        })
      }

      beforeEach(() => {
        expected = getUserOpenOrders(state)
      })

      test('returns awaiting_choices order', () => {
        expect(expected).toEqual(
          Immutable.fromJS({
            1234: {
              phase: 'awaiting_choices'
            }
          })
        )
      })
    })

    describe('and user has no upcoming order', () => {
      let expected
      const state = {
        user: Immutable.fromJS({
          orders: {
            4567: {
              phase: 'commited'
            }
          }
        })
      }

      beforeEach(() => {
        expected = getUserOpenOrders(state)
      })

      test('returns empty', () => {
        expect(expected).toEqual(
          Immutable.fromJS({})
        )
      })
    })
  })
})
