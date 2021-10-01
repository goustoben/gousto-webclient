import React from 'react'
import Immutable from 'immutable'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { PasswordField } from '../PasswordField/PasswordField'

jest.useFakeTimers()

describe('Given PasswordField component', () => {
  let wrapper
  const onFocus = jest.fn()
  const onCustomPasswordBlur = jest.fn()
  const validatePassword = jest.fn()
  const props = {
    passwordValue: '',
    passwordErrors: Immutable.List([]),
    onFocus,
    onCustomPasswordBlur,
    validatePassword,
    isMobile: false,
  }

  beforeEach(() => {
    wrapper = mount(<PasswordField {...props} />)
  })

  test('should render AboutYou component', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  describe('when password field is on Focus', () => {
    describe('and isMobile is false', () => {
      beforeEach(() => {
        act(() => {
          wrapper.find('.password').prop('onFocus')()
        })
      })

      test('then onFocus should be called', () => {
        expect(props.onFocus).toBeCalled()
      })
    })

    describe('and isMobile is true', () => {
      const scrollToSpy = jest.fn()
      global.Element.prototype.getBoundingClientRect = jest.fn().mockImplementation(() => ({
        top: '500',
      }))
      global.scrollTo = scrollToSpy

      beforeEach(() => {
        wrapper.setProps({
          isMobile: true,
        })

        act(() => {
          wrapper.find('.password').prop('onFocus')()
        })
      })

      test('then should be trigger proper actions', () => {
        expect(props.onFocus).toBeCalled()
        expect(scrollToSpy).toBeCalled()
      })
    })
  })

  describe('when password value is changed', () => {
    beforeEach(() => {
      act(() => {
        wrapper.find('input').prop('onChange')({
          target: {
            value: 'test',
          },
        })
        jest.runAllTimers()
      })
    })

    test('then proper actions should be made', () => {
      expect(validatePassword).toBeCalled()
    })

    test('then after changing value right after first change should clear timeout', () => {
      act(() => {
        wrapper.find('input').prop('onChange')({
          target: {
            value: 'testing',
          },
        })
      })

      expect(clearTimeout).toBeCalled()
    })
  })

  describe('when password field is not in focus', () => {
    beforeEach(() => {
      act(() => {
        wrapper.find('.password').prop('onBlur')()
      })
    })

    test('then proper actions should be made', () => {
      expect(props.onCustomPasswordBlur).toBeCalled()
    })
  })
})
