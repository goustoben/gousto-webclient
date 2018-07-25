import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Welcome from 'routes/Welcome/Welcome'
import SubHeader from 'routes/Welcome/SubHeader'
import ExpectationsCarousel from 'routes/Welcome/ExpectationsCarousel'
import ProductDetailOverlay from 'routes/Welcome/ProductDetailOverlay'
import OrderSummary from 'containers/welcome/OrderSummary'

describe('Welcome Page', function() {
	describe('rendering', function() {
		let wrapper
		beforeEach(function() {
			wrapper = shallow(
				<Welcome
					isAuthenticated
					orderId="2"
					products={Immutable.Map()}
					productsLoadCategories={function() {}}
					productsLoadProducts={function() {}}
					productsLoadProductsById={function() {}}
					productsLoadStock={function() {}}
					recipes={Immutable.Map()}
					recipesLoadRecipesById={function() {}}
					user={Immutable.Map()}
					userLoadOrder={function() {}}
				/>
			)
		})

		it('should return section', function() {
			expect(wrapper.type()).to.equal('section')
		})

		it('should render 1 Welcome SubHeader', function() {
			expect(wrapper.find(SubHeader).length).to.equal(1)
		})

		it('should render 1 ExpectationsCarousel', function() {
			expect(wrapper.find(ExpectationsCarousel).length).to.equal(1)
		})

		it('should render 1 OrderSummary', function() {
			expect(wrapper.find(OrderSummary).length).to.equal(1)
		})

		it('should render 1 ProductDetailOverlay', function() {
			expect(wrapper.find(ProductDetailOverlay).length).to.equal(1)
		})
	})

	describe('fetchData', function() {
		let basketOrderLoad
		let userLoadOrder
		let contentLoadContentByPageSlug
		let recipesLoadRecipesById
		let productsLoadCategories
		let productsLoadProductsById
		let productsLoadProducts
		let productsLoadStock
		let trackFirstPurchase
		let dispatch
		let redirect
		let getState
		let getUserOrderById
		let getUserOrderRecipeIds
		let getUserOrderProductIds
		let getUserOrderGiftProductIds
		let WelcomeRoute

		beforeEach(function() {
			basketOrderLoad = sinon.spy()
			userLoadOrder = sinon.stub().returns(Promise.resolve())
			contentLoadContentByPageSlug = sinon.stub().returns(Promise.resolve())
			recipesLoadRecipesById = sinon.stub().returns(Promise.resolve())
			productsLoadCategories = sinon.stub().returns(Promise.resolve())
			productsLoadProductsById = sinon.stub().returns(Promise.resolve())
			trackFirstPurchase = sinon.spy()
			redirect = sinon.stub().returns({ type: 'SERVER_REDIRECT', url: '/', clearCookies: undefined })
			productsLoadStock = sinon.stub().returns(Promise.resolve())
			getUserOrderById = sinon.stub().returns(Immutable.fromJS({
				id: 'order-123',
				phase: 'open',
				whenCutoff: 'order whenCutoff',
				recipeItems: [{ itemableId: '1', quantity: 2 }, { itemableId: '2', quantity: 4 }, { itemableId: '3', quantity: 2 }, { itemableId: '4', quantity: 2 }],
				productItems: [{ itemableId: '5', quantity: 1 }, { itemableId: '6', quantity: 3 }],
				giftItems: [{ itemableId: '7' }, { itemableId: '8' }],
			}))

			productsLoadProducts = sinon.stub().returns(Promise.resolve())

			getUserOrderRecipeIds = sinon.stub().returns(['1', '2', '3', '4'])
			getUserOrderProductIds = sinon.stub().returns(['5', '6'])
			getUserOrderGiftProductIds = sinon.stub().returns(['7', '8'])

			WelcomeRoute = require('inject-loader?actions&utils/user!routes/Welcome/Welcome')({
				actions: { basketOrderLoad, contentLoadContentByPageSlug, userLoadOrder, recipesLoadRecipesById, productsLoadCategories, productsLoadProductsById, productsLoadProducts, productsLoadStock, trackFirstPurchase },
				'utils/user': { getUserOrderById, getUserOrderRecipeIds, getUserOrderProductIds, getUserOrderGiftProductIds },
			}).default

			dispatch = sinon.stub().returns(Promise.resolve())
			getState = sinon.stub().returns({
				auth: Immutable.fromJS({ accessToken: 'access-token', isAuthenticated: true }),
				user: Immutable.fromJS({ ageVerified: false, orders: [] }),
				products: Immutable.fromJS([]),
				recipes: Immutable.fromJS({}),
			})
		})

		it('should call userLoadOrder', function(done) {
			WelcomeRoute.fetchData({
				store: { dispatch, getState },
				params: { orderId: 'order-123' },
				query: {},
			}).then(function() {
				expect(userLoadOrder).to.have.been.calledOnce
				expect(userLoadOrder.args[0][0]).to.equal('order-123')
			}).then(done, done)
		})

		it('should call productsLoadProducts', function(done) {
			WelcomeRoute.fetchData({
				store: { dispatch, getState },
				params: { orderId: 'order-123' },
				query: {},
			}).then(function() {
				expect(productsLoadProducts).to.have.been.calledOnce
				expect(productsLoadProducts.args[0][0]).to.equal('order whenCutoff')
			}).then(done, done)
		})

		it('should call productsLoadStock', function(done) {
			WelcomeRoute.fetchData({
				store: { dispatch, getState },
				params: { orderId: 'order-123' },
				query: {},
			}).then(function() {
				expect(productsLoadStock).to.have.been.calledOnce
				expect(productsLoadStock.args[0][0]).to.equal(undefined)
			}).then(done, done)
		})

		it('should call productsLoadCategories', function(done) {
			WelcomeRoute.fetchData({
				store: { dispatch, getState },
				params: { orderId: 'order-123' },
				query: {},
			}).then(function() {
				expect(productsLoadCategories).to.have.been.calledOnce
				expect(productsLoadCategories.args[0][0]).to.equal(undefined)
			}).then(done, done)
		})

		it('should call recipesLoadRecipesById', function(done) {
			WelcomeRoute.fetchData({
				store: { dispatch, getState },
				params: { orderId: 'order-123' },
				query: {},
			}).then(function() {
				expect(recipesLoadRecipesById).to.have.been.calledOnce
				expect(recipesLoadRecipesById.args[0][0]).to.deep.equal(['1', '2', '3', '4'])
			}).then(done, done)
		})

		it('should call productsLoadProductsById', function(done) {
			WelcomeRoute.fetchData({
				store: { dispatch, getState },
				params: { orderId: 'order-123' },
				query: {},
			}).then(function() {
				expect(productsLoadProductsById).to.have.been.calledOnce
				expect(productsLoadProductsById.args[0][0]).to.deep.equal(['5', '6', '7', '8'])
			}).then(done, done)
		})

		it('should call basketOrderLoad', function(done) {
			WelcomeRoute.fetchData({
				store: { dispatch, getState },
				params: { orderId: 'order-123' },
				query: {},
			}).then(function() {
				expect(basketOrderLoad).to.have.been.calledOnce
			}).then(done, done)
		})

		it('should call trackFirstPurchase', function(done) {
			WelcomeRoute.fetchData({
				store: { dispatch, getState },
				params: { orderId: 'order-123' },
				query: {},
			}).then(function() {
				expect(trackFirstPurchase).to.have.been.calledOnce
				expect(trackFirstPurchase.args[0][0]).to.equal('order-123')
			}).then(done, done)
		})

		it('should dispatch a redirect if the order isnt open', function(done) {
			this.timeout(20000)
			getUserOrderById = sinon.stub(Immutable.fromJS({
				id: 'order-123',
				phase: 'closed',
				whenCutoff: 'order whenCutoff',
				recipeItems: [{ itemableId: '1', quantity: 2 }, { itemableId: '2', quantity: 4 }, { itemableId: '3', quantity: 2 }, { itemableId: '4', quantity: 2 }],
				productItems: [{ itemableId: '5', quantity: 1 }, { itemableId: '6', quantity: 3 }],
				giftItems: [{ itemableId: '7' }, { itemableId: '8' }],
			}))

			WelcomeRoute = require('inject-loader?actions&utils/user!routes/Welcome/Welcome')({
				actions: { basketOrderLoad, userLoadOrder, recipesLoadRecipesById, productsLoadCategories, productsLoadProductsById, productsLoadProducts, productsLoadStock, redirect, trackFirstPurchase },
				'utils/user': { getUserOrderById, getUserOrderRecipeIds, getUserOrderProductIds, getUserOrderGiftProductIds },
			}).default

			WelcomeRoute.fetchData({
				store: { dispatch, getState },
				params: { orderId: 'order-123' },
			}).then(function() {
				expect(redirect).to.have.been.calledOnce
				expect(redirect.args[0][0]).to.equal('/')
			}).then(done, done)
		})

		it('should redirect if userLoadOrder throws an error', function(done) {
			this.timeout(20000)
			getUserOrderById = sinon.stub(Immutable.fromJS({
				id: 'Not a real order',
				phase: 'closed',
				whenCutoff: 'order whenCutoff',
				recipeItems: [{ itemableId: '1', quantity: 2 }, { itemableId: '2', quantity: 4 }, { itemableId: '3', quantity: 2 }, { itemableId: '4', quantity: 2 }],
				productItems: [{ itemableId: '5', quantity: 1 }, { itemableId: '6', quantity: 3 }],
				giftItems: [{ itemableId: '7' }, { itemableId: '8' }],
			}))

			WelcomeRoute = require('inject-loader?actions&utils/user!routes/Welcome/Welcome')({
				actions: { basketOrderLoad, userLoadOrder, recipesLoadRecipesById, productsLoadCategories, productsLoadProductsById, productsLoadProducts, productsLoadStock, redirect, trackFirstPurchase },
				'utils/user': { getUserOrderById, getUserOrderRecipeIds, getUserOrderProductIds, getUserOrderGiftProductIds },
			}).default

			WelcomeRoute.fetchData({
				store: { dispatch, getState },
				params: { orderId: 'order-123' },
			}).then(function() {
				expect(redirect).to.have.been.calledOnce
				expect(redirect.args[0][0]).to.equal('/')
			}).then(done, done)
		})
	})
})
