import React from 'react'
import { mount } from 'enzyme'

import { InputRadio } from '..'

describe('<InputRadio />', () => {
  describe('rendering', () => {
    let onChangeSpy
    let wrapper
    let input

    beforeEach(() => {
      onChangeSpy = jest.fn()
      wrapper = mount(
        <InputRadio
          name="inputRadioGroup"
          value="inputValue"
          id="an-id"
          isChecked={false}
          onChange={onChangeSpy}
          ariaLabel="payment method x"
        >
          <span>input label</span>
        </InputRadio>,
      )
      input = wrapper.find('input[type="radio"]')
    })

    test('the radio is rendered with the passed id', () => {
      expect(input.prop('id')).toBe('an-id')
    })

    test('the radio is rendered checked if isChecked is true', () => {
      const boxChecked = mount(
        <InputRadio
          name="inputRadioGroup"
          value="inputValue"
          id="an-id"
          isChecked
        >
          <span>input label</span>
        </InputRadio>,
      )
      const inputChecked = boxChecked.find('input[type="radio"]')

      expect(inputChecked.prop('checked')).toBeTruthy()
    })

    test('the radio is rendered unchecked if isChecked is false', () => {
      expect(input.prop('checked')).toBeFalsy()
    })

    test('the children is rendered', () => {
      expect(wrapper.text()).toBe('input label')
    })

    test('the radio is rendered with ariaLabel text', () => {
      expect(input.prop('aria-label')).toBe('payment method x')
    })
  })

  describe('behaviour', () => {
    let onChangeSpy
    let wrapper

    beforeEach(() => {
      onChangeSpy = jest.fn()
      wrapper = mount(
        <InputRadio
          name="inputRadioGroup"
          value="inputValue"
          id="an-id"
          isChecked={false}
          onChange={onChangeSpy}
        >
          <span>input label</span>
        </InputRadio>,
      )
    })

    describe('when click on input', () => {
      test('on change callback is called', () => {
        const inputRadio = wrapper.find('input[type="radio"]')
        inputRadio.simulate('change')

        expect(onChangeSpy).toHaveBeenCalledTimes(1)
      })
    })
  })
})
