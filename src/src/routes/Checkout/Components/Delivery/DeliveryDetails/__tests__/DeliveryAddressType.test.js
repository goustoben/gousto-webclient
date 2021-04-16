import React from 'react'
import { shallow } from 'enzyme'
import { Field } from 'redux-form'
import { DeliveryAddressType } from 'routes/Checkout/Components/Delivery/DeliveryDetails/DeliveryAddressType'

describe('DeliveryAddressType', () => {
  let wrapper
  const reset = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<DeliveryAddressType reset={reset} />)
  })

  describe('rendering', () => {
    test('should return div', () => {
      expect(wrapper.type()).toBe('div')
    })

    test('should render 1 <Field> component(s)', () => {
      expect(wrapper.find(Field)).toHaveLength(1)
    })

    describe('when the value prop is "other"', () => {
      beforeEach(() => {
        wrapper.setProps({ value: 'other' })
      })

      test('should show an extra input with prop "mask"', () => {
        expect(wrapper.find(Field)).toHaveLength(2)
        expect(wrapper.find(Field).at(1).prop('mask')).toBe(true)
      })
    })

    describe('shouldShowOtherInput', () => {
      let instance

      describe('when value is "other"', () => {
        beforeEach(() => {
          wrapper.setProps({ value: 'Other' })
          instance = wrapper.instance()
        })

        test('should return true', () => {
          expect(instance.shouldShowOtherInput('Other')).toBeTruthy()
        })
      })

      describe('when value is "home"', () => {
        beforeEach(() => {
          wrapper.setProps({ value: 'home' })
          instance = wrapper.instance()
        })

        test('should return false', () => {
          expect(instance.shouldShowOtherInput('home')).toBeFalsy()
        })
      })
    })

    test('should not call reset by default', () => {
      expect(reset).not.toBeCalled()
    })

    describe('reset', () => {
      beforeEach(() => {
        wrapper.setProps({ value: 'other' })
      })

      describe('when new value is set and is not equal to "other"', () => {
        beforeEach(() => {
          wrapper.setProps({ value: 'gegege' })
        })

        test('should call reset', () => {
          expect(reset).toBeCalled()
        })
      })

      describe('when new value is set and is equal to "other"', () => {
        beforeEach(() => {
          jest.clearAllMocks()
          wrapper.setProps({ value: 'other' })
        })

        test('should not call reset', () => {
          expect(reset).not.toBeCalled()
        })
      })
    })
  })
})
