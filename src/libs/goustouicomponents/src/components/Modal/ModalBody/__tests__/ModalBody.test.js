import React from 'react'
import { shallow } from 'enzyme'

import { ModalBody } from '..'

let wrapper

describe('Given <ModalBody> is used', () => {
  beforeEach(() => {
    wrapper = shallow(<ModalBody><div data-testing="mock-child" /></ModalBody>)
  })

  test('Then children are rendered as expected', () => {
    expect(wrapper.exists('[data-testing="mock-child"]')).toEqual(true)
  })
})
