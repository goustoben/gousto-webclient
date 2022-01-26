import React from 'react'
import { shallow } from 'enzyme'
import { SubscriptionTransparencyText } from '../SubscriptionTransparencyText'

describe('SubscriptionTransparencyText', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<SubscriptionTransparencyText />)
  })

  test('should be rendered properly', () => {
    expect(wrapper.find('.container').exists()).toBeTruthy()
    expect(wrapper.find('.text').exists()).toBeTruthy()
    expect(wrapper.find('.highlighted').exists()).toBeTruthy()
    expect(wrapper.find('Svg').exists()).toBeTruthy()
  })
})
