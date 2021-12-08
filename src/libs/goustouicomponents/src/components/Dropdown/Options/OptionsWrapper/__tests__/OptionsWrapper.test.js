import React from 'react'
import { mount } from 'enzyme'

import { OptionsWrapper } from '../OptionsWrapper.logic'

let wrapper

const mockProps = {
  isMobile: true,
  name: 'mock name',
  toggleOptionsVisibility: () => { },
  isExpanded: false,
}

const mountWithProps = (props) => {
  wrapper = mount(
    <OptionsWrapper {...mockProps} {...props}>
      <div data-testing="child" />
    </OptionsWrapper>,
  )
}

describe('OptionsWrapper', () => {
  describe('Given isMobile is true', () => {
    beforeEach(() => {
      mountWithProps()
    })

    test('Then a Modal should be rendered', () => {
      expect(wrapper.find('Modal').exists()).toEqual(true)
    })

    test('Then the Modal should be closed', () => {
      expect(wrapper.find('Modal').prop('isOpen')).toBeFalsy()
      expect(wrapper.find('ModalHeader').exists()).toBeFalsy()
    })

    describe('When isExpanded is true', () => {
      beforeEach(() => {
        wrapper.setProps({ isExpanded: true })
      })

      test('Then the Modal should be open', () => {
        expect(wrapper.find('Modal').prop('isOpen')).toBeTruthy()
      })

      test('Then the Modal Heading is rendered', () => {
        expect(
          wrapper.find('ModalHeader').text(),
        ).toEqual('mock name')
      })

      test('Then the children are rendered within the Modal', () => {
        expect(wrapper.find('[data-testing="child"]').exists()).toEqual(true)
      })
    })
  })

  describe('Given isMobile is false', () => {
    beforeEach(() => {
      mountWithProps({ isMobile: false })
    })

    test('Then the class that shows the children should be unset', () => {
      expect(wrapper.find('.wrapper').hasClass('isExpanded')).toBeFalsy()
    })

    test('Then options are rendered as expected', () => {
      expect(wrapper.find('[data-testing="child"]').exists()).toEqual(true)
    })

    describe('When isExpanded is true', () => {
      beforeEach(() => {
        wrapper.setProps({ isExpanded: true })
      })

      test('Then the class that shows the children should be set', () => {
        expect(wrapper.find('.wrapper').hasClass('isExpanded')).toBeTruthy()
      })
    })
  })
})
