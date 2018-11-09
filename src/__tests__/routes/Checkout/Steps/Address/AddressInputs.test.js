import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import { Field } from 'redux-form'
import AddressInputs from 'routes/Checkout/Components/Address/AddressInputs'

describe('AddressInputs', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<AddressInputs />)
  })

  test('should return div', () => {
    expect(wrapper.type()).toEqual('div')
  })

  describe('rendering', () => {
    test('should render 5 <Field> component(s)', () => {
      expect(wrapper.find(Field).length).toEqual(5)
    })
  })

  describe('sensitive data masking', () => {
    test('all <Field /> component(s) should have prop "mask"', () => {
      expect(
        wrapper
          .find(Field)
          .at(0)
          .prop('mask'),
      ).toEqual(true)
      expect(
        wrapper
          .find(Field)
          .at(1)
          .prop('mask'),
      ).toEqual(true)
      expect(
        wrapper
          .find(Field)
          .at(2)
          .prop('mask'),
      ).toEqual(true)
      expect(
        wrapper
          .find(Field)
          .at(3)
          .prop('mask'),
      ).toEqual(true)
    })
  })
})
