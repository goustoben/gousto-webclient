import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('subscription', function() {
	let fetchSpy
	let deactivateSubscriptionMocked
	let fetchSubscriptionMocked
	let accessToken

	beforeEach(function() {
		accessToken = 'token'
		fetchSpy = sinon.stub().returns(new Promise(resolve => { resolve() }))

		deactivateSubscriptionMocked = require('inject-loader?config/endpoint&utils/fetch!apis/subscription')({
			'utils/fetch': fetchSpy,
			'config/endpoint': sinon.stub().returns('gousto-endpoint'),
		}).deactivateSubscription

		fetchSubscriptionMocked = require('inject-loader?config/endpoint&utils/fetch!apis/subscription')({
			'utils/fetch': fetchSpy,
			'config/endpoint': sinon.stub().returns('gousto-endpoint'),
		}).fetchSubscription
	})

	it('deactivateSubscription should call the correct URL', async function() {
		await deactivateSubscriptionMocked(accessToken, {})

		expect(fetchSpy.args[0][0]).to.equal('token')
		expect(fetchSpy.args[0][1]).to.equal('gousto-endpoint/user/current/subscription/deactivate')
	})

	it('fetchSubscription should call the correct URL', async function() {
		await fetchSubscriptionMocked(accessToken, {})

		expect(fetchSpy.args[0][0]).to.equal('token')
		expect(fetchSpy.args[0][1]).to.equal('gousto-endpoint/user/current/subscription')
	})
})
