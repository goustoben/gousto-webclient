import React from 'react'
import { shallow } from 'enzyme'
import { Alert } from '../Alert'

describe('Given Alert', () => {
  let wrapper
  const children = <div>children</div>

  beforeEach(() => {
    wrapper = shallow(<Alert>{children}</Alert>)
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('.alert').exists()).toBeTruthy()
    expect(wrapper.find('Svg').exists()).toBeTruthy()
    expect(wrapper.find('.content').exists()).toBeTruthy()
  })
})
