import Immutable from 'immutable'
import { logEventToServer } from 'apis/loggingManager'
import {
  trackUserAddRemoveRecipe,
  trackUserFreeFoodPageView,
} from 'actions/loggingmanager'

jest.mock('apis/loggingManager', () => ({
  logEventToServer: jest.fn(),
}))

describe('trackUserFreeFoodPageView', () => {
  let getState
  let dispatch
  const id = 'mock-user-id'
  const browser = 'mobile'
  const accessToken = '12345'

  const state = {
    request: Immutable.fromJS({
      browser,
    }),
    auth: Immutable.fromJS({
      client: Immutable.fromJS({
        accessToken,
      }),
      id,
    }),
  }

  afterEach(() => {
    logEventToServer.mockReset()
  })

  describe('when the free food page is viewed', async () => {
    beforeEach(async () => {
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)

      await trackUserFreeFoodPageView()(dispatch, getState)
    })

    test('then the logging manager event should be triggered', async () => {
      expect(logEventToServer).toHaveBeenCalledWith({
        eventName: 'rafPage-visited',
        authUserId: id,
        data: {
          device: browser,
        }
      })
    })
  })
})

describe('trackUserAddRemoveRecipe', () => {
  let getState
  let dispatch
  let state
  const id = 'mock-user-id'
  const browser = 'mobile'
  const defaultState = {
    request: Immutable.fromJS({
      browser,
    }),
    auth: Immutable.fromJS({
      id,
    }),
  }

  afterEach(() => {
    logEventToServer.mockReset()
  })

  describe('when trackUserAddRemoveRecipe is called', () => {
    describe('and basket has recipes and delivery information', () => {
      beforeEach(async () => {
        state = {
          ...defaultState,
          basket: Immutable.fromJS({
            recipes: { recipeTest1: 2, recipeTest2: 1 },
            date: 'date-1',
            slotId: 'slot-id-1',
            chosenAddress: {
              id: 'chosen-address-id-1',
            }
          }),
          boxSummaryDeliveryDays: Immutable.fromJS({
            'date-1': {
              daySlots: [
                {
                  dayId: 'day-id-1',
                  slotId: 'slot-id-1',
                },
                {
                  dayId: 'day-id-2',
                  slotId: 'slot-id-2',
                },
                {
                  dayId: 'day-id-3',
                  slotId: 'slot-id-3',
                }
              ]
            }
          }),
        }

        getState = jest.fn().mockReturnValue(state)

        await trackUserAddRemoveRecipe()(dispatch, getState)
      })

      test('logEventToServer is called with at least recipes, dayId, slotId, addressId and numPortions', () => {
        expect(logEventToServer).toHaveBeenCalledWith({
          eventName: 'basket-updated',
          authUserId: 'mock-user-id',
          data: {
            device: 'mobile',
            recipes: ['recipeTest1', 'recipeTest2'],
            dayId: 'day-id-1',
            slotId: 'slot-id-1',
            addressId: 'chosen-address-id-1',
            numPortions: 3,
          },
        })
      })
    })

    describe('and user is logged out', () => {
      beforeEach(async () => {
        state = {
          ...defaultState,
          auth: Immutable.fromJS({
            ...state.auth,
            id: '',
          })
        }

        getState = jest.fn().mockReturnValue(state)

        await trackUserAddRemoveRecipe()(dispatch, getState)
      })

      test('logEventToServer is not called', () => {
        expect(logEventToServer).toHaveBeenCalledTimes(0)
      })
    })

    describe('and delivery date is not set in the basket', () => {
      beforeEach(async () => {
        state = {
          ...defaultState,
          basket: Immutable.fromJS({})
        }

        getState = jest.fn().mockReturnValue(state)

        await trackUserAddRemoveRecipe()(dispatch, getState)
      })

      test('logEventToServer is not called', () => {
        expect(logEventToServer).toHaveBeenCalledTimes(0)
      })
    })

    describe('and slotId set in the basket is not found in boxSummaryDeliveryDays', () => {
      beforeEach(async () => {
        state = {
          ...defaultState,
          basket: Immutable.fromJS({
            recipes: { recipeTest1: 2, recipeTest2: 1 },
            date: 'date-1',
            slotId: 'slot-id-1',
            chosenAddress: {
              id: 'chosen-address-id-1',
            }
          }),
          boxSummaryDeliveryDays: Immutable.fromJS({
            'date-1': {
              daySlots: [
                {
                  dayId: 'day-id-1',
                  slotId: 'slot-id-5',
                },
                {
                  dayId: 'day-id-2',
                  slotId: 'slot-id-2',
                },
                {
                  dayId: 'day-id-3',
                  slotId: 'slot-id-3',
                }
              ]
            }
          }),
        }

        getState = jest.fn().mockReturnValue(state)

        await trackUserAddRemoveRecipe()(dispatch, getState)
      })

      test('logEventToServer is not called', () => {
        expect(logEventToServer).toHaveBeenCalledTimes(0)
      })
    })

    describe('and delivery date set in the basket is not found in boxSummaryDeliveryDays', () => {
      beforeEach(async () => {
        state = {
          ...defaultState,
          basket: Immutable.fromJS({
            recipes: { recipeTest1: 2, recipeTest2: 1 },
            date: 'date-x',
            slotId: 'slot-id-1',
            chosenAddress: {
              id: 'chosen-address-id-1',
            }
          }),
          boxSummaryDeliveryDays: Immutable.fromJS({
            'date-1': {
              daySlots: [
                {
                  dayId: 'day-id-1',
                  slotId: 'slot-id-1',
                },
                {
                  dayId: 'day-id-2',
                  slotId: 'slot-id-2',
                },
                {
                  dayId: 'day-id-3',
                  slotId: 'slot-id-3',
                }
              ]
            }
          }),
        }

        getState = jest.fn().mockReturnValue(state)

        await trackUserAddRemoveRecipe()(dispatch, getState)
      })

      test('logEventToServer is not called', () => {
        expect(logEventToServer).toHaveBeenCalledTimes(0)
      })
    })
  })
})
