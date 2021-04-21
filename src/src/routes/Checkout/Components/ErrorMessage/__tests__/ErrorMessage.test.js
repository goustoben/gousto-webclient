import React from 'react'
import { shallow } from 'enzyme'
import checkoutConfig from 'config/checkout'
import { ErrorMessage } from '../ErrorMessage'

describe('given ErrorMessage', () => {
  let wrapper
  const onLoginClick = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<ErrorMessage onLoginClick={onLoginClick} />)
  })

  describe('when error-type is user-exists - simple message', () => {
    beforeEach(() => {
      wrapper.setProps({
        errorType: 'user-exists',
      })
    })

    test('then it should render correctly', () => {
      expect(wrapper.find('Alert').exists()).toBe(true)
      expect(wrapper.contains(checkoutConfig.errorMessage['user-exists'])).toBe(true)
    })
  })

  describe('when error-type is 422-insufficient-funds - header and message', () => {
    beforeEach(() => {
      wrapper.setProps({
        errorType: '422-insufficient-funds',
      })
    })

    test('then it should render correctly', () => {
      expect(wrapper.find('.header').exists()).toBe(true)
      expect(
        wrapper
          .find('.header')
          .contains(checkoutConfig.errorMessage['422-insufficient-funds'].header)
      ).toBe(true)
    })
  })

  describe('when isCheckoutOverhaulEnabled is enabled', () => {
    beforeEach(() => {
      wrapper.setProps({
        isCheckoutOverhaulEnabled: true,
      })
    })

    describe('when errorType is user-exists', () => {
      beforeEach(() => {
        wrapper.setProps({
          errorType: 'user-exists',
        })
      })

      test('then it should render correctly', () => {
        expect(wrapper.find('CustomerCareDetails').exists()).toBeFalsy()
        expect(wrapper.find('a').exists()).toBeTruthy()
        expect(wrapper.find('a').prop('children')).toBe('Log in')
      })

      describe('and when the Log in link is clicked', () => {
        beforeEach(() => {
          wrapper.find('a').simulate('click', { preventDefault: jest.fn() })
        })

        test('then the onLoginClick callback should be invoked', () => {
          expect(onLoginClick).toBeCalled()
        })
      })
    })
  })
})
