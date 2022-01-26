import React from 'react'
import { shallow } from 'enzyme'
import { CheckoutLayout } from '../CheckoutLayout'

describe('CheckoutLayout', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<CheckoutLayout><div className="child">hello</div></CheckoutLayout>)
  })

  test('renders correctly', () => {
    expect(wrapper.find('Connect(Header)').exists()).toBe(true)
    expect(wrapper.find('Connect(Header)').prop('simple')).toBe(true)
    expect(wrapper.find('.child').text()).toBe('hello')
  })
})
