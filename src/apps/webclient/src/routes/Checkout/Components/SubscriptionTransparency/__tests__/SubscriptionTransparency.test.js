import React from 'react'

import { shallow } from 'enzyme'

import { SubscriptionTransparency } from '../SubscriptionTransparency'

describe('SubscriptionTransparency', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<SubscriptionTransparency />)
  })

  test('should be rendered properly', () => {
    expect(
      wrapper.text().includes('Skip a box or cancel your subscription online at anytime.'),
    ).toBe(true)

    expect(wrapper.find({ 'data-testing': 'highlighted' }).exists()).toBeTruthy()
    expect(wrapper.find({ 'data-testing': 'container' }).exists()).toBeTruthy()
  })
})
