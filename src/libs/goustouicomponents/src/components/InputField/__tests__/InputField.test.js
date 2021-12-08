import React from 'react'
import { mount } from 'enzyme'
import { InputField } from '..'

describe('<InputField />', () => {
  let wrapper
  const onUpdate = jest.fn()

  afterEach(() => {
    onUpdate.mockReset()
  })

  beforeEach(() => {
    wrapper = mount(
      <InputField
        id="testId"
        placeholder="placeholder"
        onUpdate={onUpdate}
        label="test"
      />,
    )
  })

  describe('When typing into the default input field', () => {
    beforeEach(() => {
      wrapper.find('input').simulate('change', { target: { value: 'Test' } })
    })

    test('Then the value state is updated to the right value', () => {
      expect(wrapper.find('input').prop('value')).toEqual('Test')
    })

    test('And onUpdate has isValid set to true', () => {
      expect(onUpdate).toHaveBeenCalledWith({ id: 'testId', isValid: true, value: 'Test' })
    })
  })

  describe('When typing into the email input field', () => {
    describe('And the input is not valid', () => {
      beforeEach(() => {
        wrapper.find('input').simulate('change', { target: { value: 'Test', type: 'email' } })
      })

      test('Then inputError contains the right error', () => {
        expect(wrapper.find('InputErrorMessage').text()).toEqual('Please enter a valid email address')
      })

      test('And onUpdate has isValid set to false', () => {
        expect(onUpdate).toHaveBeenCalledWith({ id: 'testId', isValid: false, value: 'Test' })
      })
    })

    describe('And the input is valid', () => {
      beforeEach(() => {
        wrapper.find('input').simulate('change', { target: { value: 'test@test.com', type: 'email' } })
      })

      test('Then inputError does not contain an error', () => {
        expect(wrapper.find('InputErrorMessage').length).toEqual(0)
      })

      test('Then the value state is updated to the right value', () => {
        expect(wrapper.find('input').prop('value')).toEqual('test@test.com')
      })
    })
  })

  describe('When typing into the phone input field', () => {
    describe('And the input is not valid', () => {
      beforeEach(() => {
        wrapper.find('input').simulate('change', { target: { value: '1234', type: 'tel' } })
      })

      test('Then InputErrorMessage shows the right error', () => {
        expect(wrapper.find('InputErrorMessage').text()).toEqual('Please enter a valid phone number')
      })
    })

    describe('And the input is valid', () => {
      beforeEach(() => {
        wrapper.find('input').simulate('change', { target: { value: '1234567899', type: 'tel' } })
      })

      test('Then InputErrorMessage is not shown', () => {
        expect(wrapper.find('InputErrorMessage').length).toEqual(0)
      })

      test('Then the input is updated to the right value', () => {
        expect(wrapper.find('input').prop('value')).toEqual('1234567899')
      })
    })
  })

  describe('When the field is required', () => {
    beforeEach(() => {
      wrapper.setProps({ required: true })
      wrapper.update()
    })

    describe('And the input is empty', () => {
      beforeEach(() => {
        wrapper.find('input').simulate('change', { target: { value: '' } })
      })

      test('Then InputErrorMessage contains the right error', () => {
        expect(wrapper.find('InputErrorMessage').text()).toEqual('This field is required')
      })
    })
  })

  describe('When the field is not required', () => {
    beforeEach(() => {
      wrapper.setProps({ required: false })
      wrapper.update()
    })

    describe('And the input is empty', () => {
      beforeEach(() => {
        wrapper.find('input').simulate('change', { target: { value: '' } })
      })

      test('Then InputErrorMessage is not shown', () => {
        expect(wrapper.find('InputErrorMessage').length).toEqual(0)
      })
    })
  })

  describe('When the value is set as prop', () => {
    beforeEach(() => {
      wrapper.setProps({ value: 'test-value' })
      wrapper.update()
    })

    test('input gets the correct value', () => {
      expect(wrapper.find('input').prop('value')).toBe('test-value')
    })
  })
})
