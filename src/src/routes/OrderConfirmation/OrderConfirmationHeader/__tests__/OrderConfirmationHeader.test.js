import React from 'react'
import { mount } from 'enzyme'
import { OrderConfirmationHeader } from '../OrderConfirmationHeader'

describe('OrderConfirmationHeadrer', () => {
  const testProps = {
    deliveryDate: 'Saturday 23rd March',
    deliveryStart: '8 am',
    deliveryEnd: '7 pm',
    whenCutoffTime: '12 pm',
    whenCutoffDate: 'Wednesday 20th March',
  }

  const wrapper = mount(<OrderConfirmationHeader {...testProps} />)
  test('should render the order confirmation header with the correct props', () => {
    expect(wrapper.text()).toContain('Saturday 23rd March')
    expect(wrapper.text()).toContain('8 am')
    expect(wrapper.text()).toContain('7 pm')
    expect(wrapper.text()).toContain('12 pm')
    expect(wrapper.text()).toContain('Wednesday 20th March')
  })
})