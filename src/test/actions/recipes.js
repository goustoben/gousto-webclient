import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */

describe('recipes actions', function() {

  describe('recipesLoadStockByDate', function() {
    let whenStart
    let whenCutoff
    let fetchStockStub
    let statusPendingSpy
    let statusErrorSpy
    let dispatchSpy
    let getStateSpy
    let recipeActions

    beforeEach(function() {
      whenStart = '2017-11-21 12:00:00'
      whenCutoff = '2017-11-28 11:59:59'
      fetchStockStub = sinon.stub()
      fetchStockStub.onFirstCall().returns(Promise.resolve({
        meta: { limit: 4, total: 10, count: 4, offset: 0 },
        data: ['5', '6', '15', '16'],
      }))
      fetchStockStub.onSecondCall().returns(Promise.resolve({
        meta: { limit: 4, total: 10, count: 4, offset: 4 },
        data: ['1', '2', '3', '4'],
      }))
      fetchStockStub.onThirdCall().returns(Promise.resolve({
        meta: { limit: 4, total: 10, count: 2, offset: 8 },
        data: ['21', '22'],
      }))
      statusPendingSpy = sinon.spy()
      statusErrorSpy = sinon.spy()
      dispatchSpy = sinon.spy()
      getStateSpy = sinon.stub().returns({
        recipes: Immutable.fromJS({
          1: { id: '1', title: 'Title 1' },
          3: { id: '3', title: 'Title 2' },
          7: { id: '7', title: 'Title 3' },
        }),
      })

      recipeActions = require('inject-loader?apis/recipes&./status&!actions/recipes')({
        'apis/recipes': { fetchRecipesStockByDate: fetchStockStub },
        './status': { pending: statusPendingSpy, error: statusErrorSpy },
      }).default
    })

    it('should dispatch status "pending" true for RECIPES_PERIOD_STOCK_RECEIVE action', async function() {
      await recipeActions.recipesLoadStockByDate(whenStart, whenCutoff)(dispatchSpy, getStateSpy)

      expect(statusPendingSpy.getCall(0).args[0]).to.equal(actionTypes.RECIPES_PERIOD_STOCK_RECEIVE)
      expect(statusPendingSpy.getCall(0).args[1]).to.be.true
    })

    it('should dispatch status "pending" false for RECIPES_PERIOD_STOCK_RECEIVE action', async function() {
      await recipeActions.recipesLoadStockByDate(whenStart, whenCutoff)(dispatchSpy, getStateSpy)

      expect(statusPendingSpy).to.have.been.calledTwice
      expect(statusPendingSpy.getCall(1).args[0]).to.equal(actionTypes.RECIPES_PERIOD_STOCK_RECEIVE)
      expect(statusPendingSpy.getCall(1).args[1]).to.be.false
    })

    it('should dispatch status "error" true for RECIPES_PERIOD_STOCK_RECEIVE action if an error occurs while fetching recipes', async function() {
      fetchStockStub = sinon.stub().returns(new Promise((resolve, reject) => { reject(new Error('error!')) }))
      recipeActions = require('inject-loader?apis/recipes&./status&!actions/recipes')({
        'apis/recipes': { fetchRecipesStockByDate: fetchStockStub },
        './status': { pending: statusPendingSpy, error: statusErrorSpy },
      }).default
      await recipeActions.recipesLoadStockByDate(whenStart, whenCutoff)(dispatchSpy, getStateSpy)

      expect(statusErrorSpy).to.have.been.calledOnce
      expect(statusErrorSpy.getCall(0).args[0]).to.equal(actionTypes.RECIPES_PERIOD_STOCK_RECEIVE)
      expect(statusErrorSpy.getCall(0).args[1]).to.equal('error!')
    })

    it('should fetch the stock for the specified period (using pagination) and dispatch it', async function() {
      await recipeActions.recipesLoadStockByDate(whenStart, whenCutoff)(dispatchSpy, getStateSpy)

      expect(fetchStockStub).to.have.been.calledThrice
      expect(dispatchSpy).to.have.been.calledThrice
      expect(dispatchSpy.getCall(1).args[0]).to.deep.equal({
        type: actionTypes.RECIPES_PERIOD_STOCK_RECEIVE,
        stock: ['5', '6', '15', '16', '1', '2', '3', '4', '21', '22'],
      })
    })

    it('should fetch the stock correctly when the entries are less than the default limit (page size of fetch pagination)', async function() {
      fetchStockStub = sinon.stub()
      fetchStockStub.onFirstCall().returns(Promise.resolve({
        meta: { limit: 4, total: 2, count: 2, offset: 0 },
        data: ['15', '16'],
      }))
      recipeActions = require('inject-loader?apis/recipes&./status&!actions/recipes')({
        'apis/recipes': { fetchRecipesStockByDate: fetchStockStub },
        './status': { pending: statusPendingSpy, error: statusErrorSpy },
      }).default
      await recipeActions.recipesLoadStockByDate(whenStart, whenCutoff)(dispatchSpy, getStateSpy)

      expect(fetchStockStub).to.have.been.calledOnce
      expect(dispatchSpy).to.have.been.calledThrice
      expect(dispatchSpy.getCall(1).args[0]).to.deep.equal({
        type: actionTypes.RECIPES_PERIOD_STOCK_RECEIVE,
        stock: ['15', '16'],
      })
    })
  })
})
