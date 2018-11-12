import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-caps */

describe('userLoadData', function() {
  let dispatchSpy
  let getStateSpy
  const subscriptionData = {
    subscription: {
      state: 'inactive',
      reason: null,
      updated_at: '2017-10-27 12:37:58',
      payment_failed_at: null,
      delivery_slot_id: '1',
      next_delivery_week_id: '113',
      interval: '1',
      pause_date: null,
    },
    box: {
      num_portions: '2',
      num_recipes: '3',
      box_type: 'gourmet',
      price: '34.99',
      sku: 'SKU-GMT-3-2',
    },
    projected: [],
  }

  beforeEach(function() {
    dispatchSpy = sinon.spy()
    getStateSpy = sinon.stub().returns({
      auth: Immutable.fromJS({ accessToken: 'blah', refreshToken: 'blabla' }),
      user: Immutable.fromJS({ orders: [], newOrders: [] }),
    })
  })
  it('should return with SUBSCRIPTION_LOAD_DATA action and data', async function() {
    const fetchSubscription = sinon.stub().returns(new Promise(resolve => { resolve({ data: subscriptionData }) }))
    const actions = require('inject-loader?apis/subscription!actions/subscription')({
      'apis/subscription': { fetchSubscription },
    }).default

    await actions.subscriptionLoadData()(dispatchSpy, getStateSpy)
    expect(fetchSubscription).to.have.been.calledOnce
    expect(dispatchSpy).to.have.been.calledOnce
    expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
      type: actionTypes.SUBSCRIPTION_LOAD_DATA,
      data: subscriptionData,
    })
  })
})
