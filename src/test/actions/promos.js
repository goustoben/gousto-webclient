import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */

describe('promos actions', function() {
  let promos
  let fetchPromocodeFromCampaignUrl
  let fetchPromo
  let pending
  let error
  let legacyVerifyAge
  let userLoadData
  let userVerifyAge
  let userPromoApplyCode
  let basketPromoCodeChange
  let productsLoadProductsById

  let dispatch
  let getState

  function setUp(override = {}) {
    fetchPromo = override.fetchPromo || sinon.stub().returns(new Promise((resolve) => { resolve({}) }))
    fetchPromocodeFromCampaignUrl = override.fetchPromocodeFromCampaignUrl || sinon.stub().returns(new Promise((resolve) => { resolve({}) }))
    legacyVerifyAge = override.legacyVerifyAge || sinon.stub().returns(new Promise((resolve) => { resolve({}) }))
    pending = override.pending || sinon.stub().returns(new Promise((resolve) => { resolve() }))
    error = override.error || sinon.stub().returns(new Promise((resolve) => { resolve() }))
    userLoadData = override.userLoadData || sinon.stub().returns(new Promise((resolve) => { resolve({}) }))
    userVerifyAge = override.userVerifyAge || sinon.stub().returns(new Promise((resolve) => { resolve({}) }))
    userPromoApplyCode = override.userPromoApplyCode || sinon.stub().returns(new Promise((resolve) => { resolve({}) }))
    basketPromoCodeChange = override.basketPromoCodeChange || sinon.stub().returns(new Promise((resolve) => { resolve({}) }))
    productsLoadProductsById = override.productsLoadProductsById || sinon.stub().returns(new Promise((resolve) => { resolve({}) }))

    promos = require('inject-loader!actions/promos')({
      'apis/promos': {
        fetchPromo,
        fetchPromocodeFromCampaignUrl,
      },
      'apis/legacy': {
        legacyVerifyAge,
      },
      './status': {
        pending,
        error,
      },
      './user': {
        userLoadData,
        userVerifyAge,
        userPromoApplyCode,
      },
      './basket': {
        basketPromoCodeChange,
      },
      './products': {
        productsLoadProductsById,
      },
    }).default
  }

  beforeEach(function() {
    setUp()

    dispatch = sinon.stub().returnsArg(0)
    getState = sinon.stub().returns({
      auth: Immutable.Map({}),
    })
  })

  describe('promoChange', function() {

    describe('when the promo doesnt exist in the store already', function() {

      describe('when getting the promo doesnt error', function() {
        beforeEach(function() {
          getState = sinon.stub().returns({
            promoStore: Immutable.fromJS({}),
            error: Immutable.fromJS({}),
          })
        })

        it('should dispatch a PROMO_SET with the promo code', async function() {
          await promos.promoChange('freefood')(dispatch, getState)
          expect(dispatch).to.have.been.calledTwice
          expect(dispatch.getCall(1).args[0]).to.deep.equal({
            type: 'PROMO_SET',
            code: 'freefood',
          })
        })

      })
      describe('when getting the promo errors', function() {
        beforeEach(function() {
          getState = sinon.stub().returns({
            promoStore: Immutable.fromJS({}),
            error: Immutable.fromJS({
              PROMO_GET: 'errored',
            }),
          })
        })
        it('should not dispatch a PROMO_SET with the promo code', async function() {
          await promos.promoChange('freefood')(dispatch, getState)
          expect(dispatch).to.have.been.calledOnce
        })
      })
    })

    describe('when the promo exists in the store', function() {
      beforeEach(function() {
        getState = sinon.stub().returns({
          error: Immutable.fromJS({}),
          promoStore: Immutable.fromJS({
            freefood: 'exists',
          }),
        })
      })
      it('should just dispatch a PROMO_SET with the promo code', async function() {
        await promos.promoChange('freefood')(dispatch, getState)
        expect(dispatch).to.have.been.calledOnce
        expect(dispatch.getCall(0).args[0]).to.deep.equal({
          type: 'PROMO_SET',
          code: 'freefood',
        })
      })
    })
  })

  describe('promoApply', function() {
    it('NOT age verified and NOT logged in', function () {
      getState = sinon.stub().returns({
        pending: Immutable.fromJS({}),
        error: Immutable.fromJS({}),
        promoStore: Immutable.fromJS({
          freefood: 'exists',
        }),
        promoCurrent: 'freefood',
        promoAgeVerified: false,
        auth: Immutable.fromJS({ isAuthenticated: false }),
      })

      promos.promoApply()(dispatch, getState)

      expect(pending).to.have.been.calledOnce
      expect(basketPromoCodeChange).to.have.been.calledOnce

      // rest is tested below
    })

    it('NOT age verified and logged in', function () {
      getState = sinon.stub().returns({
        pending: Immutable.fromJS({}),
        error: Immutable.fromJS({}),
        promoStore: Immutable.fromJS({
          freefood: 'exists',
        }),
        promoCurrent: 'freefood',
        promoAgeVerified: false,
        auth: Immutable.fromJS({ isAuthenticated: true }),
      })

      promos.promoApply()(dispatch, getState)

      expect(userPromoApplyCode).to.have.been.calledOnce
      expect(userPromoApplyCode.getCall(0).args[0]).to.equal('freefood')

      // rest is tested below
    })

    it('age verified and NOT logged in - product needs age verification', function () {
      getState = sinon.stub().returns({
        pending: Immutable.fromJS({}),
        error: Immutable.fromJS({}),
        promoStore: Immutable.fromJS({
          freefood: { hasAgeRestricted: true },
        }),
        promoCurrent: 'freefood',
        promoAgeVerified: true,
        auth: Immutable.fromJS({ isAuthenticated: false }),
      })

      promos.promoApply()(dispatch, getState)

      expect(legacyVerifyAge).to.have.been.calledOnce
      expect(basketPromoCodeChange).to.have.been.calledOnce

      // rest is tested below
    })

    it('age verified and logged in', function () {
      getState = sinon.stub().returns({
        pending: Immutable.fromJS({}),
        error: Immutable.fromJS({}),
        promoStore: Immutable.fromJS({
          freefood: { hasAgeRestricted: true },
        }),
        promoCurrent: 'freefood',
        promoAgeVerified: true,
        auth: Immutable.fromJS({ isAuthenticated: true }),
      })

      promos.promoApply()(dispatch, getState)

      expect(userVerifyAge).to.have.been.calledOnce
      expect(userVerifyAge.getCall(0).args).to.deep.equal([true, true])

      // rest is tested below
    })
  })

  describe('promoCloseModal', function() {
    it('should dispatch a PROMO_MODAL_VISIBILITY_CHANGE action with false, then PROMO_SET, error PROMO_GET, error PROMO_APPLY with empty strings after 750ms', function(){
      const clock = sinon.useFakeTimers()
      promos.promoCloseModal()(dispatch)
      expect(dispatch).to.have.been.calledOnce
      clock.tick(750)
      expect(dispatch.callCount).to.equal(4)

      expect(dispatch.getCall(0).args[0]).to.deep.equal({
        type: 'PROMO_MODAL_VISIBILITY_CHANGE',
        visible: false,
      })

      expect(dispatch.getCall(1).args[0]).to.deep.equal({
        type: 'PROMO_SET',
        code: '',
      })

      expect(error).to.have.been.calledTwice

      expect(error.getCall(0).args).to.deep.equal([
        'PROMO_APPLY',
        '',
      ])

      expect(error.getCall(1).args).to.deep.equal([
        'PROMO_GET',
        '',
      ])

      clock.restore()
    })
  })

  describe('promoToggleModalVisibility', function() {
    it('should return a PROMO_MODAL_VISIBILITY_CHANGE action with the argument mapped through to the visible property', function(){
      expect(promos.promoToggleModalVisibility('yep')).to.deep.equal({
        type: 'PROMO_MODAL_VISIBILITY_CHANGE',
        visible: 'yep',
      })
    })
  })

  describe('promoAgeVerify', function() {
    it('should return a PROMO_AGE_VERIFY action with the argument mapped through to the ageVerified property', function(){
      expect(promos.promoAgeVerify('yep')).to.deep.equal({
        type: 'PROMO_AGE_VERIFY',
        ageVerified: 'yep',
      })
    })
  })

  describe('promoGetFromLandingPage', function() {
    beforeEach(function() {
      getState = sinon.stub().returns({
        promoStore: Immutable.fromJS({}),
        error: Immutable.fromJS({}),
      })
      fetchPromocodeFromCampaignUrl = sinon.stub().returns(new Promise((resolve) => { resolve({
        data: { promocode: 'fbb1' },
      }) }))
      promos = require('inject-loader!actions/promos')({
        'apis/promos': {
          fetchPromo,
          fetchPromocodeFromCampaignUrl,
        },
        'apis/legacy': {
          legacyVerifyAge,
        },
        './status': {
          pending,
          error,
        },
        './user': {
          userLoadData,
          userVerifyAge,
          userPromoApplyCode,
        },
        './basket': {
          basketPromoCodeChange,
        },
        './products': {
          productsLoadProductsById,
        },
      }).default
    })
    it('should call fetchPromocodeFromCampaignUrl with the first argument', async function() {
      await promos.promoGetFromLandingPage('freestuff')(dispatch, getState)
      expect(fetchPromocodeFromCampaignUrl).to.have.been.calledOnce
      expect(fetchPromocodeFromCampaignUrl.getCall(0).args).to.deep.equal([
        null,
        'freestuff',
      ])
    })
    it('should call dispatch twice if a promo code is fetched successfully', async function() {
      await promos.promoGetFromLandingPage('freestuff')(dispatch, getState)
      expect(dispatch).to.have.been.calledTwice
    })
    describe('if fetchPromocodeFromCampaignUrl throws an error', function() {
      beforeEach(function() {
        fetchPromocodeFromCampaignUrl = sinon.stub().returns(new Promise((resolve, reject) => { reject({ message: 'errored badly' }) }))
        promos = require('inject-loader!actions/promos')({
          'apis/promos': {
            fetchPromo,
            fetchPromocodeFromCampaignUrl,
          },
          'apis/legacy': {
            legacyVerifyAge,
          },
          './status': {
            pending,
            error,
          },
          './user': {
            userLoadData,
            userVerifyAge,
            userPromoApplyCode,
          },
          './basket': {
            basketPromoCodeChange,
          },
          './products': {
            productsLoadProductsById,
          },
        }).default
      })
      it('should set a PROMO_GET error if fetchPromocodeFromCampaignUrl throws an error', async function() {
        await promos.promoGetFromLandingPage('freestuff')(dispatch, getState)
        expect(error).to.have.been.calledOnce
        expect(error.getCall(0).args).to.deep.equal([
          'PROMO_GET',
          'errored badly',
        ])
        expect(dispatch).to.have.been.calledOnce
      })
    })
  })

  describe('promoGet', function() {
    let promoResponse

    describe('not logged in, valid promo, no gift', function () {
      beforeEach(function () {
        promoResponse = {
          code: 'fbb1',
          codeData: {
            code: 'fbb1',
            campaign: {
              enabled: true,
              isForExisting: false,
            },
          },
        }

        fetchPromo = sinon.stub().returns(new Promise((resolve) => {
          resolve({ data: promoResponse })
        }))

        setUp({
          fetchPromo,
        })
      })

      it('should dispatch PROMO_RECIEVE action type', async function () {
        getState = sinon.stub().returns({
          promoStore: Immutable.fromJS({}),
          error: Immutable.fromJS({}),
          auth: Immutable.fromJS({ isAuthenticated: false }),
        })

        await promos.promoGet()(dispatch, getState)

        expect(dispatch).to.have.been.calledWithExactly({
          type: actionTypes.PROMO_RECIEVE,
          promo: promoResponse,
        })
      })
    })

    describe('logged in, valid promo - for existing, no gift', function () {
      beforeEach(function () {
        promoResponse = {
          code: 'fbb1',
          codeData: {
            code: 'fbb1',
            campaign: {
              enabled: true,
              isForExisting: true,
            },
          },
        }

        fetchPromo = sinon.stub().returns(new Promise((resolve) => {
          resolve({ data: promoResponse })
        }))

        setUp({
          fetchPromo,
        })
      })

      it('should dispatch PROMO_RECIEVE action type', async function () {
        getState = sinon.stub().returns({
          promoStore: Immutable.fromJS({}),
          error: Immutable.fromJS({}),
          auth: Immutable.fromJS({ isAuthenticated: true }),
        })

        await promos.promoGet()(dispatch, getState)

        expect(dispatch).to.have.been.calledWithExactly({
          type: actionTypes.PROMO_RECIEVE,
          promo: promoResponse,
        })
      })
    })

    describe('NOT logged in, NOT valid promo, no gift', function () {
      beforeEach(function () {
        promoResponse = {
          code: 'fbb1',
          codeData: {
            code: 'fbb1',
            campaign: {
              enabled: false,
              isForExisting: false,
            },
          },
        }

        fetchPromo = sinon.stub().returns(new Promise((resolve) => {
          resolve({ data: promoResponse })
        }))

        setUp({
          fetchPromo,
        })
      })

      it('should dispatch PROMO_RECIEVE action type', async function () {
        getState = sinon.stub().returns({
          promoStore: Immutable.fromJS({}),
          error: Immutable.fromJS({}),
          auth: Immutable.fromJS({ isAuthenticated: false }),
        })

        await promos.promoGet()(dispatch, getState)

        expect(error).to.have.been.calledWithExactly(actionTypes.PROMO_GET, 'not-exist')
        expect(dispatch.neverCalledWith({
          type: actionTypes.PROMO_RECIEVE,
          promo: promoResponse,
        })).to.be.ok
      })
    })

    describe('NOT logged in, valid promo, 2 gifts - one age restricted', function () {
      beforeEach(function () {
        promoResponse = {
          code: 'fbb1',
          codeData: {
            code: 'fbb1',
            campaign: {
              enabled: true,
              isForExisting: false,
            },
          },
          addGiftOrderRules: [
            {
              type: 'Product',
              id: 'prod-1',
            },
            {
              type: 'Product',
              id: 'prod-2',
            },
          ],
        }

        fetchPromo = sinon.stub().returns(new Promise((resolve) => {
          resolve({ data: promoResponse })
        }))

        setUp({
          fetchPromo,
        })
      })

      it('should dispatch PROMO_RECIEVE action type', async function () {
        getState = sinon.stub().returns({
          promoStore: Immutable.fromJS({}),
          error: Immutable.fromJS({}),
          auth: Immutable.fromJS({ isAuthenticated: false }),
          user: Immutable.fromJS({ id: 'user' }),
          products: Immutable.fromJS({
            'prod-1': {
              id: 'prod-1',
              ageRestricted: false,
            },
            'prod-2': {
              id: 'prod-2',
              ageRestricted: true,
            },
          }),
        })

        await promos.promoGet()(dispatch, getState)

        expect(productsLoadProductsById).to.have.been.calledWithExactly(['prod-1', 'prod-2'])
        // expect(userLoadData).to.have.been.calledOnce
        expect(dispatch).to.have.been.calledWithExactly({
          type: actionTypes.PROMO_RECIEVE,
          promo: promoResponse,
        })
        expect(error).to.have.been.calledOnce
      })
    })
  })
})
