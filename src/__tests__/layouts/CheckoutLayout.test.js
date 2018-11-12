import React from 'react'
import { shallow } from 'enzyme'
import CheckoutLayout from 'layouts/CheckoutLayout/CheckoutLayout'
import Header from 'Header'
import Footer from 'components/Footer/Footer'

describe('CheckoutLayout', () => {
  test('should return a <span>', () => {
    const wrapper = shallow(<CheckoutLayout />)

    expect(wrapper.type()).toBe('span')
  })

  test('should return a <Header>', () => {
    const wrapper = shallow(<CheckoutLayout />)

    expect(wrapper.find(Header).length).toBe(1)
  })

  test('should return a <Footer>', () => {
    const wrapper = shallow(<CheckoutLayout />)

    expect(wrapper.find(Footer).length).toBe(1)
  })
})
