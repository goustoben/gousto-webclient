import React from 'react'
import { shallow } from 'enzyme'
import { AlertCheckoutOverhaul } from '../AlertCheckoutOverhaul'

describe('Given AlertCheckoutOverhaul', () => {
  let wrapper
  const children = <div>children</div>

  beforeEach(() => {
    wrapper = shallow(<AlertCheckoutOverhaul>{children}</AlertCheckoutOverhaul>)
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('.alert').exists()).toBeTruthy()
    expect(wrapper.find('Svg').exists()).toBeTruthy()
    expect(wrapper.find('.content').exists()).toBeTruthy()
  })
})
