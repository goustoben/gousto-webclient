import React from 'react'
import Image from 'routes/Signup/Image'
import Button from 'routes/Signup/Button'
import Segment from 'Button/Segment'

import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import { shallow } from 'enzyme'
import PeopleCookFor from 'routes/Signup/Steps/PeopleCookFor'

describe('PeopleCookFor', function() {
	let wrapper
	let numPeopleChangeSpy
	let nextSpy

	beforeEach(function() {
		numPeopleChangeSpy = sinon.spy()
		nextSpy = sinon.spy()
		wrapper = shallow(<PeopleCookFor numPeopleChange={numPeopleChangeSpy} next={nextSpy} />)
	})

	it('should return a span', function() {
		expect(wrapper.type()).to.equal('span')
	})

	it('should render an Image', function() {
		expect(wrapper.find(Image)).to.have.length(1)
	})

	it('should render 4 Buttons with a Segment each', function() {
		expect(wrapper.find(Button)).to.have.length(4)
		expect(wrapper.find(Segment)).to.have.length(4)
	})

	it('should call numPeopleChange with 2 then next prop when the second segment is clicked', function() {
		wrapper.find(Segment).at(1).simulate('click')
		expect(numPeopleChangeSpy.getCall(0).args[0]).to.equal(2)
		expect(nextSpy.called).to.equal(true)
	})

	it('should call numPeopleChange with 3 then next prop when the third segment is clicked', function() {
		wrapper.find(Segment).at(2).simulate('click')
		expect(numPeopleChangeSpy.getCall(0).args[0]).to.equal(3)
		expect(nextSpy.called).to.equal(true)
	})

	it('should call numPeopleChange with 5 then next prop when the span is clicked', function() {
		wrapper.find('span').at(1).simulate('click')
		expect(numPeopleChangeSpy.getCall(0).args[0]).to.equal(5)
		expect(numPeopleChangeSpy.getCall(0).args[1]).to.be.undefined
		expect(nextSpy.called).to.equal(true)
	})
})
