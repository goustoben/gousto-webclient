import React from 'react'
import { shallow } from 'enzyme'

import { ResetPassword } from 'routes/ResetPassword/ResetPassword'
import { PageContent } from 'Page'
import Input from 'Form/Input'
import InputError from 'Form/InputError'

jest.mock('utils/isomorphicEnvironment', () => ({
  getRecaptchaPublicKey: () => 'mock-recaptcha-token'
}))

const IS_RECAPTCHA_ENABLED = false
const TOKEN = 'ASDF1234'
const LOCATION = { query: { token: TOKEN } }

describe('<ResetPassword />', () => {
  let wrapper
  let pageContent

  beforeEach(() => {
    wrapper = shallow(
      <ResetPassword
        isRecaptchaEnabled={IS_RECAPTCHA_ENABLED}
        location={LOCATION}
      />
    )
    pageContent = wrapper.find(PageContent)
  })

  describe('should render', () => {
    test('a header with the page title', () => {
      expect(wrapper.find('.resetFormTitle').exists()).toBe(true)
    })

    test('a content section', () => {
      expect(pageContent).toHaveLength(1)
    })

    test('an input of type password with a placeholder', () => {
      expect(pageContent.find(Input).prop('type')).toEqual('password')
      expect(pageContent.find(Input).prop('placeholder')).toBeTruthy()
      expect(pageContent.find(Input).prop('error')).toBeFalsy()
    })

    test('a button which is disabled', () => {
      expect(pageContent.find('.resetPasswordButton')).toHaveLength(1)
      expect(pageContent.find('CTA').prop('isDisabled')).toBeTruthy()
    })

    test('an input error when the password is less than the min length', () => {
      wrapper.setState({ isPasswordLengthError: true })
      pageContent = wrapper.find(PageContent)

      expect(pageContent.find(Input).prop('error')).toBeTruthy()
      expect(pageContent.find(InputError)).toHaveLength(1)
    })

    test('no input error when the password has valid length', () => {
      expect(pageContent.find(InputError)).toHaveLength(0)
    })
  })

  describe('functions', () => {
    test('password too short should update state on blur', () => {
      expect(wrapper.state('isPasswordLengthError')).toBeFalsy()

      const input = pageContent.find(Input)
      input.prop('onChange')('7charac')
      input.prop('onBlur')()

      expect(wrapper.state('isPasswordLengthError')).toBeTruthy()
    })

    test('passwordValue has length button should not be disabled', () => {
      wrapper.setState({ passwordValue: 'password' })

      pageContent = wrapper.find(PageContent)

      expect(wrapper.state('passwordValue')).toBeTruthy()

      expect(pageContent.find('CTA').prop('isDisabled')).toBeFalsy()
    })

    test('password long enough should update state on change', () => {
      wrapper.setState({ isPasswordLengthError: true })

      expect(wrapper.state('isPasswordLengthError')).toBeTruthy()

      pageContent.find(Input).prop('onChange')('8charact')

      expect(wrapper.state('isPasswordLengthError')).toBeFalsy()
    })

    test('password too short should not be submitted', () => {
      const authResetPasswordSpy = jest.fn()
      wrapper = shallow(<ResetPassword
        authResetPassword={authResetPasswordSpy}
        isRecaptchaEnabled={IS_RECAPTCHA_ENABLED}
        location={LOCATION}
      />
      )
      wrapper.find(PageContent).find(Input).prop('onChange')('7charac')
      wrapper.update()
      wrapper.find(PageContent).find('CTA').simulate('click')

      expect(authResetPasswordSpy).not.toHaveBeenCalled()
    })

    test('password long enough should be submitted along with the token', () => {
      const authResetPasswordSpy = jest.fn()
      wrapper = shallow(<ResetPassword
        authResetPassword={authResetPasswordSpy}
        location={LOCATION}
        isRecaptchaEnabled={IS_RECAPTCHA_ENABLED}
      />)
      wrapper.find(PageContent).find(Input).prop('onChange')('8charact')
      wrapper.update()
      wrapper.find(PageContent).find('CTA').simulate('click')

      expect(authResetPasswordSpy).toHaveBeenCalledTimes(1)
      expect(authResetPasswordSpy).toHaveBeenCalledWith('8charact', TOKEN, null)
    })
  })

  describe('given recaptcha is enabled', () => {
    const authResetPasswordSpy = jest.fn()

    beforeEach(() => {
      wrapper = shallow(<ResetPassword
        authResetPassword={authResetPasswordSpy}
        location={LOCATION}
        isRecaptchaEnabled
      />)
      wrapper.setState({ recaptchaValue: 'recaptcha-value' })

      pageContent = wrapper.find(PageContent)
      wrapper.find(PageContent).find(Input).prop('onChange')('8charact')
      wrapper.update()
      wrapper.find(PageContent).find('CTA').simulate('click')
    })

    test('authResetPassword is called with the recaptcha token', () => {
      expect(authResetPasswordSpy).toHaveBeenCalledWith('8charact', TOKEN, 'recaptcha-value')
    })
  })
})
