import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import Immutable from 'immutable'

chai.use(sinonChai)

import actionTypes from 'actions/actionTypes'

describe('pricing actions', function () {
	let dispatchSpy
	let getStateSpy
	const pricingData = {
		status: 'ok',
		data: {
			prices: {
				price_per_portion: '5.00',
				price_per_portion_discounted: '5.00',
				product_total: '0.00',
				surcharge_total: '9.98',
				recipe_total: '29.99',
				recipe_total_discounted: '29.99',
				recipe_discount: '0.00',
				flat_discount_applied: true,
				amount_off: '0.000',
				percentage_off: null,
				promo_code: false,
				promo_code_valid: false,
				delivery_total: '0.00',
				gross_total: '39.97',
				vat_charged: '0.00',
				total: '39.97',
			},
		},
	}
	beforeEach(function () {
		dispatchSpy = sinon.spy()
	})

	describe('pricingRequest', function () {
		it('will not request prices if the number of recipes are less then 2', async function () {
			getStateSpy = sinon.stub().returns({
				auth: Immutable.fromJS({ accessToken: 'accessToken', refreshToken: 'refreshToken' }),
				basket: Immutable.fromJS({ recipes: { 123: 1 }, slotId: 124 }),
			})

			const pricingRequestApiSpy = sinon.stub().returns(Promise.resolve({ data: pricingData }))
			const actions = require('inject-loader?apis/pricing!actions/pricing')({
				'apis/pricing': pricingRequestApiSpy,
			}).default

			await actions.pricingRequest()(dispatchSpy, getStateSpy)

			expect(dispatchSpy).to.not.have.been.calledWithMatch({
				type: actionTypes.PRICING_PENDING,
			})
			expect(dispatchSpy).to.not.have.been.calledWithMatch({
				type: actionTypes.PRICING_SUCCESS,
				prices: pricingData,
			})
			expect(pricingRequestApiSpy).to.not.have.been.calledOnce
		})

		it('will not request prices if the slodId is not set', async function () {
			getStateSpy = sinon.stub().returns({
				auth: Immutable.fromJS({ accessToken: 'accessToken', refreshToken: 'refreshToken' }),
				basket: Immutable.fromJS({ recipes: { 123: 1, 234: 1 } }),
			})

			const pricingRequestApiSpy = sinon.stub().returns(Promise.resolve({ data: pricingData }))
			const actions = require('inject-loader?apis/pricing!actions/pricing')({
				'apis/pricing': pricingRequestApiSpy,
			}).default

			await actions.pricingRequest()(dispatchSpy, getStateSpy)

			expect(dispatchSpy).to.not.have.been.calledWithMatch({
				type: actionTypes.PRICING_PENDING,
			})
			expect(dispatchSpy).to.not.have.been.calledWithMatch({
				type: actionTypes.PRICING_SUCCESS,
				prices: pricingData,
			})
			expect(pricingRequestApiSpy).to.not.have.been.calledOnce
		})

		it('will return with the PRICING_SUCCESS action and data when 2 recipes and the slotId are set', async function () {
			getStateSpy = sinon.stub().returns({
				auth: Immutable.fromJS({ accessToken: 'accessToken', refreshToken: 'refreshToken' }),
				basket: Immutable.fromJS({ recipes: { 123: 2 }, slotId: 124 }),
			})

			const pricingRequestApiSpy = sinon.stub().returns(Promise.resolve({ data: pricingData }))
			const actions = require('inject-loader?apis/pricing!actions/pricing')({
				'apis/pricing': pricingRequestApiSpy,
			}).default

			await actions.pricingRequest()(dispatchSpy, getStateSpy)

			expect(dispatchSpy).to.have.been.calledTwice
			expect(dispatchSpy).to.have.been.calledWithMatch({
				type: actionTypes.PRICING_PENDING,
			})
			expect(dispatchSpy).to.have.been.calledWithMatch({
				type: actionTypes.PRICING_SUCCESS,
				prices: pricingData,
			})
			expect(pricingRequestApiSpy).to.have.been.calledOnce
		})

		it('should return with the PRICING_SUCCESS action and data with store data set', async function () {
			getStateSpy = sinon.stub().returns({
				auth: Immutable.fromJS({ accessToken: 'accessToken', refreshToken: 'refreshToken' }),
				basket: Immutable.fromJS({ recipes: { 123: 1, 145: 1 }, promoCode: '1234', date: '12-12-2029', slotId: 12, numPortions: 2 }),
			})

			const pricingRequestApiSpy = sinon.stub().returns(Promise.resolve({ data: pricingData }))
			const actions = require('inject-loader?apis/pricing!actions/pricing')({
				'apis/pricing': pricingRequestApiSpy,
			}).default

			await actions.pricingRequest()(dispatchSpy, getStateSpy)

			expect(dispatchSpy).to.have.been.calledTwice
			expect(dispatchSpy).to.have.been.calledWithMatch({
				type: actionTypes.PRICING_PENDING,
			})
			expect(dispatchSpy).to.have.been.calledWithMatch({
				type: actionTypes.PRICING_SUCCESS,
				prices: pricingData,
			})
			expect(pricingRequestApiSpy).to.have.been.calledOnce

			const recipeDataRequest = { 0: { id: '123', type: 'Recipe', quantity: 2 }, 1: { id: '145', type: 'Recipe', quantity: 2 } }
			expect(pricingRequestApiSpy).to.have.been.calledWith('accessToken', recipeDataRequest, '12-12-2029', 12, '1234')
		})

		it('will request all basket items when recipes, products and the slotId are set', async function () {
			getStateSpy = sinon.stub().returns({
				auth: Immutable.fromJS({ accessToken: 'accessToken', refreshToken: 'refreshToken' }),
				basket: Immutable.fromJS({
					recipes: { 123: 2 },
					products: { p1: 2, p2: 1 },
					slotId: 124,
					numPortions: 2,
				}),
			})

			const pricingRequestApiSpy = sinon.stub().returns(Promise.resolve({ data: pricingData }))
			const actions = require('inject-loader?apis/pricing!actions/pricing')({
				'apis/pricing': pricingRequestApiSpy,
			}).default

			await actions.pricingRequest()(dispatchSpy, getStateSpy)

			expect(pricingRequestApiSpy.args[0][1]).to.deep.equal({
				0: { id: '123', quantity: 2, type: 'Recipe' },
				1: { id: '123', quantity: 2, type: 'Recipe' },
				2: { id: 'p1', quantity: 1, type: 'Product' },
				3: { id: 'p1', quantity: 1, type: 'Product' },
				4: { id: 'p2', quantity: 1, type: 'Product' },
			})
		})

		it('should return with the PRICING_FAILURE action and message', async function () {
			getStateSpy = sinon.stub().returns({
				auth: Immutable.fromJS({ accessToken: 'accessToken', refreshToken: 'refreshToken' }),
				basket: Immutable.fromJS({ recipes: { 123: 1, 134: 1 }, slotId: 1 }),
			})

			const pricingRequestApiSpy = sinon.stub().returns(Promise.reject('error from pricing endpoint'))
			const actions = require('inject-loader?apis/pricing!actions/pricing')({
				'apis/pricing': pricingRequestApiSpy,
			}).default

			await actions.pricingRequest()(dispatchSpy, getStateSpy)

			expect(dispatchSpy).to.have.been.calledTwice
			expect(dispatchSpy).to.have.been.calledWithMatch({
				type: actionTypes.PRICING_PENDING,
			})
			expect(dispatchSpy).to.have.been.calledWithMatch({
				type: actionTypes.PRICING_FAILURE,
				message: 'error from pricing endpoint',
			})
			expect(pricingRequestApiSpy).to.have.been.calledOnce
		})
	})

	describe('pricingClear', function () {
		const actions = require('actions/pricing').default
		it('should dispatch a pricing reset event', async function () {
			getStateSpy = sinon.stub().returns({
				auth: Immutable.fromJS({ accessToken: 'accessToken', refreshToken: 'refreshToken' }),
				basket: Immutable.fromJS({ recipes: ['123', 1] }),
				pricing: Immutable.fromJS({ prices: [1, 2, 3] }),
			})

			await actions.pricingClear()(dispatchSpy, getStateSpy)

			expect(dispatchSpy).to.have.been.calledOnce
			expect(dispatchSpy).to.have.been.calledWithMatch({
				type: actionTypes.PRICING_RESET,
			})
		})

		it('should not dispatch a pricing reset event when there is no items in the pricing array', async function () {
			getStateSpy = sinon.stub().returns({
				auth: Immutable.fromJS({ accessToken: 'accessToken', refreshToken: 'refreshToken' }),
				basket: Immutable.fromJS({ recipes: ['123', 1] }),
				pricing: Immutable.fromJS({ prices: [] }),
			})

			await actions.pricingClear()(dispatchSpy, getStateSpy)

			expect(dispatchSpy).to.have.not.been.called
		})
	})
})
