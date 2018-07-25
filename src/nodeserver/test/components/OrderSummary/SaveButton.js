import React from 'react'

import sinon from 'sinon'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import { shallow } from 'enzyme'
import SaveButton from 'OrderSummary/SaveButton'
import Button from 'Button'

describe('SaveButton', function() {
	it('should return a <div>', function() {
		const wrapper = shallow(<SaveButton />)
		expect(wrapper.type()).to.equal('div')
	})
	it('should show Button if saveRequired', function() {
		const wrapper = shallow(<SaveButton saveRequired />)
		expect(wrapper.find(Button).length).to.equal(1)
	})
	it('should not show Button if not saveRequired', function() {
		const wrapper = shallow(<SaveButton saveRequired={false} />)
		expect(wrapper.find(Button).length).to.equal(0)
	})
	it('should disable Button when saving', function() {
		const wrapper = shallow(<SaveButton saving saveRequired />)
		expect(wrapper.find(Button).prop('disabled')).to.equal(true)
	})
	it('should pass pending Button when saving', function() {
		const wrapper = shallow(<SaveButton saving saveRequired />)
		expect(wrapper.find(Button).prop('pending')).to.equal(true)
	})
	it('should call onClick function when clicked', function() {
		let clickSpy = sinon.stub()
		const wrapper = shallow(<SaveButton onClick={clickSpy} saveRequired />)
		wrapper.find(Button).simulate('click')
		expect(clickSpy).to.have.been.calledOnce
	})
	it('should set showError state if props saving flips off with error', function() {
		const wrapper = shallow(<SaveButton error saving />)
		expect(wrapper.state('showError')).to.equal(false)
		wrapper.setProps({ saving: false })
		expect(wrapper.state('showError')).to.equal(true)
		expect(wrapper.state('showSuccess')).to.equal(false)
	})
	it('should set showSuccess state if props saving flips off without error', function() {
		const wrapper = shallow(<SaveButton error={false} saving />)
		expect(wrapper.state('showSuccess')).to.equal(false)
		wrapper.setProps({ saving: false })
		expect(wrapper.state('showSuccess')).to.equal(true)
		expect(wrapper.state('showError')).to.equal(false)
	})
	it('should set showButton state if props saving flips off without error', function() {
		const wrapper = shallow(<SaveButton error={false} saving saveRequired />)
		expect(wrapper.state('showButton')).to.equal(true)
		wrapper.setProps({ saving: false })
		expect(wrapper.state('showButton')).to.equal(false)
	})
	it('should show button if showButton state true', function() {
		const wrapper = shallow(<SaveButton />)
		expect(wrapper.find('Button').length).to.deep.equal(0)
		wrapper.setState({ showButton: true })
		expect(wrapper.find('Button').length).to.deep.equal(1)
	})
	it('should show success div if showSucess state', function() {
		const wrapper = shallow(<SaveButton />)
		expect(wrapper.find('div').length).to.deep.equal(1)
		wrapper.setState({ showSuccess: true })
		expect(wrapper.find('div').at(1).text()).to.deep.equal('SAVED')
	})
	it('should show error div if showError state', function() {
		const wrapper = shallow(<SaveButton />)
		expect(wrapper.find('div').length).to.deep.equal(1)
		wrapper.setState({ showError: true })
		expect(wrapper.find('div').at(1).text()).to.deep.equal('ERROR SAVING CHOICES')
	})
})
