import { expect } from 'chai'
import Immutable from 'immutable'

import actionTypes from 'actions/actionTypes'

import pricingReducer from 'reducers/pricing'

describe('pricing reducer', function() {
  let state = Immutable.Map({})
  const pricing = pricingReducer.pricing

  it('should handle initial state', function() {
    expect(pricing(undefined, {})).to.be.an.instanceOf(Immutable.Map)
    expect(pricing(undefined, {}).get('pending')).to.not.be.undefined
    expect(pricing(undefined, {}).get('prices')).to.not.be.undefined
    expect(pricing(undefined, {}).get('error')).to.not.be.undefined
  })

  describe('PRICING_PENDING action type', function() {
    it('should set the pricing pending to true', function() {
      const action = { type: actionTypes.PRICING_PENDING }

      expect(pricing(state, action).get('pending')).to.be.true
    })
  })

  describe('PRICING_SUCCESS action type', function() {
    const pricesReturn = { total: '44.44' }
    const action = {
      type: actionTypes.PRICING_SUCCESS,
      prices: pricesReturn,
    }

    it('should set the pricing pending to false', function() {
      expect(pricing(state, action).get('pending')).to.be.false
    })

    it('should set the pricing prices to the action\'s prices', function() {
      expect(pricing(state, action).get('prices').toJS()).to.deep.equal(pricesReturn)
    })

    it('should set the pricing error state to empty', function() {
      expect(pricing(state, action).get('error')).to.equal(Immutable.Map({}))
    })
  })

  describe('PRICING_FAILURE action type', function() {
    const message = 'Something went wrong!'
    const action = {
      type: actionTypes.PRICING_FAILURE,
      message,
    }

    it('should set the pricing pending to false', function() {
      expect(pricing(state, action).get('pending')).to.be.false
    })

    it('should set the pricing error message to the action\'s message', function() {
      expect(pricing(state, action).get('error').toJS()).to.include({ message })
    })
  })

  describe('PRICING_RESET action type', function() {
    it('should set prices to empty', function() {
      const action = { type: actionTypes.PRICING_RESET }

      expect(pricing(state, action).get('prices')).to.equal(Immutable.Map({}))
    })
  })
})
