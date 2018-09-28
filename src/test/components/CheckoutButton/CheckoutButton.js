import React from 'react'
import { shallow, mount } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import { Button, Segment } from 'goustouicomponents'
import CheckoutButton from 'BoxSummary/CheckoutButton/CheckoutButton'

describe('CheckoutButton', () => {
	let basket
	let mapping
	let wrapper
	let userOrders
	let orderUpdate
	let basketCheckedOut
	let basketProceedToCheckout
	let sandbox
	beforeEach(() => {
		sandbox = sinon.sandbox.create()
		mapping = {
			deliverypostcode: 'postcode',
			delivery_day_id: 'deliveryDayId',
			delivery_slot_id: 'slotId',
			current_order_id: 'orderId',
			promocode: 'promoCode',
			num_portions: 'numPortions',
		}
		basket = {
			promoCode: 'ffb1',
			orderId: '123',
			recipes: Immutable.Map([['222', 1], ['333', 1]]),
			numPortions: 2,
			postcode: 'W7 7UP',
			deliveryDayId: 3,
			slotId: 1,
			addressId: '123',
		}
		basketCheckedOut = sandbox.spy()
		orderUpdate = sandbox.spy()
		basketProceedToCheckout = sandbox.spy()
		userOrders = Immutable.List([])
		wrapper = shallow(<CheckoutButton
			promoCode={basket.promoCode}
			orderId={basket.orderId}
			recipes={basket.recipes}
			numPortions={basket.numPortions}
			deliveryDayId={basket.deliveryDayId}
			slotId={basket.slotId}
			postcode={basket.postcode}
			userOrders={userOrders}
			orderUpdate={orderUpdate}
			basketCheckedOut={basketCheckedOut}
		><Button><Segment>test</Segment></Button></CheckoutButton>)
	})

	afterEach(function() {
		sandbox.restore()
	})

	it('should return <div>', () => {
		expect(wrapper.type()).to.equal('div')
	})

	it('should have one Button component', () => {
		expect(wrapper.find(Button).length).to.equal(1)
	})

	it('should the right number of inputs', () => {
		expect(wrapper.find('input').length).to.equal(9)
	})

	it('should have correct prop data on the input form value', () => {
		const recipes = basket.recipes.toJS()

		wrapper.find('input').forEach(input => {
			const attr = input.props()
			if (attr.name !== 'order_action') {
				if (attr.name === 'recipes[]') {
					expect(recipes[attr.value]).to.equal(1)
				} else {
					expect(basket[mapping[attr.name]]).to.equal(attr.value)
				}
			}
		})
	})

	it('should not render an input for address_id if the addressId prop is not present', () => {
		expect(wrapper.find('input[name="address_id"]').length).to.equal(0)
	})

	it('should render an input for address_id if the addressId prop is present', () => {
		wrapper = shallow(<CheckoutButton
			promoCode={basket.promoCode}
			orderId={basket.orderId}
			recipes={basket.recipes}
			numPortions={basket.numPortions}
			deliveryDayId={basket.deliveryDayId}
			slotId={basket.slotId}
			postcode={basket.postcode}
			addressId={basket.addressId}
			userOrders={userOrders}
		><Button><Segment>test</Segment></Button></CheckoutButton>)
		expect(wrapper.find('input').length).to.equal(10)
		expect(wrapper.find('input[name="address_id"]').length).to.equal(1)
		expect(wrapper.find('input[name="address_id"]').prop('value')).to.equal(basket.addressId)
	})

	it('should render an order_action input', () => {
		expect(wrapper.find('input[name="order_action"]').length).to.equal(1)
	})

	it('should render a "transaction" order_action if there is no order ID present', () => {
		wrapper = shallow(<CheckoutButton
			promoCode={basket.promoCode}
			orderId=""
			recipes={basket.recipes}
			numPortions={basket.numPortions}
			deliveryDayId={basket.deliveryDayId}
			slotId={basket.slotId}
			postcode={basket.postcode}
			userOrders={userOrders}
		><Button><Segment>test</Segment></Button></CheckoutButton>)
		expect(wrapper.find('input[name="order_action"]').prop('value')).to.equal('transaction')
	})

	it('should render a "recipe-choice" order_action if there is the order did not previously had recipes', () => {
		userOrders = Immutable.List([
			Immutable.Map({
				id: '456',
				recipeItems: Immutable.List([]),
			}),
		])
		wrapper = shallow(<CheckoutButton
			promoCode={basket.promoCode}
			orderId="456"
			recipes={basket.recipes}
			numPortions={basket.numPortions}
			deliveryDayId={basket.deliveryDayId}
			slotId={basket.slotId}
			postcode={basket.postcode}
			userOrders={userOrders}
		><Button><Segment>test</Segment></Button></CheckoutButton>)
		expect(wrapper.find('input[name="order_action"]').prop('value')).to.equal('recipe-choice')
	})

	it('should render a "recipe-update" order_action if there is the order previously had recipes', () => {
		userOrders = Immutable.List([
			Immutable.Map({
				id: '456',
				recipeItems: Immutable.List([{}, {}, {}]),
			}),
		])
		wrapper = shallow(<CheckoutButton
			promoCode={basket.promoCode}
			orderId="456"
			recipes={basket.recipes}
			numPortions={basket.numPortions}
			deliveryDayId={basket.deliveryDayId}
			slotId={basket.slotId}
			postcode={basket.postcode}
			userOrders={userOrders}
		><Button><Segment>test</Segment></Button></CheckoutButton>)
		expect(wrapper.find('input[name="order_action"]').prop('value')).to.equal('recipe-update')
	})

	it('should call the orderUpdate function prop on submit if an order id is present', () => {
		wrapper.instance().handleClick()
		expect(orderUpdate).to.be.called
	})

	it('should not call the orderUpdate function prop on submit if an order id is not present', () => {
		userOrders = Immutable.List([
			Immutable.Map({
				id: '456',
				recipeItems: Immutable.List([{}, {}, {}]),
			}),
		])
		const MockedCheckoutButtoon = require('inject-loader?config!BoxSummary/CheckoutButton/CheckoutButton')({
			config: {
				routes: {
					client: {
						checkout: '/something',
					},
				},
			},
		}).default
		wrapper = mount(<MockedCheckoutButtoon
			promoCode={basket.promoCode}
			userOrders={userOrders}
			recipes={basket.recipes}
			numPortions={basket.numPortions}
			deliveryDayId={basket.deliveryDayId}
			basketProceedToCheckout={basketProceedToCheckout}
			slotId={basket.slotId}
			postcode={basket.postcode}
			basketCheckedOut={basketCheckedOut}
		><Button><Segment>test</Segment></Button></MockedCheckoutButtoon>)
		wrapper.instance().handleClick()
		expect(orderUpdate).to.not.be.called
		expect(basketProceedToCheckout).to.be.calledOnce
	})

	it('should call basketProceedToCheckout on submit if an order id is not present, user is not logged in, & clientRouting is enabled', () => {
		wrapper = shallow(<CheckoutButton
			basketCheckedOut={basketCheckedOut}
			orderSaveError="something bad happened"
			basketProceedToCheckout={basketProceedToCheckout}
			userOrders={userOrders}
			recipes={Immutable.Map([])}
			isAuthenticated={false}
			clientRouting
		><Button><Segment>test</Segment></Button></CheckoutButton>)

		wrapper.instance().handleClick()
		expect(basketProceedToCheckout).to.be.called
	})

	it('onclick should call handleClick ', () => {
		const checkoutButtonOnClickSpy = sinon.spy()

		wrapper = shallow(<CheckoutButton
			promoCode={basket.promoCode}
			orderId={basket.orderId}
			recipes={basket.recipes}
			numPortions={basket.numPortions}
			deliveryDayId={basket.deliveryDayId}
			slotId={basket.slotId}
			postcode={basket.postcode}
			userOrders={userOrders}
			orderUpdate={orderUpdate}
			basketCheckedOut={basketCheckedOut}
			orderSaveError="something bad happened"
			onClick={checkoutButtonOnClickSpy}
		><Button><Segment>test</Segment></Button></CheckoutButton>)

		wrapper.instance().handleClick()

		expect(checkoutButtonOnClickSpy).to.be.called
		expect(checkoutButtonOnClickSpy).to.be.calledOnce
	})
})
