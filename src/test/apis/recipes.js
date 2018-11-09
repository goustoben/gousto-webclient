import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('recipes', function() {
  describe('fetchRecipeStock', function() {
    let fetchSpy

    function fetchRecipeStock(stock) {
      fetchSpy = sinon.stub().returns(new Promise(resolve => { resolve({ data: stock }) }))

      const fetchRecipeStockInjected = require('inject-loader?utils/fetch!apis/recipes')({
        'utils/fetch': fetchSpy,
      }).fetchRecipeStock

      return fetchRecipeStockInjected('token', 'core-day-id')
    }

    it('should call the endpoint with core day id', async function() {
      await fetchRecipeStock({})
      expect(fetchSpy.args[0][0].includes('token')).to.be.true
      expect(fetchSpy.args[0][1].includes('core-day-id/stock')).to.be.true
    })

    it('should return the results unchanged', async function() {
      const data = await fetchRecipeStock([{ recipeId: 123, number: 12, familyNumber: 14, committed: '1' }, { recipeId: 456, number: 22, familyNumber: 24, committed: '0' }])

      expect(data).to.deep.equal({
        data: [
          {
            recipeId: 123,
            number: 12,
            familyNumber: 14,
            committed: '1',
          },
          {
            recipeId: 456,
            number: 22,
            familyNumber: 24,
            committed: '0',
          },
        ],
      })
    })
  })

  describe('fetchRecipesStockByPeriod', function() {
    let fetchSpy
    let periodId
    let fetchRecipesStockByPeriodInjected

    beforeEach(function() {
      periodId = 50
      fetchSpy = sinon.stub().returns(new Promise(resolve => { resolve({ data: ['5', '7', '15', '17'] }) }))
      fetchRecipesStockByPeriodInjected = require('inject-loader?utils/fetch!apis/recipes')({
        'utils/fetch': fetchSpy,
      }).fetchRecipesStockByPeriod
    })

    it('should call the endpoint with period id', async function() {
      await fetchRecipesStockByPeriodInjected(periodId)
      expect(fetchSpy.args[0][0]).to.be.null
      expect(fetchSpy.args[0][1].includes('stock/recipe')).to.be.true
      expect(fetchSpy.args[0][2]).to.deep.equal({ period_id: 50 })
    })

    it('should return the results unchanged', async function() {
      const result = await fetchRecipesStockByPeriodInjected(periodId)

      expect(result).to.deep.equal({ data: ['5', '7', '15', '17'] })
    })
  })

  describe('fetchAvailableDates', function() {
    let fetch
    let fetchAvailableDates

    beforeEach(function() {
      fetch = sinon.stub().returns(new Promise(resolve => { resolve({ data: [1, 2, 3] }) }))

      fetchAvailableDates = require('inject-loader?config/endpoint&utils/fetch!apis/recipes')({
        'utils/fetch': fetch,
        'config/endpoint': sinon.stub().returns('gousto-endpoint'),
      }).fetchAvailableDates
    })

    it('should fetch the correct URL', async function() {
      await fetchAvailableDates('token')
      expect(fetch).to.have.been.calledOnce
      expect(fetch.args[0][0]).to.equal('token')
      expect(fetch.args[0][1].includes('gousto-endpoint/dates/available')).to.be.true
    })

    it('should return the results unchanged', async function() {
      const data = await fetchAvailableDates('token')

      expect(data).to.deep.equal({
        data: [1, 2, 3],
      })
    })
  })
})
