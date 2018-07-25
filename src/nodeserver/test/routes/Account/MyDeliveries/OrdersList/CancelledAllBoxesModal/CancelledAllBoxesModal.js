import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import CancelledAllBoxesModal from 'routes/Account/MyDeliveries/OrdersList/CancelledAllBoxesModal/CancelledAllBoxesModal'
import css from 'routes/Account/MyDeliveries/OrdersList/CancelledAllBoxesModal/CancelledAllBoxesModal.css'

describe('CancelledAllBoxesModal', function() {
	let wrapper

	beforeEach(function() {
		wrapper = shallow(<CancelledAllBoxesModal />)
	})

	it('should return an Overlay', function () {
		expect(wrapper.text()).to.equal('<Overlay />')
	})

	it('should pass the isModalOpen prop to the Overlay\'s open prop', function() {
		wrapper = shallow(<CancelledAllBoxesModal isModalOpen />)
		expect(wrapper.find('Overlay').prop('open')).to.equal(true)
		wrapper = shallow(<CancelledAllBoxesModal isModalOpen={false} />)
		expect(wrapper.find('Overlay').prop('open')).to.equal(false)
	})

	it('should return a <ModalPanel>', function() {
		expect(wrapper.find('ModalPanel').length).to.equal(1)
	})

	it('should return the correct header', function() {
		expect(wrapper.find('h2')).to.have.length(1)
		expect(wrapper.find('h2').text()).to.equal('Manage your subscription')
	})

	it('should render the correct body text', function() {
		const className = `.${css.modalBodyText.split(' ').join('.')}`
		expect(wrapper.find(className)).to.have.length(1)
		expect(wrapper.find(className).text()).to.equal('We noticed you\'ve cancelled all your upcoming boxes, so want to double-check: Would you like to pause for now or keep your subscription active?')
	})

	it('should render the correct message for each pending order date passed to the component', function() {
		const pendingOrdersDates = Immutable.Map({ 123: '2003-01-02', 456: '2003-03-04', 789: '2003-05-06' })
		wrapper = shallow(<CancelledAllBoxesModal pendingOrdersDates={pendingOrdersDates} />)

		const selector = `.${css.modalBodyText.split(' ').join('.')} ul li`
		expect(wrapper.find(selector)).to.have.length(3)
		expect(wrapper.find(selector).at(0).text()).to.equal('We\'ll deliver your box on 2 January as requested')
		expect(wrapper.find(selector).at(1).text()).to.equal('We\'ll deliver your box on 4 March as requested')
		expect(wrapper.find(selector).at(2).text()).to.equal('We\'ll deliver your box on 6 May as requested')
	})

	it('should render two buttons', function() {
		expect(wrapper.find('Button')).to.have.length(2)
	})

	describe('first button', function() {
		it('should render the button with the correct text', function() {
			expect(wrapper.find('Button').at(0).childAt(0).text()).to.equal('Keep subscription active')
		})

		it('should close the modal when clicked', function() {
			const toggleModalVisibilitySpy = sinon.spy()
			wrapper = shallow(<CancelledAllBoxesModal toggleModalVisibility={toggleModalVisibilitySpy} />)
			wrapper.find('Button').at(0).simulate('click')

			expect(toggleModalVisibilitySpy).to.have.been.calledOnce
			expect(toggleModalVisibilitySpy).to.have.been.calledWithExactly(false)
		})
	})

	describe('second button', function() {
		it('should render the second button with the correct text', function() {
			expect(wrapper.find('Button').at(1).childAt(0).text()).to.equal('Pause subscription')
		})

		it('should be rendered inside a Link component pointing to /my-subscription', function() {
			expect(wrapper.find('Button').at(1).parent().text()).to.equal('<GoustoLink />')
			expect(wrapper.find('Button').at(1).parent().prop('to')).to.equal('/my-subscription')
		})
	})
})
