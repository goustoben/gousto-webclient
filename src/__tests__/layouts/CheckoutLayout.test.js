import React from 'react'
import { shallow } from 'enzyme'
import CheckoutLayout from 'layouts/CheckoutLayout/CheckoutLayout'
import { Header } from 'Header'

describe('CheckoutLayout', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <CheckoutLayout>
        <span />
      </CheckoutLayout>
    )
  })
  test('should return a <span>', () => {
    expect(wrapper.type()).toBe('span')
  })

  test('should return a <Header>', () => {
    expect(wrapper.find(Header).length).toBe(1)
  })

})
