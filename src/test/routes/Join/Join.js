import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'
import JoinComponent from 'routes/Join/Join'
import HomeSections from 'routes/Home/HomeSections'

describe('Join', function() {
  let Join
  let menuFetchData
  let wrapper
  let homeLoadCarouselSpy
  let dispatchSpy

  beforeEach(function() {
    dispatchSpy = sinon.spy()
    homeLoadCarouselSpy = sinon.stub().returns('returned from homeLoadCarouselSpy')
    menuFetchData = sinon.spy()
    Join = require('inject-loader!routes/Join/Join')({ // eslint-disable-line global-require
      'routes/Menu/fetchData': menuFetchData,
      './HomeSections': () => <div></div>,
      actions: {
        homeLoadCarousel: homeLoadCarouselSpy,
      },
    }).default
  })

  describe('rendered output', function() {
    it('should display HomeSections component', function() {
      wrapper = shallow(<JoinComponent />)
      expect(wrapper.find(HomeSections)).to.have.length(1)

      expect(wrapper.find(HomeSections).prop('modules')).to.be.deep.equal([
        'hero', 'howItWorks', 'recipes',
        'testimonials', 'whatsInYourBox',
        'testedAndLovedBy',
      ])
    })
  })

  describe('feature flags output modifier', function() {

    it('should display subscription when enableSubscription is true', function() {
      wrapper = shallow(<JoinComponent enableSubscription />)
      expect(wrapper.find(HomeSections)).to.have.length(1)

      expect(wrapper.find(HomeSections).prop('modules')).to.be.deep.equal([
        'hero', 'howItWorks', 'subscription', 'recipes',
        'testimonials', 'whatsInYourBox',
        'testedAndLovedBy',
      ])
    })
    it('should not display subscription when enableSubscription is false', function() {
      wrapper = shallow(<JoinComponent enableSubscription={false} />)
      expect(wrapper.find(HomeSections)).to.have.length(1)
      expect(wrapper.find(HomeSections).prop('modules')).to.be.deep.equal([
        'hero', 'howItWorks', 'recipes',
        'testimonials', 'whatsInYourBox',
        'testedAndLovedBy',
      ])
    })
  })
})
