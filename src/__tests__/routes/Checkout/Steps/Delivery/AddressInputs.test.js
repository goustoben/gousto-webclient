import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import AddressInputs from 'routes/Checkout/Components/Delivery/AddressInputs'
import TextInput from 'Form/Input'

describe('AddressInputs', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<AddressInputs />)
  })

  describe('rendering', () => {
    test('should return div', () => {
      expect(wrapper.type()).toBe('div')
    })

    test('should render 4 <TextInput> components', () => {
      expect(wrapper.find(TextInput)).toHaveLength(4)
    })
  })

  describe('sensitive data masking', () => {
    test('all <TextInput /> component(s) should have prop "mask"', () => {
      expect(
        wrapper
          .find(TextInput)
          .at(0)
          .prop('mask'),
      ).toBe(true)
      expect(
        wrapper
          .find(TextInput)
          .at(1)
          .prop('mask'),
      ).toBe(true)
      expect(
        wrapper
          .find(TextInput)
          .at(2)
          .prop('mask'),
      ).toBe(true)
      expect(
        wrapper
          .find(TextInput)
          .at(3)
          .prop('mask'),
      ).toBe(true)
    })
  })
})
