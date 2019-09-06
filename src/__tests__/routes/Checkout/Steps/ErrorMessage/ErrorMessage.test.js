import React from 'react'
import { shallow } from 'enzyme'
import ErrorMessage from 'routes/Checkout/Components/ErrorMessage/ErrorMessage'
import config from 'config/checkout'

describe('ErrorMessage', () => {
  const ERROR_MESSAGES = config.errorMessage
  const KNOWN_ERROR = Object.keys(ERROR_MESSAGES)[0]
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<ErrorMessage />)
  })

  describe('when there is no error', () => {
    test('returns null', () => {
      expect(wrapper.type()).toEqual(null)
    })
  })

  describe('when there is an error', () => {
    describe('when the error type is known', () => {
      beforeEach(() => {
        wrapper.setProps({ errorType: KNOWN_ERROR })
      })

      test('displays the corresponding error message', () => {
        expect(wrapper.find('Alert').html()).toContain(ERROR_MESSAGES[KNOWN_ERROR])
      })
    })

    describe('when the error type is not known', () => {
      beforeEach(() => {
        wrapper.setProps({ errorType: 'some-unknown-error-type' })
      })

      test('displays the generic error message', () => {
        expect(wrapper.find('Alert').html()).toContain(ERROR_MESSAGES.generic)
      })
    })
  })
})
