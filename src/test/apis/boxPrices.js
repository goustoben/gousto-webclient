import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('boxPrices', function() {
	describe('fetchBoxPrices', function() {
		let boxPrices
		let fetch

		beforeEach(function() {
			const prices = {
				2: '1.99',
				4: '2.99',
			}

			fetch = sinon.stub().returns(new Promise(resolve => { resolve(prices) }))

			boxPrices = require('inject-loader?utils/fetch!apis/boxPrices')({
				'utils/fetch': fetch,
			}).fetchBoxPrices
		})

		it('should call the endpoint with passed arguments', async function() {
			await boxPrices('token', { promocode: 'hello', tariff: '4' })

			expect(fetch.args[0][0]).to.equal('token')
			expect(fetch.args[0][2]).to.deep.equal({ promocode: 'hello', tariff: '4' })
		})

		it('should return the results unchanged', async function() {
			const returnVal = await boxPrices('token', { promocode: 'hello', tariff: '4' })

			expect(returnVal).to.deep.equal({ 2: '1.99', 4: '2.99' })
		})
	})
})
