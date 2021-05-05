import React from 'react'
import { shallow } from 'enzyme'
import { Field } from 'redux-form'
import { DeliveryPhoneNumber } from '../DeliveryPhoneNumber'

describe('DeliveryPhoneNumber', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<DeliveryPhoneNumber />)
  })

  describe('rendering', () => {
    test('should return div', () => {
      expect(wrapper.type()).toBe('div')
    })

    test('should render 1 <Field> component(s)', () => {
      expect(wrapper.find(Field)).toHaveLength(1)
    })
  })

  describe('sensitive data masking', () => {
    test('all <Field /> component(s) should have prop "mask"', () => {
      expect(wrapper.find(Field).at(0).prop('mask')).toBe(true)
    })
  })

  describe('handleKeyDown', () => {
    describe('when user types forbidden letters', () => {
      const preventDefault = jest.fn()
      beforeEach(() => {
        const event = {
          target: {
            value: 't',
            selectionStart: true,
          },
          keyCode: 66,
          preventDefault,
        }
        wrapper.instance().handleKeyDown(event)
      })

      test('then value should stay empty', () => {
        expect(preventDefault).toHaveBeenCalled()
      })
    })
  })
})
