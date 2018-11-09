import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('promos', function() {
  describe('fetchPromo', function() {
    let fetchPromo
    let endpoint
    let fetch
    let returnData

    beforeEach(function() {
      returnData = 'promo-data'

      fetch = sinon.stub().returns(new Promise(resolve => { resolve(returnData) }))
      endpoint = sinon.stub().returns('promo-endpoint')

      fetchPromo = require('inject-loader!apis/promos')({
        'utils/fetch': fetch,
        'config/endpoint': endpoint,
      }).fetchPromo
    })

    it('should call the endpoint with right path', async function() {
      await fetchPromo('token', 'code-1')

      expect(fetch.args[0][0]).to.equal('token')
      expect(fetch.args[0][1]).to.equal('promo-endpoint/promocode/code-1')
    })

    it('should return the results unchanged', async function() {
      const returnVal = await fetchPromo('token', 'code-1')

      expect(returnVal).to.equal(returnData)
    })
  })

  describe('fetchPromocodeFromCampaignUrl', function() {
    let fetchPromocodeFromCampaignUrl
    let endpoint
    let fetch
    let returnData

    beforeEach(function() {
      returnData = 'promo-data'

      fetch = sinon.stub().returns(new Promise(resolve => { resolve(returnData) }))
      endpoint = sinon.stub().returns('promo-endpoint')

      fetchPromocodeFromCampaignUrl = require('inject-loader!apis/promos')({
        'utils/fetch': fetch,
        'config/endpoint': endpoint,
      }).fetchPromocodeFromCampaignUrl
    })

    it('should call the endpoint with right path', async function() {
      await fetchPromocodeFromCampaignUrl('token', 'campaign-1')

      expect(fetch.args[0][0]).to.equal('token')
      expect(fetch.args[0][1]).to.equal('promo-endpoint/campaign/campaign-1/promocode')
    })

    it('should return the results unchanged', async function() {
      const returnVal = await fetchPromocodeFromCampaignUrl('token', 'campaign-1')

      expect(returnVal).to.equal(returnData)
    })
  })
})
