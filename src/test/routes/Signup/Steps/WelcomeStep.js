import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import { shallow } from 'enzyme'
import React from 'react'
import Button from 'routes/Signup/Button'
import { Segment } from 'goustouicomponents'

import WelcomeStep from 'routes/Signup/Steps/Welcome/WelcomeStep'
import Image from 'routes/Signup/Image'

describe('Signup/Steps/Welcome', function() {
	let wrapper
	let nextSpy

	beforeEach(function() {
		nextSpy = sinon.spy()

		wrapper = shallow(<WelcomeStep
			next={nextSpy}
		/>)
	})

	it('should render a span', function() {
		expect(wrapper.type()).to.equal('span')
	})

	it('should render an image', function() {
		expect(wrapper.find(Image)).to.have.length(1)
	})

	it('should render a Button', function() {
		expect(wrapper.find(Button)).to.have.length(1)
	})

	it('should call the next prop on Button click', function() {
		wrapper.find(Button).at(0).simulate('click')
		expect(nextSpy).to.have.been.calledOnce
	})
})
