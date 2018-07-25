import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Immutable from 'immutable' /* eslint-disable new-cap */
import CONFIG from '@fe/gousto-config'
import actionUtils from 'products/actions/actionUtils'
import Actions from 'products/actions/index'

describe('products/actions/index', () => {
	let dispatchSpy
	let getStateSpy
	let checkLimitReached
	let checkLimitReachedStub
	beforeEach(() => {
		dispatchSpy = sinon.spy()
		getStateSpy = sinon.stub().returns({
			products: Immutable.fromJS({
				prod123: { id: 'prod123', price: '£1.20' },
				prod456: { id: 'prod456', price: '£2.20' },
				prod789: { id: 'prod789', price: '£3.10' },
			}),
		})

		checkLimitReached = false
		checkLimitReachedStub = sinon.stub(actionUtils, 'checkLimitReached').returns(checkLimitReached)
	})
	afterEach(() => {
		checkLimitReachedStub.restore()
	})
	describe('receiveInitialUserChoices', () => {
		it('should set new step number', () => {
			const dispatch = Actions.receiveInitialUserChoices({ a: 'choice', b: 'another choice' })
			expect(dispatch).to.deep.equal({
				type: CONFIG.PRODUCTS.LOAD_INITIAL_CHOICES,
				choices: { a: 'choice', b: 'another choice' },
			})
		})
	})
	describe('qtyChange', () => {
		it('should dispatch CAN_ADD_MORE with an array of productLimitReached', () => {
			Actions.qtyChange('prod123', 1, '£2.20', false)(dispatchSpy, getStateSpy)
			expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
				delta: 1,
				id: 'prod123',
				price: '£2.20',
				type: 'INCREMENT_PRODUCT',
			})
			expect(dispatchSpy.getCall(1).args[0]).to.deep.equal({
				data: [
					{ id: 'prod123', limitReached: false },
					{ id: 'prod456', limitReached: false },
					{ id: 'prod789', limitReached: false },

				],
				type: 'CAN_ADD_MORE',
			})
		})
		it('should check limits by default', () => {
			Actions.qtyChange('prod123', 1, '£2.20', undefined)(dispatchSpy, getStateSpy)
			expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
				delta: 1,
				id: 'prod123',
				price: '£2.20',
				type: 'INCREMENT_PRODUCT',
			})
		})
		it('should not dispatch if checkLimits is true and limit is reached', () => {
			checkLimitReachedStub.restore()
			checkLimitReachedStub = sinon.stub(actionUtils, 'checkLimitReached').returns(true)
			Actions.qtyChange('prod123', 1, '£4.00', true)(dispatchSpy, getStateSpy)
			expect(dispatchSpy).to.have.not.been.called
		})
		it('should dispatch INCREMENT_PRODUCT if delta >= 0', () => {
			Actions.qtyChange('prod123', 1, '£4.00', true)(dispatchSpy, getStateSpy)
			expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
				delta: 1,
				id: 'prod123',
				price: '£4.00',
				type: 'INCREMENT_PRODUCT',
			})
		})
		it('should dispatch DECREMENT_PRODUCT if delta < 0', () => {
			Actions.qtyChange('prod123', -1, '£4.00', true)(dispatchSpy, getStateSpy)
			expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
				delta: -1,
				id: 'prod123',
				price: '£4.00',
				type: 'DECREMENT_PRODUCT',
			})
		})
		it('should call getState spy twice (before and after dispatching) when checking limits', () => {
			Actions.qtyChange('prod123', -1, '£4.00', true)(dispatchSpy, getStateSpy)
			expect(getStateSpy.calledTwice).to.be.equal(true)
			expect(getStateSpy.firstCall.calledBefore(dispatchSpy))
			expect(getStateSpy.secondCall.calledAfter(dispatchSpy))
		})
	})
})
