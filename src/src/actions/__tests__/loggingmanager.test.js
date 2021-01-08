import Immutable from 'immutable'
import { triggerLoggingManagerEvent } from 'apis/loggingManager'
import {
  EVENT_NAMES,
  sendGoustoAppLinkSMS,
  trackUserAddRemoveRecipe,
  trackUserFreeFoodPageView,
  trackUserLogin,
  trackUserFreeFoodLinkShare,
} from 'actions/loggingmanager'

jest.mock('apis/loggingManager', () => ({
  triggerLoggingManagerEvent: jest.fn(),
}))

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('mock-event-id'),
}))

describe('trackUserFreeFoodPageView', () => {
  let getState
  let dispatch
  const id = 'mock-user-id'
  const accessToken = 'mock-access-token'
  const browser = 'mobile'

  const state = {
    request: Immutable.fromJS({
      browser,
    }),
    auth: Immutable.fromJS({
      id,
      accessToken
    }),
  }

  beforeEach(() => {
    const mockDate = new Date('2021-01-07')
    jest
      .spyOn(global, 'Date')
      .mockImplementation(() => mockDate)
  })

  afterEach(() => {
    triggerLoggingManagerEvent.mockReset()
  })

  describe('when the free food page is viewed', async () => {
    beforeEach(async () => {
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)

      await trackUserFreeFoodPageView()(dispatch, getState)
    })

    test('then the logging manager event should be triggered', async () => {
      expect(triggerLoggingManagerEvent).toHaveBeenCalledWith({
        accessToken: 'mock-access-token',
        loggingManagerRequest: {
          name: 'rafPage-visited',
          id: 'mock-event-id',
          authUserId: 'mock-user-id',
          isAnonymousUser: undefined,
          occurredAt: '2021-01-07T00:00:00.000Z',
          data: {
            device: browser,
          }
        }
      })
    })
  })
})

describe('trackUserLogin', () => {
  let getState
  let dispatch
  const id = 'mock-user-id'
  const accessToken = 'mock-access-token'
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
          accessToken
        }),
      }

      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)

      await trackUserLogin()(dispatch, getState)
    })

    test('then the logging manager event should be triggered', async () => {
      expect(triggerLoggingManagerEvent).toHaveBeenCalledWith({
        accessToken: 'mock-access-token',
        loggingManagerRequest: {
          name: eventName,
          id: 'mock-event-id',
          authUserId: 'mock-user-id',
          isAnonymousUser: undefined,
          occurredAt: '2021-01-07T00:00:00.000Z',
          data: {
            device: browser,
          }
        }
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
      expect(triggerLoggingManagerEvent).not.toHaveBeenCalledWith()
    })
  })
})

describe('trackUserAddRemoveRecipe', () => {
  let getState
  let dispatch
  let state
  const id = 'mock-user-id'
  const accessToken = 'mock-access-token'
  const browser = 'mobile'
  const defaultState = {
    request: Immutable.fromJS({
      browser,
    }),
    auth: Immutable.fromJS({
      id,
      accessToken
    }),
  }

  afterEach(() => {
    triggerLoggingManagerEvent.mockReset()
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

      test('triggerLoggingManagerEvent is called with at least recipes, dayId, slotId, addressId and numPortions', () => {
        expect(triggerLoggingManagerEvent).toHaveBeenCalledWith({
          accessToken: 'mock-access-token',
          loggingManagerRequest: {
            name: 'basket-updated',
            id: 'mock-event-id',
            authUserId: 'mock-user-id',
            isAnonymousUser: undefined,
            occurredAt: '2021-01-07T00:00:00.000Z',
            data: {
              device: 'mobile',
              recipe1: 'recipeTest1',
              recipe2: 'recipeTest2',
              dayId: 'day-id-1',
              slotId: 'slot-id-1',
              addressId: 'chosen-address-id-1',
              numPortions: 3,
            }
          }
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
            accessToken: null,
          })
        }

        getState = jest.fn().mockReturnValue(state)

        await trackUserAddRemoveRecipe()(dispatch, getState)
      })

      test('triggerLoggingManagerEvent is not called', () => {
        expect(triggerLoggingManagerEvent).toHaveBeenCalledTimes(0)
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

      test('triggerLoggingManagerEvent is not called', () => {
        expect(triggerLoggingManagerEvent).toHaveBeenCalledTimes(0)
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

      test('triggerLoggingManagerEvent is not called', () => {
        expect(triggerLoggingManagerEvent).toHaveBeenCalledTimes(0)
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

      test('triggerLoggingManagerEvent is not called', () => {
        expect(triggerLoggingManagerEvent).toHaveBeenCalledTimes(0)
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
        accessToken: 'mock-access-token'
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
    triggerLoggingManagerEvent.mockReset()
  })

  describe('and isAnonymousUser is false', () => {
    beforeEach(async () => {
      await callSendGoustoAppLinkSMS({ isAnonymousUser: false })
    })

    test('triggerLoggingManagerEvent is called with authUserId', () => {
      expect(triggerLoggingManagerEvent).toHaveBeenCalledWith({
        accessToken: 'mock-access-token',
        loggingManagerRequest: {
          name: 'sendsmsapplink-appstore',
          id: 'mock-event-id',
          authUserId: 'mock-user-id',
          isAnonymousUser: false,
          occurredAt: '2021-01-07T00:00:00.000Z',
          data: {
            device: 'mobile',
            userPhoneNumber: 'test-phone-number',
          }
        }
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

    test('triggerLoggingManagerEvent is called without authUserId', () => {
      expect(triggerLoggingManagerEvent).toHaveBeenCalledWith({
        accessToken: 'mock-access-token',
        loggingManagerRequest: {
          name: 'sendsmsapplink-appstore',
          id: 'mock-event-id',
          authUserId: undefined,
          isAnonymousUser: true,
          occurredAt: '2021-01-07T00:00:00.000Z',
          data: {
            device: 'mobile',
            userPhoneNumber: 'test-phone-number',
          }
        }
      })
    })
  })

  describe('when an error occurs', () => {
    beforeEach(async () => {
      triggerLoggingManagerEvent.mockRejectedValue({ message: 'test-error' })

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
  const accessToken = 'mock-access-token'
  const browser = 'mobile'
  const target = 'Email'

  const state = {
    request: Immutable.fromJS({
      browser,
    }),
    auth: Immutable.fromJS({
      id,
      accessToken
    }),
  }

  afterEach(() => {
    triggerLoggingManagerEvent.mockReset()
  })

  describe('when the free food link is clicked', async () => {
    beforeEach(async () => {
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)

      await trackUserFreeFoodLinkShare({ target })(dispatch, getState)
    })

    test('then the logging manager event should be triggered', async () => {
      expect(triggerLoggingManagerEvent).toHaveBeenCalledWith({
        accessToken: 'mock-access-token',
        loggingManagerRequest: {
          name: 'rafLink-shared',
          id: 'mock-event-id',
          authUserId: id,
          isAnonymousUser: undefined,
          occurredAt: '2021-01-07T00:00:00.000Z',
          data: {
            device: browser,
            target,
          }
        }
      })
    })
  })
})
