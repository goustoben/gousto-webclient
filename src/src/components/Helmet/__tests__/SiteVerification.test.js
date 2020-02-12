import React from 'react'
import { shallow } from 'enzyme'
import Helmet from 'react-helmet'

import SiteVerification from 'Helmet/SiteVerification'

describe('Helmet SiteVerification', () => {
  const wrapper = shallow(<SiteVerification />)

  test('should return 1 Helmet', () => {
    expect(wrapper.type()).toEqual(Helmet)
  })

  test('should set correct google-site-verification', () => {
    expect(wrapper.prop('meta')).toContainEqual({
      name: 'google-site-verification',
      content: 'DGVXZ3PvnmsDtu8yQMQ0sw5gADyU_gd_cbN7ZZXozQ4',
    })
  })

  test('should set correct p:domain_verify', () => {
    expect(wrapper.prop('meta')).toContainEqual({
      name: 'p:domain_verify',
      content: 'adfa0b85592a79dcce9f843e17825583',
    })
  })

  test('should set correct bing webmaster tools validation', () => {
    expect(wrapper.prop('meta')).toContainEqual({
      name: 'msvalidate.01',
      content: 'F155B4DB69FB385148413701F29E16CF',
    })
  })
})
