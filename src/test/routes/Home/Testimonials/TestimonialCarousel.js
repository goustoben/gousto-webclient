import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'

import Carousel from 'Carousel'
import Testimonial from 'routes/Home/Testimonials/TestimonialCarousel/Testimonial'

describe('Home/Testimonials/TestimonialCarousel', function() {
  let wrapper
  let testimonials
  let TestimonialCarousel
  beforeEach(function() {
    testimonials = [{}, {}, {}]
    TestimonialCarousel = require('inject-loader!routes/Home/Testimonials/TestimonialCarousel/TestimonialCarousel')({
      'config/home': {
        testimonials,
      },
    }).default
    wrapper = shallow(<TestimonialCarousel />)
  })

  it('should render a Carousel', function(){
    expect(wrapper.find(Carousel)).to.have.length(1)
  })

  it('should render as many Testimonials as in the testimonials config', function(){
    expect(wrapper.find(Testimonial)).to.have.length(3)
  })

  describe('with a testimonials prop', function(){
    beforeEach(function(){
      testimonials = [{}, {}]
      wrapper = shallow(<TestimonialCarousel testimonials={testimonials} />)
    })

    it('should render as many Testimonials as are in the prop', function(){
      expect(wrapper.find(Testimonial)).to.have.length(2)
    })
  })
})
