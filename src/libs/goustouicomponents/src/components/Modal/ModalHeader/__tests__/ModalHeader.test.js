import React from 'react'
import { shallow } from 'enzyme'

import { ModalHeader } from '..'

let wrapper

describe('Given <ModalHeader> is used', () => {
  beforeEach(() => {
    wrapper = shallow(<ModalHeader>Mock CTA Content</ModalHeader>)
  })

  test('Then children are rendered as expected', () => {
    expect(wrapper.find('[data-testing="modal-header"]').text()).toEqual('Mock CTA Content')
  })
})
