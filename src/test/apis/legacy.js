import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('legacy', function() {
	describe('legacyVerifyAge', function() {
		let legacy
		let endpoint
		let fetch
		let returnData

		beforeEach(function() {
			returnData = 'legacy-data'

			fetch = sinon.stub().returns(new Promise(resolve => { resolve(returnData) }))
			endpoint = sinon.stub().returns('legacy-endpoint')

			legacy = require('inject-loader!apis/legacy')({
				'utils/fetch': fetch,
				'config/endpoint': endpoint,
			}).legacyVerifyAge
		})

		it('should call the endpoint', async function() {
			await legacy()

			expect(fetch.args[0][0]).to.equal(null)
			expect(fetch.args[0][1]).to.equal('legacy-endpoint/user/public-age-verified')
		})

		it('should return the results unchanged', async function() {
			const returnVal = await legacy()

			expect(returnVal).to.equal(returnData)
		})
	})
})
