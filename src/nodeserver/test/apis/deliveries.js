import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('deliveries', function() {
	describe('fetchDeliveryDays', function() {
		let deliveries
		let fetchSpy
		let clock

		beforeEach(function() {
			clock = sinon.useFakeTimers(new Date(2016, 5, 24).getTime())
			const deliveryDays = [
				{ id: 'day1', date: '2016-06-26', slots: [{ whenCutoff: '2016-07-01' }, { whenCutoff: '2016-07-05' }] },
				{ id: 'day2', date: '2016-06-30', slots: [{ whenCutoff: '2016-07-03' }, { whenCutoff: '2016-07-08' }] },
			]

			fetchSpy = sinon.stub().returns(new Promise(resolve => { resolve({ data: deliveryDays }) }))

			deliveries = require('inject-loader?utils/fetch!apis/deliveries')({
				'utils/fetch': fetchSpy,
			}).fetchDeliveryDays
		})

		afterEach(function() {
			clock.restore()
		})

		it('should call the endpoint with first half of the postcode', async function() {
			await deliveries('token', { start: '2016-09-08', end: '2016-09-20', postcode: 'W3 7UN' })
			expect(fetchSpy.args[0][0]).to.equal('token')
			expect(fetchSpy.args[0][2]).to.deep.equal({ start: '2016-09-08', end: '2016-09-20', postcode: 'w3' })

			await deliveries('token', { start: '2016-09-08', end: '2016-09-20', postcode: 'W13 7UN' })
			expect(fetchSpy.args[1][0]).to.equal('token')
			expect(fetchSpy.args[1][2]).to.deep.equal({ start: '2016-09-08', end: '2016-09-20', postcode: 'w13' })

			await deliveries('token', { start: '2016-09-08', end: '2016-09-20', postcode: 'W37UN' })
			expect(fetchSpy.args[2][0]).to.equal('token')
			expect(fetchSpy.args[2][2]).to.deep.equal({ start: '2016-09-08', end: '2016-09-20', postcode: 'w3' })

			await deliveries('token', { start: '2016-09-08', end: '2016-09-20', postcode: 'W137UN' })
			expect(fetchSpy.args[3][0]).to.equal('token')
			expect(fetchSpy.args[3][2]).to.deep.equal({ start: '2016-09-08', end: '2016-09-20', postcode: 'w13' })
		})

		it('should return the results unchanged', async function() {
			const data = await deliveries('token', { postcode: 'W3 7UN' })

			expect(data).to.deep.equal({
				data: [
					{ id: 'day1', date: '2016-06-26', slots: [{ whenCutoff: '2016-07-01' }, { whenCutoff: '2016-07-05' }] },
					{ id: 'day2', date: '2016-06-30', slots: [{ whenCutoff: '2016-07-03' }, { whenCutoff: '2016-07-08' }] },
				],
			})
		})
	})
})
