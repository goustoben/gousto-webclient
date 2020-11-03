import React from 'react'
import { shallow } from 'enzyme'
import { Subscription } from './Subscription'

describe('Subscription', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Subscription />)
  })
  test('should render Subscription continer', () => {
    expect(wrapper.find('.subscriptionPage')).toHaveLength(1)
  })
})
