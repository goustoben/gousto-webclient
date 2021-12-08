import React from 'react'
import { mount } from 'enzyme'

import { InputCheck } from '..'

describe('<InputCheck />', () => {
  describe('rendering', () => {
    const onChangeSpy = jest.fn()
    const wrapper = mount(
      <InputCheck
        id="an-id"
        label="input label"
        defaultValue={false}
        onChange={onChangeSpy}
      />,
    )
    const input = wrapper.find('input[type="checkbox"]')

    test('the checkbox is rendered with the passed id', () => {
      expect(input.prop('id')).toBe('an-id')
    })

    test('the checkbox is rendered checked if defaultValue is true', () => {
      const boxChecked = mount(
        <InputCheck
          id="an-id"
          label="input label"
          defaultValue
        />,
      )
      const inputChecked = boxChecked.find('input[type="checkbox"]')

      expect(inputChecked.prop('checked')).toBeTruthy()
    })

    test('the checkbox is rendered unchecked if defaultValue is false', () => {
      expect(input.prop('checked')).toBeFalsy()
    })

    test('the label is rendered', () => {
      expect(wrapper.text()).toBe('input label')
    })
  })

  describe('behaviour', () => {
    let onChangeSpy
    let wrapper

    beforeEach(() => {
      onChangeSpy = jest.fn()
      wrapper = mount(
        <InputCheck
          id="an-id"
          label="input label"
          defaultValue={false}
          onChange={onChangeSpy}
        />,
      )
    })

    test('on change callback is called with the id and a boolean indicating whether is checked', () => {
      const inputCheck = wrapper.find('input[type="checkbox"]')
      inputCheck.simulate('change')

      expect(onChangeSpy).toHaveBeenCalledTimes(1)
      expect(onChangeSpy).toHaveBeenLastCalledWith('an-id', true)

      inputCheck.simulate('change')

      expect(onChangeSpy).toHaveBeenCalledTimes(2)
      expect(onChangeSpy).toHaveBeenLastCalledWith('an-id', false)
    })
  })

  describe('when disabled prop is passed as true', () => {
    let boxCheck
    beforeEach(() => {
      boxCheck = mount(
        <InputCheck
          id="an-id"
          label="input label"
          disabled
        />,
      )
    })
    test('should add checkboxDisabled class to checkboxBox div', () => {
      expect(boxCheck.find('.checkboxBox').prop('className')).toContain('checkboxDisabled')
    })

    test('the checkbox is rendered disabled', () => {
      expect(boxCheck.find('input[type="checkbox"]').prop('disabled')).toBeTruthy()
    })
  })
})
