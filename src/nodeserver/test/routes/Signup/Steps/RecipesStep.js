import React from 'react'
import Image from 'routes/Signup/Image'
import Button from 'routes/Signup/Button'

import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import { shallow } from 'enzyme'
import RecipesStep from 'routes/Signup/Steps/Recipes/RecipesStep'

describe('RecipesStep', function() {
	let wrapper
	let basketSignupCollectionReceiveSpy
	let nextSpy

	beforeEach(function() {
		basketSignupCollectionReceiveSpy = sinon.spy()
		nextSpy = sinon.spy()
		wrapper = shallow(<RecipesStep next={nextSpy} basketSignupCollectionReceive={basketSignupCollectionReceiveSpy} />)
	})

	it('should return a span', function() {
		expect(wrapper.type()).to.equal('span')
	})

	it('should render an Image', function() {
		expect(wrapper.find(Image)).to.have.length(1)
	})

	it('should render six Buttons', function() {
		expect(wrapper.find(Button)).to.have.length(6)
	})

	it('should call next prop when the second button is clicked', function() {
		wrapper.find(Button).at(1).simulate('click')
		expect(nextSpy).to.have.been.calledOnce
		expect(basketSignupCollectionReceiveSpy).to.have.been.calledOnce
	})

	it('should call next prop when the span is clicked', function() {
		wrapper.find('span').at(1).simulate('click')
		expect(nextSpy.called).to.equal(true)
	})
})
