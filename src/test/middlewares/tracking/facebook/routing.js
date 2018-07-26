import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import routeConfig from 'config/routes'
import * as fbRouterTracking from 'middlewares/tracking/facebook/router'
import * as checkoutTracking from 'middlewares/tracking/facebook/checkout'

describe('facebook router data getters', function() {
	let sandbox
	let clientRouteConfig

	beforeEach(function() {
		sandbox = sinon.sandbox.create()
		clientRouteConfig = sinon.stub(routeConfig, 'client').get(function() {
			return {
				'check-out': '/configured-check-out-path',
			}
		})
	})

	afterEach(function() {
		sandbox.restore()
		clientRouteConfig.restore()
	})

	describe('getUserData', function() {
		let getAvailableUserData
		const action = {
			action: true,
		}
		const state = {
			state: true,
		}
		const prevState = {
			prevState: true,
		}

		beforeEach(function() {
			getAvailableUserData = sandbox.stub(checkoutTracking, 'getAvailableUserData').returns({
				em: 'test@email.com',
			})
		})

		afterEach(function() {
			getAvailableUserData.reset()
		})

		it('should return undefined if no pathname is provided', function() {
			const result = fbRouterTracking.getUserData()
			expect(result).to.equal(undefined)
		})

		it('should return undefined if no callback is configured for given pathname', function() {
			const result = fbRouterTracking.getUserData(action, state, prevState, '/not-configured-path')
			expect(result).to.equal(undefined)
		})

		it('should return value of getAvailableUserData if pathname is check-out /aboutyou', function() {
			const result = fbRouterTracking.getUserData(action, state, prevState, '/configured-check-out-path/aboutyou')
			expect(result).to.deep.equal({ em: 'test@email.com' })
			expect(getAvailableUserData).to.have.been.calledOnce
			expect(getAvailableUserData).to.have.been.calledWithExactly(action, state, prevState, '/configured-check-out-path/aboutyou')
		})

		it('should return value of getAvailableUserData if pathname is check-out /your-details', function() {
			const result = fbRouterTracking.getUserData(action, state, prevState, '/configured-check-out-path/aboutyou')
			expect(result).to.deep.equal({ em: 'test@email.com' })
			expect(getAvailableUserData).to.have.been.calledOnce
			expect(getAvailableUserData).to.have.been.calledWithExactly(action, state, prevState, '/configured-check-out-path/aboutyou')
		})
	})
})
