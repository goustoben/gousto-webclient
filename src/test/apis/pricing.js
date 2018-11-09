import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

describe('subscription', function () {
  let fetch
  let fetchPricing
  let accessToken
  let recipeIds
  let returnData
  let requestData
  beforeEach(function () {
    accessToken = 'token'
    recipeIds = [1, 2, 3, 4]
    returnData = 'return-data'
    requestData = {
      items: [1, 2, 3, 4],
      promo_code: '12345',
      delivery_slot_id: 1,
      delivery_date: '12-12-2020',
    }
    fetch = sinon.stub().returns(new Promise(resolve => { resolve(returnData) }))

    fetchPricing = require('inject-loader?config/endpoint&utils/fetch!apis/pricing')({
      'utils/fetch': fetch,
      'config/endpoint': sinon.stub().returns('gousto-endpoint'),
    }).default
  })

  it('pricing should call the correct URL, method and request data', async function () {

    await fetchPricing(accessToken, recipeIds, requestData.delivery_date, requestData.delivery_slot_id, requestData.promo_code)

    expect(fetch.args[0][0]).to.equal('token')
    expect(fetch.args[0][1]).to.equal('gousto-endpoint/prices')
    expect(fetch.args[0][2]).to.deep.equal(requestData)
    expect(fetch.args[0][3]).to.equal('GET')
  })

  it('should return the results unchanged', async function () {
    const returnVal = await fetchPricing('token', 'campaign-1')
    expect(returnVal).to.equal(returnData)
  })
})
