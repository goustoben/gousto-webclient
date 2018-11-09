import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('processQuery', function() {
  let processQuery
  let query
  let dispatch
  let store
  let promoApply
  let promoChange
  let promoToggleModalVisibility
  let setAffiliateSource

  beforeEach(function() {
    promoApply = sinon.stub().returns('return from promoApply')
    promoChange = sinon.stub().returns('return from promoChange')
    promoToggleModalVisibility = sinon.stub().returns('return from promoToggleModalVisibility')
    setAffiliateSource = sinon.stub().returns('return from setAffiliateSource')
    dispatch = sinon.spy()
    store = { dispatch }

    processQuery = require('inject-loader?actions/promos&actions/tracking!utils/processQuery')({
      'actions/promos': {
        promoApply,
        promoChange,
        promoToggleModalVisibility,
      },
      'actions/tracking': { setAffiliateSource },
    }).default
  })

  describe('when promo_code is set in given query', function() {
    beforeEach(function() {
      query = {
        promo_code: 'abc123',
      }
    })

    it('should dispatch a promoChange action with promo code in uppercase', async function() {
      await processQuery(query, store)

      expect(promoChange).to.have.callCount(1)
      expect(promoChange.getCall(0).args[0]).to.equal('ABC123')
      expect(dispatch.getCall(0).args[0]).to.equal('return from promoChange')
    })

    describe('when promoChange call is succesful', function() {
      it('should dispatch a promoToggleModalVisibility action with true', async function() {
        await processQuery(query, store)

        expect(promoToggleModalVisibility).to.have.callCount(1)
        expect(promoToggleModalVisibility.getCall(0).args[0]).to.equal(true)
        expect(dispatch.getCall(1).args[0]).to.equal('return from promoToggleModalVisibility')
      })
    })

    describe('when promoChange call fails', function() {
      let loggerWarning

      beforeEach(function() {
        loggerWarning = sinon.spy()
        promoChange = sinon.stub().throws({ message: 'error from promoChange' })
        processQuery = require('inject-loader?actions/promos&action/testing&utils/logger!utils/processQuery')({
          'actions/promos': {
            promoChange,
            promoToggleModalVisibility,
          },
          'actions/testing': { setAffiliateSource },
          'utils/logger': { warning: loggerWarning },
        }).default
      })

      it('should call logger warning with error and NOT dispatch a promoToggleModalVisibility action', async function() {
        await processQuery(query, store)

        expect(promoToggleModalVisibility).to.have.callCount(0)
        expect(loggerWarning).to.have.callCount(1)
        expect(loggerWarning.getCall(0).args[0]).to.equal('error fetching promo code ABC123 - error from promoChange')
      })
    })
  })

  describe('when querystring contains noPromoModal set to true', function() {
    beforeEach(function() {
      query = {
        noPromoModal: 'true',
        promo_code: 'abc123',
      }
    })

    it('should not dispatch a promoToggleModalVisibility action', async function() {
      await processQuery(query, store)

      expect(promoToggleModalVisibility).to.have.callCount(0)
    })

    it('should dispatch a promoApply action automatically', async function() {
      await processQuery(query, store)

      expect(promoApply).to.have.callCount(1)
    })
  })

  describe('when querystring does not contain noPromoModal', function() {
    beforeEach(function() {
      query = {
        promo_code: 'abc123',
      }
    })

    it('should dispatch a promoToggleModalVisibility action', async function() {
      await processQuery(query, store)

      expect(promoToggleModalVisibility).to.have.callCount(1)
    })

    it('should not dispatch a promoApply action automatically', async function() {
      await processQuery(query, store)

      expect(promoApply).to.have.callCount(0)
    })
  })

  describe('when asource is set in given query', function() {
    beforeEach(function() {
      query = {
        asource: 'abc123',
      }
    })

    it('should dispatch a setAffiliateSource action with asource', async function() {
      await processQuery(query, store)

      expect(setAffiliateSource).to.have.callCount(1)
      expect(setAffiliateSource.getCall(0).args[0]).to.equal('abc123')
      expect(dispatch.getCall(0).args[0]).to.equal('return from setAffiliateSource')
    })
  })
})
