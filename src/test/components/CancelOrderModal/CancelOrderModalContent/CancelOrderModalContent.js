import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'

import CancelOrderModalContent from 'CancelOrderModal/CancelOrderModalContent/CancelOrderModalContent.js'
import css from 'CancelOrderModal/CancelOrderModalContent/CancelOrderModalContent.css'

describe('CancelOrderModalContent', function() {
	let wrapper
	let closeSpy
	let orderCancelStub
	let cancelOrderModalToggleVisibilitySpy

	beforeEach(function() {
		wrapper = shallow(<CancelOrderModalContent />)
	})

	it('should return the correct body text', function() {
		const className = `.${css.modalTitle.split(' ').join('.')}`
		expect(wrapper.find(className)).to.have.length(1)
		expect(wrapper.find(className).text()).to.equal('Cancel this box?')
		const classNameBody = `.${css.modalBodyText.split(' ').join('.')}`
		expect(wrapper.find(classNameBody)).to.have.length(1)
		expect(wrapper.find(classNameBody).text()).to.equal('Just double-checking – if you click yes, we can’t restore this delivery. Please confirm your choice:')
	})

	it('should render two Buttons', function() {
		expect(wrapper.find('Button').length).to.equal(2)
	})

	it('should call to close when clicking the go back button', function() {
		closeSpy = sinon.spy()
		wrapper = shallow(<CancelOrderModalContent close={closeSpy} />)
		const goBackButton = wrapper.find('Button').first()
		goBackButton.simulate('click')
		expect(closeSpy).to.have.been.calledOnce
	})

	it('should call to the cancel order action when clicking the cancel button', function() {
		orderCancelStub = sinon.stub().returns(new Promise(resolve => resolve()))
		cancelOrderModalToggleVisibilitySpy = sinon.spy()
		wrapper = shallow(<CancelOrderModalContent
			orderCancel={orderCancelStub}
			orderId="23547"
			cancelOrderModalToggleVisibility={cancelOrderModalToggleVisibilitySpy}
		/>)
		const cancelButton = wrapper.find('Button').last()
		cancelButton.simulate('click')
		expect(orderCancelStub).to.have.been.calledOnce
		expect(orderCancelStub).to.have.been.calledWithExactly('23547')
	})

	it('should render an Alert with some text when cancelling the box errors', function() {
		wrapper = shallow(<CancelOrderModalContent didCancelOrderError />)
		const alert = wrapper.find('Alert')
		const alertText = alert.props('children').children
		expect(alert).to.have.length(1)
		expect(alertText).to.equal('Whoops, there was a problem cancelling this order, please try again.')
	})
})
