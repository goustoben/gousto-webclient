import React from 'react'
import { shallow } from 'enzyme'
import { CardDetailsModal } from '../CardDetailsModal'

describe('Given CardDetailsModal', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<CardDetailsModal />)
  })

  test('should be rendered properly', () => {
    expect(wrapper.find('Overlay').exists()).toBeTruthy()
    expect(wrapper.find('Modal').exists()).toBeTruthy()
    expect(wrapper.find('ModalHeader').exists()).toBeTruthy()
  })
})
