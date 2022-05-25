import Immutable from 'immutable'
import { triggerLoggingManagerEvent } from 'apis/loggingManager'
import {
  EVENT_NAMES,
  sendGoustoAppLinkSMS,
  trackUserAddRemoveRecipe,
  trackUserFreeFoodPageView,
  trackUserLogin,
  trackUserFreeFoodLinkShare,
  trackSignupStarted,
  trackSignupFinished,
} from 'actions/loggingmanager'

const MOCK_EVENT_ID = 'mock-event-id'
const MOCK_USER_ID = 'mock-user-id'
const MOCK_ACCESS_TOKEN = 'mock-access-token'
const MOCK_OCCURRED_AT = '2021-01-07T00:00:00.000Z'

jest.mock('apis/loggingManager', () => ({
  triggerLoggingManagerEvent: jest.fn(),
}))

jest.mock('uuid', () => ({
  v4: jest.fn().mockImplementation(() => MOCK_EVENT_ID),
}))

describe('trackUserFreeFoodPageView', () => {
  let getState
  let dispatch
  const browser = 'mobile'

  const state = {
    request: Immutable.fromJS({
      browser,
    }),
    auth: Immutable.fromJS({
      id: MOCK_USER_ID,
      accessToken: MOCK_ACCESS_TOKEN,
    }),
    user: Immutable.fromJS({
      id: MOCK_USER_ID,
    })
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

  describe('when the free food page is viewed', () => {
    beforeEach(async () => {
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)

      await trackUserFreeFoodPageView()(dispatch, getState)
    })

    test('then the logging manager event should be triggered', async () => {
      expect(triggerLoggingManagerEvent).toHaveBeenCalledWith({
        accessToken: MOCK_ACCESS_TOKEN,
        loggingManagerRequest: {
          name: 'rafPage-visited',
          id: MOCK_EVENT_ID,
          authUserId: MOCK_USER_ID,
          isAnonymousUser: undefined,
          occurredAt: MOCK_OCCURRED_AT,
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
  const browser = 'mobile'
  const eventName = 'user-loggedin'

  describe('when the user is authed', () => {
    beforeEach(async () => {
      const state = {
        request: Immutable.fromJS({
          browser,
        }),
        auth: Immutable.fromJS({
          id: MOCK_USER_ID,
          accessToken: MOCK_ACCESS_TOKEN,
        }),
      }

      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)

      await trackUserLogin()(dispatch, getState)
    })

    test('then the logging manager event should be triggered', async () => {
      expect(triggerLoggingManagerEvent).toHaveBeenCalledWith({
        accessToken: MOCK_ACCESS_TOKEN,
        loggingManagerRequest: {
          name: eventName,
          id: MOCK_EVENT_ID,
          authUserId: MOCK_USER_ID,
          isAnonymousUser: undefined,
          occurredAt: MOCK_OCCURRED_AT,
          data: {
            device: browser,
          }
        }
      })
    })
  })

  describe('when the user is NOT authenticated', () => {
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
  const browser = 'mobile'
  const defaultState = {
    request: Immutable.fromJS({
      browser,
    }),
    auth: Immutable.fromJS({
      id: MOCK_USER_ID,
      accessToken: MOCK_ACCESS_TOKEN,
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
          accessToken: MOCK_ACCESS_TOKEN,
          loggingManagerRequest: {
            name: 'basket-updated',
            id: MOCK_EVENT_ID,
            authUserId: MOCK_USER_ID,
            isAnonymousUser: undefined,
            occurredAt: MOCK_OCCURRED_AT,
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
        id: MOCK_USER_ID,
        accessToken: MOCK_ACCESS_TOKEN,
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
        accessToken: MOCK_ACCESS_TOKEN,
        loggingManagerRequest: {
          name: 'sendsmsapplink-appstore',
          id: MOCK_EVENT_ID,
          authUserId: MOCK_USER_ID,
          isAnonymousUser: false,
          occurredAt: MOCK_OCCURRED_AT,
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
        accessToken: MOCK_ACCESS_TOKEN,
        loggingManagerRequest: {
          name: 'sendsmsapplink-appstore',
          id: MOCK_EVENT_ID,
          authUserId: undefined,
          isAnonymousUser: true,
          occurredAt: MOCK_OCCURRED_AT,
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
  const browser = 'mobile'
  const target = 'Email'

  const state = {
    request: Immutable.fromJS({
      browser,
    }),
    auth: Immutable.fromJS({
      id: MOCK_USER_ID,
      accessToken: MOCK_ACCESS_TOKEN,
    }),
  }

  afterEach(() => {
    triggerLoggingManagerEvent.mockReset()
  })

  describe('when the free food link is clicked', () => {
    beforeEach(async () => {
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)

      await trackUserFreeFoodLinkShare({ target })(dispatch, getState)
    })

    test('then the logging manager event should be triggered', async () => {
      expect(triggerLoggingManagerEvent).toHaveBeenCalledWith({
        accessToken: MOCK_ACCESS_TOKEN,
        loggingManagerRequest: {
          name: 'rafLink-shared',
          id: MOCK_EVENT_ID,
          authUserId: MOCK_USER_ID,
          isAnonymousUser: undefined,
          occurredAt: MOCK_OCCURRED_AT,
          data: {
            device: browser,
            target,
          }
        }
      })
    })
  })
})

describe('Track user`s signup events', () => {
  let getState
  let dispatch
  const browser = 'browser'
  const email = 'test@gousto.co.uk'
  const promocode = 'FAKEPROMO'
  const allowMarketingEmail = true
  const previewOrderId = 'fake-414'

  describe('trackSignupStarted', () => {
    afterEach(() => {
      triggerLoggingManagerEvent.mockReset()
    })
    beforeEach(async () => {
      const state = {
        request: {
          browser,
          get: jest.fn(),
        },
        auth: {
          id: '',
          accessToken: MOCK_ACCESS_TOKEN,
          get: jest.fn(),
        },
      }
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)

      await trackSignupStarted({
        email,
        promocode,
        allowMarketingEmail,
        previewOrderId,
      })(dispatch, getState)
    })

    test('loggingManager should be triggered with exact args', () => {
      expect(triggerLoggingManagerEvent).toHaveBeenCalledWith({
        accessToken: undefined,
        loggingManagerRequest: {
          name: EVENT_NAMES.signupStarted,
          isAnonymousUser: true,
          authUserId: undefined,
          userId: undefined,
          id: MOCK_EVENT_ID,
          occurredAt: MOCK_OCCURRED_AT,
          data: {
            email,
            promocode,
            preview_order_id: previewOrderId,
            allow_marketing_email: allowMarketingEmail,
          },
        }
      })
    })
  })

  describe('trackSignupFinished', () => {
    afterEach(() => {
      triggerLoggingManagerEvent.mockReset()
    })

    beforeEach(async () => {
      const state = {
        request: {
          browser,
          get: jest.fn().mockImplementation((key) => {
            if (key === 'browser') {
              return browser
            }

            return undefined
          }),
        },
        auth: {
          id: MOCK_USER_ID,
          accessToken: MOCK_ACCESS_TOKEN,
          get: jest.fn().mockImplementation((key) => {
            if (key === 'id') {
              return MOCK_USER_ID
            } else if (key === 'accessToken') {
              return MOCK_ACCESS_TOKEN
            }

            return undefined
          }),
        },
        user: {
          id: MOCK_USER_ID,
          get: jest.fn().mockImplementation((key) => {
            if (key === 'id') {
              return MOCK_USER_ID
            }

            return undefined
          }),
        },
      }
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue(state)

      await trackSignupFinished({ email })(dispatch, getState)
    })

    test('loggingManager should be triggered with exact args', () => {
      expect(triggerLoggingManagerEvent).toHaveBeenCalledWith({
        accessToken: MOCK_ACCESS_TOKEN,
        loggingManagerRequest: {
          name: EVENT_NAMES.signupFinished,
          isAnonymousUser: false,
          userId: undefined,
          authUserId: MOCK_USER_ID,
          id: MOCK_EVENT_ID,
          occurredAt: MOCK_OCCURRED_AT,
          data: {
            email,
          },
        }
      })
    })
  })
})
