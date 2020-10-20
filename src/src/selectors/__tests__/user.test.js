import Immutable from 'immutable'
import {
  getUserId,
  getUserPhoneNumber,
  getUserPhoneWithoutLeadingZero,
  getUserRecentRecipesIds,
  getUsersOrdersDaySlotLeadTimeIds,
  getUserOpenOrders,
  getUserNewOrdersForMultiSkip
} from '../user'

describe('user selectors', () => {
  describe('getUserNewOrdersForMultiSkip', () => {
    const state = {
      user: Immutable.fromJS({
        newOrders: {
          1234: {
            isProjected: false,
            orderState: 'cancelled',
            cancellable: false,
            humanDeliveryDay: 'Saturday, 13th June 2020',
            coreDeliveryDayId: '0000',
          },
          5678: {
            isProjected: true,
            orderState: 'scheduled',
            cancellable: true,
            humanDeliveryDay: 'Saturday, 20th June 2020',
            deliveryDayId: '1111',
          },
          8910: {
            isProjected: true,
            orderState: 'cancelled',
            cancellable: true,
            humanDeliveryDay: 'Saturday, 27th June 2020',
            deliveryDayId: '2222',
          },
          1112: {
            isProjected: true,
            orderState: 'dispatched',
            cancellable: true,
            humanDeliveryDay: 'Saturday, 27th June 2020',
            deliveryDayId: '2222',
          },
          1314: {
            isProjected: true,
            orderState: 'confirmed',
            cancellable: true,
            humanDeliveryDay: 'Saturday, 27th June 2020',
            deliveryDayId: '2222',
          }
        }
      })
    }

    const expectedSelectedOrders = [
      {
        id: '1234',
        canSkip: false,
        isProjected: false,
        deliveryDate: 'Saturday, 13th June 2020',
        deliveryDayId: '0000'
      },
      {
        id: '5678',
        canSkip: true,
        isProjected: true,
        deliveryDate: 'Saturday, 20th June 2020',
        deliveryDayId: '1111'
      },
      {
        id: '8910',
        canSkip: false,
        isProjected: true,
        deliveryDate: 'Saturday, 27th June 2020',
        deliveryDayId: '2222'
      },
    ]

    let selectedOrders

    beforeEach(() => {
      selectedOrders = getUserNewOrdersForMultiSkip(state)
    })

    test('should return all new orders', () => {
      expect(selectedOrders).toHaveLength(3)
    })

    test('should return orders in the expected structure', () => {
      expect(selectedOrders).toEqual(expectedSelectedOrders)
    })
  })

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

  describe('when getUserPhoneWithoutLeadingZero is called', () => {
    test('returns user phone number from the store without the leading zero', () => {
      const state = {
        user: Immutable.fromJS({
          phone: '0phone-number'
        })
      }

      expect(getUserPhoneWithoutLeadingZero(state)).toBe('phone-number')
    })

    test('returns user phone number from the store', () => {
      const state = {
        user: Immutable.fromJS({
          phone: 'correct-phone-number'
        })
      }

      expect(getUserPhoneWithoutLeadingZero(state)).toBe('correct-phone-number')
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
