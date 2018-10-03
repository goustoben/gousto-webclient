import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'
import OrderCancelButton from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderCancelButton/OrderCancelButton'
import { Alert, Button } from 'goustouicomponents'
import Content from 'containers/Content'

describe('OrderCancelButton', function() {
	let sandbox
	let wrapper

	beforeEach(function() {
		sandbox = sinon.sandbox.create()
	})
	afterEach(function(done) {
		sandbox.restore()
		done()
	})
	describe('rendering', function() {
		beforeEach(function() {
			wrapper = shallow(<OrderCancelButton />)
		})

		it('should render a <div>', function() {
			expect(wrapper.type()).to.equal('div')
		})

		it('should render a <Button>', function() {
			expect(wrapper.find(Button)).to.have.length(1)
		})

		it('should render an Alert with CMS text with specific default when didCancelProjectedError is true', function() {
			wrapper = shallow(<OrderCancelButton didCancelProjectedError />)
			const alertWrapper = wrapper.find(Alert)
			expect(alertWrapper).to.have.length(1)
			const contentWrapperProps = alertWrapper.find(Content).first().props()
			expect(contentWrapperProps.contentKeys).to.equal('mydeliveriesOrderOrdercancelbuttonCancelprojectederror')
			expect(contentWrapperProps.children.props.children).to.equal('Whoops, there was a problem cancelling this order, please try again.')
			wrapper = shallow(<OrderCancelButton didCancelProjectedError={false} />)
			expect(wrapper.find(Alert)).to.have.length(0)
		})
	})

	describe('cancel box', function() {
		describe('order in state "scheduled"', function() {
			it('should call the projectedOrderCancel function when clicking the Cancel Box button', function() {
				const projectedOrderCancelSpy = sandbox.spy()
				wrapper = shallow(<OrderCancelButton
					orderId="543"
					deliveryDayId="111"
					orderState="scheduled"
					projectedOrderCancel={projectedOrderCancelSpy}
				/>)
				wrapper.find(Button).simulate('click')
				expect(projectedOrderCancelSpy).to.have.been.calledOnce
				expect(projectedOrderCancelSpy).to.have.been.calledWithExactly('543', '111')
			})
		})

		describe('order in state "recipes chosen"', function() {
			it('should call the cancelOrderModalToggleVisibility function when clicking the Cancel Box button', function() {
				const cancelOrderModalToggleVisibilitySpy = sandbox.spy()
				wrapper = shallow(<OrderCancelButton
					orderId="543"
					orderState="recipes chosen"
					cancelOrderModalToggleVisibility={cancelOrderModalToggleVisibilitySpy}
				/>)
				wrapper.find(Button).simulate('click')
				expect(cancelOrderModalToggleVisibilitySpy).to.have.been.calledOnce
				expect(cancelOrderModalToggleVisibilitySpy).to.have.been.calledWithExactly(true, '543')
			})
		})

		describe('order in other states', function() {
			it('should call the orderCancel function when clicking the Cancel Box button', function() {
				const orderCancelSpy = sandbox.spy()
				wrapper = shallow(<OrderCancelButton
					orderId="543"
					orderState="menu open"
					orderCancel={orderCancelSpy}
				/>)
				wrapper.find(Button).simulate('click')
				expect(orderCancelSpy).to.have.been.calledOnce
				expect(orderCancelSpy).to.have.been.calledWithExactly('543')
			})

			it('should call the close function when clicking the Cancel Box button', function() {
				const closeSpy = sandbox.spy()
				wrapper = shallow(<OrderCancelButton
					orderState="menu open"
					close={closeSpy}
				/>)
				wrapper.find(Button).simulate('click')
				expect(closeSpy).to.have.been.calledOnce
				expect(closeSpy).to.have.been.calledWithExactly()
			})
		})
	})
})
