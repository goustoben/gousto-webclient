import Immutable from 'immutable'
import { logEventToServer } from 'apis/loggingManager'
import {
  EVENT_NAMES,
  sendGoustoAppLinkSMS,
  trackUserAddRemoveRecipe,
  trackUserFreeFoodPageView,
  trackUserLogin,
  trackUserFreeFoodLinkShare,
} from 'actions/loggingmanager'

jest.mock('apis/loggingManager', () => ({
  logEventToServer: jest.fn(),
}))

describe('trackUserFreeFoodPageView', () => {
  let getState
  let dispatch
  const id = 'mock-user-id'
  const browser = 'mobile'

  const state = {
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

describe('trackUserLogin', () => {
  let getState
  let dispatch
  const id = 'mock-user-id'
  const browser = 'mobile'
  const eventName = 'user-loggedin'

  describe('when the user is authed', async () => {
    beforeEach(async () => {
      const state = {
        request: Immutable.fromJS({
          browser,
        }),
        auth: Immutable.fromJS({
          id,
        }),
      }

      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)

      await trackUserLogin()(dispatch, getState)
    })

    test('then the logging manager event should be triggered', async () => {
      expect(logEventToServer).toHaveBeenCalledWith({
        eventName,
        authUserId: id,
        data: {
          device: browser,
        },
      })
    })
  })

  describe('when the user is NOT authed', async () => {
    beforeEach(async () => {
      const state = {
        request: Immutable.fromJS({
          browser,
        }),
        auth: Immutable.fromJS({}),
      }

      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)

      await trackUserLogin()(dispatch, getState)
    })

    test('then the logging manager event should NOT be triggered', async () => {
      expect(logEventToServer).not.toHaveBeenCalledWith()
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
            recipe1: 'recipeTest1',
            recipe2: 'recipeTest2',
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

describe('sendGoustoAppLinkSMS', () => {
  let getState
  let state
  const dispatch = jest.fn()

  const callSendGoustoAppLinkSMS = ({ isAnonymousUser }) => {
    state = {
      request: Immutable.fromJS({
        browser: 'mobile',
      }),
      auth: Immutable.fromJS({
        id: 'mock-user-id',
      })
    }

    getState = jest.fn().mockReturnValue(state)

    return sendGoustoAppLinkSMS({
      isAnonymousUser,
      goustoAppEventName: EVENT_NAMES.sendGoustoAppLinkAppStoreSMS,
      userPhoneNumber: 'test-phone-number',
    })(dispatch, getState)
  }

  afterEach(() => {
    dispatch.mockReset()
    logEventToServer.mockReset()
  })

  describe('and isAnonymousUser is false', () => {
    beforeEach(async () => {
      await callSendGoustoAppLinkSMS({ isAnonymousUser: false })
    })

    test('logEventToServer is called with authUserId', () => {
      expect(logEventToServer).toHaveBeenCalledWith({
        eventName: 'sendsmsapplink-appstore',
        authUserId: 'mock-user-id',
        isAnonymousUser: false,
        data: {
          device: 'mobile',
          userPhoneNumber: 'test-phone-number',
        },
      })
    })

    test('TRACKING is dispatched with sent key', () => {
      const dispatchCalls = dispatch.mock.calls

      expect(dispatchCalls[dispatchCalls.length - 2][0]).toEqual({
        trackingData: {
          actionType: 'click_send_text_app_install_sent'
        },
        type: 'TRACKING',
      })
    })
  })

  describe('and isAnonymousUser is true', () => {
    beforeEach(async () => {
      await callSendGoustoAppLinkSMS({ isAnonymousUser: true })
    })

    test('logEventToServer is called without authUserId', () => {
      expect(logEventToServer).toHaveBeenCalledWith({
        eventName: 'sendsmsapplink-appstore',
        isAnonymousUser: true,
        data: {
          device: 'mobile',
          userPhoneNumber: 'test-phone-number',
        },
      })
    })
  })

  describe('when an error occurs', () => {
    beforeEach(async () => {
      logEventToServer.mockRejectedValue({ message: 'test-error' })

      await sendGoustoAppLinkSMS({
        isAnonymousUser: false,
        goustoAppEventName: EVENT_NAMES.sendGoustoAppLinkAppStoreSMS,
        userPhoneNumber: 'test-phone-number',
      })(dispatch, getState)
    })

    test('LOGGING_MANAGER_EVENT_ERROR is dispatched', () => {
      const dispatchCalls = dispatch.mock.calls

      expect(dispatchCalls[dispatchCalls.length - 3][0]).toEqual({
        key: 'LOGGING_MANAGER_EVENT_ERROR', type: 'ERROR', value: 'test-error'
      })
    })

    test('TRACKING is dispatched with error key', () => {
      const dispatchCalls = dispatch.mock.calls

      expect(dispatchCalls[dispatchCalls.length - 2][0]).toEqual({
        trackingData: {
          actionType: 'click_send_text_app_install_error'
        },
        type: 'TRACKING',
      })
    })
  })
})

describe('trackUserFreeFoodLinkShare', () => {
  let getState
  let dispatch
  const id = 'mock-user-id'
  const browser = 'mobile'
  const target = 'Email'

  const state = {
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

  describe('when the free food link is clicked', async () => {
    beforeEach(async () => {
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)

      await trackUserFreeFoodLinkShare({ target })(dispatch, getState)
    })

    test('then the logging manager event should be triggered', async () => {
      expect(logEventToServer).toHaveBeenCalledWith({
        eventName: 'rafLink-shared',
        authUserId: id,
        data: {
          device: browser,
          target,
        }
      })
    })
  })
})
