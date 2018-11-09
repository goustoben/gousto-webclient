import React from 'react'
import { shallow } from 'enzyme'

import { ModalTitle, ModalContent, ModalFooter } from 'ModalComponent'

describe('ModalTitle', () => {
  const wrapper = shallow(<ModalTitle />)

  test('render div for ModalTitle', () => {
    expect(wrapper.type()).toBe('div')
  })

  test('ModalTitle className is modalTitle', () => {
    expect(wrapper.find('div').first().prop('className')).toEqual('modalTitle')
  })
})

describe('ModalContent', () => {
  let wrapper = shallow(<ModalContent />)

  test('render div for ModalContent', () => {
    expect(wrapper.type()).toBe('div')
  })

  test('ModalContent className is modalContent', () => {
    expect(wrapper.find('div').first().prop('className')).toEqual('modalContent')
  })

  test('ModalContent render childred', () => {
    wrapper = shallow(
            <ModalContent>
                <p>Child</p>
            </ModalContent>
    )

    const firstChildWrapper = wrapper.children()

    expect(firstChildWrapper.type()).toEqual('p')
    expect(firstChildWrapper.prop('children')).toEqual('Child')
  })
})

describe('ModalFooter', () => {
  const wrapper = shallow(<ModalFooter />)

  test('render div for ModalFooter', () => {
    expect(wrapper.type()).toBe('div')
  })

  test('ModalFooter className is modalFooter', () => {
    expect(wrapper.find('div').first().prop('className')).toEqual('modalFooter')
  })
})
