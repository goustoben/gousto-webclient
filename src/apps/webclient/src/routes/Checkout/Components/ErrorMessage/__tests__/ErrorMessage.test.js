import React from 'react'
import { mount } from 'enzyme'
import { checkoutConfig } from 'config/checkout'
import { ErrorMessage } from '../ErrorMessage'

describe('given ErrorMessage', () => {
  let wrapper
  const onLoginClick = jest.fn()

  describe('when error-type is user-exists', () => {
    beforeEach(() => {
      wrapper = mount(<ErrorMessage onLoginClick={onLoginClick} errorType="user-exists" />)
    })

    test('then header and message should render correctly', () => {
      expect(
        wrapper.find('Alert').text().includes(checkoutConfig.errorMessage['user-exists'].header),
      ).toBe(true)
      expect(
        wrapper.find('Alert').text().includes(checkoutConfig.errorMessage['user-exists'].message),
      ).toBe(true)
    })

    describe('and when the Log in CTA is clicked', () => {
      beforeEach(() => {
        wrapper.find('button').simulate('click', { preventDefault: jest.fn() })
      })

      test('then the onLoginClick callback should be invoked', () => {
        expect(onLoginClick).toBeCalled()
      })
    })
  })

  describe('when error-type is 422-insufficient-funds - header and message', () => {
    beforeEach(() => {
      wrapper = mount(
        <ErrorMessage onLoginClick={onLoginClick} errorType="422-insufficient-funds" />,
      )
    })

    test('then header and message should render correctly', () => {
      expect(
        wrapper
          .find('Alert')
          .text()
          .includes(checkoutConfig.errorMessage['422-insufficient-funds'].header),
      ).toBe(true)
      expect(
        wrapper
          .find('Alert')
          .text()
          .includes(checkoutConfig.errorMessage['422-insufficient-funds'].message),
      ).toBe(true)
    })
  })
})
