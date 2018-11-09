import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Immutable from 'immutable' /* eslint-disable new-caps */
import actionTypes from 'actions/actionTypes'
import subPauseActions from 'actions/subscriptionPause'
import statusActions from 'actions/status'
import userActions from 'actions/user'
import ordersApi from 'apis/orders'
import customersApi from 'apis/customers'
import subscriptionApi from 'apis/subscription'
import redirectActions from 'actions/redirect'
import config from 'config/subscription'
import routesConfig from 'config/routes'
import * as subUtils from 'utils/subscription'
import logger from 'utils/logger'
import windowUtil from 'utils/window'

describe('Subscription action', function() {
  describe('subscriptionPauseLoadReasonChoice', function() {
    it('should return SUBSCRIPTION_PAUSE_REASON_CHOICE action type', function() {
      const result = subPauseActions.subscriptionPauseLoadReasonChoice(Immutable.List(['r1']))

      expect(result.type).to.equal(actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE)
    })

    it('should return chosenReasonIds', function() {
      const result = subPauseActions.subscriptionPauseLoadReasonChoice(Immutable.List(['r1']))

      expect(Immutable.is(result.chosenReasonIds, Immutable.List(['r1']))).to.equal(true)
    })
  })

  describe('subscriptionPauseLoadStaticScreen', function() {
    it('should return SUBSCRIPTION_PAUSE_REASON_LOAD_STATIC_SCREEN action type', function() {
      const result = subPauseActions.subscriptionPauseLoadStaticScreen('testScreenType')

      expect(result.type).to.equal(actionTypes.SUBSCRIPTION_PAUSE_REASON_LOAD_STATIC_SCREEN)
    })

    it('should return screenType', function() {
      const result = subPauseActions.subscriptionPauseLoadStaticScreen('testScreenType')

      expect(result.screenType).to.equal('testScreenType')
    })
  })

  describe('subscriptionPauseLoadReasons', function() {
    const reasons = Immutable.fromJS([
      { id: 'a' },
      { id: 'b' },
      { id: 'c' },
    ])

    it('should return SUBSCRIPTION_PAUSE_REASON_LOAD_REASONS action type', function() {
      const result = subPauseActions.subscriptionPauseLoadReasons(reasons)

      expect(result.type).to.equal(actionTypes.SUBSCRIPTION_PAUSE_REASON_LOAD_REASONS)
    })

    it('should return reasons', function() {
      const result = subPauseActions.subscriptionPauseLoadReasons(reasons)

      expect(Immutable.is(result.reasons, reasons)).to.equal(true)
    })
  })

  describe('subscriptionPauseLoadStep', function() {
    it('should return SUBSCRIPTION_PAUSE_REASON_LOAD_STEP action type', function() {
      const result = subPauseActions.subscriptionPauseLoadStep()

      expect(result.type).to.equal(actionTypes.SUBSCRIPTION_PAUSE_REASON_LOAD_STEP)
    })

    it('should return activeStepId', function() {
      const result = subPauseActions.subscriptionPauseLoadStep('active step id')

      expect(result.activeStepId).to.equal('active step id')
    })
  })

  describe('subscriptionPauseVisibilityChange', function() {
    it('should return SUBSCRIPTION_PAUSE_VISIBILITY_CHANGE action type', function() {
      const result = subPauseActions.subscriptionPauseVisibilityChange(true)

      expect(result.type).to.equal(actionTypes.SUBSCRIPTION_PAUSE_VISIBILITY_CHANGE)
      expect(result.visible).to.be.true
    })
  })

  describe('subscriptionPauseApplyPromo', function() {
    let getState
    let dispatch
    let error
    let pending
    let userPromoApplyCode
    let subscriptionPauseProceed
    let subscriptionPauseLoadError
    let sandbox

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      dispatch = sandbox.spy()
      getState = sandbox.stub().returns({
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

      error = sandbox.stub(statusActions, 'error')
      pending = sandbox.stub(statusActions, 'pending')
      userPromoApplyCode = sandbox.stub(userActions, 'userPromoApplyCode')
      subscriptionPauseProceed = sandbox.stub(subPauseActions, 'subscriptionPauseProceed')
      subscriptionPauseLoadError = sandbox.stub(subPauseActions, 'subscriptionPauseLoadError')
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should call statusActions pending with true for "SUBSCRIPTION_PAUSE_PROMO_APPLY" as first call to pending', async function() {
      await subPauseActions.subscriptionPauseApplyPromo()(dispatch, getState)

      expect(pending.firstCall).to.be.calledWith(actionTypes.SUBSCRIPTION_PAUSE_PROMO_APPLY, true)
    })

    it('should call statusActions error with false for "SUBSCRIPTION_PAUSE_PROMO_APPLY" as first call to error', async function() {
      await subPauseActions.subscriptionPauseApplyPromo()(dispatch, getState)

      expect(error.firstCall).to.be.calledWith(actionTypes.SUBSCRIPTION_PAUSE_PROMO_APPLY, false)
    })

    it('should call userPromoApplyCode once with provided promo code if promo code is passed in', async function() {
      await subPauseActions.subscriptionPauseApplyPromo('testpromocode')(dispatch, getState)

      expect(userPromoApplyCode.callCount).to.equal(1)
      expect(userPromoApplyCode).to.be.calledWith('testpromocode')
    })

    it('should call userPromoApplyCode once with promo code from state if promo code is NOT passed in', async function() {
      await subPauseActions.subscriptionPauseApplyPromo()(dispatch, getState)

      expect(userPromoApplyCode.callCount).to.equal(1)
      expect(userPromoApplyCode).to.be.calledWith('10OFF')
    })

    it('should call statusActions pending with false for "SUBSCRIPTION_PAUSE_PROMO_APPLY" as last call', async function() {
      await subPauseActions.subscriptionPauseApplyPromo()(dispatch, getState)

      expect(pending.lastCall).to.be.calledWith(actionTypes.SUBSCRIPTION_PAUSE_PROMO_APPLY, false)
    })

    describe('when subscriptionPause data is corrupt', function() {
      beforeEach(async function() {
        getState = sinon.stub().returns({
          auth: Immutable.fromJS({ accessToken: 'token' }),
          user: Immutable.fromJS({ id: '123' }),
          subscriptionPause: undefined,
        })

        await subPauseActions.subscriptionPauseApplyPromo()(dispatch, getState)
      })

      it('should call subscriptionPauseLoadError with data-unavailable GoustoException as first arg', function() {
        const error = subscriptionPauseLoadError.firstCall.args[0]
        expect(error.message).to.equal('Subscription pause promo error: data not available')
        expect(error.error).to.equal('data-unavailable')
        expect(error.level).to.equal('error')
      })

      it('should call subscriptionPauseLoadError with "SUBSCRIPTION_PAUSE_PROMO_APPLY" as second arg', function() {
        expect(subscriptionPauseLoadError.firstCall.args[1]).to.equal(actionTypes.SUBSCRIPTION_PAUSE_PROMO_APPLY)
      })
    })

    describe('when promo code can not be determined', function() {
      beforeEach(async function() {
        getState = sinon.stub().returns({
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

      it('should call subscriptionPauseLoadError with no-promo-code-found GoustoException as first arg', function() {
        const error = subscriptionPauseLoadError.firstCall.args[0]
        expect(error.message).to.equal('Subscription pause promo error: promo code cannot be determined')
        expect(error.error).to.equal('no-promo-code-found')
        expect(error.level).to.equal('error')
      })

      it('should call subscriptionPauseLoadError with "SUBSCRIPTION_PAUSE_PROMO_APPLY" as second arg', function() {
        expect(subscriptionPauseLoadError.firstCall.args[1]).to.equal(actionTypes.SUBSCRIPTION_PAUSE_PROMO_APPLY)
      })
    })

    it('should call subscriptionPauseProceed once with "next" and "recovered"', async function() {
      getState = sinon.stub().returns({
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

      expect(subscriptionPauseProceed.callCount).to.equal(1)
      expect(subscriptionPauseProceed).to.be.calledWithExactly('next', 'recovered', 'promo', 'abc123')
    })
  })

  describe('subscriptionDeactivate', function() {
    let getState
    let dispatch
    let sandbox
    let error
    let pending
    let deactivateSubscription

    beforeEach(function() {
      getState = sinon.stub().returns({
        auth: Immutable.fromJS({ accessToken: 'token' }),
      })
      dispatch = sinon.spy()
      sandbox = sinon.sandbox.create()
      error = sandbox.spy(statusActions, 'error')
      pending = sandbox.spy(statusActions, 'pending')
      deactivateSubscription = sandbox.stub(subscriptionApi, 'deactivateSubscription').returns(Promise.resolve())
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should handle pending state', async function() {
      await subPauseActions.subscriptionDeactivate('passed in reason')(dispatch, getState)

      expect(pending.firstCall).to.be.calledWithExactly(actionTypes.SUBSCRIPTION_DEACTIVATE, true)
      expect(pending.lastCall).to.be.calledWithExactly(actionTypes.SUBSCRIPTION_DEACTIVATE, false)
    })

    it('should reset error state', async function() {
      await subPauseActions.subscriptionDeactivate('passed in reason')(dispatch, getState)

      expect(error.firstCall).to.be.calledWithExactly(actionTypes.SUBSCRIPTION_DEACTIVATE, false)
    })

    it('should call deactivateSubscription once with accessToken & reason', async function() {
      await subPauseActions.subscriptionDeactivate('passed in reason')(dispatch, getState)

      expect(deactivateSubscription.callCount).to.equal(1)
      expect(deactivateSubscription.firstCall).to.be.calledWithExactly('token', { state_reason: 'passed in reason' })
    })

    describe('when deactivation fails', function() {
      beforeEach(async function() {
        deactivateSubscription.restore()
        deactivateSubscription = sandbox.stub(subscriptionApi, 'deactivateSubscription').returns(Promise.reject('error from deactivateSubscription'))

        await subPauseActions.subscriptionDeactivate('passed in reason')(dispatch, getState)
      })

      it('should call error status with deactivate-fail', function() {
        expect(error).to.be.calledWith(actionTypes.SUBSCRIPTION_DEACTIVATE, 'deactivate-fail')
      })
    })
  })

  describe('subscriptionPauseEnd', function() {
    let sandbox
    let dispatch
    let getState
    let subscriptionPauseVisibilityChange
    let subscriptionPauseReasonsRefreshRequired

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      dispatch = sandbox.spy()
      getState = sandbox.stub().returns({
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
      subscriptionPauseVisibilityChange = sandbox.spy(subPauseActions, 'subscriptionPauseVisibilityChange')
      subscriptionPauseReasonsRefreshRequired = sandbox.spy(subPauseActions, 'subscriptionPauseReasonsRefreshRequired')
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should call subscriptionPauseVisibilityChange once with false', async function() {
      await subPauseActions.subscriptionPauseEnd()(dispatch, getState)

      expect(subscriptionPauseVisibilityChange.callCount).to.equal(1)
      expect(subscriptionPauseVisibilityChange.firstCall).to.be.calledWithExactly(false)
    })

    it('should call subscriptionPauseReasonsRefreshRequired once with true', async function() {
      await subPauseActions.subscriptionPauseEnd()(dispatch, getState)

      expect(subscriptionPauseReasonsRefreshRequired.callCount).to.equal(1)
      expect(subscriptionPauseReasonsRefreshRequired.firstCall).to.be.calledWithExactly(true)
    })
  })

  describe('subscriptionPauseStart', function() {
    let sandbox
    let getState
    let dispatch
    let pending
    let subscriptionPauseReset
    let subscriptionPauseLoadReasons
    let subscriptionPauseVisibilityChange

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      getState = sandbox.stub().returns({
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
      dispatch = sandbox.spy()
      pending = sandbox.spy(statusActions, 'pending')
      subscriptionPauseReset = sandbox.spy(subPauseActions, 'subscriptionPauseReset')
      subscriptionPauseLoadReasons = sandbox.spy(subPauseActions, 'subscriptionPauseLoadReasons')
      subscriptionPauseVisibilityChange = sandbox.spy(subPauseActions, 'subscriptionPauseVisibilityChange')
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should call statusActions pending with true for "SUBSCRIPTION_PAUSE_START" as first call', async function() {
      await subPauseActions.subscriptionPauseStart()(dispatch, getState)

      expect(pending.firstCall).to.be.calledWithExactly(actionTypes.SUBSCRIPTION_PAUSE_START, true)
    })

    it('should call statusActions pending with false for "SUBSCRIPTION_PAUSE_START" as last call', async function() {
      await subPauseActions.subscriptionPauseStart()(dispatch, getState)

      expect(pending.lastCall).to.be.calledWithExactly(actionTypes.SUBSCRIPTION_PAUSE_START, false)
    })

    it('should call subscriptionPauseReset once with no args', async function() {
      await subPauseActions.subscriptionPauseStart()(dispatch, getState)

      expect(subscriptionPauseReset.callCount).to.equal(1)
      expect(subscriptionPauseReset.firstCall).to.be.calledWithExactly()
    })

    describe('when subscriptionPause refreshRequired is true', function() {
      let subscriptionPauseFetchReasons
      let subscriptionPauseReasonsRefreshRequired

      beforeEach(function() {
        getState = sandbox.stub().returns({
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

        subscriptionPauseFetchReasons = sandbox.stub(subPauseActions, 'subscriptionPauseFetchReasons')
        subscriptionPauseReasonsRefreshRequired = sandbox.stub(subPauseActions, 'subscriptionPauseReasonsRefreshRequired')
      })

      it('should call subscriptionPauseFetchReasons once with no args', async function() {
        await subPauseActions.subscriptionPauseStart()(dispatch, getState)

        expect(subscriptionPauseFetchReasons.callCount).to.equal(1)
        expect(subscriptionPauseFetchReasons.firstCall).to.be.calledWithExactly()
      })

      it('should call subscriptionPauseReasonsRefreshRequired once with false if there is no fetch error', async function() {
        await subPauseActions.subscriptionPauseStart()(dispatch, getState)

        expect(subscriptionPauseReasonsRefreshRequired.callCount).to.equal(1)
        expect(subscriptionPauseReasonsRefreshRequired.firstCall).to.be.calledWithExactly(false)
      })

      it('should NOT call subscriptionPauseReasonsRefreshRequired if there is a fetch error', async function() {
        getState = sandbox.stub().returns({
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

        expect(subscriptionPauseReasonsRefreshRequired.callCount).to.equal(0)
      })

      it('should call subscriptionPauseLoadStartScreen if startScreen is loaded', async function() {
        const subscriptionPauseLoadStartScreen = sandbox.spy(subPauseActions, 'subscriptionPauseLoadStartScreen')
        getState = sandbox.stub().returns({
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

        expect(subscriptionPauseLoadStartScreen).to.be.calledOnce
      })
    })

    describe('when subscriptionPause refreshRequired is false', function() {
      let subscriptionPauseFetchReasons
      let subscriptionPauseReasonsRefreshRequired

      beforeEach(function() {
        getState = sandbox.stub().returns({
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

        subscriptionPauseFetchReasons = sandbox.stub(subPauseActions, 'subscriptionPauseFetchReasons')
        subscriptionPauseReasonsRefreshRequired = sandbox.stub(subPauseActions, 'subscriptionPauseReasonsRefreshRequired')
      })

      it('should NOT call subscriptionPauseFetchReasons', async function() {
        await subPauseActions.subscriptionPauseStart()(dispatch, getState)

        expect(subscriptionPauseFetchReasons.callCount).to.equal(0)
      })

      it('should NOT call subscriptionPauseReasonsRefreshRequired', async function() {
        await subPauseActions.subscriptionPauseStart()(dispatch, getState)

        expect(subscriptionPauseReasonsRefreshRequired.callCount).to.equal(0)
      })
    })

    it('should call subscriptionPauseLoadReasons once with reasons from store if set', async function() {
      await subPauseActions.subscriptionPauseStart()(dispatch, getState)

      expect(subscriptionPauseLoadReasons.callCount).to.equal(1)

      const calledWithReasons = subscriptionPauseLoadReasons.firstCall.args[0]
      const expectedReasons = Immutable.fromJS([
        { id: 1, children: [] },
        { id: 2, children: [] },
      ])

      expect(Immutable.is(calledWithReasons, expectedReasons)).to.equal(true)
    })

    it('should call subscriptionPauseVisibilityChange once with visible set to true', async function() {
      await subPauseActions.subscriptionPauseStart()(dispatch, getState)

      expect(subscriptionPauseVisibilityChange.callCount).to.equal(1)
      expect(subscriptionPauseVisibilityChange.firstCall).to.be.calledWithExactly(true)
    })
  })

  describe('subscriptionPauseReasonChoice', function() {
    let dispatch
    let error
    let pending
    let sandbox
    let subscriptionPauseLoadReasons
    let subscriptionPauseReasonSubmit
    let subscriptionPauseProceed
    let subscriptionPauseLoadReasonChoice
    let subscriptionPauseLoadError
    let getState

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      dispatch = sandbox.spy()
      subscriptionPauseLoadReasons = sandbox.spy(subPauseActions, 'subscriptionPauseLoadReasons')
      subscriptionPauseReasonSubmit = sandbox.spy(subPauseActions, 'subscriptionPauseReasonSubmit')
      subscriptionPauseProceed = sandbox.spy(subPauseActions, 'subscriptionPauseProceed')
      subscriptionPauseLoadReasonChoice = sandbox.spy(subPauseActions, 'subscriptionPauseLoadReasonChoice')
      subscriptionPauseLoadError = sandbox.spy(subPauseActions, 'subscriptionPauseLoadError')
      error = sandbox.spy(statusActions, 'error')
      pending = sandbox.spy(statusActions, 'pending')
      getState = sinon.stub().returns({})
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should call statusActions pending with true for "SUBSCRIPTION_PAUSE_REASON_CHOICE" as first call', async function() {
      await subPauseActions.subscriptionPauseReasonChoice()(dispatch, getState)

      expect(pending.firstCall).to.be.calledWithExactly(actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE, true)
    })

    it('should call statusActions error with false for "SUBSCRIPTION_PAUSE_REASON_CHOICE"', async function() {
      await subPauseActions.subscriptionPauseReasonChoice()(dispatch, getState)

      expect(error.firstCall).to.be.calledWithExactly(actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE, false)
    })

    it('should call statusActions pending with true for "SUBSCRIPTION_PAUSE_REASON_CHOICE" as last call', async function() {
      await subPauseActions.subscriptionPauseReasonChoice()(dispatch, getState)

      expect(pending.lastCall).to.be.calledWithExactly(actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE, false)
    })

    describe('when chosen reason has children', function() {
      beforeEach(async function() {
        getState = sinon.stub().returns({
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

      it('should call subscriptionPauseLoadReasons once', function() {
        expect(subscriptionPauseLoadReasons.callCount).to.equal(1)
      })

      it('should call subscriptionPauseLoadReasons with chosen reason\'s children as value of arg 1', function() {
        const expectedChildren = Immutable.fromJS([
          { id: 'r3' },
        ])
        expect(Immutable.is(subscriptionPauseLoadReasons.args[0][0], expectedChildren)).to.equal(true)
      })
    })

    describe('when chosen reason has no children', function() {
      beforeEach(async function() {
        getState = sinon.stub().returns({
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

      describe('when chosen reason has NO "initial" flag set to true in any step', function() {
        beforeEach(async function() {
          await subPauseActions.subscriptionPauseReasonChoice('r7')(dispatch, getState)
        })

        it('should call subscriptionPauseLoadReasonChoice with chosen reason ids with chosenReasonId appended & correct tracking data', async function() {
          const firstCall = subscriptionPauseLoadReasonChoice.firstCall
          expect(Immutable.is(firstCall.args[0], Immutable.List(['r7'])))
          expect(firstCall.args[1]).to.deep.equal({
            type: 'reason',
            chosenReasonSlug: 'narrower_time_slots',
          })

          await subPauseActions.subscriptionPauseReasonChoice('r9')(dispatch, getState)

          const secondCall = subscriptionPauseLoadReasonChoice.getCall(1)
          expect(Immutable.is(secondCall.args[0], Immutable.List(['r7', 'r9'])))
          expect(secondCall.args[1]).to.deep.equal({
            type: 'category',
            chosenReasonSlug: 'cost_some_other_slug',
          })
        })

        it('should call subscriptionPauseReasonSubmit once', function() {
          expect(subscriptionPauseReasonSubmit.callCount).to.equal(1)
        })
      })

      describe('when chosen reason has "initial" flag set to true in any step', function() {
        let subscriptionPauseTrack

        beforeEach(async function() {
          getState = sinon.stub().returns({
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

          subscriptionPauseTrack = sandbox.spy(subPauseActions, 'subscriptionPauseTrack')
        })

        it('should call subscriptionPauseTrack once with "IN_RECOVERY_EXPERIMENT" & correct experiment data if recovery feature is found in state & is an experiment', async function() {
          await subPauseActions.subscriptionPauseReasonChoice('r8')(dispatch, getState)

          expect(subscriptionPauseTrack.callCount).to.equal(1)
          expect(subscriptionPauseTrack).to.be.calledWithExactly('IN_RECOVERY_EXPERIMENT', { experiment: 'experiment value' })
        })

        it('should NOT call subscriptionPauseTrack if recovery feature is not found in state or is not an experiment', async function() {
          getState = sinon.stub().returns({
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
          expect(subscriptionPauseTrack.callCount).to.equal(0)

          const getStateNoRecoveryFeature = sinon.stub().returns({
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
          expect(subscriptionPauseTrack.callCount).to.equal(0)
        })

        it('should call subscriptionPauseProceed once with "initial"', async function() {
          await subPauseActions.subscriptionPauseReasonChoice('r8')(dispatch, getState)

          expect(subscriptionPauseProceed.callCount).to.equal(1)
          expect(subscriptionPauseProceed).to.be.calledWithExactly('initial')
        })
      })
    })

    describe('when reason id not provided', function() {
      beforeEach(async function() {
        await subPauseActions.subscriptionPauseReasonChoice()(dispatch, getState)
      })

      it('should call subscriptionPauseLoadError with no-reason-found GoustoException as first arg', function() {
        const error = subscriptionPauseLoadError.firstCall.args[0]
        expect(error.message).to.equal('Unable to choose reason: reason id not provided')
        expect(error.error).to.equal('no-reason-found')
        expect(error.level).to.equal('error')
      })

      it('should call subscriptionPauseLoadError with "SUBSCRIPTION_PAUSE_REASON_CHOICE" as second arg', async function() {
        expect(subscriptionPauseLoadError.firstCall.args[1]).to.equal(actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE)
      })
    })

    describe('if state data is malformed or unavailable', function() {
      beforeEach(async function() {
        await subPauseActions.subscriptionPauseReasonChoice('r10')(dispatch, getState)
      })

      it('should call subscriptionPauseLoadError with data-unavailable GoustoException as first arg', function() {
        const error = subscriptionPauseLoadError.firstCall.args[0]
        expect(error.message).to.equal('Unable to choose reason: data not available')
        expect(error.error).to.equal('data-unavailable')
        expect(error.level).to.equal('error')
      })

      it('should call subscriptionPauseLoadError with "SUBSCRIPTION_PAUSE_REASON_CHOICE" as second arg', async function() {
        expect(subscriptionPauseLoadError.firstCall.args[1]).to.equal(actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE)
      })
    })
  })

  describe('subscriptionPauseSkipNextBox', function() {
    let sandbox
    let dispatch
    let getState
    let pending
    let error
    let userOrderCancelNext
    let userOrderSkipNextProjected
    let subscriptionPauseProceed
    let subscriptionPauseLoadError

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      dispatch = sandbox.spy()
      getState = sinon.stub().returns({
        error: Immutable.fromJS({}),
      })
      pending = sandbox.spy(statusActions, 'pending')
      error = sandbox.spy(statusActions, 'error')
      userOrderCancelNext = sandbox.spy(userActions, 'userOrderCancelNext')
      userOrderSkipNextProjected = sandbox.spy(userActions, 'userOrderSkipNextProjected')
      subscriptionPauseProceed = sandbox.spy(subPauseActions, 'subscriptionPauseProceed')
      subscriptionPauseLoadError = sandbox.spy(subPauseActions, 'subscriptionPauseLoadError')
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should call statusActions pending with true for "SUBSCRIPTION_PAUSE_SKIP_BOX" as first call', async function() {
      await subPauseActions.subscriptionPauseSkipNextBox()(dispatch, getState)

      expect(pending.firstCall).to.be.calledWithExactly(actionTypes.SUBSCRIPTION_PAUSE_SKIP_BOX, true)
    })

    it('should call statusActions error with false for "SUBSCRIPTION_PAUSE_SKIP_BOX"', async function() {
      await subPauseActions.subscriptionPauseSkipNextBox()(dispatch, getState)

      expect(error.firstCall).to.be.calledWithExactly(actionTypes.SUBSCRIPTION_PAUSE_SKIP_BOX, false)
    })

    it('should call statusActions pending with true for "SUBSCRIPTION_PAUSE_SKIP_BOX" as last call', async function() {
      await subPauseActions.subscriptionPauseSkipNextBox()(dispatch, getState)

      expect(pending.lastCall).to.be.calledWithExactly(actionTypes.SUBSCRIPTION_PAUSE_SKIP_BOX, false)
    })

    it('should call userOrderCancelNext once with no args', async function() {
      await subPauseActions.subscriptionPauseSkipNextBox()(dispatch, getState)

      expect(userOrderCancelNext.callCount).to.equal(1)
      expect(userOrderCancelNext).to.be.calledWithExactly()
    })

    it('should call subscriptionPauseProceed once with "next" and "recovered" when next box is succesfully canceled', async function() {
      getState = sinon.stub().returns({
        error: Immutable.fromJS({
          [actionTypes.USER_ORDER_CANCEL_NEXT]: false,
        }),
      })
      await subPauseActions.subscriptionPauseSkipNextBox()(dispatch, getState)

      expect(subscriptionPauseProceed.callCount).to.equal(1)
      expect(subscriptionPauseProceed).to.be.calledWithExactly('next', 'recovered', 'quoteSkipNext')
    })

    describe('when an error occurs in canceling next box due to something other than no orders found to cancel', function() {
      beforeEach(async function() {
        getState = sinon.stub().returns({
          error: Immutable.fromJS({
            [actionTypes.USER_ORDER_CANCEL_NEXT]: 'something else',
          }),
        })

        await subPauseActions.subscriptionPauseSkipNextBox()(dispatch, getState)
      })

      it('should call subscriptionPauseLoadError with failed-cancel GoustoException as first arg', function() {
        const error = subscriptionPauseLoadError.firstCall.args[0]
        expect(error.message).to.equal('Subscription pause skip next box error: failed to cancel next box, something else')
        expect(error.error).to.equal('failed-cancel')
        expect(error.level).to.equal('error')
      })

      it('should call subscriptionPauseLoadError with "SUBSCRIPTION_PAUSE_SKIP_BOX" as second arg', async function() {
        expect(subscriptionPauseLoadError.firstCall.args[1]).to.equal(actionTypes.SUBSCRIPTION_PAUSE_SKIP_BOX)
      })
    })

    it('should call userOrderSkipNextProjected once with no args when an error occurs in canceling next box due to no orders found to cancel', async function() {
      getState = sinon.stub().returns({
        error: Immutable.fromJS({
          [actionTypes.USER_ORDER_CANCEL_NEXT]: 'no-orders-found',
        }),
      })
      await subPauseActions.subscriptionPauseSkipNextBox()(dispatch, getState)

      expect(userOrderSkipNextProjected.callCount).to.equal(1)
      expect(userOrderSkipNextProjected).to.be.calledWithExactly()
    })

    it('should call subscriptionPauseProceed once with "next" and "recovered" when next box is succesfully skipped', async function() {
      getState = sinon.stub().returns({
        error: Immutable.fromJS({
          [actionTypes.USER_ORDER_CANCEL_NEXT]: 'no-orders-found',
          [actionTypes.USER_ORDER_SKIP_NEXT_PROJECTED]: false,
        }),
      })
      await subPauseActions.subscriptionPauseSkipNextBox()(dispatch, getState)

      expect(subscriptionPauseProceed.callCount).to.equal(1)
      expect(subscriptionPauseProceed).to.be.calledWithExactly('next', 'recovered', 'quoteSkipNext')
    })

    describe('when an error occurs in skipping next projected box due to something other than no orders found to skip', function() {
      beforeEach(async function() {
        getState = sinon.stub().returns({
          error: Immutable.fromJS({
            [actionTypes.USER_ORDER_CANCEL_NEXT]: 'no-orders-found',
            [actionTypes.USER_ORDER_SKIP_NEXT_PROJECTED]: 'something else',
          }),
        })

        await subPauseActions.subscriptionPauseSkipNextBox()(dispatch, getState)
      })

      it('should call subscriptionPauseLoadError with failed-skip GoustoException as first arg', function() {
        const error = subscriptionPauseLoadError.firstCall.args[0]
        expect(error.message).to.equal('Subscription pause skip next box error: failed to skip next box, something else')
        expect(error.error).to.equal('failed-skip')
        expect(error.level).to.equal('error')
      })

      it('should call subscriptionPauseLoadError with "SUBSCRIPTION_PAUSE_SKIP_BOX" as second arg', async function() {
        expect(subscriptionPauseLoadError.firstCall.args[1]).to.equal(actionTypes.SUBSCRIPTION_PAUSE_SKIP_BOX)
      })
    })

    describe('when an error occurs in skipping next projected box due to no orders found to skip', function() {
      beforeEach(async function() {
        getState = sinon.stub().returns({
          error: Immutable.fromJS({
            [actionTypes.USER_ORDER_CANCEL_NEXT]: 'no-orders-found',
            [actionTypes.USER_ORDER_SKIP_NEXT_PROJECTED]: 'no-orders-found',
          }),
        })

        await subPauseActions.subscriptionPauseSkipNextBox()(dispatch, getState)
      })

      it('should call subscriptionPauseLoadError with no-orders-found GoustoException as first arg', function() {
        const error = subscriptionPauseLoadError.firstCall.args[0]
        expect(error.message).to.equal('Subscription pause skip next box error: no orders found to cancel or skip')
        expect(error.error).to.equal('no-orders-found')
        expect(error.level).to.equal('warning')
      })

      it('should call subscriptionPauseLoadError with "SUBSCRIPTION_PAUSE_SKIP_BOX" as second arg', async function() {
        expect(subscriptionPauseLoadError.firstCall.args[1]).to.equal(actionTypes.SUBSCRIPTION_PAUSE_SKIP_BOX)
      })
    })
  })

  describe('subscriptionPauseReset', function() {
    it('should return SUBSCRIPTION_PAUSE_REASON_RESET action type', function() {
      const result = subPauseActions.subscriptionPauseReset()

      expect(result.type).to.equal(actionTypes.SUBSCRIPTION_PAUSE_REASON_RESET)
    })
  })

  describe('subscriptionPauseReasonsReceive', function() {
    it('should return SUBSCRIPTION_PAUSE_REASONS_RECEIVE action type', function() {
      const result = subPauseActions.subscriptionPauseReasonsReceive([])

      expect(result.type).to.equal(actionTypes.SUBSCRIPTION_PAUSE_REASONS_RECEIVE)
    })

    it('should return received data', function() {
      const result = subPauseActions.subscriptionPauseReasonsReceive([
        { id: 'r1' },
        { id: 'r2' },
      ])

      expect(result.reasons).to.deep.equal([
        { id: 'r1' },
        { id: 'r2' },
      ])
    })
  })

  describe('subscriptionPauseTrack', function() {
    it('should return TRACKING action type', function() {
      const result = subPauseActions.subscriptionPauseTrack('testScreenType')

      expect(result.type).to.equal(actionTypes.TRACKING)
    })

    it('should return trackingData with correctly constructed string for actionType by default', function() {
      const result = subPauseActions.subscriptionPauseTrack('test_key')

      expect(result.trackingData).to.deep.equal({
        actionType: `${config.tracking.pauseModalPrefix}test_key`,
      })
    })

    it('should return trackingData with additional data merged in if provided', function() {
      const result = subPauseActions.subscriptionPauseTrack('test_key', { extraDataOne: 1, extraDataTwo: 2 })

      expect(result.trackingData).to.deep.equal({
        actionType: `${config.tracking.pauseModalPrefix}test_key`,
        extraDataOne: 1,
        extraDataTwo: 2,
      })
    })
  })

  describe('subscriptionPauseFetchReasons', function() {
    let sandbox
    let getState
    let fetchPauseReasons
    let dispatch
    let subscriptionPauseReasonsReceive
    let subscriptionPauseLoadError

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      getState = sandbox.stub().returns({
        auth: Immutable.fromJS({ accessToken: 'token' }),
        user: Immutable.fromJS({ id: '123' }),
      })
      dispatch = sandbox.spy()
      fetchPauseReasons = sandbox.stub(customersApi, 'fetchPauseReasons').returns(new Promise(resolve => {
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
      subscriptionPauseReasonsReceive = sandbox.spy(subPauseActions, 'subscriptionPauseReasonsReceive')
      subscriptionPauseLoadError = sandbox.spy(subPauseActions, 'subscriptionPauseLoadError')
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should call fetchPauseReasons once', async function() {
      await subPauseActions.subscriptionPauseFetchReasons()(dispatch, getState)

      expect(fetchPauseReasons).to.have.been.calledOnce
    })

    it('should call subscriptionPauseReasonsReceive with received data', async function() {
      await subPauseActions.subscriptionPauseFetchReasons()(dispatch, getState)

      expect(subscriptionPauseReasonsReceive).to.be.calledWithExactly(['1', '2'], { a: 'a' })
    })

    describe('when no reasons are retrieved', async function() {
      beforeEach(async function() {
        fetchPauseReasons.restore()
        fetchPauseReasons = sandbox.stub(customersApi, 'fetchPauseReasons').returns(Promise.resolve({ data: [], meta: {} }))
        await subPauseActions.subscriptionPauseFetchReasons()(dispatch, getState)
      })

      it('should call subscriptionPauseLoadError with no-pause-reasons GoustoException as first arg', function() {
        const error = subscriptionPauseLoadError.firstCall.args[0]
        expect(error.message).to.equal('Subscripton pause fetch error: no pause reasons available')
        expect(error.error).to.equal('no-pause-reasons')
        expect(error.level).to.equal('warning')
      })

      it('should call subscriptionPauseLoadError with "SUBSCRIPTION_PAUSE_FETCH" as second arg', async function() {
        expect(subscriptionPauseLoadError.firstCall.args[1]).to.equal(actionTypes.SUBSCRIPTION_PAUSE_FETCH)
      })
    })

    describe('when fetch fails', async function() {
      beforeEach(async function() {
        fetchPauseReasons.restore()
        fetchPauseReasons = sandbox.stub(customersApi, 'fetchPauseReasons').returns(Promise.reject('response from deactivateSubscription'))
        await subPauseActions.subscriptionPauseFetchReasons()(dispatch, getState)
      })

      it('should call subscriptionPauseFetchReasons with fetch-failed GoustoException as first arg', function() {
        const error = subscriptionPauseLoadError.firstCall.args[0]
        expect(error.message).to.equal('Subscripton pause fetch error: fetch failed, response from deactivateSubscription')
        expect(error.error).to.equal('fetch-failed')
        expect(error.level).to.equal('error')
      })

      it('should call subscriptionPauseFetchReasons with "SUBSCRIPTION_PAUSE_FETCH" as second arg', async function() {
        expect(subscriptionPauseLoadError.firstCall.args[1]).to.equal(actionTypes.SUBSCRIPTION_PAUSE_FETCH)
      })
    })
  })

  describe('subscriptionPauseLoadError', function() {
    let sandbox
    let dispatch
    let loggerCritical
    let loggerError
    let loggerWarning
    let error
    let subscriptionPauseLoadStaticScreen
    let subscriptionPauseTrack

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      dispatch = sandbox.spy()
      loggerCritical = sandbox.spy(logger, 'critical')
      loggerError = sandbox.spy(logger, 'error')
      loggerWarning = sandbox.spy(logger, 'warning')
      error = sandbox.spy(statusActions, 'error')
      subscriptionPauseLoadStaticScreen = sandbox.spy(subPauseActions, 'subscriptionPauseLoadStaticScreen')
      subscriptionPauseTrack = sandbox.spy(subPauseActions, 'subscriptionPauseTrack')
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should call logger "error" by default with error.message if error message is available', function() {
      subPauseActions.subscriptionPauseLoadError({ message: 'message from object' })(dispatch)

      expect(loggerError.callCount).to.equal(1)
      expect(loggerError.firstCall).to.be.calledWithExactly('message from object')
    })

    it('should call logger "error" by default with error value if error message is not available', function() {
      subPauseActions.subscriptionPauseLoadError('Error string')(dispatch)

      expect(loggerError.callCount).to.equal(1)
      expect(loggerError.firstCall).to.be.calledWithExactly('Error string')
    })

    it('should call correct logger method matching error.level if provided, along with error message', function() {
      subPauseActions.subscriptionPauseLoadError({ message: 'a', level: 'critical' })(dispatch)

      expect(loggerCritical.callCount).to.equal(1)
      expect(loggerCritical.firstCall).to.be.calledWithExactly('a')

      subPauseActions.subscriptionPauseLoadError({ message: 'b', level: 'warning' })(dispatch)

      expect(loggerWarning.callCount).to.equal(1)
      expect(loggerWarning.firstCall).to.be.calledWithExactly('b')
    })

    it('should call statusActions error once with SUBSCRIPTION_PAUSE_ERROR actionType by default', function() {
      subPauseActions.subscriptionPauseLoadError({ error: 'error-key' })(dispatch)

      expect(error.callCount).to.equal(1)
      expect(error.firstCall).to.be.calledWithExactly(actionTypes.SUBSCRIPTION_PAUSE_ERROR, 'error-key')
    })

    it('should call statusActions error once with given actionType & error.error if both are provided', function() {
      subPauseActions.subscriptionPauseLoadError({ error: 'error-key' }, 'ACTION_TYPE')(dispatch)

      expect(error.callCount).to.equal(1)
      expect(error.firstCall).to.be.calledWithExactly('ACTION_TYPE', 'error-key')
    })

    it('should NOT call statusActions error if false is provided as actionType', function() {
      subPauseActions.subscriptionPauseLoadError({ error: 'error-key' }, false)(dispatch)

      expect(error.callCount).to.equal(0)
    })

    it('should call subscriptionPauseLoadStaticScreen with "error"', function() {
      subPauseActions.subscriptionPauseLoadError({ error: 'error-key' })(dispatch)

      expect(subscriptionPauseLoadStaticScreen.callCount).to.equal(1)
      expect(subscriptionPauseLoadStaticScreen.firstCall).to.be.calledWithExactly('error')
    })

    it('should call subscriptionPauseTrack once with error.message if error message is available', function() {
      subPauseActions.subscriptionPauseLoadError({ message: 'message from object' })(dispatch)

      expect(subscriptionPauseTrack.callCount).to.equal(1)
      expect(subscriptionPauseTrack.firstCall).to.be.calledWithExactly('ERROR', { error: 'message from object' })
    })

    it('should call subscriptionPauseTrack once with with error value if error message is not available', function() {
      subPauseActions.subscriptionPauseLoadError('Error string')(dispatch)

      expect(subscriptionPauseTrack.callCount).to.equal(1)
      expect(subscriptionPauseTrack.firstCall).to.be.calledWithExactly('ERROR', { error: 'Error string' })
    })
  })

  describe('subscriptionPauseGoBack', function() {
    let sandbox
    let dispatch
    let getState
    let subscriptionPauseLoadStaticScreen
    let subscriptionPauseProceed
    let subscriptionPauseLoadReasons
    let subscriptionPauseLoadReasonChoice
    let subscriptionPauseLoadError
    let subscriptionPauseTrack

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      dispatch = sandbox.spy()
      getState = sandbox.spy()
      subscriptionPauseLoadStaticScreen = sandbox.spy(subPauseActions, 'subscriptionPauseLoadStaticScreen')
      subscriptionPauseProceed = sandbox.spy(subPauseActions, 'subscriptionPauseProceed')
      subscriptionPauseLoadReasons = sandbox.spy(subPauseActions, 'subscriptionPauseLoadReasons')
      subscriptionPauseLoadReasonChoice = sandbox.spy(subPauseActions, 'subscriptionPauseLoadReasonChoice')
      subscriptionPauseLoadError = sandbox.spy(subPauseActions, 'subscriptionPauseLoadError')
      subscriptionPauseTrack = sandbox.spy(subPauseActions, 'subscriptionPauseTrack')
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should call subscriptionPauseTrack once with BACK', function() {
      subPauseActions.subscriptionPauseGoBack()(dispatch, getState)

      expect(subscriptionPauseTrack.callCount).to.equal(1)
      expect(subscriptionPauseTrack.firstCall).to.be.calledWithExactly('BACK')
    })

    describe('when staticScreenId is set in state', function() {
      beforeEach(function() {
        getState = sandbox.stub().returns({
          subscriptionPause: Immutable.fromJS({
            staticScreenId: 'static-screen-name',
          }),
        })
      })

      it('should call subscriptionPauseLoadStaticScreen once with undefined', function() {
        subPauseActions.subscriptionPauseGoBack()(dispatch, getState)

        expect(subscriptionPauseLoadStaticScreen.callCount).to.equal(1)
        expect(subscriptionPauseLoadStaticScreen.firstCall).to.be.calledWithExactly(undefined)
      })
    })

    describe('when staticScreenId is NOT set & activeStepId NOT on initial step in state', function() {
      beforeEach(function() {
        getState = sandbox.stub().returns({
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

      it('should call subscriptionPauseProceed once with "previous"', function() {
        subPauseActions.subscriptionPauseGoBack()(dispatch, getState)

        expect(subscriptionPauseProceed.callCount).to.equal(1)
        expect(subscriptionPauseProceed.firstCall).to.be.calledWithExactly('previous')
      })

      describe('when previousStepId is not available', function() {
        beforeEach(function() {
          getState = sandbox.stub().returns({
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

        it('should call subscriptionPauseLoadError with no-prev-step GoustoException as first arg', function() {
          const error = subscriptionPauseLoadError.firstCall.args[0]
          expect(error.message).to.equal('Subscription pause go back error: can\'t find previous step to go back to')
          expect(error.error).to.equal('no-prev-step')
          expect(error.level).to.equal('error')
        })

        it('should call subscriptionPauseLoadError with "SUBSCRIPTION_PAUSE_REASON_GO_BACK" as second arg', async function() {
          expect(subscriptionPauseLoadError.firstCall.args[1]).to.equal(actionTypes.SUBSCRIPTION_PAUSE_REASON_GO_BACK)
        })
      })
    })

    describe('when staticScreenId is NOT set & activeStepId is on initial step or activeStepId is not set in state', function() {
      let getReasonsFromStore

      beforeEach(function() {
        getState = sandbox.stub().returns({
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

        getReasonsFromStore = sandbox.stub(subUtils, 'getReasonsFromStore').returns(Immutable.fromJS([
          { id: 'r3' },
          { id: 'r4' },
        ]))
      })

      afterEach(function() {
        getReasonsFromStore.restore()
      })

      it('should call subscriptionPauseLoadReasons once with previous reasons', function() {
        subPauseActions.subscriptionPauseGoBack()(dispatch, getState)

        expect(subscriptionPauseLoadReasons.callCount).to.equal(1)
        expect(subscriptionPauseLoadReasons.firstCall.args[0].toJS()).to.deep.equal([
          { id: 'r3' },
          { id: 'r4' },
        ])
      })

      it('should call subscriptionPauseLoadReasonChoice once with prevChosenReasonIds from state with last item removed', function() {
        subPauseActions.subscriptionPauseGoBack()(dispatch, getState)

        expect(subscriptionPauseLoadReasonChoice.callCount).to.equal(1)
        expect(subscriptionPauseLoadReasonChoice.firstCall.args[0].toJS()).to.deep.equal(['r1'])
      })

      describe('when no previous reasons found', function() {
        beforeEach(function() {
          getReasonsFromStore.restore()
          getReasonsFromStore = sandbox.stub(subUtils, 'getReasonsFromStore').returns(Immutable.fromJS([]))

          subPauseActions.subscriptionPauseGoBack()(dispatch, getState)
        })

        afterEach(function() {
          getReasonsFromStore.restore()
        })

        it('should call subscriptionPauseLoadError with no-prev-step GoustoException as first arg', function() {
          const error = subscriptionPauseLoadError.firstCall.args[0]
          expect(error.message).to.equal('Subscription pause go back error: can\'t find reasons to go back to')
          expect(error.error).to.equal('no-prev-reasons')
          expect(error.level).to.equal('error')
        })

        it('should call subscriptionPauseLoadError with "SUBSCRIPTION_PAUSE_REASON_GO_BACK" as second arg', async function() {
          expect(subscriptionPauseLoadError.firstCall.args[1]).to.equal(actionTypes.SUBSCRIPTION_PAUSE_REASON_GO_BACK)
        })
      })
    })
  })

  describe('subscriptionPauseRedirect', function() {
    let sandbox
    let dispatch
    let redirect
    let clock
    let subscriptionPauseVisibilityChange

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      clock = sandbox.useFakeTimers()
      dispatch = sandbox.spy()
      redirect = sandbox.stub(redirectActions, 'redirect')
      subscriptionPauseVisibilityChange = sandbox.stub(subPauseActions, 'subscriptionPauseVisibilityChange')
    })

    afterEach(function() {
      clock.restore()
      sandbox.restore()
    })

    it('should dispatch subscriptionPauseVisibilityChange with false', async function() {
      await subPauseActions.subscriptionPauseRedirect('/sample-url')(dispatch)
      expect(subscriptionPauseVisibilityChange).to.be.calledWithExactly(false)
    })

    it('should call redirect with passed in url after 300ms', async function() {
      await subPauseActions.subscriptionPauseRedirect('/sample-url')(dispatch)

      clock.tick(300)
      expect(redirect).to.be.calledWithExactly('/sample-url')
    })
  })

  describe('subscriptionPauseReasonSubmit', function() {
    let sandbox
    let dispatch
    let getState
    let error
    let pending
    let subscriptionDeactivate
    let subscriptionPauseLoadStaticScreen
    let subscriptionPauseProceed
    let subscriptionPauseLoadError
    let getWindow
    let toggleSubscriptionPage

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      dispatch = sandbox.spy()
      toggleSubscriptionPage = sandbox.spy()
      error = sandbox.stub(statusActions, 'error')
      pending = sandbox.stub(statusActions, 'pending')
      getState = sandbox.stub().returns({
        subscriptionPause: Immutable.fromJS({
          chosenReasonIds: [],
        }),
      })
      subscriptionDeactivate = sandbox.spy(subPauseActions, 'subscriptionDeactivate')
      subscriptionPauseLoadStaticScreen = sandbox.stub(subPauseActions, 'subscriptionPauseLoadStaticScreen')
      subscriptionPauseProceed = sandbox.stub(subPauseActions, 'subscriptionPauseProceed')
      subscriptionPauseLoadError = sandbox.stub(subPauseActions, 'subscriptionPauseLoadError')
      getWindow = sandbox.stub(windowUtil, 'getWindow').returns({ toggleSubscriptionPage })
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should call statusActions pending with true for "SUBSCRIPTION_PAUSE_REASON_SUBMIT" as first call', async function() {
      await subPauseActions.subscriptionPauseReasonSubmit()(dispatch, getState)

      expect(pending.firstCall).to.be.calledWithExactly(actionTypes.SUBSCRIPTION_PAUSE_REASON_SUBMIT, true)
    })

    it('should call statusActions error with false for "SUBSCRIPTION_PAUSE_REASON_SUBMIT"', async function() {
      await subPauseActions.subscriptionPauseReasonSubmit()(dispatch, getState)

      expect(error.firstCall).to.be.calledWithExactly(actionTypes.SUBSCRIPTION_PAUSE_REASON_SUBMIT, false)
    })

    describe('when chosenReasonId not found in state', function() {
      beforeEach(async function() {
        await subPauseActions.subscriptionPauseReasonSubmit()(dispatch, getState)
      })

      it('should call subscriptionPauseReasonSubmit with data-unavailable GoustoException as first arg', function() {
        const error = subscriptionPauseLoadError.firstCall.args[0]
        expect(error.message).to.equal('Unable to submit reason: reason id not available')
        expect(error.error).to.equal('data-unavailable')
        expect(error.level).to.equal('error')
      })

      it('should call subscriptionPauseFetchReasons with "SUBSCRIPTION_PAUSE_REASON_SUBMIT" as second arg', async function() {
        expect(subscriptionPauseLoadError.firstCall.args[1]).to.equal(actionTypes.SUBSCRIPTION_PAUSE_REASON_SUBMIT)
      })
    })

    describe('when chosen reason slug is unavailable', function() {
      beforeEach(async function() {
        getState = sandbox.stub().returns({
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

      it('should call subscriptionPauseReasonSubmit with data-unavailable GoustoException as first arg', function() {
        const error = subscriptionPauseLoadError.firstCall.args[0]
        expect(error.message).to.equal('Unable to submit reason: data not available')
        expect(error.error).to.equal('data-unavailable')
        expect(error.level).to.equal('error')
      })

      it('should call subscriptionPauseFetchReasons with "SUBSCRIPTION_PAUSE_REASON_SUBMIT" as second arg', async function() {
        expect(subscriptionPauseLoadError.firstCall.args[1]).to.equal(actionTypes.SUBSCRIPTION_PAUSE_REASON_SUBMIT)
      })
    })

    describe('when data is available', function() {
      beforeEach(function() {
        getState = sandbox.stub().returns({
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

      it('should call deactivateSubscription with last chosenReasonIds\' slug from state as state_reason', async function() {
        await subPauseActions.subscriptionPauseReasonSubmit()(dispatch, getState)

        expect(subscriptionDeactivate.firstCall).to.be.calledWithExactly('chosen_reason_slug')
      })

      describe('when open user orders found in state', function() {
        beforeEach(async function() {
          await subPauseActions.subscriptionPauseReasonSubmit('7')(dispatch, getState)
        })

        it('should call subscriptionPauseLoadStaticScreen once', async function() {
          expect(subscriptionPauseLoadStaticScreen.callCount).to.equal(1)
        })

        it('should call subscriptionPauseLoadStaticScreen with "pausedPendingBoxes"', async function() {
          expect(subscriptionPauseLoadStaticScreen.args[0][0]).to.equal('pausedPendingBoxes')
        })

        it('should call toggleSubscriptionPage', async function() {
          expect(toggleSubscriptionPage).to.be.calledOnce
          expect(getWindow).to.be.calledOnce
        })
      })

      describe('when first box only order found in state user orders state', function() {
        beforeEach(async function() {
          getState = sandbox.stub().returns({
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

        it('should call subscriptionPauseProceed once with "pause" and "paused"', async function() {
          expect(subscriptionPauseProceed.callCount).to.equal(1)
          expect(subscriptionPauseProceed).to.be.calledWithExactly('pause', 'paused')
        })
      })

      describe('when NO open user orders found in state', function() {
        beforeEach(async function() {
          getState = sandbox.stub().returns({
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

        it('should call subscriptionPauseProceed once with "pause" and "paused"', async function() {
          expect(subscriptionPauseProceed.callCount).to.equal(1)
          expect(subscriptionPauseProceed).to.be.calledWithExactly('pause', 'paused')
        })
      })

      describe('on deactivate failure', function() {
        beforeEach(async function() {
          getState = sandbox.stub().returns({
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

        it('should call subscriptionPauseReasonSubmit with data-unavailable GoustoException as first arg', function() {
          const error = subscriptionPauseLoadError.firstCall.args[0]
          expect(error.message).to.equal('Unable to submit reason: error message from subscriptionDeactivate')
          expect(error.error).to.equal('deactivate-fail')
          expect(error.level).to.equal('error')
        })

        it('should call subscriptionPauseFetchReasons with "SUBSCRIPTION_PAUSE_REASON_SUBMIT" as second arg', async function() {
          expect(subscriptionPauseLoadError.firstCall.args[1]).to.equal(actionTypes.SUBSCRIPTION_PAUSE_REASON_SUBMIT)
        })
      })
    })
  })

  describe('subscriptionPauseCancelPendingOrders', function() {
    let sandbox
    let pending
    let error
    let getState
    let dispatch
    let userLoadOrders
    let cancelExistingOrders
    let subscriptionPauseProceed
    let subscriptionPauseTrack
    let subscriptionPauseLoadError

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      getState = sandbox.stub().returns({
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
      dispatch = sandbox.spy()
      pending = sandbox.spy(statusActions, 'pending')
      error = sandbox.spy(statusActions, 'error')
      userLoadOrders = sandbox.spy(userActions, 'userLoadOrders')
      cancelExistingOrders = sandbox.stub(ordersApi, 'cancelExistingOrders').returns(Promise.resolve('response from cancelExistingOrders'))
      subscriptionPauseProceed = sandbox.spy(subPauseActions, 'subscriptionPauseProceed')
      subscriptionPauseTrack = sandbox.spy(subPauseActions, 'subscriptionPauseTrack')
      subscriptionPauseLoadError = sandbox.spy(subPauseActions, 'subscriptionPauseLoadError')
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should call handle pending status', async function() {
      await subPauseActions.subscriptionPauseCancelPendingOrders()(dispatch, getState)

      expect(pending.firstCall).to.be.calledWith(actionTypes.SUBSCRIPTION_PAUSE_CANCEL_ORDERS, true)
      expect(pending.lastCall).to.be.calledWith(actionTypes.SUBSCRIPTION_PAUSE_CANCEL_ORDERS, false)
    })

    it('should call handle error status', async function() {
      await subPauseActions.subscriptionPauseCancelPendingOrders()(dispatch, getState)

      expect(error.firstCall).to.be.calledWith(actionTypes.SUBSCRIPTION_PAUSE_CANCEL_ORDERS, false)
    })

    it('should call cancelExistingOrders', async function () {
      await subPauseActions.subscriptionPauseCancelPendingOrders()(dispatch, getState)

      expect(cancelExistingOrders).to.have.been.calledOnce
    })

    it('should call userLoadOrders', async function () {
      await subPauseActions.subscriptionPauseCancelPendingOrders()(dispatch, getState)

      expect(userLoadOrders).to.have.been.calledOnce
    })

    it('should call subscriptionPauseTrack once with corrrect data', async function () {
      await subPauseActions.subscriptionPauseCancelPendingOrders()(dispatch, getState)

      expect(subscriptionPauseTrack.callCount).to.equal(1)
      expect(subscriptionPauseTrack).to.be.calledWithExactly('EXISTING_ORDERS_CANCELLED')
    })

    it('should call subscriptionPauseProceed with "pause" and "paused"', async function() {
      await subPauseActions.subscriptionPauseCancelPendingOrders()(dispatch, getState)

      expect(subscriptionPauseProceed.callCount).to.equal(1)
      expect(subscriptionPauseProceed.firstCall).to.be.calledWithExactly('pause', 'paused')
    })

    describe('when an error occurs in cancelling pending orders', function() {
      beforeEach(async function() {
        getState = sandbox.stub().returns({
          auth: Immutable.fromJS({ accessToken: 'token' }),
        })

        cancelExistingOrders.restore()
        cancelExistingOrders = sandbox.stub(ordersApi, 'cancelExistingOrders').returns(Promise.reject('response from cancelExistingOrders'))

        await subPauseActions.subscriptionPauseCancelPendingOrders()(dispatch, getState)
      })

      it('should call subscriptionPauseLoadError with cancel-pending-fail GoustoException as first arg', function() {
        const error = subscriptionPauseLoadError.firstCall.args[0]
        expect(error.message).to.equal('Subscription pause cancel pending order error: cancel pending orders failed, response from cancelExistingOrders')
        expect(error.error).to.equal('cancel-pending-fail')
        expect(error.level).to.equal('error')
      })

      it('should call subscriptionPauseLoadError with "SUBSCRIPTION_PAUSE_PROMO_APPLY" as second arg', function() {
        expect(subscriptionPauseLoadError.firstCall.args[1]).to.equal(actionTypes.SUBSCRIPTION_PAUSE_CANCEL_ORDERS)
      })
    })

    describe('when an error occurs after cancelling pending orders', function() {
      beforeEach(async function() {
        subscriptionPauseTrack.restore()
        subscriptionPauseTrack = sandbox.stub(subPauseActions, 'subscriptionPauseTrack').throws(Error('error occurred'))

        await subPauseActions.subscriptionPauseCancelPendingOrders()(dispatch, getState)
      })

      it('should call subscriptionPauseLoadError with error as first arg', function() {
        const error = subscriptionPauseLoadError.firstCall.args[0]
        expect(error.message).to.equal('error occurred')
      })

      it('should call subscriptionPauseLoadError with "SUBSCRIPTION_PAUSE_PROMO_APPLY" as second arg', function() {
        expect(subscriptionPauseLoadError.firstCall.args[1]).to.equal(actionTypes.SUBSCRIPTION_PAUSE_CANCEL_ORDERS)
      })
    })
  })

  describe('subscriptionPauseProceed', function() {
    let sandbox
    let getState
    let dispatch
    let subscriptionPauseLoadStep
    let subscriptionPauseLoadStaticScreen

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      getState = sandbox.stub().returns({
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
      dispatch = sandbox.spy()
      subscriptionPauseLoadStep = sandbox.spy(subPauseActions, 'subscriptionPauseLoadStep')
      subscriptionPauseLoadStaticScreen = sandbox.spy(subPauseActions, 'subscriptionPauseLoadStaticScreen')
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should call subscriptionPauseLoadStep with nextStepId if available, along with related screen data for tracking, by default', async function() {
      await subPauseActions.subscriptionPauseProceed()(dispatch, getState)

      expect(subscriptionPauseLoadStep).to.be.calledWithExactly('s7')
    })

    it('should call subscriptionPauseLoadStep with pauseStepId if called with "pause"', async function() {
      await subPauseActions.subscriptionPauseProceed('pause')(dispatch, getState)

      expect(subscriptionPauseLoadStep).to.be.calledWithExactly('s6')
    })

    it('should call subscriptionPauseLoadStep with cancelStepId if called with "cancel"', async function() {
      await subPauseActions.subscriptionPauseProceed('cancel')(dispatch, getState)

      expect(subscriptionPauseLoadStep).to.be.calledWithExactly('s8')
    })

    it('should call subscriptionPauseLoadStep with step flagged as initial in activeSteps if called with "initial"', async function() {
      getState = sandbox.stub().returns({
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

      expect(subscriptionPauseLoadStep).to.be.calledWithExactly('s6')
    })

    it('should call subscriptionPauseLoadStep with step flagged as initial in activeSteps if there is no activeStep set in state', async function() {
      getState = sandbox.stub().returns({
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

      expect(subscriptionPauseLoadStep).to.be.calledWithExactly('s6')
    })

    it('should call subscriptionPauseLoadStep step with first step in activeSteps if there is no activeStep set in state & no step flaged as initial regardless of stepType', async function() {
      getState = sandbox.stub().returns({
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

      expect(subscriptionPauseLoadStep).to.be.calledWithExactly('s1')
    })

    it('should call subscriptionPauseLoadStaticScreen with "error" by default if there are no activeSteps', async function() {
      getState = sandbox.stub().returns({
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

      expect(subscriptionPauseLoadStaticScreen).to.be.calledWithExactly('error')
    })

    it('should call subscriptionPauseLoadStaticScreen with provided staticScreenFallback if provided and there are no activeSteps', async function() {
      getState = sandbox.stub().returns({
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

      expect(subscriptionPauseLoadStaticScreen).to.be.calledWithExactly('some-fallback-screen')
    })
  })

  describe('subscriptionPauseLoadInitReasons', function() {
    let sandbox
    let getState
    let dispatch
    let subscriptionPauseLoadReasons
    let subscriptionPauseReset

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      dispatch = sandbox.spy()
      getState = sandbox.stub().returns({
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
      subscriptionPauseLoadReasons = sandbox.spy(subPauseActions, 'subscriptionPauseLoadReasons')
      subscriptionPauseReset = sandbox.spy(subPauseActions, 'subscriptionPauseReset')
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should call subscriptionPauseLoadInitReasons with initial reasons', function() {
      subPauseActions.subscriptionPauseLoadInitReasons()(dispatch, getState)

      expect(dispatch).to.be.calledThrice
      expect(subscriptionPauseLoadReasons).to.be.calledOnce
      expect(subscriptionPauseReset).to.be.calledOnce
      expect(Immutable.is(subscriptionPauseLoadReasons.firstCall.args[0], Immutable.fromJS([{
        id: '7',
        slug: 'narrower_time_slots',
        label: 'I would like narrower time slots',
        children: [
          { id: 'r2' },
        ],
        steps: [
          { id: 'r1', type: 'contact' },
        ],
      }]))).to.be.true
    })
  })

  describe('subscriptionPauseStartScreen', function() {
    let sandbox
    let getState
    let dispatch
    let subscriptionPauseLoadReasons
    let subscriptionPauseLoadReasonChoice
    let subscriptionPauseLoadStep

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      dispatch = sandbox.spy()
      getState = sandbox.stub().returns({
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
      subscriptionPauseLoadReasons = sandbox.spy(subPauseActions, 'subscriptionPauseLoadReasons')
      subscriptionPauseLoadReasonChoice = sandbox.spy(subPauseActions, 'subscriptionPauseLoadReasonChoice')
      subscriptionPauseLoadStep = sandbox.spy(subPauseActions, 'subscriptionPauseLoadStep')
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('should call all the appropriate subscription load function', function() {
      subPauseActions.subscriptionPauseLoadStartScreen()(dispatch, getState)

      expect(dispatch).to.be.callCount(4)
      expect(subscriptionPauseLoadReasons).to.be.calledOnce
      expect(subscriptionPauseLoadReasonChoice).to.be.calledOnce
      expect(subscriptionPauseLoadStep).to.be.calledOnce
      expect(Immutable.is(subscriptionPauseLoadReasons.firstCall.args[0], Immutable.fromJS([{
        id: '7',
        slug: 'narrower_time_slots',
        label: 'I would like narrower time slots',
        children: [
          { id: 'r2' },
        ],
        steps: [
          { id: 'r1', type: 'contact' },
        ],
      }]))).to.be.true
      expect(Immutable.is(subscriptionPauseLoadReasonChoice.firstCall.args[0], Immutable.fromJS(['7']))).to.be.true
      expect(subscriptionPauseLoadStep).to.be.calledWith('r1')
    })
  })

  describe('OSR tracking', function() {
    let sandbox
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

    beforeEach(function() {
      sandbox = sinon.sandbox.create()
      dispatch = sandbox.spy()
      getState = sandbox.stub().returns({
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

    afterEach(function() {
      sandbox.restore()
    })

    it('should dispatch PS_SUBSCRIPTION_KEPT_ACTIVE and the correct data when calling subscriptionPauseProceed with "cancel"', function() {
      subPauseActions.subscriptionPauseProceed('cancel', 'some-fallback-screen', 'recovery-type', 'promo-code')(dispatch, getState)

      expect(dispatch).to.be.calledWithExactly(keptActiveActionSample)
    })

    it('should dispatch PS_SUBSCRIPTION_KEPT_ACTIVE and the correct data when calling subscriptionPauseProceed with "next"', function() {
      subPauseActions.subscriptionPauseProceed('next', 'some-fallback-screen', 'recovery-type', 'promo-code')(dispatch, getState)

      expect(dispatch).to.be.calledWithExactly(keptActiveActionSample)
    })

    it('should dispatch PS_RECOVERY_ATTEMPT_MODAL_VIEWED and the correct data when calling subscriptionPauseProceed with "initial" and the next modal type is not "other"', function() {
      subPauseActions.subscriptionPauseProceed('initial', 'some-fallback-screen', 'recovery-type', 'promo-code')(dispatch, getState)

      expect(dispatch).to.be.calledWithExactly({
        type: actionTypes.PS_RECOVERY_ATTEMPT_MODAL_VIEWED,
        modalType: 'modal-type',
      })
    })

    it('should not dispatch PS_RECOVERY_ATTEMPT_MODAL_VIEWED when calling subscriptionPauseProceed with "initial" and the modal type is "other"', function() {
      getState = sandbox.stub().returns({
        subscriptionPause: Immutable.fromJS({
          activeStepId: 's1',
          activeSteps: {
            s1: { id: 's1', type: 'other', initial: true },
          },
        }),
      })
      subPauseActions.subscriptionPauseProceed('initial', 'some-fallback-screen', 'recovery-type', 'promo-code')(dispatch, getState)

      expect(dispatch).to.not.have.been.calledWithMatch({ type: actionTypes.PS_RECOVERY_ATTEMPT_MODAL_VIEWED })
    })

    it('should dispatch PS_END_MODAL_VIEWED when calling subscriptionPauseProceed with a stepType that leads to a step of type "recovered"', function() {
      getState = sandbox.stub().returns({
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

      expect(dispatch).to.be.calledWithExactly({ type: actionTypes.PS_END_MODAL_VIEWED })
    })

    it('should dispatch PS_END_MODAL_VIEWED when calling subscriptionPauseProceed with a stepType that leads to a step of type "recoveredPromo"', function() {
      getState = sandbox.stub().returns({
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

      expect(dispatch).to.be.calledWithExactly({ type: actionTypes.PS_END_MODAL_VIEWED })
    })

    it('should dispatch PS_END_MODAL_VIEWED when calling subscriptionPauseProceed with a stepType that leads to a step of type "recoveredSkipped"', function() {
      getState = sandbox.stub().returns({
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

      expect(dispatch).to.be.calledWithExactly({ type: actionTypes.PS_END_MODAL_VIEWED })
    })

    it('should dispatch PS_END_MODAL_VIEWED when calling subscriptionPauseProceed with a stepType that leads to a step of type "paused"', function() {
      getState = sandbox.stub().returns({
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

      expect(dispatch).to.be.calledWithExactly({ type: actionTypes.PS_END_MODAL_VIEWED })
    })

    it('should dispatch PS_REASON_CATEGORY_MODAL_VIEW when subscriptionPauseGoBack is called from an initial step', function() {
      subPauseActions.subscriptionPauseGoBack()(dispatch, getState)

      expect(dispatch).to.be.calledWithExactly({ type: actionTypes.PS_REASON_CATEGORY_MODAL_VIEWED })
    })

    it('should dispatch PS_SUBSCRIPTION_KEPT_ACTIVE with corresponding data when subscriptionPauseRedirect is called to redirect to my deliveries', async function() {
      await subPauseActions.subscriptionPauseRedirect(routesConfig.client.myDeliveries)(dispatch, getState)

      expect(dispatch).to.be.calledWithExactly(Object.assign({}, { seRecoveryType: 'change_delivery_day' }, keptActiveActionSample2))
    })

    it('should dispatch PS_SUBSCRIPTION_KEPT_ACTIVE with corresponding data when subscriptionPauseRedirect is called to redirect to contact', async function() {
      await subPauseActions.subscriptionPauseRedirect(routesConfig.client.help)(dispatch, getState)

      expect(dispatch).to.be.calledWithExactly(Object.assign({}, { seRecoveryType: 'contact_cc' }, keptActiveActionSample2))
    })

    it('should not dispatch PS_SUBSCRIPTION_KEPT_ACTIVE when subscriptionPauseRedirect is called to redirect to other places', async function() {
      await subPauseActions.subscriptionPauseRedirect(routesConfig.client.menu)(dispatch, getState)

      expect(dispatch).to.not.have.been.calledWithMatch({ type: actionTypes.PS_SUBSCRIPTION_KEPT_ACTIVE })
    })

    it('should dispatch PS_SUBSCRIPTION_PAUSED and correct data when subscriptionPauseReasonSubmit is called', async function() {
      await subPauseActions.subscriptionPauseReasonSubmit()(dispatch, getState)

      expect(dispatch).to.have.been.calledWithExactly({
        type: actionTypes.PS_SUBSCRIPTION_PAUSED,
        reason: 'reason-slug',
        modalType: 'modal-type',
      })
    })

    it('should dispatch PS_REASON_CATEGORY_SELECTED, PS_REASON_LIST_MODAL_VIEWED, and the selected category when subscriptionPauseReasonChoice is called selecting a category', async function() {
      getState = sandbox.stub().returns({
        subscriptionPause: Immutable.fromJS({
          chosenReasonIds: [],
          activeReasons: {
            r1: { slug: 'category-slug', children: [{ id: 'r2' }] },
          },
        }),
      })
      await subPauseActions.subscriptionPauseReasonChoice('r1')(dispatch, getState)

      expect(dispatch).to.have.been.calledWithExactly({
        type: actionTypes.PS_REASON_CATEGORY_SELECTED,
        selectedCategory: 'category-slug',
      })
      expect(dispatch).to.have.been.calledWithExactly({
        type: actionTypes.PS_REASON_LIST_MODAL_VIEWED,
        selectedCategory: 'category-slug',
      })
    })

    it('should dispatch PS_REASON_CATEGORY_SELECTED, PS_REASON_LIST_MODAL_VIEWED, and the selected category when subscriptionPauseReasonChoice is called selecting a category', async function() {
      getState = sandbox.stub().returns({
        subscriptionPause: Immutable.fromJS({
          chosenReasonIds: ['r1'],
          activeReasons: {
            r2: { slug: 'reason-slug', children: [] },
          },
        }),
      })
      await subPauseActions.subscriptionPauseReasonChoice('r2')(dispatch, getState)

      expect(dispatch).to.have.been.calledWithExactly({
        type: actionTypes.PS_REASON_SELECTED,
        selectedReason: 'reason-slug',
      })
    })

    it('should dispatch PS_SUBSCRIPTION_KEPT_ACTIVE and correct data when calling subscriptionPauseEnd if the subscription status is active', function() {
      getState = sandbox.stub().returns(Object.assign({
        user: Immutable.fromJS({
          subscription: { state: 'active' },
        }),
      }, getState()))
      subPauseActions.subscriptionPauseEnd()(dispatch, getState)

      expect(dispatch).to.have.been.calledWithExactly({
        type: actionTypes.PS_SUBSCRIPTION_KEPT_ACTIVE,
        categorySlug: 'category-slug',
        reasonSlug: 'reason-slug',
        modalType: 'modal-type',
        seRecoveryType: 'close_modal',
      })
    })

    it('should not dispatch PS_SUBSCRIPTION_KEPT_ACTIVE when calling subscriptionPauseEnd if the subscription status is not active', function() {
      getState = sandbox.stub().returns({
        user: Immutable.fromJS({
          subscription: { state: 'inactive' },
        }),
      })
      subPauseActions.subscriptionPauseEnd()(dispatch, getState)

      expect(dispatch).to.not.have.been.calledWithMatch({ type: actionTypes.PS_SUBSCRIPTION_KEPT_ACTIVE })
    })

    it('should dispatch PS_START_MODAL_VIEWED when calling subscriptionPauseLoadStartScreen', function() {
      getState = sandbox.stub().returns({
        subscriptionPause: Immutable.fromJS({
          startScreen: [{ id: 'ss', steps: [{ id: 's1' }] }],
        }),
      })
      subPauseActions.subscriptionPauseLoadStartScreen()(dispatch, getState)

      expect(dispatch).to.have.been.calledWithExactly({ type: actionTypes.PS_START_MODAL_VIEWED })
    })

    it('should dispatch PS_REASON_LIST_MODAL_VIEWED when calling subscriptionPauseLoadInitReasons', function() {
      subPauseActions.subscriptionPauseLoadInitReasons()(dispatch, getState)

      expect(dispatch).to.have.been.calledWithExactly({ type: actionTypes.PS_REASON_LIST_MODAL_VIEWED })
    })

    it('should fetch user data and dispatch PS_SUBSCRIPTION_PAUSE_ATTEMPT with the metaData obtained from customer service when calling subscriptionPauseStart and there is startScreen', async function() {
      getState = sandbox.stub().returns({
        subscriptionPause: Immutable.fromJS({
          metaData: { meta: 'data' },
          startScreen: [{ id: 'ss' }],
        }),
      })
      const userLoadDataSpy = sandbox.spy(userActions, 'userLoadData')
      await subPauseActions.subscriptionPauseStart()(dispatch, getState)

      expect(userLoadDataSpy).to.have.been.calledOnce
      expect(dispatch).to.have.been.calledWithExactly({
        type: actionTypes.PS_SUBSCRIPTION_PAUSE_ATTEMPT,
        metaData: Immutable.fromJS({ meta: 'data' }),
      })
    })

    it('should fetch user data and dispatch PS_SUBSCRIPTION_PAUSE_ATTEMPT with the metaData obtained from customer service and PS_REASON_CATEGORY_MODAL_VIEWED when calling subscriptionPauseStart and there is not startScreen but there are initialReasons', async function() {
      getState = sandbox.stub().returns({
        subscriptionPause: Immutable.fromJS({
          metaData: { meta: 'data' },
          startScreen: [],
          reasons: [{ id: 'r1' }],
        }),
      })
      const userLoadDataSpy = sandbox.spy(userActions, 'userLoadData')
      await subPauseActions.subscriptionPauseStart()(dispatch, getState)

      expect(userLoadDataSpy).to.have.been.calledOnce
      expect(dispatch).to.have.been.calledWithExactly({
        type: actionTypes.PS_SUBSCRIPTION_PAUSE_ATTEMPT,
        metaData: Immutable.fromJS({ meta: 'data' }),
      })
      expect(dispatch).to.have.been.calledWithExactly({ type: actionTypes.PS_REASON_CATEGORY_MODAL_VIEWED })
    })
  })
})
