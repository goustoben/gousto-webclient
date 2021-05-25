import Immutable from 'immutable'
import {
  getUserId,
  getUserOrders,
  getUserHasOrders,
  getUserPhoneNumber,
  getUserStatus,
  getUserPhoneWithoutLeadingZero,
  getUserRecentRecipesIds,
  getUsersOrdersDaySlotLeadTimeIds,
  getUserOpenOrders,
  getUserNewOrdersForMultiSkip,
  getUserSortedNewOrders,
  getMultiSkipState,
  getNextDelivery,
  getNextDeliveryDate,
  getSkippedBoxesCount,
  getIsMultiSkipPending,
  getIsMultiSkipSuccess,
  getIsMultiSkipError,
  createMultiSkipSelector,
  getHasBoxesToSkip
} from '../user'

describe('user selectors', () => {
  describe('multiSkip', () => {
    const newOrders = {
      1: {
        isProjected: false,
        orderState: 'cancelled',
        cancellable: false,
        humanDeliveryDay: 'Saturday, 13th June 2020',
        deliveryDay: '2020-06-13 00:00:00',
        coreDeliveryDayId: '1111',
      },
      4: {
        isProjected: true,
        orderState: 'cancelled',
        cancellable: true,
        humanDeliveryDay: 'Saturday, 27th July 2020',
        deliveryDay: '2020-07-27 00:00:00',
        deliveryDayId: '4444',
      },
      2: {
        isProjected: true,
        orderState: 'scheduled',
        cancellable: true,
        humanDeliveryDay: 'Saturday, 20th June 2020',
        deliveryDay: '2020-06-20 00:00:00',
        deliveryDayId: '2222',
      },
      3: {
        isProjected: true,
        orderState: 'confirmed',
        cancellable: true,
        humanDeliveryDay: 'Saturday, 27th June 2020',
        deliveryDay: '2020-06-27 00:00:00',
        deliveryDayId: '3333',
      },
      5: {
        isProjected: true,
        orderState: 'dispatched',
        cancellable: true,
        humanDeliveryDay: 'Saturday, 27th Aug 2020',
        deliveryDay: '2020-08-27 00:00:00',
        deliveryDayId: '5555',
      },
    }

    const multiSkip = {
      isError: false,
      isPending: false,
      isSuccess: false,
      lastSkippedCount: 3
    }

    const orders = [
      {
        id: 'id-1',
        type: 'order'
      },
      {
        id: 'id-1',
        type: 'order'
      }
    ]

    let state

    const createUserState = (userState = {}) => {
      state = {
        user: Immutable.fromJS({
          newOrders: userState.newOrders || newOrders,
          multiSkip: userState.multiSkip || multiSkip,
          orders: userState.orders || orders
        })
      }
    }

    beforeEach(() => {
      createUserState()
    })

    describe('createMultiSkipSelector', () => {
      test('should select the multi-skip field passed as a param', () => {
        expect(createMultiSkipSelector('isPending')(state)).toEqual(false)
      })
    })

    describe('getUserOrders', () => {
      test('should return a list of orders', () => {
        expect(getUserOrders(state).toJS()).toEqual(orders)
      })
    })

    describe('getUserHasOrders', () => {
      describe('when user has no orders', () => {
        it('should return false', () => {
          const stateWithoutOrders = { user: Immutable.fromJS({}) }

          expect(getUserHasOrders(stateWithoutOrders)).toEqual(false)
        })
      })

      describe('when user has orders', () => {
        it('should return true', () => {
          expect(getUserHasOrders(state)).toEqual(true)
        })
      })
    })

    describe('getMultiSkipState', () => {
      test('should return the entire multiskip state', () => {
        expect(getMultiSkipState(state)).toEqual(Immutable.fromJS({
          isError: false,
          isPending: false,
          isSuccess: false,
          lastSkippedCount: 3
        }))
      })
    })

    describe('getHasBoxesToSkip', () => {
      test('should return true if user has skippable boxes', () => {
        expect(getHasBoxesToSkip(state)).toEqual(true)
      })

      test('should return false if user has no skippable boxes', () => {
        createUserState({ newOrders: [newOrders['1']] })
        expect(getHasBoxesToSkip(state)).toEqual(false)
      })
    })

    describe('getUserSortedNewOrders', () => {
      test('should sort new orders by date ascending', () => {
        expect(getUserSortedNewOrders(state)).toEqual([
          Immutable.fromJS(newOrders[1]),
          Immutable.fromJS(newOrders[2]),
          Immutable.fromJS(newOrders[3]),
          Immutable.fromJS(newOrders[4]),
          Immutable.fromJS(newOrders[5]),
        ])
      })
    })

    describe('getNextDelivery', () => {
      describe('Given there is an upcoming delivery', () => {
        test('Then getNextDelivery returns the next order to be delivered', () => {
          expect(getNextDelivery(state)).toEqual(Immutable.fromJS(newOrders[2]))
        })
      })

      describe('Given there is no upcoming delivery', () => {
        beforeEach(() => {
          createUserState({
            newOrders: {
              1: newOrders[1],
              4: newOrders[4]
            },
          })
        })

        test('Then getNextDelivery returns null', () => {
          expect(getNextDelivery(state)).toEqual(null)
        })
      })
    })

    describe('getNextDeliveryDate', () => {
      describe('Given there are upcoming deliveries', () => {
        test('Then the date of the next order is returned', () => {
          expect(getNextDeliveryDate(state)).toEqual('Saturday, 20th June 2020')
        })
      })

      describe('Given there is no upcoming delivery', () => {
        beforeEach(() => {
          createUserState({
            newOrders: {
              1: newOrders[1],
              4: newOrders[4]
            },
          })
        })

        test('Then getNextDeliveryDate returns null', () => {
          expect(getNextDeliveryDate(state)).toEqual(null)
        })
      })
    })

    describe('getSkippedBoxesCount', () => {
      describe('Given there were boxes skipped', () => {
        test('Then the number of boxes skipped with multiskip is returned', () => {
          expect(getSkippedBoxesCount(state)).toEqual(3)
        })
      })

      describe('Given there were no boxes skipped', () => {
        beforeEach(() => {
          createUserState({
            multiSkip: { lastSkippedCount: null },
          })
        })

        test('Then null is returned', () => {
          expect(getSkippedBoxesCount(state)).toEqual(null)
        })
      })
    })

    describe('getIsMultiSkipPending', () => {
      describe('Given multi skip state is pending', () => {
        beforeEach(() => {
          createUserState({
            multiSkip: { isPending: true },
          })
        })

        test('Then getIsMultiSkipPending returns true', () => {
          expect(getIsMultiSkipPending(state)).toEqual(true)
        })
      })

      describe('Given multi skip state is not pending', () => {
        beforeEach(() => {
          createUserState({
            multiSkip: { isPending: false },
          })
        })

        test('Then getIsMultiSkipPending returns false', () => {
          expect(getIsMultiSkipPending(state)).toEqual(false)
        })
      })
    })

    describe('getIsMultiSkipSuccess', () => {
      describe('Given multiskip was successful', () => {
        beforeEach(() => {
          createUserState({
            multiSkip: { isSuccess: true },
          })
        })

        test('Then getIsMultiSkipSuccess returns true', () => {
          expect(getIsMultiSkipSuccess(state)).toEqual(true)
        })
      })

      describe('Given multiskip was not successful', () => {
        beforeEach(() => {
          createUserState({
            multiSkip: { isSuccess: false },
          })
        })

        test('Then getIsMultiSkipSuccess returns false', () => {
          expect(getIsMultiSkipSuccess(state)).toEqual(false)
        })
      })
    })

    describe('getIsMultiSkipError', () => {
      describe('Given there was a multi skip error', () => {
        beforeEach(() => {
          createUserState({
            multiSkip: { isError: true },
          })
        })

        test('Then getIsMultiSkipError returns true', () => {
          expect(getIsMultiSkipError(state)).toEqual(true)
        })
      })

      describe('Given there was no multi skip error', () => {
        beforeEach(() => {
          createUserState({
            multiSkip: { isError: false },
          })
        })

        test('Then getIsMultiSkipError returns false', () => {
          expect(getIsMultiSkipError(state)).toEqual(false)
        })
      })
    })

    describe('getUserNewOrdersForMultiSkip', () => {
      let selectedOrders

      const expectedSelectedOrders = [
        {
          id: '1',
          canSkip: false,
          isProjected: false,
          deliveryDay: '2020-06-13 00:00:00',
          deliveryDate: 'Saturday, 13th June 2020',
          deliveryDayId: '1111'
        },
        {
          id: '2',
          canSkip: true,
          isProjected: true,
          deliveryDay: '2020-06-20 00:00:00',
          deliveryDate: 'Saturday, 20th June 2020',
          deliveryDayId: '2222'
        },
        {
          id: '4',
          canSkip: false,
          isProjected: true,
          deliveryDay: '2020-07-27 00:00:00',
          deliveryDate: 'Saturday, 27th July 2020',
          deliveryDayId: '4444'
        },
      ]

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
  })
})

describe('getUserRecentRecipesIds', () => {
  const state = {
    user: Immutable.fromJS({
      orders: {
        1: {
          deliveryDay: '2020-05-19 00:00:00',
          recipeItems: [
            { itemableType: 'Recipe', recipeId: '1' },
            { itemableType: 'Recipe', recipeId: '2' },
            { itemableType: 'Recipe', recipeId: '3' },
            { itemableType: 'Recipe', recipeId: '4' }
          ]
        },
        2: {
          deliveryDay: '2020-07-13 00:00:00',
          recipeItems: [
            { itemableType: 'Recipe', recipeId: '5' },
            { itemableType: 'Recipe', recipeId: '5' },
            { itemableType: 'Recipe', recipeId: '6' },
            { itemableType: 'Recipe', recipeId: '6' }
          ]
        },
        3: {
          deliveryDay: '2020-06-10 00:00:00',
          recipeItems: [
            { itemableType: 'Recipe', recipeId: '7' },
            { itemableType: 'Recipe', recipeId: '8' },
            { itemableType: 'Recipe', recipeId: '9' },
            { itemableType: 'Recipe', recipeId: '10' }
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
    expect(getUserRecentRecipesIds(state)).not.toEqual(['5', '5', '6', '6', '7', '8'])
    expect(getUserRecentRecipesIds(state)).toEqual(['5', '6', '7', '8', '9', '10'])
  })

  test('should return the most recent orders first', () => {
    expect(getUserRecentRecipesIds(state)).not.toEqual(['1', '2', '3', '4', '5', '6'])
    expect(getUserRecentRecipesIds(state)).toEqual(['5', '6', '7', '8', '9', '10'])
  })
})

describe('getUsersOrdersDaySlotLeadTimeIds', () => {
  test('should return an array of day slot lead time ids for the users orders', () => {
    const state = {
      user: Immutable.fromJS({
        orders: {
          1: {
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

describe('when getUserStatus is called', () => {
  test('returns user status from the store', () => {
    const state = {
      user: Immutable.fromJS({
        status: 'pending'
      })
    }

    expect(getUserStatus(state)).toBe('pending')
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
          1: {
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
          1: {
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
