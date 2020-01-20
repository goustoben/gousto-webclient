import React from 'react'
import { shallow } from 'enzyme'
import { SubscriptionTransparencyText } from "../SubscriptionTransparencyText"

describe('SubscriptionTransparencyText', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<SubscriptionTransparencyText />)
  })
  
  test('should render a span with correct text', () => {
    expect(wrapper.find('span').text()).toContain('No commitment. No cancellation fees.')
  })
  
  test('should render a paragraph with correct text', () => {
    expect(wrapper.find('p').text()).toContain('Skip a box or cancel your subscription online at anytime.')
  })
})
