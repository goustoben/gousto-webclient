import React from 'react'
import { shallow } from 'enzyme'
import { SubscriptionTransparency } from '../SubscriptionTransparency'

describe('SubscriptionTransparency', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<SubscriptionTransparency />)
  })

  test('should be rendered properly', () => {
    expect(wrapper.find('.container').exists()).toBeTruthy()
    expect(wrapper.find('.highlighted').exists()).toBeTruthy()
    expect(wrapper.find('Svg').exists()).toBeTruthy()
  })
})
