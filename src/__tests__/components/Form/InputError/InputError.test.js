import React from 'react'

import { shallow } from 'enzyme'
import InputError from 'Form/InputError'

describe('InputError', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<InputError>No Message</InputError>)
  })

  test('should return a <p> tag', () => {
    expect(wrapper.type()).toEqual('p')
  })

  test('should show the children', () => {
    expect(wrapper.text()).toEqual('No Message')
  })
})
