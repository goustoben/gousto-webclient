import React from 'react'
import { mount } from 'enzyme'

import { Svg } from './Svg'

const mountWithProps = (props = {}) => mount(<Svg fileName="paypal" {...props} />)

describe('Svg', () => {
  it('adds aria-label if label prop is passed', () => {
    const wrapper = mountWithProps({ label: 'mock-label' })

    expect(wrapper.find('div[aria-label="mock-label"]').exists()).toEqual(true)
  })

  it('adds fileName prop to classnames as expected', () => {
    const wrapper = mountWithProps()

    expect(wrapper.find('div[role="img"]').hasClass('paypal')).toEqual(true)
  })

  it('adds className prop to classnames as expected', () => {
    const wrapper = mountWithProps({ className: 'mock-classname' })

    expect(wrapper.find('div[role="img"]').hasClass('mock-classname')).toEqual(true)
  })
})
