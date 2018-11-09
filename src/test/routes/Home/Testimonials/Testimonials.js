import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import Testimonials from 'routes/Home/Testimonials/Testimonials'
import { shallow } from 'enzyme'

import ModuleHeader from 'components/ModuleHeader'
import TestimonialCarousel from 'routes/Home/Testimonials/TestimonialCarousel'

import CTAHomepage from 'routes/Home/CTA'

describe('Home/Testimonials', function() {
  let wrapper

  beforeEach(function() {
    wrapper = shallow(<Testimonials />)
  })

  it('should render a ModuleHeader', function() {
    expect(wrapper.find(ModuleHeader)).to.have.length(1)
  })

  it('should render a TestimonialCarousel', function() {
    expect(wrapper.find(TestimonialCarousel)).to.have.length(1)
  })

  it('should render a CTAHomepage', function() {
    expect(wrapper.find(CTAHomepage)).to.have.length(1)
  })

  it('should display ctaText in CTAHomepage', function() {
    wrapper = shallow(<Testimonials ctaText="Sample CTA Text" />)
    expect(wrapper.find(CTAHomepage).prop('children')).to.equal('Sample CTA Text')
  })

  it('should redirect to ctaUri on CTAHomepage click', function() {
    const redirectSpy = sinon.spy()
    wrapper = shallow(<Testimonials redirect={redirectSpy} ctaUri="http://exampleuri.com" />)
    wrapper.find(CTAHomepage).simulate('click')
    expect(redirectSpy.callCount).to.equal(1)
    expect(redirectSpy.firstCall).to.be.calledWithExactly('http://exampleuri.com')
  })

  it('should not have a Storystream element by default', function() {
    expect(wrapper.find('Storystream')).to.have.length(0)
  })

  it('with the enableStorystream prop it should have a Storystream element', function() {
    wrapper = shallow(<Testimonials enableStorystream />)
    expect(wrapper.find('Storystream')).to.have.length(1)
  })
})
