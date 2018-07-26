import React from 'react'
import Image from 'routes/Signup/Image'
import Button from 'routes/Signup/Button'

import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import { shallow } from 'enzyme'
import BoxSizeStep from 'routes/Signup/Steps/BoxSize/BoxSizeStep'

describe('BoxSizeStep', function() {
	let wrapper
	let numPortionChangeSpy
	let nextSpy

	beforeEach(function() {
		numPortionChangeSpy = sinon.spy()
		nextSpy = sinon.spy()
		wrapper = shallow(<BoxSizeStep numPortionChange={numPortionChangeSpy} next={nextSpy} />)
	})

	it('should return a span', function() {
		expect(wrapper.type()).to.equal('span')
	})

	it('should render an Image', function() {
		expect(wrapper.find(Image)).to.have.length(1)
	})

	it('should render two Buttons', function() {
		expect(wrapper.find(Button)).to.have.length(2)
	})

	it('should call numPortionChange with 2 then next prop when the first segment is clicked', function() {
		wrapper.find(Button).at(0).simulate('click')
		expect(numPortionChangeSpy.getCall(0).args[0]).to.equal(2)
		expect(nextSpy.called).to.equal(true)
	})

	it('should call numPortionChange with 4 then next prop when the second segment is clicked', function() {
		wrapper.find(Button).at(1).simulate('click')
		expect(numPortionChangeSpy.getCall(0).args[0]).to.equal(4)
		expect(nextSpy.called).to.equal(true)
	})
})
