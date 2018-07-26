import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import MyDeliveries from 'routes/Account/MyDeliveries/MyDeliveries'
import actions from 'actions/user'

describe('MyDeliveries', function() {
	describe('fetchOrdersAndAddresses', function() {
		let dispatch
		let userFetchOrders
		let userLoadAddresses
		let sandbox

		beforeEach(function() {
			sandbox = sinon.sandbox.create()
			userFetchOrders = sandbox.spy(actions, 'userFetchOrders')
			userLoadAddresses = sandbox.spy(actions, 'userLoadAddresses')
			dispatch = sandbox.stub().returns(new Promise(resolve => { resolve() }))
		})

		afterEach(function() {
			sandbox.restore()
		})

		it('should call userFetchOrders', async function() {
			await MyDeliveries.fetchOrdersAndAddresses({
				store: { dispatch },
			})
			expect(userFetchOrders).to.have.been.calledOnce
		})

		it('should call userLoadAddresses', async function() {
			await MyDeliveries.fetchOrdersAndAddresses({
				store: { dispatch },
			})
			expect(userLoadAddresses).to.have.been.calledOnce
		})
	})

	describe('rendering', function() {
		const expectAlertAndRetryButton = function(wrapper) {
			const alert = wrapper.find('Alert')
			const buttons = wrapper.find('Button')
			expect(alert).to.have.length(1)
			expect(alert.find('p').prop('children')).to.equals('We\'re not able to display your deliveries right now. Please try again later.')
			expect(buttons).to.have.length(2)
			expect(buttons.at(1).childAt(0).text()).to.equals('Retry')
		}

		let wrapper

		beforeEach(function() {
			wrapper = shallow(<MyDeliveries
				isFetchingOrders={false}
				isFetchingAddresses={false}
				didErrorFetchingOrders={null}
				didErrorFetchingAddresses={null}
			/>)
		})

		it('should render a <div> with no props', function() {
			expect(wrapper.type()).to.equal('div')
		})

		it('should render 1 <Button> component to add more boxes', function() {
			const button = wrapper.find('Button')
			expect(button).to.have.length(1)
			expect(button.prop('children')).to.equals('Add box')
		})

		it('should render 1 <OrdersList> component(s) when neither fetching orders or addresses is pending', function() {
			expect(wrapper.find('Connect(OrdersList)')).to.have.length(1)
			expect(wrapper.find('Loading')).to.have.length(0)
		})

		it('should render the Loading component instead of OrderList one when fetching orders is pending', function() {
			wrapper = shallow(<MyDeliveries isFetchingOrders isFetchingAddresses={false} />)
			expect(wrapper.find('Connect(OrdersList)')).to.have.length(0)
			expect(wrapper.find('Loading')).to.have.length(1)
		})

		it('should render the Loading component instead of OrderList one when fetching addresses is pending', function() {
			wrapper = shallow(<MyDeliveries isFetchingOrders={false} isFetchingAddresses />)
			expect(wrapper.find('Connect(OrdersList)')).to.have.length(0)
			expect(wrapper.find('Loading')).to.have.length(1)
		})

		it('should render the Loading component instead of OrderList one when both fetching orders and addresses are pending', function() {
			wrapper = shallow(<MyDeliveries isFetchingOrders isFetchingAddresses />)
			expect(wrapper.find('Connect(OrdersList)')).to.have.length(0)
			expect(wrapper.find('Loading')).to.have.length(1)
		})

		it('should render an error Alert and retry button when fetching orders fails', function() {
			wrapper = shallow(<MyDeliveries didErrorFetchingOrders="error" />)
			expectAlertAndRetryButton(wrapper)
		})

		it('should render an error Alert and retry button when fetching addresses fails', function() {
			wrapper = shallow(<MyDeliveries didErrorFetchingAddresses="error" />)
			expectAlertAndRetryButton(wrapper)
		})

		it('should render an error Alert and retry button when fetching orders fail even if fetching addresses is still pending', function() {
			wrapper = shallow(<MyDeliveries didErrorFetchingOrders="error" isFetchingAddresses />)
			expectAlertAndRetryButton(wrapper)
		})

		it('should render an error Alert and retry button when fetching addresses fail even if fetching orders is still pending', function() {
			wrapper = shallow(<MyDeliveries didErrorFetchingAddresses="error" isFetchingOrders />)
			expectAlertAndRetryButton(wrapper)
		})
	})
})
