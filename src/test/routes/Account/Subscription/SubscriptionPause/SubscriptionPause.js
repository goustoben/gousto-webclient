import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'
import SubscriptionPause from 'routes/Account/Subscription/SubscriptionPause/SubscriptionPause'
import Overlay from 'Overlay'
import Immutable from 'immutable' /* eslint-disable new-cap */

describe('SubscriptionPause', function() {
  describe('rendering', function() {
    let wrapper

    beforeEach(function() {
      wrapper = shallow(<SubscriptionPause />)
    })

    it('should render a <Overlay>', function() {
      expect(wrapper.type()).to.equal(Overlay)
    })
  })

  describe('fetchData', function() {
    let store
    let getState
    let dispatch
    let subscriptionPauseFetchReasons
    let subscriptionPauseLoadReasons
    let subscriptionPauseLoadStartScreen
    let subscriptionTrackPauseAttempt
    let subscriptionTrackCategoriesViewed
    let userLoadOrders
    let SubscriptionPauseInj

    beforeEach(function() {
      dispatch = sinon.spy()
      subscriptionPauseFetchReasons = sinon.spy()
      subscriptionPauseLoadReasons = sinon.spy()
      subscriptionPauseLoadStartScreen = sinon.spy()
      subscriptionTrackPauseAttempt = sinon.spy()
      subscriptionTrackCategoriesViewed = sinon.spy()
      userLoadOrders = sinon.spy()
      store = {
        subscriptionPause: Immutable.fromJS({
          activeReasons: {},
          activeSteps: {},
          activeStepId: undefined,
          chosenReasonId: undefined,
          inProgress: false,
          reasons: [
            { id: 1 },
            { id: 2 },
          ],
          startScreen: [],
          metaData: { meta: 'data' },
        }),
        user: Immutable.fromJS({
          orders: [],
        }),
      }
      getState = sinon.stub().returns(store)
      SubscriptionPauseInj = require('inject-loader?actions/subscriptionPause&actions/user!routes/Account/Subscription/SubscriptionPause/SubscriptionPause')({
        'actions/subscriptionPause': { subscriptionPauseFetchReasons, subscriptionPauseLoadReasons, subscriptionPauseLoadStartScreen, subscriptionTrackPauseAttempt, subscriptionTrackCategoriesViewed },
        'actions/user': { userLoadOrders },
      }).default
    })

    it('should call subscriptionPauseFetchReasons in addition to subscriptionPauseLoadReasons if there are reasons to load', async function() {
      await SubscriptionPauseInj.fetchData({
        store: {
          dispatch,
          getState,
        },
      })

      expect(subscriptionPauseFetchReasons).to.have.been.calledOnce
      expect(subscriptionPauseLoadReasons).to.have.been.calledOnce
      expect(subscriptionPauseLoadStartScreen).to.have.not.been.called
      expect(userLoadOrders).to.have.been.calledOnce

      const expectedReasons = Immutable.fromJS([
        { id: 1 },
        { id: 2 },
      ])
      expect(Immutable.is(subscriptionPauseLoadReasons.getCall(0).args[0], expectedReasons)).to.be.true
    })

    it('should NOT call subscriptionPauseLoadReasons if there are no reasons to load', async function() {
      getState = sinon.stub().returns({
        subscriptionPause: Immutable.fromJS({
          activeReasons: {},
          activeSteps: {},
          activeStepId: undefined,
          chosenReasonId: undefined,
          inProgress: false,
          reasons: [],
          startScreen: [],
        }),
        user: Immutable.fromJS({
          orders: [],
        }),
      })

      await SubscriptionPauseInj.fetchData({
        store: {
          dispatch,
          getState,
        },
      })

      expect(subscriptionPauseLoadReasons).to.have.not.been.called
    })

    it('should NOT call subscriptionPauseLoadReasons if there are no reasons to load', async function() {
      getState = sinon.stub().returns({
        subscriptionPause: Immutable.fromJS({
          activeReasons: {},
          activeSteps: {},
          activeStepId: undefined,
          chosenReasonId: undefined,
          inProgress: false,
          reasons: [
            { id: 1 },
            { id: 2 },
          ],
          startScreen: [{ test: 'test' }],
        }),
        user: Immutable.fromJS({
          orders: [],
        }),
      })

      await SubscriptionPauseInj.fetchData({
        store: {
          dispatch,
          getState,
        },
      })

      expect(subscriptionPauseLoadStartScreen).to.have.been.calledOnce
    })

    it('should call subscriptionTrackPauseAttempt with customer service metadata', async function() {
      await SubscriptionPauseInj.fetchData({
        store: {
          dispatch,
          getState,
        },
      })

      expect(subscriptionTrackPauseAttempt).to.have.been.calledOnce
      expect(subscriptionTrackPauseAttempt).to.have.been.calledWithExactly(Immutable.fromJS({ meta: 'data' }))
    })

    it('should call subscriptionTrackCategoriesViewed when no startScreen and there are reasons', async function() {
      await SubscriptionPauseInj.fetchData({
        store: {
          dispatch,
          getState,
        },
      })

      expect(subscriptionTrackCategoriesViewed).to.have.been.calledOnce
    })
  })
})
