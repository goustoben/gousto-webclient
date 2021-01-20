import React from 'react'
import { Field } from 'redux-form'
import { shallow } from 'enzyme'
import { DeliveryInstruction } from 'routes/Checkout/Components/Delivery/DeliveryDetails/DeliveryInstruction'

describe('DeliveryInstruction', () => {
  let wrapper
  const reset = jest.fn()
  let inputFields
  let lastInput

  beforeEach(() => {
    wrapper = shallow(<DeliveryInstruction reset={reset} />)
  })

  describe('rendering', () => {
    test('should return div', () => {
      expect(wrapper.type()).toBe('div')
    })

    test('should render 1 <Field> component(s)', () => {
      expect(wrapper.find(Field)).toHaveLength(1)
    })

    test('should not call reset by default', () => {
      expect(reset).not.toBeCalled()
    })

    describe('when the value prop is "other"', () => {
      beforeEach(() => {
        wrapper.setProps({ value: 'other' })

        inputFields = wrapper.find(Field)
        lastInput = inputFields.last()
      })

      test('then should show another input', () => {
        expect(inputFields).toHaveLength(2)
        expect(lastInput.prop('label')).toEqual(
          'More details about where to leave your box?',
        )
      })

      describe('and it is changed to "home"', () => {
        beforeEach(() => {
          jest.clearAllMocks()
          wrapper.setProps({ value: 'home' })
        })

        test('then should call reset', () => {
          expect(reset).toBeCalled()
        })
      })
    })

    describe('when the value prop is "neighbour"', () => {
      beforeEach(() => {
        wrapper.setProps({ value: 'neighbour' })

        inputFields = wrapper.find(Field)
        lastInput = inputFields.last()
      })

      test('then should show another input', () => {
        expect(wrapper.find(Field)).toHaveLength(2)
        expect(lastInput.prop('label')).toEqual(
          'Additional information, door number, etc:',
        )
      })

      describe('and it is changed to "other"', () => {
        beforeEach(() => {
          jest.clearAllMocks()
          wrapper.setProps({ value: 'other' })
        })

        test('then should not call reset', () => {
          expect(reset).not.toBeCalled()
        })
      })
    })
  })

  describe('sensitive data masking', () => {
    beforeEach(() => {
      wrapper.setProps({ value: 'other' })
    })

    test('<Field /> component(s) should have prop "mask" when the value prop is "other"', () => {
      expect(
        wrapper
          .find(Field)
          .last()
          .prop('mask'),
      ).toBe(true)
    })
  })

  describe('when isOldCheckoutFieldEnabled is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        isOldCheckoutFieldEnabled: true
      })
    })

    test('then should render tooltip', () => {
      expect(wrapper.find('.checkoutTooltip')).toBeTruthy()
    })
  })
})
