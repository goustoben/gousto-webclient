import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import GoustoHelmet from 'Helmet/GoustoHelmet'
import CanonicalLink from 'Helmet/CanonicalLink'
import Facebook from 'Helmet/Facebook'
import OpenGraph from 'Helmet/OpenGraph'
import Twitter from 'Helmet/Twitter'
import SiteVerification from 'Helmet/SiteVerification'

import templateConfig from 'config/template'
import globals from 'config/globals'

describe('Helmet GoustoHelmet', () => {
  let domain
  let protocol

  beforeEach(() => {
    protocol = sinon.stub(globals, 'protocol').get(function() {
      return '<protocol>'
    })
    domain = sinon.stub(globals, 'domain').get(function() {
      return '<domain>'
    })
  })

  afterEach(() => {
    domain.restore()
    protocol.restore()
  })

  test('should return 1 span by default', () => {
    expect(shallow(<GoustoHelmet />).type()).toBe('span')
  })

  test('should return null if noGTM is set', () => {
    expect(shallow(<GoustoHelmet noGTM />).type()).toBe(null)
  })

  describe('rendering', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<GoustoHelmet requestUrl="/something" />)
    })
    test('should contain 1 CanonicalLink', () => {
      expect(wrapper.children(CanonicalLink)).toHaveLength(1)
    })

    test('should contain 1 Facebook', () => {
      expect(wrapper.children(Facebook)).toHaveLength(1)
    })

    test('should contain 1 OpenGraph', () => {
      expect(wrapper.children(OpenGraph)).toHaveLength(1)
    })

    test('should contain 1 Twitter', () => {
      expect(wrapper.children(Twitter)).toHaveLength(1)
    })

    test('should contain 1 SiteVerification', () => {
      expect(wrapper.children(SiteVerification)).toHaveLength(1)
    })
  })

  describe('CanonicalLink', () => {
    test('should set href to root + url if requestUrl IS NOT "/home"', () => {
      const wrapper = shallow(<GoustoHelmet requestUrl="/home/something" />)

      expect(wrapper.children(CanonicalLink).prop('href')).toBe(
        '<protocol>://www.<domain>/home/something',
      )
    })
  })

  describe('Facebook', () => {
    let wrapper
    let templateConfigHead

    beforeEach(() => {
      templateConfigHead = sinon.stub(templateConfig, 'head').get(function() {
        return {
          fbAppID: 'abc123',
          fbAdmins: ['admin1id', 'admin2id'],
        }
      })
      wrapper = shallow(<GoustoHelmet />)
    })

    afterEach(() => {
      templateConfigHead.restore()
    })

    test('should set admins to fbAdmins value from head config', () => {
      expect(wrapper.children(Facebook).prop('admins')).toEqual([
        'admin1id',
        'admin2id',
      ])
    })

    test('should set appId to fbAppID value from head config', () => {
      expect(wrapper.children(Facebook).prop('appID')).toEqual('abc123')
    })
  })

  describe('OpenGraph', () => {
    test('should set href to root + requestUrl', () => {
      const wrapper = shallow(<GoustoHelmet requestUrl="/home" />)
      expect(wrapper.children(OpenGraph).prop('href')).toBe(
        '<protocol>://www.<domain>/home',
      )
    })
  })

  describe('Twitter', () => {
    test('should set href to root + requestUrl', () => {
      const wrapper = shallow(<GoustoHelmet requestUrl="/home" />)
      expect(wrapper.children(Twitter).prop('href')).toBe(
        '<protocol>://www.<domain>/home',
      )
    })
  })
})
