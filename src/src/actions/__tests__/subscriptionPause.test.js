import Immutable from 'immutable' /* eslint-disable new-caps */
import actionTypes from 'actions/actionTypes'
import { getPauseRecoveryContent } from 'actions/onScreenRecovery'
import subPauseActions from 'actions/subscriptionPause'
import statusActions from 'actions/status'
import userActions from 'actions/user'
import { cancelExistingOrders } from 'apis/orders'
import customersApi from 'apis/customers'
import subscriptionApi from 'apis/subscription'
import redirectActions from 'actions/redirect'
import config from 'config/subscription'
import routesConfig from 'config/routes'
import * as subUtils from 'utils/subscription'
import logger from 'utils/logger'
import windowUtil from 'utils/window'

jest.mock('actions/status', () => ({
  error: jest.fn(),
  pending: jest.fn()
}))
jest.mock('actions/user', () => ({
  userLoadData: jest.fn(),
  userLoadOrders: jest.fn(),
  userOrderCancelNext: jest.fn(),
  userOrderSkipNextProjected: jest.fn(),
  userPromoApplyCode: jest.fn()
}))
jest.mock('actions/redirect', () => ({
  redirect: jest.fn()
}))
jest.mock('actions/onScreenRecovery', () => ({
  getPauseRecoveryContent: jest.fn(()=>(()=>{}))
}))
jest.mock('apis/subscription', () => ({
  deactivateSubscription: jest.fn()
}))
jest.mock('apis/orders', () => ({
  cancelExistingOrders: jest.fn(),
}))
jest.mock('apis/customers', () => ({
  fetchPauseReasons: jest.fn()
}))
jest.mock('utils/logger', () => ({
  critical: jest.fn(),
  error: jest.fn(),
  warning: jest.fn()
}))

