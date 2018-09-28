import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'
import OrderRestoreButton from 'routes/Account/MyDeliveries/OrdersList/Order/OrderRestoreButton/OrderRestoreButton'
import { Alert, Button } from 'goustouicomponents'
import Content from 'containers/Content'
import orderActions from 'actions/order'

describe('OrderRestoreButton', function() {
	let sandbox
	let wrapper
	let dispatchSpy

	beforeEach(function() {
		sandbox = sinon.sandbox.create()
	})
	afterEach(function(done) {
		sandbox.restore()
		done()
	})
	describe('rendering', function() {
		beforeEach(function() {
			wrapper = shallow(<OrderRestoreButton />)
		})

		it('should render a <div>', function() {
			expect(wrapper.type()).to.equal('div')
		})

		it('should render a <Button>', function() {
			expect(wrapper.find(Button)).to.have.length(1)
		})

		it('should render an Alert with CMS text with specific default when projectedOrderRestoreError is true', function() {
			wrapper = shallow(<OrderRestoreButton projectedOrderRestoreError />)
			const alertWrapper = wrapper.find(Alert)
			expect(alertWrapper).to.have.length(1)
			const contentWrapperProps = alertWrapper.find(Content).first().props()
			expect(contentWrapperProps.contentKeys).to.equal('mydeliveriesOrderOrderrestorebuttonRestoreprojectederror')
			expect(contentWrapperProps.children.props.children).to.equal('Whoops, there was a problem restoring this order, please try again.')
			wrapper = shallow(<OrderRestoreButton didCancelProjectedError={false} />)
			expect(wrapper.find(Alert)).to.have.length(0)
		})
	})

	describe('restore order', function() {
		let store

		beforeEach(function() {
			dispatchSpy = sandbox.spy()
			store = {
				dispatch: dispatchSpy,
			}
		})

		it('should dispatch the projectedOrderRestore action with params when clicking the Restore Order button', function() {
			wrapper = shallow(<OrderRestoreButton
				orderId="543"
				userId="789"
				deliveryDayId="123"
			/>, { context: { store } })
			const projectedOrderRestoreStub = sandbox.stub(orderActions, 'projectedOrderRestore')
				.withArgs('543', '789', '123').returns('something')
			wrapper.find(Button).simulate('click')
			expect(dispatchSpy).to.have.been.calledOnce
			expect(dispatchSpy).to.have.been.calledWithExactly(projectedOrderRestoreStub('543', '789', '123'))
		})
	})
})
