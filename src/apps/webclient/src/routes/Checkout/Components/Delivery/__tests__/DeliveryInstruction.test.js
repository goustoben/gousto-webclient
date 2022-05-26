import React from 'react'

import { shallow } from 'enzyme'
import { Field } from 'redux-form'

import { DeliveryInstruction } from '../DeliveryInstruction'

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
        expect(lastInput.prop('placeholder')).toEqual('e.g. lockbox around left side of house')
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
        expect(lastInput.prop('placeholder')).toEqual('e.g. next door at number 10')
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
      expect(wrapper.find(Field).last().prop('mask')).toBe(true)
    })
  })
})