describe('Subscription action', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('subscriptionPauseLoadReasonChoice', () => {
    test('should return SUBSCRIPTION_PAUSE_REASON_CHOICE action type', () => {
      const result = subPauseActions.subscriptionPauseLoadReasonChoice(Immutable.List(['r1']))

      expect(result.type).toEqual(actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE)
    })

    test('should return chosenReasonIds', () => {
      const result = subPauseActions.subscriptionPauseLoadReasonChoice(Immutable.List(['r1']))

      expect(Immutable.is(result.chosenReasonIds, Immutable.List(['r1']))).toEqual(true)
    })
  })

  describe('subscriptionPauseLoadStaticScreen', () => {
    test(
      'should return SUBSCRIPTION_PAUSE_REASON_LOAD_STATIC_SCREEN action type',
      () => {
        const result = subPauseActions.subscriptionPauseLoadStaticScreen('testScreenType')

        expect(result.type).toEqual(actionTypes.SUBSCRIPTION_PAUSE_REASON_LOAD_STATIC_SCREEN)
      }
    )

    test('should return screenType', () => {
      const result = subPauseActions.subscriptionPauseLoadStaticScreen('testScreenType')

      expect(result.screenType).toEqual('testScreenType')
    })
  })

  describe('subscriptionPauseLoadReasons', () => {
    const reasons = Immutable.fromJS([
      { id: 'a' },
      { id: 'b' },
      { id: 'c' },
    ])

    test(
      'should return SUBSCRIPTION_PAUSE_REASON_LOAD_REASONS action type',
      () => {
        const result = subPauseActions.subscriptionPauseLoadReasons(reasons)

        expect(result.type).toEqual(actionTypes.SUBSCRIPTION_PAUSE_REASON_LOAD_REASONS)
      }
    )

    test('should return reasons', () => {
      const result = subPauseActions.subscriptionPauseLoadReasons(reasons)

      expect(Immutable.is(result.reasons, reasons)).toEqual(true)
    })
  })

  describe('subscriptionPauseLoadStep', () => {
    test(
      'should return SUBSCRIPTION_PAUSE_REASON_LOAD_STEP action type',
      () => {
        const result = subPauseActions.subscriptionPauseLoadStep()

        expect(result.type).toEqual(actionTypes.SUBSCRIPTION_PAUSE_REASON_LOAD_STEP)
      }
    )

    test('should return activeStepId', () => {
      const result = subPauseActions.subscriptionPauseLoadStep('active step id')

      expect(result.activeStepId).toEqual('active step id')
    })
  })

  describe('subscriptionPauseVisibilityChange', () => {
    test(
      'should return SUBSCRIPTION_PAUSE_VISIBILITY_CHANGE action type',
      () => {
        const result = subPauseActions.subscriptionPauseVisibilityChange(true)

        expect(result.type).toEqual(actionTypes.SUBSCRIPTION_PAUSE_VISIBILITY_CHANGE)
        expect(result.visible).toEqual(true)
      }
    )
  })

  describe('subscriptionPauseApplyPromo', () => {
    let getState
    let dispatch

    const subscriptionPauseLoadErrorSpy = jest.spyOn(subPauseActions, 'subscriptionPauseLoadError')
    const subscriptionPauseProceedSpy = jest.spyOn(subPauseActions, 'subscriptionPauseProceed')

    beforeEach(() => {
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue({
        features: Immutable.fromJS({}),
        auth: Immutable.fromJS({ accessToken: 'token' }),
        user: Immutable.fromJS({ id: '123' }),
        subscriptionPause: Immutable.fromJS({
          activeSteps: {
            s1: {
              id: 's1',
              pauseStepId: 's6',
              type: 'promo',
              context: {
                promocode: '10OFF',
              },
            },
            s6: {
              type: 'copy',
            },
          },
          activeStepId: 's1',
          chosenReasonIds: ['r2'],
          inProgress: false,
          reasons: [],
          startScreen: [],
        }),
      })
    })

    test(
      'should call statusActions pending with true for "SUBSCRIPTION_PAUSE_PROMO_APPLY" as first call to pending',
      async () => {
        await subPauseActions.subscriptionPauseApplyPromo()(dispatch, getState)

        expect(statusActions.pending).toHaveBeenCalledWith(actionTypes.SUBSCRIPTION_PAUSE_PROMO_APPLY, true)
      }
    )

    test(
      'should call statusActions error with false for "SUBSCRIPTION_PAUSE_PROMO_APPLY" as first call to error',
      async () => {
        await subPauseActions.subscriptionPauseApplyPromo()(dispatch, getState)

        expect(statusActions.error).toHaveBeenCalledWith(actionTypes.SUBSCRIPTION_PAUSE_PROMO_APPLY, false)
      }
    )

    test(
      'should call userPromoApplyCode once with provided promo code if promo code is passed in',
      async () => {
        await subPauseActions.subscriptionPauseApplyPromo('testpromocode')(dispatch, getState)

        expect(userActions.userPromoApplyCode).toHaveBeenCalledTimes(1)
        expect(userActions.userPromoApplyCode).toHaveBeenCalledWith('testpromocode')
      }
    )

    test(
      'should call userPromoApplyCode once with promo code from state if promo code is NOT passed in',
      async () => {
        await subPauseActions.subscriptionPauseApplyPromo()(dispatch, getState)

        expect(userActions.userPromoApplyCode).toHaveBeenCalledTimes(1)
        expect(userActions.userPromoApplyCode).toHaveBeenCalledWith('10OFF')
      }
    )

    test(
      'should call statusActions pending with false for "SUBSCRIPTION_PAUSE_PROMO_APPLY" as last call',
      async () => {
        await subPauseActions.subscriptionPauseApplyPromo()(dispatch, getState)

        expect(statusActions.pending).toHaveBeenCalledWith(actionTypes.SUBSCRIPTION_PAUSE_PROMO_APPLY, false)
      }
    )

    describe('when subscriptionPause data is corrupt', () => {
      beforeEach(async () => {
        getState = jest.fn().mockReturnValue({
          auth: Immutable.fromJS({ accessToken: 'token' }),
          user: Immutable.fromJS({ id: '123' }),
          subscriptionPause: undefined,
        })

        await subPauseActions.subscriptionPauseApplyPromo()(dispatch, getState)
      })

      test(
        'should call subscriptionPauseLoadError with data-unavailable GoustoException as first arg',
        () => {
          const error = subscriptionPauseLoadErrorSpy.mock.calls[0][0]
          expect(error.message).toEqual('Subscription pause promo error: data not available')
          expect(error.error).toEqual('data-unavailable')
          expect(error.level).toEqual('error')
        }
      )

      test(
        'should call subscriptionPauseLoadError with "SUBSCRIPTION_PAUSE_PROMO_APPLY" as second arg',
        () => {
          expect(subscriptionPauseLoadErrorSpy.mock.calls[0][1]).toEqual(actionTypes.SUBSCRIPTION_PAUSE_PROMO_APPLY)
        }
      )
    })

    describe('when promo code can not be determined', () => {
      beforeEach(async () => {
        getState = jest.fn().mockReturnValue({
          auth: Immutable.fromJS({ accessToken: 'token' }),
          user: Immutable.fromJS({ id: '123' }),
          subscriptionPause: Immutable.fromJS({
            activeSteps: {
              s6: {
                type: 'copy',
              },
            },
            activeStepId: 's6',
            chosenReasonIds: ['r2'],
            inProgress: false,
            reasons: [],
          }),
        })

        await subPauseActions.subscriptionPauseApplyPromo()(dispatch, getState)
      })

      test(
        'should call subscriptionPauseLoadError with no-promo-code-found GoustoException as first arg',
        () => {
          const error = subscriptionPauseLoadErrorSpy.mock.calls[0][0]
          expect(error.message).toEqual('Subscription pause promo error: promo code cannot be determined')
          expect(error.error).toEqual('no-promo-code-found')
          expect(error.level).toEqual('error')
        }
      )

      test(
        'should call subscriptionPauseLoadError with "SUBSCRIPTION_PAUSE_PROMO_APPLY" as second arg',
        () => {
          expect(subscriptionPauseLoadErrorSpy.mock.calls[0][1]).toEqual(actionTypes.SUBSCRIPTION_PAUSE_PROMO_APPLY)
        }
      )
    })

    test(
      'should call subscriptionPauseProceed once with "next" and "recovered"',
      async () => {
        getState = jest.fn().mockReturnValue({
          auth: Immutable.fromJS({ accessToken: 'token' }),
          user: Immutable.fromJS({ id: '123' }),
          subscriptionPause: Immutable.fromJS({
            activeSteps: {
              s1: {
                id: 's1',
                nextStepId: 's6',
                type: 'promo',
              },
              s6: {
                type: 'copy',
              },
            },
            activeStepId: 's1',
            chosenReasonIds: ['r2'],
            inProgress: false,
            reasons: [],
          }),
        })

        await subPauseActions.subscriptionPauseApplyPromo('abc123')(dispatch, getState)

        expect(subscriptionPauseProceedSpy).toHaveBeenCalledTimes(1)
        expect(subscriptionPauseProceedSpy).toHaveBeenCalledWith('next', 'recovered', 'promo', 'abc123')
      }
    )
  })

  describe('subscriptionDeactivate', () => {
    let getState
    let dispatch

    beforeEach(() => {
      getState = jest.fn().mockReturnValue({
        auth: Immutable.fromJS({ accessToken: 'token' }),
      })
      dispatch = jest.fn()
      subscriptionApi.deactivateSubscription.mockReturnValue(Promise.resolve())
    })

    test('should handle pending state', async () => {
      await subPauseActions.subscriptionDeactivate('passed in reason')(dispatch, getState)

      expect(statusActions.pending).toHaveBeenCalledWith(actionTypes.SUBSCRIPTION_DEACTIVATE, true)
      expect(statusActions.pending).toHaveBeenCalledWith(actionTypes.SUBSCRIPTION_DEACTIVATE, false)
    })

    test('should reset error state', async () => {
      await subPauseActions.subscriptionDeactivate('passed in reason')(dispatch, getState)

      expect(statusActions.error).toHaveBeenCalledWith(actionTypes.SUBSCRIPTION_DEACTIVATE, false)
    })

    test(
      'should call deactivateSubscription once with accessToken & reason',
      async () => {
        await subPauseActions.subscriptionDeactivate('passed in reason')(dispatch, getState)

        expect(subscriptionApi.deactivateSubscription).toHaveBeenCalledTimes(1)
        expect(subscriptionApi.deactivateSubscription).toHaveBeenCalledWith('token', { state_reason: 'passed in reason' })
      }
    )

    describe('when deactivation fails', () => {
      beforeEach(async () => {
        subscriptionApi.deactivateSubscription.mockReturnValue(Promise.reject('error from deactivateSubscription'))

        await subPauseActions.subscriptionDeactivate('passed in reason')(dispatch, getState)
      })

      test('should call error status with deactivate-fail', () => {
        expect(statusActions.error).toHaveBeenCalledWith(actionTypes.SUBSCRIPTION_DEACTIVATE, 'deactivate-fail')
      })
    })
  })

  describe('subscriptionPauseEnd', () => {
    let dispatch
    let getState
    const subscriptionPauseVisibilityChangeSpy = jest.spyOn(subPauseActions, 'subscriptionPauseVisibilityChange')
    const subscriptionPauseReasonsRefreshRequiredSpy = jest.spyOn(subPauseActions, 'subscriptionPauseReasonsRefreshRequired')

    beforeEach(() => {
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue({
        features: Immutable.fromJS({}),
        user: Immutable.fromJS({ id: '123' }),
        subscriptionPause: Immutable.fromJS({
          chosenReasonIds: [1, 2],
          reasons: [
            { id: 1 },
            { id: 2 },
          ],
          activeReasons: {
            1: { slug: 'abc' },
            2: { slug: 'def' },
          },
          activeStepId: 's1',
          activeSteps: {
            s1: { type: 'sampleType' },
          },
        }),
      })
    })

    test(
      'should call subscriptionPauseVisibilityChange once with false',
      async () => {
        await subPauseActions.subscriptionPauseEnd()(dispatch, getState)

        expect(subscriptionPauseVisibilityChangeSpy).toHaveBeenCalledTimes(1)
        expect(subscriptionPauseVisibilityChangeSpy).toHaveBeenCalledWith(false)
      }
    )

    test(
      'should call subscriptionPauseReasonsRefreshRequired once with true',
      async () => {
        await subPauseActions.subscriptionPauseEnd()(dispatch, getState)

        expect(subscriptionPauseReasonsRefreshRequiredSpy).toHaveBeenCalledTimes(1)
        expect(subscriptionPauseReasonsRefreshRequiredSpy).toHaveBeenCalledWith(true)
      }
    )
  })

  describe('subscriptionPauseStart', () => {
    let getState
    let dispatch
    const subscriptionPauseResetSpy = jest.spyOn(subPauseActions, 'subscriptionPauseReset')
    const subscriptionPauseLoadReasonsSpy = jest.spyOn(subPauseActions, 'subscriptionPauseLoadReasons')
    const subscriptionPauseVisibilityChangeSpy = jest.spyOn(subPauseActions, 'subscriptionPauseVisibilityChange')

    beforeEach(() => {
      getState = jest.fn().mockReturnValue({
        features: Immutable.fromJS({subscriptionPauseOsr: {experiment: false, value: false}}),
        auth: Immutable.fromJS({ accessToken: 'token' }),
        user: Immutable.fromJS({ id: '123' }),
        subscriptionPause: Immutable.fromJS({
          reasons: [
            { id: 1, children: [] },
            { id: 2, children: [] },
          ],
          startScreen: [],
        }),
      })
      dispatch = jest.fn()
    })

    test(
      'should call statusActions pending with true for "SUBSCRIPTION_PAUSE_START" as first call',
      async () => {
        await subPauseActions.subscriptionPauseStart()(dispatch, getState)

        expect(statusActions.pending).toHaveBeenCalledWith(actionTypes.SUBSCRIPTION_PAUSE_START, true)
      }
    )

    test(
      'should call statusActions pending with false for "SUBSCRIPTION_PAUSE_START" as last call',
      async () => {
        await subPauseActions.subscriptionPauseStart()(dispatch, getState)

        expect(statusActions.pending).toHaveBeenCalledWith(actionTypes.SUBSCRIPTION_PAUSE_START, false)
      }
    )

    test('should call subscriptionPauseReset once with no args', async () => {
      await subPauseActions.subscriptionPauseStart()(dispatch, getState)

      expect(subscriptionPauseResetSpy).toHaveBeenCalledTimes(1)
      expect(subscriptionPauseResetSpy).toHaveBeenCalledWith()
    })

    describe('when subscriptionPause refreshRequired is true', () => {
      const subscriptionPauseFetchReasonsSpy = jest.spyOn(subPauseActions, 'subscriptionPauseFetchReasons')
      const subscriptionPauseReasonsRefreshRequiredSpy = jest.spyOn(subPauseActions, 'subscriptionPauseReasonsRefreshRequired')

      beforeEach(() => {
        getState = jest.fn().mockReturnValue({
          features: Immutable.fromJS({}),
          auth: Immutable.fromJS({ accessToken: 'token' }),
          user: Immutable.fromJS({ id: '123' }),
          error: Immutable.fromJS({}),
          subscriptionPause: Immutable.fromJS({
            reasons: [
              { id: 1, children: [] },
              { id: 2, children: [] },
            ],
            startScreen: [],
            refreshRequired: true,
          }),
        })
      })

      test(
        'should call subscriptionPauseFetchReasons once with no args',
        async () => {
          await subPauseActions.subscriptionPauseStart()(dispatch, getState)

          expect(subscriptionPauseFetchReasonsSpy).toHaveBeenCalledTimes(1)
          expect(subscriptionPauseFetchReasonsSpy).toHaveBeenCalledWith()
        }
      )

      test(
        'should call subscriptionPauseReasonsRefreshRequired once with false if there is no fetch error',
        async () => {
          await subPauseActions.subscriptionPauseStart()(dispatch, getState)

          expect(subscriptionPauseReasonsRefreshRequiredSpy).toHaveBeenCalledTimes(1)
          expect(subscriptionPauseReasonsRefreshRequiredSpy).toHaveBeenCalledWith(false)
        }
      )

      test(
        'should NOT call subscriptionPauseReasonsRefreshRequired if there is a fetch error',
        async () => {
          getState = jest.fn().mockReturnValue({
            features: Immutable.fromJS({}),
            auth: Immutable.fromJS({ accessToken: 'token' }),
            user: Immutable.fromJS({ id: '123' }),
            error: Immutable.fromJS({
              [actionTypes.SUBSCRIPTION_PAUSE_FETCH]: 'some-error',
            }),
            subscriptionPause: Immutable.fromJS({
              reasons: [
                { id: 1, children: [] },
                { id: 2, children: [] },
              ],
              startScreen: [],
              refreshRequired: true,
            }),
          })

          await subPauseActions.subscriptionPauseStart()(dispatch, getState)

          expect(subscriptionPauseReasonsRefreshRequiredSpy).toHaveBeenCalledTimes(0)
        }
      )

      test(
        'should call subscriptionPauseLoadStartScreen if startScreen is loaded',
        async () => {
          const subscriptionPauseLoadStartScreenSpy = jest.spyOn(subPauseActions, 'subscriptionPauseLoadStartScreen')
          getState = jest.fn().mockReturnValue({
            features: Immutable.fromJS({}),
            auth: Immutable.fromJS({ accessToken: 'token' }),
            user: Immutable.fromJS({ id: '123' }),
            subscriptionPause: Immutable.fromJS({
              reasons: [
                { id: 1, children: [] },
                { id: 2, children: [] },
              ],
              startScreen: [{ id: 1, children: [] }],
              refreshRequired: false,
            }),
          })

          await subPauseActions.subscriptionPauseStart()(dispatch, getState)

          expect(subscriptionPauseLoadStartScreenSpy).toHaveBeenCalledTimes(1)
        }
      )
    })

    describe('when subscriptionPause refreshRequired is false', () => {
      const subscriptionPauseFetchReasonsSpy = jest.spyOn(subPauseActions, 'subscriptionPauseFetchReasons')
      const subscriptionPauseReasonsRefreshRequiredSpy = jest.spyOn(subPauseActions, 'subscriptionPauseReasonsRefreshRequired')

      beforeEach(() => {
        getState = jest.fn().mockReturnValue({
          features: Immutable.fromJS({}),
          auth: Immutable.fromJS({ accessToken: 'token' }),
          user: Immutable.fromJS({ id: '123' }),
          error: Immutable.fromJS({
            [actionTypes.SUBSCRIPTION_PAUSE_FETCH]: 'some-error',
          }),
          subscriptionPause: Immutable.fromJS({
            reasons: [
              { id: 1, children: [] },
              { id: 2, children: [] },
            ],
            startScreen: [],
            refreshRequired: false,
          }),
        })
      })

      test('should NOT call subscriptionPauseFetchReasons', async () => {
        await subPauseActions.subscriptionPauseStart()(dispatch, getState)

        expect(subscriptionPauseFetchReasonsSpy).toHaveBeenCalledTimes(0)
      })

      test(
        'should NOT call subscriptionPauseReasonsRefreshRequired',
        async () => {
          await subPauseActions.subscriptionPauseStart()(dispatch, getState)

          expect(subscriptionPauseReasonsRefreshRequiredSpy).toHaveBeenCalledTimes(0)
        }
      )
    })

    test(
      'should call subscriptionPauseLoadReasons once with reasons from store if set',
      async () => {
        await subPauseActions.subscriptionPauseStart()(dispatch, getState)

        expect(subscriptionPauseLoadReasonsSpy).toHaveBeenCalledTimes(1)

        const calledWithReasons = subscriptionPauseLoadReasonsSpy.mock.calls[0][0]
        const expectedReasons = Immutable.fromJS([
          { id: 1, children: [] },
          { id: 2, children: [] },
        ])

        expect(Immutable.is(calledWithReasons, expectedReasons)).toEqual(true)
      }
    )

    test(
      'should call subscriptionPauseVisibilityChange once with visible set to true',
      async () => {
        await subPauseActions.subscriptionPauseStart()(dispatch, getState)

        expect(subscriptionPauseVisibilityChangeSpy).toHaveBeenCalledTimes(1)
        expect(subscriptionPauseVisibilityChangeSpy).toHaveBeenCalledWith(true)
      }
    )

    describe('when feature flag subscriptionPause value is true', async function() {
      beforeEach(() => {
        getState.mockReturnValueOnce({
          features: Immutable.fromJS({subscriptionPauseOsr: {experiment: false, value: true}}),
          auth: Immutable.fromJS({ accessToken: 'token' }),
          user: Immutable.fromJS({ id: '123' }),
          subscriptionPause: Immutable.fromJS({
            reasons: [
              { id: 1, children: [] },
              { id: 2, children: [] },
            ],
            startScreen: [],
          }),
        })
      })

      describe('when feature flag enableOsrOffer value is undefined', async function() {
        it('should call getPauseRecoveryContent with false enableOffer', async function() {
          await subPauseActions.subscriptionPauseStart()(dispatch, getState)

          expect(getPauseRecoveryContent).toHaveBeenCalledTimes(1)
          expect(getPauseRecoveryContent).toHaveBeenCalledWith(false)
        })
      })

      describe('when feature flag enableOsrOffer value is true', async function() {
        beforeEach(() => {
          getState.mockReturnValueOnce({
            features: Immutable.fromJS({
              subscriptionPauseOsr: {experiment: false, value: true},
              enableOsrOffer: {experiment: false, value: true},
            }),
            auth: Immutable.fromJS({ accessToken: 'token' }),
            user: Immutable.fromJS({ id: '123' }),
            subscriptionPause: Immutable.fromJS({
              reasons: [
                { id: 1, children: [] },
                { id: 2, children: [] },
              ],
              startScreen: [],
            }),
          })
        })
        it('should call getPauseRecoveryContent with true enableOffer', async function() {
          await subPauseActions.subscriptionPauseStart()(dispatch, getState)

          expect(getPauseRecoveryContent).toHaveBeenCalledTimes(1)
          expect(getPauseRecoveryContent).toHaveBeenCalledWith(true)
        })
      })
    })
  })

  describe('subscriptionPauseReasonChoice', () => {
    let dispatch
    let getState
    const subscriptionPauseLoadReasonsSpy = jest.spyOn(subPauseActions, 'subscriptionPauseLoadReasons')
    const subscriptionPauseReasonSubmitSpy = jest.spyOn(subPauseActions, 'subscriptionPauseReasonSubmit')
    const subscriptionPauseProceedSpy = jest.spyOn(subPauseActions, 'subscriptionPauseProceed')
    const subscriptionPauseLoadReasonChoiceSpy = jest.spyOn(subPauseActions, 'subscriptionPauseLoadReasonChoice')
    const subscriptionPauseLoadErrorSpy = jest.spyOn(subPauseActions, 'subscriptionPauseLoadError')

    beforeEach(() => {
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue({})
    })

    test(
      'should call statusActions pending with true for "SUBSCRIPTION_PAUSE_REASON_CHOICE" as first call',
      async () => {
        await subPauseActions.subscriptionPauseReasonChoice()(dispatch, getState)

        expect(statusActions.pending).toHaveBeenCalledWith(actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE, true)
      }
    )

    test(
      'should call statusActions error with false for "SUBSCRIPTION_PAUSE_REASON_CHOICE"',
      async () => {
        await subPauseActions.subscriptionPauseReasonChoice()(dispatch, getState)

        expect(statusActions.error).toHaveBeenCalledWith(actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE, false)
      }
    )

    test(
      'should call statusActions pending with true for "SUBSCRIPTION_PAUSE_REASON_CHOICE" as last call',
      async () => {
        await subPauseActions.subscriptionPauseReasonChoice()(dispatch, getState)

        expect(statusActions.pending).toHaveBeenCalledWith(actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE, false)
      }
    )

    describe('when chosen reason has children', () => {
      beforeEach(async () => {
        getState = jest.fn().mockReturnValue({
          auth: Immutable.fromJS({ accessToken: 'token' }),
          user: Immutable.fromJS({ id: '123' }),
          subscriptionPause: Immutable.fromJS({
            activeReasons: {
              7: {
                id: '7',
                slug: 'narrower_time_slots',
                label: 'I would like narrower time slots',
                children: [
                  { id: 'r3' },
                ],
                steps: [
                  { id: 's1', type: 'contact' },
                ],
              },
            },
            chosenReasonIds: [],
            reasons: [
              { id: 'r1', children: [] },
              { id: 'r2', children: [] },
            ],
          }),
        })

        await subPauseActions.subscriptionPauseReasonChoice('7')(dispatch, getState)
      })

      test('should call subscriptionPauseLoadReasons once', () => {
        expect(subscriptionPauseLoadReasonsSpy).toHaveBeenCalledTimes(1)
      })

      test(
        'should call subscriptionPauseLoadReasons with chosen reason\'s children as value of arg 1',
        () => {
          const expectedChildren = Immutable.fromJS([
            { id: 'r3' },
          ])
          expect(Immutable.is(subscriptionPauseLoadReasonsSpy.mock.calls[0][0], expectedChildren)).toEqual(true)
        }
      )
    })

    describe('when chosen reason has no children', () => {
      beforeEach(async () => {
        getState = jest.fn().mockReturnValue({
          auth: Immutable.fromJS({ accessToken: 'token' }),
          user: Immutable.fromJS({
            id: '123',
            orders: null,
          }),
          subscriptionPause: Immutable.fromJS({
            activeReasons: {
              r7: {
                id: 'r7',
                slug: 'narrower_time_slots',
                label: 'I would like narrower time slots',
                children: [],
                steps: [
                  { id: 's1', type: 'contact' },
                ],
              },
              r8: {
                id: 'r8',
                slug: 'cost_cant_afford',
                label: 'I can\'t afford it',
                children: [],
                steps: [
                  { id: 's1', type: 'contact' },
                  { id: 's2', type: 'promo' },
                ],
              },
              r9: {
                id: 'r9',
                slug: 'cost_some_other_slug',
                label: 'I can\'t afford it',
                children: [{ id: 'r3' }],
                steps: [],
              },
            },
            activeSteps: Immutable.fromJS({
              s1: { id: 's1', type: 'contact' },
              s2: { id: 's2', type: 'promo' },
            }),
            chosenReasonIds: [],
            reasons: [
              { id: 1, children: [] },
              { id: 2, children: [] },
            ],
          }),
        })
      })

      describe('when chosen reason has NO "initial" flag set to true in any step', () => {
        beforeEach(async () => {
          await subPauseActions.subscriptionPauseReasonChoice('r7')(dispatch, getState)
        })

        test(
          'should call subscriptionPauseLoadReasonChoice with chosen reason ids with chosenReasonId appended & correct tracking data',
          async () => {
            expect(Immutable.is(subscriptionPauseLoadReasonChoiceSpy.mock.calls[0][0], Immutable.List(['r7'])))
            expect(subscriptionPauseLoadReasonChoiceSpy.mock.calls[0][1]).toEqual({
              type: 'reason',
              chosenReasonSlug: 'narrower_time_slots',
            })

            await subPauseActions.subscriptionPauseReasonChoice('r9')(dispatch, getState)

            expect(Immutable.is(subscriptionPauseLoadReasonChoiceSpy.mock.calls[1][0], Immutable.List(['r7', 'r9'])))
            expect(subscriptionPauseLoadReasonChoiceSpy.mock.calls[1][1]).toEqual({
              type: 'category',
              chosenReasonSlug: 'cost_some_other_slug',
            })
          }
        )

        test('should call subscriptionPauseReasonSubmit once', () => {
          expect(subscriptionPauseReasonSubmitSpy).toHaveBeenCalledTimes(1)
        })
      })

      describe('when chosen reason has "initial" flag set to true in any step', () => {
        const subscriptionPauseTrackSpy = jest.spyOn(subPauseActions, 'subscriptionPauseTrack')

        beforeEach(async () => {
          getState = jest.fn().mockReturnValue({
            auth: Immutable.fromJS({ accessToken: 'token' }),
            user: Immutable.fromJS({
              id: '123',
              orders: null,
            }),
            features: Immutable.fromJS({
              recovery: {
                value: 'experiment value',
                experiment: true,
              },
            }),
            subscriptionPause: Immutable.fromJS({
              activeReasons: {
                r8: {
                  id: 'r8',
                  slug: 'cost_cant_afford',
                  label: 'I can\'t afford it',
                  children: [],
                  steps: [
                    { id: 's1', type: 'contact' },
                    { id: 's2', type: 'promo' },
                  ],
                },
              },
              activeSteps: Immutable.fromJS({
                s1: { id: 's1', type: 'contact' },
                s2: { id: 's2', type: 'promo', initial: true },
              }),
              chosenReasonIds: ['r8'],
              reasons: [],
            }),
          })
        })

        test(
          'should call subscriptionPauseTrack once with "IN_RECOVERY_EXPERIMENT" & correct experiment data if recovery feature is found in state & is an experiment',
          async () => {
            await subPauseActions.subscriptionPauseReasonChoice('r8')(dispatch, getState)

            expect(subscriptionPauseTrackSpy).toHaveBeenCalledTimes(1)
            expect(subscriptionPauseTrackSpy).toHaveBeenCalledWith('IN_RECOVERY_EXPERIMENT', { experiment: 'experiment value' })
          }
        )

        test(
          'should NOT call subscriptionPauseTrack if recovery feature is not found in state or is not an experiment',
          async () => {
            getState = jest.fn().mockReturnValue({
              auth: Immutable.fromJS({ accessToken: 'token' }),
              user: Immutable.fromJS({
                id: '123',
                orders: null,
              }),
              features: Immutable.fromJS({
                recovery: {
                  value: 'experiment value',
                  experiment: false,
                },
              }),
              subscriptionPause: Immutable.fromJS({
                activeReasons: {
                  r8: {
                    id: 'r8',
                    slug: 'cost_cant_afford',
                    label: 'I can\'t afford it',
                    children: [],
                    steps: [
                      { id: 's1', type: 'contact' },
                      { id: 's2', type: 'promo' },
                    ],
                  },
                },
                activeSteps: Immutable.fromJS({
                  s1: { id: 's1', type: 'contact' },
                  s2: { id: 's2', type: 'promo', initial: true },
                }),
                chosenReasonIds: ['r8'],
                reasons: [],
              }),
            })

            await subPauseActions.subscriptionPauseReasonChoice('r8')(dispatch, getState)
            expect(subscriptionPauseTrackSpy).toHaveBeenCalledTimes(0)

            const getStateNoRecoveryFeature = jest.fn().mockReturnValue({
              auth: Immutable.fromJS({ accessToken: 'token' }),
              user: Immutable.fromJS({
                id: '123',
                orders: null,
              }),
              features: Immutable.fromJS({}),
              subscriptionPause: Immutable.fromJS({
                activeReasons: {
                  r8: {
                    id: 'r8',
                    slug: 'cost_cant_afford',
                    label: 'I can\'t afford it',
                    children: [],
                    steps: [
                      { id: 's1', type: 'contact' },
                      { id: 's2', type: 'promo' },
                    ],
                  },
                },
                activeSteps: Immutable.fromJS({
                  s1: { id: 's1', type: 'contact' },
                  s2: { id: 's2', type: 'promo', initial: true },
                }),
                chosenReasonIds: ['r8'],
                reasons: [],
              }),
            })

            await subPauseActions.subscriptionPauseReasonChoice('r8')(dispatch, getStateNoRecoveryFeature)
            expect(subscriptionPauseTrackSpy).toHaveBeenCalledTimes(0)
          }
        )

        test(
          'should call subscriptionPauseProceed once with "initial"',
          async () => {
            await subPauseActions.subscriptionPauseReasonChoice('r8')(dispatch, getState)

            expect(subscriptionPauseProceedSpy).toHaveBeenCalledTimes(1)
            expect(subscriptionPauseProceedSpy).toHaveBeenCalledWith('initial')
          }
        )
      })
    })

    describe('when reason id not provided', () => {
      beforeEach(async () => {
        await subPauseActions.subscriptionPauseReasonChoice()(dispatch, getState)
      })

      test(
        'should call subscriptionPauseLoadError with no-reason-found GoustoException as first arg',
        () => {
          const error = subscriptionPauseLoadErrorSpy.mock.calls[0][0]
          expect(error.message).toEqual('Unable to choose reason: reason id not provided')
          expect(error.error).toEqual('no-reason-found')
          expect(error.level).toEqual('error')
        }
      )

      test(
        'should call subscriptionPauseLoadError with "SUBSCRIPTION_PAUSE_REASON_CHOICE" as second arg',
        async () => {
          expect(subscriptionPauseLoadErrorSpy.mock.calls[0][1]).toEqual(actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE)
        }
      )
    })

    describe('if state data is malformed or unavailable', () => {
      beforeEach(async () => {
        await subPauseActions.subscriptionPauseReasonChoice('r10')(dispatch, getState)
      })

      test(
        'should call subscriptionPauseLoadError with data-unavailable GoustoException as first arg',
        () => {
          const error = subscriptionPauseLoadErrorSpy.mock.calls[0][0]
          expect(error.message).toEqual('Unable to choose reason: data not available')
          expect(error.error).toEqual('data-unavailable')
          expect(error.level).toEqual('error')
        }
      )

      test(
        'should call subscriptionPauseLoadError with "SUBSCRIPTION_PAUSE_REASON_CHOICE" as second arg',
        async () => {
          expect(subscriptionPauseLoadErrorSpy.mock.calls[0][1]).toEqual(actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE)
        }
      )
    })
  })

  describe('subscriptionPauseSkipNextBox', () => {
    let getState
    let dispatch
    const subscriptionPauseProceedSpy = jest.spyOn(subPauseActions, 'subscriptionPauseProceed')
    const subscriptionPauseLoadErrorSpy = jest.spyOn(subPauseActions, 'subscriptionPauseLoadError')

    beforeEach(() => {
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue({
        error: Immutable.fromJS({}),
      })
    })

    test(
      'should call statusActions pending with true for "SUBSCRIPTION_PAUSE_SKIP_BOX" as first call',
      async () => {
        await subPauseActions.subscriptionPauseSkipNextBox()(dispatch, getState)

        expect(statusActions.pending).toHaveBeenCalledWith(actionTypes.SUBSCRIPTION_PAUSE_SKIP_BOX, true)
      }
    )

    test(
      'should call statusActions error with false for "SUBSCRIPTION_PAUSE_SKIP_BOX"',
      async () => {
        await subPauseActions.subscriptionPauseSkipNextBox()(dispatch, getState)

        expect(statusActions.error).toHaveBeenCalledWith(actionTypes.SUBSCRIPTION_PAUSE_SKIP_BOX, false)
      }
    )

    test(
      'should call statusActions pending with true for "SUBSCRIPTION_PAUSE_SKIP_BOX" as last call',
      async () => {
        await subPauseActions.subscriptionPauseSkipNextBox()(dispatch, getState)

        expect(statusActions.pending).toHaveBeenCalledWith(actionTypes.SUBSCRIPTION_PAUSE_SKIP_BOX, false)
      }
    )

    test('should call userOrderCancelNext once with no args', async () => {
      await subPauseActions.subscriptionPauseSkipNextBox()(dispatch, getState)

      expect(userActions.userOrderCancelNext).toHaveBeenCalledTimes(1)
      expect(userActions.userOrderCancelNext).toHaveBeenCalledWith()
    })

    test(
      'should call subscriptionPauseProceed once with "next" and "recovered" when next box is succesfully canceled',
      async () => {
        getState = jest.fn().mockReturnValue({
          error: Immutable.fromJS({
            [actionTypes.USER_ORDER_CANCEL_NEXT]: false,
          }),
        })
        await subPauseActions.subscriptionPauseSkipNextBox()(dispatch, getState)

        expect(subscriptionPauseProceedSpy).toHaveBeenCalledTimes(1)
        expect(subscriptionPauseProceedSpy).toHaveBeenCalledWith('next', 'recovered', 'quoteSkipNext')
      }
    )

    describe('when an error occurs in canceling next box due to something other than no orders found to cancel', () => {
      beforeEach(async () => {
        getState = jest.fn().mockReturnValue({
          error: Immutable.fromJS({
            [actionTypes.USER_ORDER_CANCEL_NEXT]: 'something else',
          }),
        })

        await subPauseActions.subscriptionPauseSkipNextBox()(dispatch, getState)
      })

      test(
        'should call subscriptionPauseLoadError with failed-cancel GoustoException as first arg',
        () => {
          const error = subscriptionPauseLoadErrorSpy.mock.calls[0][0]
          expect(error.message).toEqual('Subscription pause skip next box error: failed to cancel next box, something else')
          expect(error.error).toEqual('failed-cancel')
          expect(error.level).toEqual('error')
        }
      )

      test(
        'should call subscriptionPauseLoadError with "SUBSCRIPTION_PAUSE_SKIP_BOX" as second arg',
        async () => {
          expect(subscriptionPauseLoadErrorSpy.mock.calls[0][1]).toEqual(actionTypes.SUBSCRIPTION_PAUSE_SKIP_BOX)
        }
      )
    })

    test(
      'should call userOrderSkipNextProjected once with no args when an error occurs in canceling next box due to no orders found to cancel',
      async () => {
        getState = jest.fn().mockReturnValue({
          error: Immutable.fromJS({
            [actionTypes.USER_ORDER_CANCEL_NEXT]: 'no-orders-found',
          }),
        })
        await subPauseActions.subscriptionPauseSkipNextBox()(dispatch, getState)

        expect(userActions.userOrderSkipNextProjected).toHaveBeenCalledTimes(1)
        expect(userActions.userOrderSkipNextProjected).toHaveBeenCalledWith()
      }
    )

    test(
      'should call subscriptionPauseProceed once with "next" and "recovered" when next box is succesfully skipped',
      async () => {
        getState = jest.fn().mockReturnValue({
          error: Immutable.fromJS({
            [actionTypes.USER_ORDER_CANCEL_NEXT]: 'no-orders-found',
            [actionTypes.USER_ORDER_SKIP_NEXT_PROJECTED]: false,
          }),
        })
        await subPauseActions.subscriptionPauseSkipNextBox()(dispatch, getState)

        expect(subscriptionPauseProceedSpy).toHaveBeenCalledTimes(1)
        expect(subscriptionPauseProceedSpy).toHaveBeenCalledWith('next', 'recovered', 'quoteSkipNext')
      }
    )

    describe('when an error occurs in skipping next projected box due to something other than no orders found to skip', () => {
      beforeEach(async () => {
        getState = jest.fn().mockReturnValue({
          error: Immutable.fromJS({
            [actionTypes.USER_ORDER_CANCEL_NEXT]: 'no-orders-found',
            [actionTypes.USER_ORDER_SKIP_NEXT_PROJECTED]: 'something else',
          }),
        })

        await subPauseActions.subscriptionPauseSkipNextBox()(dispatch, getState)
      })

      test(
        'should call subscriptionPauseLoadError with failed-skip GoustoException as first arg',
        () => {
          const error = subscriptionPauseLoadErrorSpy.mock.calls[0][0]
          expect(error.message).toEqual('Subscription pause skip next box error: failed to skip next box, something else')
          expect(error.error).toEqual('failed-skip')
          expect(error.level).toEqual('error')
        }
      )

      test(
        'should call subscriptionPauseLoadError with "SUBSCRIPTION_PAUSE_SKIP_BOX" as second arg',
        async () => {
          expect(subscriptionPauseLoadErrorSpy.mock.calls[0][1]).toEqual(actionTypes.SUBSCRIPTION_PAUSE_SKIP_BOX)
        }
      )
    })

    describe('when an error occurs in skipping next projected box due to no orders found to skip', () => {
      beforeEach(async () => {
        getState = jest.fn().mockReturnValue({
          error: Immutable.fromJS({
            [actionTypes.USER_ORDER_CANCEL_NEXT]: 'no-orders-found',
            [actionTypes.USER_ORDER_SKIP_NEXT_PROJECTED]: 'no-orders-found',
          }),
        })

        await subPauseActions.subscriptionPauseSkipNextBox()(dispatch, getState)
      })

      test(
        'should call subscriptionPauseLoadError with no-orders-found GoustoException as first arg',
        () => {
          const error = subscriptionPauseLoadErrorSpy.mock.calls[0][0]
          expect(error.message).toEqual('Subscription pause skip next box error: no orders found to cancel or skip')
          expect(error.error).toEqual('no-orders-found')
          expect(error.level).toEqual('warning')
        }
      )

      test(
        'should call subscriptionPauseLoadError with "SUBSCRIPTION_PAUSE_SKIP_BOX" as second arg',
        async () => {
          expect(subscriptionPauseLoadErrorSpy.mock.calls[0][1]).toEqual(actionTypes.SUBSCRIPTION_PAUSE_SKIP_BOX)
        }
      )
    })
  })

  describe('subscriptionPauseReset', () => {
    test('should return SUBSCRIPTION_PAUSE_REASON_RESET action type', () => {
      const result = subPauseActions.subscriptionPauseReset()

      expect(result.type).toEqual(actionTypes.SUBSCRIPTION_PAUSE_REASON_RESET)
    })
  })

  describe('subscriptionPauseReasonsReceive', () => {
    test(
      'should return SUBSCRIPTION_PAUSE_REASONS_RECEIVE action type',
      () => {
        const result = subPauseActions.subscriptionPauseReasonsReceive([])

        expect(result.type).toEqual(actionTypes.SUBSCRIPTION_PAUSE_REASONS_RECEIVE)
      }
    )

    test('should return received data', () => {
      const result = subPauseActions.subscriptionPauseReasonsReceive([
        { id: 'r1' },
        { id: 'r2' },
      ])

      expect(result.reasons).toEqual([
        { id: 'r1' },
        { id: 'r2' },
      ])
    })
  })

  describe('subscriptionPauseTrack', () => {
    test('should return TRACKING action type', () => {
      const result = subPauseActions.subscriptionPauseTrack('testScreenType')

      expect(result.type).toEqual(actionTypes.TRACKING)
    })

    test(
      'should return trackingData with correctly constructed string for actionType by default',
      () => {
        const result = subPauseActions.subscriptionPauseTrack('test_key')

        expect(result.trackingData).toEqual({
          actionType: `${config.tracking.pauseModalPrefix}test_key`,
        })
      }
    )

    test(
      'should return trackingData with additional data merged in if provided',
      () => {
        const result = subPauseActions.subscriptionPauseTrack('test_key', { extraDataOne: 1, extraDataTwo: 2 })

        expect(result.trackingData).toEqual({
          actionType: `${config.tracking.pauseModalPrefix}test_key`,
          extraDataOne: 1,
          extraDataTwo: 2,
        })
      }
    )
  })

  describe('subscriptionPauseFetchReasons', () => {
    let getState
    let dispatch
    const subscriptionPauseReasonsReceiveSpy = jest.spyOn(subPauseActions, 'subscriptionPauseReasonsReceive')
    const subscriptionPauseLoadErrorSpy = jest.spyOn(subPauseActions, 'subscriptionPauseLoadError')

    beforeEach(() => {
      getState = jest.fn().mockReturnValue({
        features: Immutable.fromJS({}),
        auth: Immutable.fromJS({ accessToken: 'token' }),
        user: Immutable.fromJS({ id: '123' }),
      })
      dispatch = jest.fn()
      customersApi.fetchPauseReasons.mockReturnValue(new Promise(resolve => {
        resolve(
          {
            data: ['1', '2'],
            meta: {
              filters: {
                a: 'a',
              },
            },
          }
        )
      }))
    })

    test('should call fetchPauseReasons once', async () => {
      await subPauseActions.subscriptionPauseFetchReasons()(dispatch, getState)

      expect(customersApi.fetchPauseReasons).toHaveBeenCalledTimes(1)
    })

    test(
      'should call subscriptionPauseReasonsReceive with received data',
      async () => {
        await subPauseActions.subscriptionPauseFetchReasons()(dispatch, getState)

        expect(subscriptionPauseReasonsReceiveSpy).toHaveBeenCalledWith(['1', '2'], { a: 'a' })
      }
    )

    describe('when no reasons are retrieved', async () => {
      beforeEach(async () => {
        customersApi.fetchPauseReasons.mockReturnValue(Promise.resolve({ data: [], meta: {} }))
        await subPauseActions.subscriptionPauseFetchReasons()(dispatch, getState)
      })

      test(
        'should call subscriptionPauseLoadError with no-pause-reasons GoustoException as first arg',
        () => {
          const error = subscriptionPauseLoadErrorSpy.mock.calls[0][0]
          expect(error.message).toEqual('Subscripton pause fetch error: no pause reasons available')
          expect(error.error).toEqual('no-pause-reasons')
          expect(error.level).toEqual('warning')
        }
      )

      test(
        'should call subscriptionPauseLoadError with "SUBSCRIPTION_PAUSE_FETCH" as second arg',
        async () => {
          expect(subscriptionPauseLoadErrorSpy.mock.calls[0][1]).toEqual(actionTypes.SUBSCRIPTION_PAUSE_FETCH)
        }
      )
    })

    describe('when fetch fails', async () => {
      beforeEach(async () => {
        customersApi.fetchPauseReasons.mockReturnValue(Promise.reject('response from deactivateSubscription'))
        await subPauseActions.subscriptionPauseFetchReasons()(dispatch, getState)
      })

      test(
        'should call subscriptionPauseFetchReasons with fetch-failed GoustoException as first arg',
        () => {
          const error = subscriptionPauseLoadErrorSpy.mock.calls[0][0]
          expect(error.message).toEqual('Subscripton pause fetch error: fetch failed, response from deactivateSubscription')
          expect(error.error).toEqual('fetch-failed')
          expect(error.level).toEqual('error')
        }
      )

      test(
        'should call subscriptionPauseFetchReasons with "SUBSCRIPTION_PAUSE_FETCH" as second arg',
        async () => {
          expect(subscriptionPauseLoadErrorSpy.mock.calls[0][1]).toEqual(actionTypes.SUBSCRIPTION_PAUSE_FETCH)
        }
      )
    })
  })

  describe('subscriptionPauseLoadError', () => {
    let dispatch
    const subscriptionPauseLoadStaticScreenSpy = jest.spyOn(subPauseActions, 'subscriptionPauseLoadStaticScreen')
    const subscriptionPauseTrackSpy = jest.spyOn(subPauseActions, 'subscriptionPauseTrack')

    beforeEach(() => {
      dispatch = jest.fn()
    })

    test(
      'should call logger "error" by default with error.message if error message is available',
      () => {
        subPauseActions.subscriptionPauseLoadError({ message: 'message from object' })(dispatch)

        expect(logger.error).toHaveBeenCalledTimes(1)
        expect(logger.error).toHaveBeenCalledWith('message from object')
      }
    )

    test(
      'should call logger "error" by default with error value if error message is not available',
      () => {
        subPauseActions.subscriptionPauseLoadError('Error string')(dispatch)

        expect(logger.error).toHaveBeenCalledTimes(1)
        expect(logger.error).toHaveBeenCalledWith('Error string')
      }
    )

    test(
      'should call correct logger method matching error.level if provided, along with error message',
      () => {
        subPauseActions.subscriptionPauseLoadError({ message: 'a', level: 'critical' })(dispatch)

        expect(logger.critical).toHaveBeenCalledTimes(1)
        expect(logger.critical).toHaveBeenCalledWith('a')

        subPauseActions.subscriptionPauseLoadError({ message: 'b', level: 'warning' })(dispatch)

        expect(logger.warning).toHaveBeenCalledTimes(1)
        expect(logger.warning).toHaveBeenCalledWith('b')
      }
    )

    test(
      'should call statusActions error once with SUBSCRIPTION_PAUSE_ERROR actionType by default',
      () => {
        subPauseActions.subscriptionPauseLoadError({ error: 'error-key' })(dispatch)

        expect(statusActions.error).toHaveBeenCalledTimes(1)
        expect(statusActions.error).toHaveBeenCalledWith(actionTypes.SUBSCRIPTION_PAUSE_ERROR, 'error-key')
      }
    )

    test(
      'should call statusActions error once with given actionType & error.error if both are provided',
      () => {
        subPauseActions.subscriptionPauseLoadError({ error: 'error-key' }, 'ACTION_TYPE')(dispatch)

        expect(statusActions.error).toHaveBeenCalledTimes(1)
        expect(statusActions.error).toHaveBeenCalledWith('ACTION_TYPE', 'error-key')
      }
    )

    test(
      'should NOT call statusActions error if false is provided as actionType',
      () => {
        subPauseActions.subscriptionPauseLoadError({ error: 'error-key' }, false)(dispatch)

        expect(statusActions.error).toHaveBeenCalledTimes(0)
      }
    )

    test('should call subscriptionPauseLoadStaticScreen with "error"', () => {
      subPauseActions.subscriptionPauseLoadError({ error: 'error-key' })(dispatch)

      expect(subscriptionPauseLoadStaticScreenSpy).toHaveBeenCalledTimes(1)
      expect(subscriptionPauseLoadStaticScreenSpy).toHaveBeenCalledWith('error')
    })

    test(
      'should call subscriptionPauseTrack once with error.message if error message is available',
      () => {
        subPauseActions.subscriptionPauseLoadError({ message: 'message from object' })(dispatch)

        expect(subscriptionPauseTrackSpy).toHaveBeenCalledTimes(1)
        expect(subscriptionPauseTrackSpy).toHaveBeenCalledWith('ERROR', { error: 'message from object' })
      }
    )

    test(
      'should call subscriptionPauseTrack once with with error value if error message is not available',
      () => {
        subPauseActions.subscriptionPauseLoadError('Error string')(dispatch)

        expect(subscriptionPauseTrackSpy).toHaveBeenCalledTimes(1)
        expect(subscriptionPauseTrackSpy).toHaveBeenCalledWith('ERROR', { error: 'Error string' })
      }
    )
  })

  describe('subscriptionPauseGoBack', () => {
    const dispatch = jest.fn()
    const getState = jest.fn()
    const subscriptionPauseLoadStaticScreenSpy = jest.spyOn(subPauseActions, 'subscriptionPauseLoadStaticScreen')
    const subscriptionPauseProceedSpy = jest.spyOn(subPauseActions, 'subscriptionPauseProceed')
    const subscriptionPauseLoadReasonsSpy = jest.spyOn(subPauseActions, 'subscriptionPauseLoadReasons')
    const subscriptionPauseLoadReasonChoiceSpy = jest.spyOn(subPauseActions, 'subscriptionPauseLoadReasonChoice')
    const subscriptionPauseLoadErrorSpy = jest.spyOn(subPauseActions, 'subscriptionPauseLoadError')
    const subscriptionPauseTrackSpy = jest.spyOn(subPauseActions, 'subscriptionPauseTrack')

    test('should call subscriptionPauseTrack once with BACK', () => {
      subPauseActions.subscriptionPauseGoBack()(dispatch, getState)

      expect(subscriptionPauseTrackSpy).toHaveBeenCalledTimes(1)
      expect(subscriptionPauseTrackSpy).toHaveBeenCalledWith('BACK')
    })

    describe('when staticScreenId is set in state', () => {
      beforeEach(() => {
        getState.mockReturnValue({
          features: Immutable.fromJS({}),
          subscriptionPause: Immutable.fromJS({
            staticScreenId: 'static-screen-name',
          }),
        })
      })

      test(
        'should call subscriptionPauseLoadStaticScreen once with undefined',
        () => {
          subPauseActions.subscriptionPauseGoBack()(dispatch, getState)

          expect(subscriptionPauseLoadStaticScreenSpy).toHaveBeenCalledTimes(1)
          expect(subscriptionPauseLoadStaticScreenSpy).toHaveBeenCalledWith(undefined)
        }
      )
    })

    describe('when staticScreenId is NOT set & activeStepId NOT on initial step in state', () => {
      beforeEach(() => {
        getState.mockReturnValue({
          features: Immutable.fromJS({}),
          subscriptionPause: Immutable.fromJS({
            activeStepId: 's2',
            activeSteps: {
              s2: {
                id: 's2',
                previousStepId: 's3',
              },
              s3: {
                id: 's3',
                initial: true,
              },
            },
            staticScreenId: undefined,
          }),
        })
      })

      test('should call subscriptionPauseProceed once with "previous"', () => {
        subPauseActions.subscriptionPauseGoBack()(dispatch, getState)

        expect(subscriptionPauseProceedSpy).toHaveBeenCalledTimes(1)
        expect(subscriptionPauseProceedSpy).toHaveBeenCalledWith('previous')
      })

      describe('when previousStepId is not available', () => {
        beforeEach(() => {
          getState.mockReturnValue({
            features: Immutable.fromJS({}),
            subscriptionPause: Immutable.fromJS({
              activeStepId: 's2',
              activeSteps: {
                s2: { id: 's2' },
                s3: {
                  id: 's3',
                  initial: true,
                },
              },
              staticScreenId: undefined,
            }),
          })

          subPauseActions.subscriptionPauseGoBack()(dispatch, getState)
        })

        test(
          'should call subscriptionPauseLoadError with no-prev-step GoustoException as first arg',
          () => {
            const error = subscriptionPauseLoadErrorSpy.mock.calls[0][0]
            expect(error.message).toEqual('Subscription pause go back error: can\'t find previous step to go back to')
            expect(error.error).toEqual('no-prev-step')
            expect(error.level).toEqual('error')
          }
        )

        test(
          'should call subscriptionPauseLoadError with "SUBSCRIPTION_PAUSE_REASON_GO_BACK" as second arg',
          async () => {
            expect(subscriptionPauseLoadErrorSpy.mock.calls[0][1]).toEqual(actionTypes.SUBSCRIPTION_PAUSE_REASON_GO_BACK)
          }
        )
      })
    })

    describe('when staticScreenId is NOT set & activeStepId is on initial step or activeStepId is not set in state', () => {
      const getReasonsFromStoreSpy = jest.spyOn(subUtils, 'getReasonsFromStore')

      beforeEach(() => {
        getState.mockReturnValue({
          features: Immutable.fromJS({}),
          subscriptionPause: Immutable.fromJS({
            activeStepId: 's3',
            activeSteps: {
              s2: {
                id: 's2',
                previousStepId: 's3',
                initial: true,
              },
              s3: {
                id: 's3',
                initial: true,
              },
            },
            chosenReasonIds: ['r1', 'r4'],
            staticScreenId: undefined,
            reasons: [
              {
                id: 'r1',
                children: [
                  { id: 'r3' },
                  {
                    id: 'r4',
                    children: [
                      { id: 'r5' },
                      { id: 'r6' },
                    ],
                  },
                ],
              },
              { id: 'r2', children: [] },
            ],
          }),
        })

        getReasonsFromStoreSpy.mockReturnValue(Immutable.fromJS([
          { id: 'r3' },
          { id: 'r4' },
        ]))
      })

      test(
        'should call subscriptionPauseLoadReasons once with previous reasons',
        () => {
          subPauseActions.subscriptionPauseGoBack()(dispatch, getState)

          expect(subscriptionPauseLoadReasonsSpy).toHaveBeenCalledTimes(1)
          expect(subscriptionPauseLoadReasonsSpy.mock.calls[0][0].toJS()).toEqual([
            { id: 'r3' },
            { id: 'r4' },
          ])
        }
      )

      test(
        'should call subscriptionPauseLoadReasonChoice once with prevChosenReasonIds from state with last item removed',
        () => {
          subPauseActions.subscriptionPauseGoBack()(dispatch, getState)

          expect(subscriptionPauseLoadReasonChoiceSpy).toHaveBeenCalledTimes(1)
          expect(subscriptionPauseLoadReasonChoiceSpy.mock.calls[0][0].toJS()).toEqual(['r1'])
        }
      )

      describe('when no previous reasons found', () => {
        beforeEach(() => {
          getReasonsFromStoreSpy.mockReturnValueOnce(Immutable.fromJS([]))

          subPauseActions.subscriptionPauseGoBack()(dispatch, getState)
        })

        test(
          'should call subscriptionPauseLoadError with no-prev-step GoustoException as first arg',
          () => {
            const error = subscriptionPauseLoadErrorSpy.mock.calls[0][0]
            expect(error.message).toEqual('Subscription pause go back error: can\'t find reasons to go back to')
            expect(error.error).toEqual('no-prev-reasons')
            expect(error.level).toEqual('error')
          }
        )

        test(
          'should call subscriptionPauseLoadError with "SUBSCRIPTION_PAUSE_REASON_GO_BACK" as second arg',
          async () => {
            expect(subscriptionPauseLoadErrorSpy.mock.calls[0][1]).toEqual(actionTypes.SUBSCRIPTION_PAUSE_REASON_GO_BACK)
          }
        )
      })
    })
  })

  describe('subscriptionPauseRedirect', () => {
    let dispatch
    const subscriptionPauseVisibilityChangeSpy = jest.spyOn(subPauseActions, 'subscriptionPauseVisibilityChange')

    beforeEach(() => {
      jest.useFakeTimers()
      dispatch = jest.fn()
    })

    test(
      'should dispatch subscriptionPauseVisibilityChange with false',
      async () => {
        await subPauseActions.subscriptionPauseRedirect('/sample-url')(dispatch)
        expect(subscriptionPauseVisibilityChangeSpy).toHaveBeenCalledWith(false)
      }
    )

    test('should call redirect with passed in url after 300ms', async () => {
      await subPauseActions.subscriptionPauseRedirect('/sample-url')(dispatch)

      jest.advanceTimersByTime(300)
      expect(redirectActions.redirect).toHaveBeenCalledWith('/sample-url')
    })
  })

  describe('subscriptionPauseReasonSubmit', () => {
    let dispatch
    let getState
    let toggleSubscriptionPage
    const subscriptionDeactivateSpy = jest.spyOn(subPauseActions, 'subscriptionDeactivate')
    const subscriptionPauseLoadStaticScreenSpy = jest.spyOn(subPauseActions, 'subscriptionPauseLoadStaticScreen')
    const subscriptionPauseProceedSpy = jest.spyOn(subPauseActions, 'subscriptionPauseProceed')
    const subscriptionPauseLoadErrorSpy = jest.spyOn(subPauseActions, 'subscriptionPauseLoadError')
    const getWindowSpy = jest.spyOn(windowUtil, 'getWindow')

    beforeEach(() => {
      dispatch = jest.fn()
      toggleSubscriptionPage = jest.fn()
      getState = jest.fn().mockReturnValue({
        features: Immutable.fromJS({}),
        subscriptionPause: Immutable.fromJS({
          chosenReasonIds: [],
        }),
      })
      getWindowSpy.mockReturnValue({ toggleSubscriptionPage })
    })

    test(
      'should call statusActions pending with true for "SUBSCRIPTION_PAUSE_REASON_SUBMIT" as first call',
      async () => {
        await subPauseActions.subscriptionPauseReasonSubmit()(dispatch, getState)

        expect(statusActions.pending).toHaveBeenCalledWith(actionTypes.SUBSCRIPTION_PAUSE_REASON_SUBMIT, true)
      }
    )

    test(
      'should call statusActions error with false for "SUBSCRIPTION_PAUSE_REASON_SUBMIT"',
      async () => {
        await subPauseActions.subscriptionPauseReasonSubmit()(dispatch, getState)

        expect(statusActions.error).toHaveBeenCalledWith(actionTypes.SUBSCRIPTION_PAUSE_REASON_SUBMIT, false)
      }
    )

    describe('when chosenReasonId not found in state', () => {
      beforeEach(async () => {
        await subPauseActions.subscriptionPauseReasonSubmit()(dispatch, getState)
      })

      test(
        'should call subscriptionPauseReasonSubmit with data-unavailable GoustoException as first arg',
        () => {
          const error = subscriptionPauseLoadErrorSpy.mock.calls[0][0]
          expect(error.message).toEqual('Unable to submit reason: reason id not available')
          expect(error.error).toEqual('data-unavailable')
          expect(error.level).toEqual('error')
        }
      )

      test(
        'should call subscriptionPauseFetchReasons with "SUBSCRIPTION_PAUSE_REASON_SUBMIT" as second arg',
        async () => {
          expect(subscriptionPauseLoadErrorSpy.mock.calls[0][1]).toEqual(actionTypes.SUBSCRIPTION_PAUSE_REASON_SUBMIT)
        }
      )
    })

    describe('when chosen reason slug is unavailable', () => {
      beforeEach(async () => {
        getState = jest.fn().mockReturnValue({
          features: Immutable.fromJS({}),
          auth: Immutable.fromJS({ accessToken: 'token' }),
          user: Immutable.fromJS({
            id: '123',
            orders: null,
          }),
          subscriptionPause: Immutable.fromJS({
            activeReasons: {
              r8: {
                id: 'r8',
                label: 'I can\'t afford it',
                children: [],
                steps: [
                  { id: 's1', type: 'contact' },
                  { id: 's2', type: 'promo' },
                ],
              },
            },
            activeSteps: Immutable.fromJS({
              s1: { id: 's1', type: 'contact' },
              s2: { id: 's2', type: 'promo', initial: true },
            }),
            chosenReasonIds: ['r8'],
            reasons: [
              { id: 1, children: [] },
              { id: 2, children: [] },
            ],
          }),
        })
        await subPauseActions.subscriptionPauseReasonSubmit()(dispatch, getState)
      })

      test(
        'should call subscriptionPauseReasonSubmit with data-unavailable GoustoException as first arg',
        () => {
          const error = subscriptionPauseLoadErrorSpy.mock.calls[0][0]
          expect(error.message).toEqual('Unable to submit reason: data not available')
          expect(error.error).toEqual('data-unavailable')
          expect(error.level).toEqual('error')
        }
      )

      test(
        'should call subscriptionPauseFetchReasons with "SUBSCRIPTION_PAUSE_REASON_SUBMIT" as second arg',
        async () => {
          expect(subscriptionPauseLoadErrorSpy.mock.calls[0][1]).toEqual(actionTypes.SUBSCRIPTION_PAUSE_REASON_SUBMIT)
        }
      )
    })

    describe('when data is available', () => {
      beforeEach(() => {
        getState = jest.fn().mockReturnValue({
          features: Immutable.fromJS({}),
          auth: Immutable.fromJS({ accessToken: 'token' }),
          error: Immutable.fromJS({}),
          subscriptionPause: Immutable.fromJS({
            activeReasons: {
              7: {
                id: '7',
                slug: 'narrower_time_slots',
                label: 'I would like narrower time slots',
                children: [
                  { id: 'r2' },
                ],
                steps: [
                  { id: 's1', type: 'contact' },
                ],
              },
              r2: {
                slug: 'chosen_reason_slug',
              },
            },
            activeSteps: {
              s1: {
                pauseStepId: 's6',
                type: 'anything',
              },
              s6: {
                type: 'copy',
              },
            },
            activeStepId: 's1',
            chosenReasonIds: ['r2'],
            inProgress: false,
            reasons: [],
          }),
          user: Immutable.fromJS({
            orders: [
              { id: 'o1', phase: 'open', number: '1' },
              { id: 'o2', phase: 'open', number: '2' },
            ],
          }),
        })
      })

      test(
        'should call deactivateSubscription with last chosenReasonIds\' slug from state as state_reason',
        async () => {
          await subPauseActions.subscriptionPauseReasonSubmit()(dispatch, getState)

          expect(subscriptionDeactivateSpy).toHaveBeenCalledWith('chosen_reason_slug')
        }
      )

      describe('when open user orders found in state', () => {
        beforeEach(async () => {
          await subPauseActions.subscriptionPauseReasonSubmit('7')(dispatch, getState)
        })

        test('should call subscriptionPauseLoadStaticScreen once', async () => {
          expect(subscriptionPauseLoadStaticScreenSpy).toHaveBeenCalledTimes(1)
        })

        test(
          'should call subscriptionPauseLoadStaticScreen with "pausedPendingBoxes"',
          async () => {
            expect(subscriptionPauseLoadStaticScreenSpy.mock.calls[0][0]).toEqual('pausedPendingBoxes')
          }
        )

        test('should call toggleSubscriptionPage', async () => {
          expect(toggleSubscriptionPage).toHaveBeenCalledTimes(1)
          expect(getWindowSpy).toHaveBeenCalledTimes(1)
        })
      })

      describe('when first box only order found in state user orders state', () => {
        beforeEach(async () => {
          getState = jest.fn().mockReturnValue({
            features: Immutable.fromJS({}),
            auth: Immutable.fromJS({ accessToken: 'token' }),
            error: Immutable.fromJS({}),
            subscriptionPause: Immutable.fromJS({
              activeReasons: {
                7: {
                  id: '7',
                  slug: 'narrower_time_slots',
                  label: 'I would like narrower time slots',
                  children: [
                    { id: 'r2' },
                  ],
                  steps: [
                    { id: 's1', type: 'contact' },
                  ],
                },
                r2: {
                  slug: 'chosen_reason_slug',
                },
              },
              activeSteps: {
                s1: {
                  pauseStepId: 's6',
                  type: 'anything',
                },
                s6: {
                  type: 'copy',
                },
              },
              activeStepId: 's1',
              chosenReasonIds: ['r2'],
              inProgress: false,
              reasons: [],
            }),
            user: Immutable.fromJS({
              orders: [
                { id: 'o1', phase: 'open', number: '1' },
              ],
            }),
          })

          await subPauseActions.subscriptionPauseReasonSubmit('7')(dispatch, getState)
        })

        test(
          'should call subscriptionPauseProceed once with "pause" and "paused"',
          async () => {
            expect(subscriptionPauseProceedSpy).toHaveBeenCalledTimes(1)
            expect(subscriptionPauseProceedSpy).toHaveBeenCalledWith('pause', 'paused')
          }
        )
      })

      describe('when NO open user orders found in state', () => {
        beforeEach(async () => {
          getState = jest.fn().mockReturnValue({
            features: Immutable.fromJS({}),
            auth: Immutable.fromJS({ accessToken: 'token' }),
            error: Immutable.fromJS({}),
            subscriptionPause: Immutable.fromJS({
              activeReasons: {
                7: {
                  id: '7',
                  slug: 'narrower_time_slots',
                  label: 'I would like narrower time slots',
                  children: [
                    { id: 'r2' },
                  ],
                  steps: [
                    { id: 's1', type: 'contact' },
                  ],
                },
                r2: {
                  slug: 'chosen_reason_slug',
                },
              },
              activeSteps: {
                s1: {
                  pauseStepId: 's6',
                  type: 'anything',
                },
                s6: {
                  type: 'copy',
                },
              },
              activeStepId: 's1',
              chosenReasonIds: ['r2'],
              inProgress: false,
              reasons: [],
            }),
            user: Immutable.fromJS({
              orders: [
                { id: 'o1', phase: 'closed', number: '2' },
              ],
            }),
          })

          await subPauseActions.subscriptionPauseReasonSubmit('7')(dispatch, getState)
        })

        test(
          'should call subscriptionPauseProceed once with "pause" and "paused"',
          async () => {
            expect(subscriptionPauseProceedSpy).toHaveBeenCalledTimes(1)
            expect(subscriptionPauseProceedSpy).toHaveBeenCalledWith('pause', 'paused')
          }
        )
      })

      describe('on deactivate failure', () => {
        beforeEach(async () => {
          getState = jest.fn().mockReturnValue({
            features: Immutable.fromJS({}),
            auth: Immutable.fromJS({ accessToken: 'token' }),
            error: Immutable.fromJS({
              [actionTypes.SUBSCRIPTION_DEACTIVATE]: 'error message from subscriptionDeactivate',
            }),
            subscriptionPause: Immutable.fromJS({
              activeReasons: {
                7: {
                  id: '7',
                  slug: 'narrower_time_slots',
                  label: 'I would like narrower time slots',
                  children: [
                    { id: 'r2' },
                  ],
                  steps: [
                    { id: 's1', type: 'contact' },
                  ],
                },
                r2: {
                  slug: 'chosen_reason_slug',
                },
              },
              activeSteps: {
                s1: {
                  pauseStepId: 's6',
                  type: 'anything',
                },
                s6: {
                  type: 'copy',
                },
              },
              activeStepId: 's1',
              chosenReasonIds: Immutable.List(['r2']),
              inProgress: false,
              reasons: [],
            }),
            user: Immutable.fromJS({
              orders: [
                { id: 'o1', phase: 'closed' },
              ],
            }),
          })

          await subPauseActions.subscriptionPauseReasonSubmit()(dispatch, getState)
        })

        test(
          'should call subscriptionPauseReasonSubmit with data-unavailable GoustoException as first arg',
          () => {
            const error = subscriptionPauseLoadErrorSpy.mock.calls[0][0]
            expect(error.message).toEqual('Unable to submit reason: error message from subscriptionDeactivate')
            expect(error.error).toEqual('deactivate-fail')
            expect(error.level).toEqual('error')
          }
        )

        test(
          'should call subscriptionPauseFetchReasons with "SUBSCRIPTION_PAUSE_REASON_SUBMIT" as second arg',
          async () => {
            expect(subscriptionPauseLoadErrorSpy.mock.calls[0][1]).toEqual(actionTypes.SUBSCRIPTION_PAUSE_REASON_SUBMIT)
          }
        )
      })
    })
  })

  describe('subscriptionPauseCancelPendingOrders', () => {
    let getState
    let dispatch
    const subscriptionPauseProceedSpy = jest.spyOn(subPauseActions, 'subscriptionPauseProceed')
    const subscriptionPauseTrackSpy = jest.spyOn(subPauseActions, 'subscriptionPauseTrack')
    const subscriptionPauseLoadErrorSpy = jest.spyOn(subPauseActions, 'subscriptionPauseLoadError')

    beforeEach(() => {
      getState = jest.fn().mockReturnValue({
        features: Immutable.fromJS({}),
        auth: Immutable.fromJS({ accessToken: 'token' }),
        error: Immutable.fromJS({}),
        subscriptionPause: Immutable.fromJS({
          activeReasons: {
            7: {
              id: '7',
              slug: 'narrower_time_slots',
              label: 'I would like narrower time slots',
              children: [
                { id: 'r2' },
              ],
              steps: [
                { id: 'r1', type: 'contact' },
              ],
            },
            r2: {
              slug: 'chosen_reason_slug',
            },
          },
          activeSteps: {
            s1: {
              pauseStepId: 's6',
              type: 'anything',
            },
            s6: {
              type: 'copy',
            },
          },
          activeStepId: 's1',
          chosenReasonIds: ['r2'],
          inProgress: false,
          reasons: [],
        }),
      })
      dispatch = jest.fn()
      cancelExistingOrders.mockReturnValue(Promise.resolve('response from cancelExistingOrders'))
    })

    test('should call handle pending status', async () => {
      await subPauseActions.subscriptionPauseCancelPendingOrders()(dispatch, getState)

      expect(statusActions.pending).toHaveBeenCalledWith(actionTypes.SUBSCRIPTION_PAUSE_CANCEL_ORDERS, true)
      expect(statusActions.pending).toHaveBeenCalledWith(actionTypes.SUBSCRIPTION_PAUSE_CANCEL_ORDERS, false)
    })

    test('should call handle error status', async () => {
      await subPauseActions.subscriptionPauseCancelPendingOrders()(dispatch, getState)

      expect(statusActions.error).toHaveBeenCalledWith(actionTypes.SUBSCRIPTION_PAUSE_CANCEL_ORDERS, false)
    })

    test('should call cancelExistingOrders', async () => {
      await subPauseActions.subscriptionPauseCancelPendingOrders()(dispatch, getState)

      expect(cancelExistingOrders).toHaveBeenCalledTimes(1)
    })

    test('should call userLoadOrders', async () => {
      await subPauseActions.subscriptionPauseCancelPendingOrders()(dispatch, getState)

      expect(userActions.userLoadOrders).toHaveBeenCalledTimes(1)
    })

    test(
      'should call subscriptionPauseTrack once with corrrect data',
      async () => {
        await subPauseActions.subscriptionPauseCancelPendingOrders()(dispatch, getState)

        expect(subscriptionPauseTrackSpy).toHaveBeenCalledTimes(1)
        expect(subscriptionPauseTrackSpy).toHaveBeenCalledWith('EXISTING_ORDERS_CANCELLED')
      }
    )

    test(
      'should call subscriptionPauseProceed with "pause" and "paused"',
      async () => {
        await subPauseActions.subscriptionPauseCancelPendingOrders()(dispatch, getState)

        expect(subscriptionPauseProceedSpy).toHaveBeenCalledTimes(1)
        expect(subscriptionPauseProceedSpy).toHaveBeenCalledWith('pause', 'paused')
      }
    )

    describe('when an error occurs in cancelling pending orders', () => {
      beforeEach(async () => {
        getState = jest.fn().mockReturnValue({
          features: Immutable.fromJS({}),
          auth: Immutable.fromJS({ accessToken: 'token' }),
        })
        cancelExistingOrders.mockReturnValue(Promise.reject('response from cancelExistingOrders'))

        await subPauseActions.subscriptionPauseCancelPendingOrders()(dispatch, getState)
      })

      test(
        'should call subscriptionPauseLoadError with cancel-pending-fail GoustoException as first arg',
        () => {
          const error = subscriptionPauseLoadErrorSpy.mock.calls[0][0]
          expect(error.message).toEqual('Subscription pause cancel pending order error: cancel pending orders failed, response from cancelExistingOrders')
          expect(error.error).toEqual('cancel-pending-fail')
          expect(error.level).toEqual('error')
        }
      )

      test(
        'should call subscriptionPauseLoadError with "SUBSCRIPTION_PAUSE_PROMO_APPLY" as second arg',
        () => {
          expect(subscriptionPauseLoadErrorSpy.mock.calls[0][1]).toEqual(actionTypes.SUBSCRIPTION_PAUSE_CANCEL_ORDERS)
        }
      )
    })

    describe('when an error occurs after cancelling pending orders', () => {
      beforeEach(async () => {
        subscriptionPauseTrackSpy.mockImplementationOnce(() => {throw Error('error occurred')})

        await subPauseActions.subscriptionPauseCancelPendingOrders()(dispatch, getState)
      })

      test(
        'should call subscriptionPauseLoadError with error as first arg',
        () => {
          const error = subscriptionPauseLoadErrorSpy.mock.calls[0][0]
          expect(error.message).toEqual('error occurred')
        }
      )

      test(
        'should call subscriptionPauseLoadError with "SUBSCRIPTION_PAUSE_PROMO_APPLY" as second arg',
        () => {
          expect(subscriptionPauseLoadErrorSpy.mock.calls[0][1]).toEqual(actionTypes.SUBSCRIPTION_PAUSE_CANCEL_ORDERS)
        }
      )
    })
  })

  describe('subscriptionPauseProceed', () => {
    let getState
    let dispatch
    const subscriptionPauseLoadStepSpy = jest.spyOn(subPauseActions, 'subscriptionPauseLoadStep')
    const subscriptionPauseLoadStaticScreenSpy = jest.spyOn(subPauseActions, 'subscriptionPauseLoadStaticScreen')

    beforeEach(() => {
      getState = jest.fn().mockReturnValue({
        features: Immutable.fromJS({}),
        auth: Immutable.fromJS({ accessToken: 'token' }),
        subscriptionPause: Immutable.fromJS({
          activeReasons: {
            7: {
              id: '7',
              slug: 'narrower_time_slots',
              label: 'I would like narrower time slots',
              children: [
                { id: 'r2' },
              ],
              steps: [
                { id: 'r1', type: 'contact' },
              ],
            },
            r2: {
              slug: 'chosen_reason_slug',
            },
          },
          activeSteps: {
            s1: {
              id: 's1',
              nextStepId: 's7',
              pauseStepId: 's6',
              cancelStepId: 's8',
              type: 'anything',
            },
            s6: {},
            s7: {},
            s8: {},
          },
          activeStepId: 's1',
          chosenReasonIds: ['r2'],
          inProgress: false,
          reasons: [{ id: 'r2', slug: 'reason-slug' }],
        }),
      })
      dispatch = jest.fn()
    })

    test(
      'should call subscriptionPauseLoadStep with nextStepId if available, along with related screen data for tracking, by default',
      async () => {
        await subPauseActions.subscriptionPauseProceed()(dispatch, getState)

        expect(subscriptionPauseLoadStepSpy).toHaveBeenCalledWith('s7')
      }
    )

    test(
      'should call subscriptionPauseLoadStep with pauseStepId if called with "pause"',
      async () => {
        await subPauseActions.subscriptionPauseProceed('pause')(dispatch, getState)

        expect(subscriptionPauseLoadStepSpy).toHaveBeenCalledWith('s6')
      }
    )

    test(
      'should call subscriptionPauseLoadStep with cancelStepId if called with "cancel"',
      async () => {
        await subPauseActions.subscriptionPauseProceed('cancel')(dispatch, getState)

        expect(subscriptionPauseLoadStepSpy).toHaveBeenCalledWith('s8')
      }
    )

    test(
      'should call subscriptionPauseLoadStep with step flagged as initial in activeSteps if called with "initial"',
      async () => {
        getState = jest.fn().mockReturnValue({
          features: Immutable.fromJS({}),
          auth: Immutable.fromJS({ accessToken: 'token' }),
          subscriptionPause: Immutable.fromJS({
            activeReasons: {
              7: {
                id: '7',
                slug: 'narrower_time_slots',
                label: 'I would like narrower time slots',
                children: [
                  { id: 'r2' },
                ],
                steps: [
                  { id: 'r1', type: 'contact' },
                ],
              },
              r2: {
                slug: 'chosen_reason_slug',
              },
            },
            activeSteps: {
              s1: {
                id: 's1',
                nextStepId: 's7',
                pauseStepId: 's6',
                cancelStepId: 's8',
                type: 'anything',
              },
              s6: {
                id: 's6',
                initial: true,
              },
              s7: {},
              s8: {},
            },
            activeStepId: 's7',
            chosenReasonIds: ['r2'],
            inProgress: false,
            reasons: [{ id: 'r2', slug: 'reason-slug' }],
          }),
        })

        await subPauseActions.subscriptionPauseProceed('initial')(dispatch, getState)

        expect(subscriptionPauseLoadStepSpy).toHaveBeenCalledWith('s6')
      }
    )

    test(
      'should call subscriptionPauseLoadStep with step flagged as initial in activeSteps if there is no activeStep set in state',
      async () => {
        getState = jest.fn().mockReturnValue({
          features: Immutable.fromJS({}),
          auth: Immutable.fromJS({ accessToken: 'token' }),
          subscriptionPause: Immutable.fromJS({
            activeReasons: {
              7: {
                id: '7',
                slug: 'narrower_time_slots',
                label: 'I would like narrower time slots',
                children: [
                  { id: 'r2' },
                ],
                steps: [
                  { id: 'r1', type: 'contact' },
                ],
              },
              r2: {
                slug: 'chosen_reason_slug',
              },
            },
            activeSteps: {
              s1: {
                id: 's1',
                nextStepId: 's7',
                pauseStepId: 's6',
                cancelStepId: 's8',
                type: 'anything',
              },
              s6: {
                id: 's6',
                initial: true,
              },
              s7: {},
              s8: {},
            },
            activeStepId: undefined,
            chosenReasonIds: ['r2'],
            inProgress: false,
            reasons: [{ id: 'r2', slug: 'reason-slug' }],
          }),
        })

        await subPauseActions.subscriptionPauseProceed('cancel')(dispatch, getState)

        expect(subscriptionPauseLoadStepSpy).toHaveBeenCalledWith('s6')
      }
    )

    test(
      'should call subscriptionPauseLoadStep step with first step in activeSteps if there is no activeStep set in state & no step flaged as initial regardless of stepType',
      async () => {
        getState = jest.fn().mockReturnValue({
          features: Immutable.fromJS({}),
          auth: Immutable.fromJS({ accessToken: 'token' }),
          subscriptionPause: Immutable.fromJS({
            activeReasons: {
              7: {
                id: '7',
                slug: 'narrower_time_slots',
                label: 'I would like narrower time slots',
                children: [
                  { id: 'r2' },
                ],
                steps: [
                  { id: 'r1', type: 'contact' },
                ],
              },
              r2: {
                slug: 'chosen_reason_slug',
              },
            },
            activeSteps: {
              s1: {
                id: 's1',
                nextStepId: 's7',
                pauseStepId: 's6',
                cancelStepId: 's8',
                type: 'anything',
              },
              s6: {
                type: 'copy',
              },
            },
            activeStepId: undefined,
            chosenReasonIds: ['r2'],
            inProgress: false,
            reasons: [],
          }),
        })

        await subPauseActions.subscriptionPauseProceed('someStepType')(dispatch, getState)

        expect(subscriptionPauseLoadStepSpy).toHaveBeenCalledWith('s1')
      }
    )

    test(
      'should call subscriptionPauseLoadStaticScreen with "error" by default if there are no activeSteps',
      async () => {
        getState = jest.fn().mockReturnValue({
          features: Immutable.fromJS({}),
          auth: Immutable.fromJS({ accessToken: 'token' }),
          subscriptionPause: Immutable.fromJS({
            activeReasons: {
              7: {
                id: '7',
                slug: 'narrower_time_slots',
                label: 'I would like narrower time slots',
                children: [
                  { id: 'r2' },
                ],
                steps: [
                  { id: 'r1', type: 'contact' },
                ],
              },
              r2: {
                slug: 'chosen_reason_slug',
              },
            },
            activeSteps: {},
            activeStepId: undefined,
            chosenReasonIds: ['r2'],
            inProgress: false,
            reasons: [{ id: 'r2', slug: 'reason-slug' }],
          }),
        })

        await subPauseActions.subscriptionPauseProceed('cancel')(dispatch, getState)

        expect(subscriptionPauseLoadStaticScreenSpy).toHaveBeenCalledWith('error')
      }
    )

    test(
      'should call subscriptionPauseLoadStaticScreen with provided staticScreenFallback if provided and there are no activeSteps',
      async () => {
        getState = jest.fn().mockReturnValue({
          features: Immutable.fromJS({}),
          auth: Immutable.fromJS({ accessToken: 'token' }),
          subscriptionPause: Immutable.fromJS({
            activeReasons: {
              7: {
                id: '7',
                slug: 'narrower_time_slots',
                label: 'I would like narrower time slots',
                children: [
                  { id: 'r2' },
                ],
                steps: [
                  { id: 'r1', type: 'contact' },
                ],
              },
              r2: {
                slug: 'chosen_reason_slug',
              },
            },
            activeSteps: {},
            activeStepId: undefined,
            chosenReasonIds: ['r2'],
            inProgress: false,
            reasons: [{ id: 'r2', slug: 'reason-slug' }],
          }),
        })

        await subPauseActions.subscriptionPauseProceed('cancel', 'some-fallback-screen')(dispatch, getState)

        expect(subscriptionPauseLoadStaticScreenSpy).toHaveBeenCalledWith('some-fallback-screen')
      }
    )
  })

  describe('subscriptionPauseLoadInitReasons', () => {
    let getState
    let dispatch
    const subscriptionPauseLoadReasonsSpy = jest.spyOn(subPauseActions, 'subscriptionPauseLoadReasons')
    const subscriptionPauseResetSpy = jest.spyOn(subPauseActions, 'subscriptionPauseReset')

    beforeEach(() => {
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue({
        features: Immutable.fromJS({}),
        subscriptionPause: Immutable.fromJS({
          reasons: [{
            id: '7',
            slug: 'narrower_time_slots',
            label: 'I would like narrower time slots',
            children: [
              { id: 'r2' },
            ],
            steps: [
              { id: 'r1', type: 'contact' },
            ],
          }],
        }),
      })
    })

    test(
      'should call subscriptionPauseLoadInitReasons with initial reasons',
      () => {
        subPauseActions.subscriptionPauseLoadInitReasons()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledTimes(3)
        expect(subscriptionPauseLoadReasonsSpy).toHaveBeenCalledTimes(1)
        expect(subscriptionPauseResetSpy).toHaveBeenCalledTimes(1)
        expect(Immutable.is(subscriptionPauseLoadReasonsSpy.mock.calls[0][0], Immutable.fromJS([{
          id: '7',
          slug: 'narrower_time_slots',
          label: 'I would like narrower time slots',
          children: [
            { id: 'r2' },
          ],
          steps: [
            { id: 'r1', type: 'contact' },
          ],
        }]))).toEqual(true)
      }
    )
  })

  describe('subscriptionPauseStartScreen', () => {
    let getState
    let dispatch
    const subscriptionPauseLoadReasonsSpy = jest.spyOn(subPauseActions, 'subscriptionPauseLoadReasons')
    const subscriptionPauseLoadReasonChoiceSpy = jest.spyOn(subPauseActions, 'subscriptionPauseLoadReasonChoice')
    const subscriptionPauseLoadStepSpy = jest.spyOn(subPauseActions, 'subscriptionPauseLoadStep')

    beforeEach(() => {
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue({
        features: Immutable.fromJS({}),
        subscriptionPause: Immutable.fromJS({
          startScreen: [{
            id: '7',
            slug: 'narrower_time_slots',
            label: 'I would like narrower time slots',
            children: [
              { id: 'r2' },
            ],
            steps: [
              { id: 'r1', type: 'contact' },
            ],
          }],
        }),
      })
    })

    test('should call all the appropriate subscription load function', () => {
      subPauseActions.subscriptionPauseLoadStartScreen()(dispatch, getState)

      expect(dispatch).toHaveBeenCalledTimes(4)
      expect(subscriptionPauseLoadReasonsSpy).toHaveBeenCalledTimes(1)
      expect(subscriptionPauseLoadReasonChoiceSpy).toHaveBeenCalledTimes(1)
      expect(subscriptionPauseLoadStepSpy).toHaveBeenCalledTimes(1)
      expect(Immutable.is(subscriptionPauseLoadReasonsSpy.mock.calls[0][0], Immutable.fromJS([{
        id: '7',
        slug: 'narrower_time_slots',
        label: 'I would like narrower time slots',
        children: [
          { id: 'r2' },
        ],
        steps: [
          { id: 'r1', type: 'contact' },
        ],
      }]))).toEqual(true)
      expect(Immutable.is(subscriptionPauseLoadReasonChoiceSpy.mock.calls[0][0], Immutable.fromJS(['7']))).toEqual(true)
      expect(subscriptionPauseLoadStepSpy).toHaveBeenCalledWith('r1')
    })
  })

  describe('OSR tracking', () => {
    let dispatch
    let getState
    const keptActiveActionSample = {
      type: actionTypes.PS_SUBSCRIPTION_KEPT_ACTIVE,
      promoCode: 'promo-code',
      categorySlug: 'category-slug',
      reasonSlug: 'reason-slug',
      modalType: 'modal-type',
      seRecoveryType: 'recovery-type',
    }
    const keptActiveActionSample2 = {
      type: actionTypes.PS_SUBSCRIPTION_KEPT_ACTIVE,
      categorySlug: 'category-slug',
      reasonSlug: 'reason-slug',
      seModal: 'RecoveryAttemptModal',
    }

    beforeEach(() => {
      dispatch = jest.fn()
      getState = jest.fn().mockReturnValue({
        features: Immutable.fromJS({}),
        subscriptionPause: Immutable.fromJS({
          chosenReasonIds: ['r1', 'r2'],
          reasons: [
            {
              id: 'r1',
              slug: 'category-slug',
              children: [{ id: 'r2' }],
            },
            { id: 'r2' },
          ],
          activeReasons: {
            r2: { slug: 'reason-slug' },
          },
          activeStepId: 's1',
          activeSteps: {
            s1: {
              id: 's1',
              type: 'modal-type',
              initial: true,
            },
            s2: {
              id: 's2',
              type: 'recovered',
            },
          },
        }),
        error: Immutable.fromJS({}),
      })
    })

    test(
      'should dispatch PS_SUBSCRIPTION_KEPT_ACTIVE and the correct data when calling subscriptionPauseProceed with "cancel"',
      () => {
        subPauseActions.subscriptionPauseProceed('cancel', 'some-fallback-screen', 'recovery-type', 'promo-code')(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith(keptActiveActionSample)
      }
    )

    test(
      'should dispatch PS_SUBSCRIPTION_KEPT_ACTIVE and the correct data when calling subscriptionPauseProceed with "next"',
      () => {
        subPauseActions.subscriptionPauseProceed('next', 'some-fallback-screen', 'recovery-type', 'promo-code')(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith(keptActiveActionSample)
      }
    )

    test(
      'should dispatch PS_RECOVERY_ATTEMPT_MODAL_VIEWED and the correct data when calling subscriptionPauseProceed with "initial" and the next modal type is not "other"',
      () => {
        subPauseActions.subscriptionPauseProceed('initial', 'some-fallback-screen', 'recovery-type', 'promo-code')(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.PS_RECOVERY_ATTEMPT_MODAL_VIEWED,
          modalType: 'modal-type',
        })
      }
    )

    test(
      'should not dispatch PS_RECOVERY_ATTEMPT_MODAL_VIEWED when calling subscriptionPauseProceed with "initial" and the modal type is "other"',
      () => {
        getState = jest.fn().mockReturnValue({
          features: Immutable.fromJS({}),
          subscriptionPause: Immutable.fromJS({
            activeStepId: 's1',
            activeSteps: {
              s1: { id: 's1', type: 'other', initial: true },
            },
          }),
        })
        subPauseActions.subscriptionPauseProceed('initial', 'some-fallback-screen', 'recovery-type', 'promo-code')(dispatch, getState)

        expect(dispatch).not.toHaveBeenCalledWith({ type: actionTypes.PS_RECOVERY_ATTEMPT_MODAL_VIEWED })
      }
    )

    test(
      'should dispatch PS_END_MODAL_VIEWED when calling subscriptionPauseProceed with a stepType that leads to a step of type "recovered"',
      () => {
        getState = jest.fn().mockReturnValue({
          features: Immutable.fromJS({}),
          subscriptionPause: Immutable.fromJS({
            activeStepId: 's1',
            activeSteps: {
              s1: {
                id: 's1',
                type: 'modal-type',
                initial: true,
                aStepTypeStepId: 's2',
              },
              s2: {
                id: 's2',
                type: 'recovered',
              },
            },
          }),
        })
        subPauseActions.subscriptionPauseProceed('aStepType')(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.PS_END_MODAL_VIEWED })
      }
    )

    test(
      'should dispatch PS_END_MODAL_VIEWED when calling subscriptionPauseProceed with a stepType that leads to a step of type "recoveredPromo"',
      () => {
        getState = jest.fn().mockReturnValue({
          features: Immutable.fromJS({}),
          subscriptionPause: Immutable.fromJS({
            activeStepId: 's1',
            activeSteps: {
              s1: {
                id: 's1',
                type: 'modal-type',
                initial: true,
                aStepTypeStepId: 's2',
              },
              s2: {
                id: 's2',
                type: 'recoveredPromo',
              },
            },
          }),
        })
        subPauseActions.subscriptionPauseProceed('aStepType')(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.PS_END_MODAL_VIEWED })
      }
    )

    test(
      'should dispatch PS_END_MODAL_VIEWED when calling subscriptionPauseProceed with a stepType that leads to a step of type "recoveredSkipped"',
      () => {
        getState = jest.fn().mockReturnValue({
          features: Immutable.fromJS({}),
          subscriptionPause: Immutable.fromJS({
            activeStepId: 's1',
            activeSteps: {
              s1: {
                id: 's1',
                type: 'modal-type',
                initial: true,
                aStepTypeStepId: 's2',
              },
              s2: {
                id: 's2',
                type: 'recoveredSkipped',
              },
            },
          }),
        })
        subPauseActions.subscriptionPauseProceed('aStepType')(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.PS_END_MODAL_VIEWED })
      }
    )

    test(
      'should dispatch PS_END_MODAL_VIEWED when calling subscriptionPauseProceed with a stepType that leads to a step of type "paused"',
      () => {
        getState = jest.fn().mockReturnValue({
          features: Immutable.fromJS({}),
          subscriptionPause: Immutable.fromJS({
            activeStepId: 's1',
            activeSteps: {
              s1: {
                id: 's1',
                type: 'modal-type',
                initial: true,
                aStepTypeStepId: 's2',
              },
              s2: {
                id: 's2',
                type: 'paused',
              },
            },
          }),
        })
        subPauseActions.subscriptionPauseProceed('aStepType')(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.PS_END_MODAL_VIEWED })
      }
    )

    test(
      'should dispatch PS_REASON_CATEGORY_MODAL_VIEW when subscriptionPauseGoBack is called from an initial step',
      async () => {
        await subPauseActions.subscriptionPauseGoBack()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.PS_REASON_CATEGORY_MODAL_VIEWED })
      }
    )

    test(
      'should dispatch PS_SUBSCRIPTION_KEPT_ACTIVE with corresponding data when subscriptionPauseRedirect is called to redirect to my deliveries',
      async () => {
        await subPauseActions.subscriptionPauseRedirect(routesConfig.client.myDeliveries)(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith(Object.assign({}, { seRecoveryType: 'change_delivery_day' }, keptActiveActionSample2))
      }
    )

    test(
      'should dispatch PS_SUBSCRIPTION_KEPT_ACTIVE with corresponding data when subscriptionPauseRedirect is called to redirect to contact',
      async () => {
        await subPauseActions.subscriptionPauseRedirect(routesConfig.client.help)(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith(Object.assign({}, { seRecoveryType: 'contact_cc' }, keptActiveActionSample2))
      }
    )

    test(
      'should not dispatch PS_SUBSCRIPTION_KEPT_ACTIVE when subscriptionPauseRedirect is called to redirect to other places',
      async () => {
        await subPauseActions.subscriptionPauseRedirect(routesConfig.client.menu)(dispatch, getState)

        expect(dispatch).not.toHaveBeenCalledWith({ type: actionTypes.PS_SUBSCRIPTION_KEPT_ACTIVE })
      }
    )

    test(
      'should dispatch PS_SUBSCRIPTION_PAUSED and correct data when subscriptionPauseReasonSubmit is called',
      async () => {
        await subPauseActions.subscriptionPauseReasonSubmit()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.PS_SUBSCRIPTION_PAUSED,
          reason: 'reason-slug',
          modalType: 'modal-type',
        })
      }
    )

    test(
      'should dispatch PS_REASON_CATEGORY_SELECTED, PS_REASON_LIST_MODAL_VIEWED, and the selected category when subscriptionPauseReasonChoice is called selecting a category',
      async () => {
        getState = jest.fn().mockReturnValue({
          features: Immutable.fromJS({}),
          subscriptionPause: Immutable.fromJS({
            chosenReasonIds: [],
            activeReasons: {
              r1: { slug: 'category-slug', children: [{ id: 'r2' }] },
            },
          }),
        })
        await subPauseActions.subscriptionPauseReasonChoice('r1')(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.PS_REASON_CATEGORY_SELECTED,
          selectedCategory: 'category-slug',
        })
        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.PS_REASON_LIST_MODAL_VIEWED,
          selectedCategory: 'category-slug',
        })
      }
    )

    test(
      'should dispatch PS_REASON_CATEGORY_SELECTED, PS_REASON_LIST_MODAL_VIEWED, and the selected category when subscriptionPauseReasonChoice is called selecting a category',
      async () => {
        getState = jest.fn().mockReturnValue({
          features: Immutable.fromJS({}),
          subscriptionPause: Immutable.fromJS({
            chosenReasonIds: ['r1'],
            activeReasons: {
              r2: { slug: 'reason-slug', children: [] },
            },
          }),
        })
        await subPauseActions.subscriptionPauseReasonChoice('r2')(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.PS_REASON_SELECTED,
          selectedReason: 'reason-slug',
        })
      }
    )

    test(
      'should dispatch PS_SUBSCRIPTION_KEPT_ACTIVE and correct data when calling subscriptionPauseEnd if the subscription status is active',
      () => {
        getState = jest.fn().mockReturnValue(Object.assign({
          user: Immutable.fromJS({
            subscription: { state: 'active' },
          }),
        }, getState()))
        subPauseActions.subscriptionPauseEnd()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.PS_SUBSCRIPTION_KEPT_ACTIVE,
          categorySlug: 'category-slug',
          reasonSlug: 'reason-slug',
          modalType: 'modal-type',
          seRecoveryType: 'close_modal',
        })
      }
    )

    test(
      'should not dispatch PS_SUBSCRIPTION_KEPT_ACTIVE when calling subscriptionPauseEnd if the subscription status is not active',
      () => {
        getState = jest.fn().mockReturnValue({
          features: Immutable.fromJS({}),
          user: Immutable.fromJS({
            subscription: { state: 'inactive' },
          }),
        })
        subPauseActions.subscriptionPauseEnd()(dispatch, getState)

        expect(dispatch).not.toHaveBeenCalledWith({ type: actionTypes.PS_SUBSCRIPTION_KEPT_ACTIVE })
      }
    )

    test(
      'should dispatch PS_START_MODAL_VIEWED when calling subscriptionPauseLoadStartScreen',
      () => {
        getState = jest.fn().mockReturnValue({
          features: Immutable.fromJS({}),
          subscriptionPause: Immutable.fromJS({
            startScreen: [{ id: 'ss', steps: [{ id: 's1' }] }],
          }),
        })
        subPauseActions.subscriptionPauseLoadStartScreen()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.PS_START_MODAL_VIEWED })
      }
    )

    test(
      'should dispatch PS_REASON_LIST_MODAL_VIEWED when calling subscriptionPauseLoadInitReasons',
      () => {
        subPauseActions.subscriptionPauseLoadInitReasons()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.PS_REASON_LIST_MODAL_VIEWED })
      }
    )

    test(
      'should fetch user data and dispatch PS_SUBSCRIPTION_PAUSE_ATTEMPT with the metaData obtained from customer service when calling subscriptionPauseStart and there is startScreen',
      async () => {
        getState = jest.fn().mockReturnValue({
          features: Immutable.fromJS({}),
          subscriptionPause: Immutable.fromJS({
            metaData: { meta: 'data' },
            startScreen: [{ id: 'ss' }],
          }),
        })
        await subPauseActions.subscriptionPauseStart()(dispatch, getState)

        expect(userActions.userLoadData).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.PS_SUBSCRIPTION_PAUSE_ATTEMPT,
          metaData: Immutable.fromJS({ meta: 'data' }),
        })
      }
    )

    test(
      'should fetch user data and dispatch PS_SUBSCRIPTION_PAUSE_ATTEMPT with the metaData obtained from customer service and PS_REASON_CATEGORY_MODAL_VIEWED when calling subscriptionPauseStart and there is not startScreen but there are initialReasons',
      async () => {
        getState = jest.fn().mockReturnValue({
          features: Immutable.fromJS({}),
          subscriptionPause: Immutable.fromJS({
            metaData: { meta: 'data' },
            startScreen: [],
            reasons: [{ id: 'r1' }],
          }),
        })
        await subPauseActions.subscriptionPauseStart()(dispatch, getState)

        expect(userActions.userLoadData).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith({
          type: actionTypes.PS_SUBSCRIPTION_PAUSE_ATTEMPT,
          metaData: Immutable.fromJS({ meta: 'data' }),
        })
        expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.PS_REASON_CATEGORY_MODAL_VIEWED })
      }
    )
  })
})
