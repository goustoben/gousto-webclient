import React from 'react'
import { mount } from 'enzyme'
import { LoadingWrapper } from '../LoadingWrapper'

describe('OrderConfirmationHeadrer', () => {
  test('should render the LoadingWrapper', () => {
    const wrapper = mount(<LoadingWrapper />)
    expect(wrapper.find('loading_image')).toBeDefined()
  })
})
