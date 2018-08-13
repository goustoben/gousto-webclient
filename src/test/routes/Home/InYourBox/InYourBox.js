import { expect } from 'chai'
import sinon from 'sinon'

import React from 'react'
import InYourBox from 'routes/Home/InYourBox/InYourBox'
import { shallow } from 'enzyme'

import CTAHomepage from 'routes/Home/CTA'

describe('InYourBox', function() {
	let wrapper

	beforeEach(function() {
		wrapper = shallow(<InYourBox />)
	})

	it('should render a div', function() {
		expect(wrapper.type()).to.equal('div')
	})

	it('should render a CTAHomepage', function() {
		expect(wrapper.find(CTAHomepage)).to.have.length(1)
	})

	it('should display ctaText in CTAHomepage', function() {
		wrapper = shallow(<InYourBox ctaText="Sample CTA Text" />)
		expect(wrapper.find(CTAHomepage).prop('children')).to.equal('Sample CTA Text')
	})

	it('should redirect to ctaUri on CTAHomepage click', function() {
		const redirectSpy = sinon.spy()
		wrapper = shallow(<InYourBox redirect={redirectSpy} ctaUri="http://exampleuri.com" />)
		wrapper.find(CTAHomepage).simulate('click')
		expect(redirectSpy.callCount).to.equal(1)
		expect(redirectSpy.firstCall).to.be.calledWithExactly('http://exampleuri.com')
	})
})
