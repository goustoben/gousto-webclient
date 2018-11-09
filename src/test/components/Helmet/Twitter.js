import React from 'react'
import { shallow } from 'enzyme'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import Helmet from 'react-helmet'
import Twitter from 'Helmet/Twitter'

describe('Helmet SiteVerification', function() {
  it('should return 1 Helmet', function() {
    expect(shallow(<Twitter />).type()).to.equal(Helmet)
  })

  describe('props', function() {
    const wrapper = shallow(<Twitter href="http://www.something.com/abc" />)

    it('should set correct twitter:card', function() {
      expect(wrapper.prop('meta')).to.contain({
        name: 'twitter:card',
        content: 'summary',
      })
    })

    it('should set correct twitter:creator', function() {
      expect(wrapper.prop('meta')).to.contain({
        name: 'twitter:creator',
        content: '@goustocooking',
      })
    })

    it('should set correct twitter:image:width', function() {
      expect(wrapper.prop('meta')).to.contain({
        name: 'twitter:image:width',
        content: 1267,
      })
    })

    it('should set correct twitter:image:height', function() {
      expect(wrapper.prop('meta')).to.contain({
        name: 'twitter:image:height',
        content: 766,
      })
    })

    it('should set correct twitter:site', function() {
      expect(wrapper.prop('meta')).to.contain({
        name: 'twitter:site',
        content: '@goustocooking',
      })
    })

    it('should set twitter:url to provided href', function() {
      expect(wrapper.prop('meta')).to.contain({
        name: 'twitter:url',
        content: 'http://www.something.com/abc',
      })
    })
  })
})
