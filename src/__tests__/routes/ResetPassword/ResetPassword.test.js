import React from 'react'
import { shallow } from 'enzyme'

import ResetPassword from 'routes/ResetPassword/ResetPassword'
import { PageContent, PageHeader } from 'Page'
import Input from 'Form/Input'
import InputError from 'Form/InputError'
import { Button } from 'goustouicomponents'

describe('<ResetPassword />', () => {
  let wrapper
  let pageContent

  beforeEach(() => {
    wrapper = shallow(<ResetPassword />)
    pageContent = wrapper.find(PageContent)
  })

  describe('should render', () => {
    test('a header with the page title', () => {
      expect(wrapper.find(PageHeader).prop('title')).toBeTruthy()
    })

    test('a content section', () => {
      expect(pageContent).toHaveLength(1)
    })

    test('an input of type password with a placeholder', () => {
      expect(pageContent.find(Input).prop('type')).toEqual('password')
      expect(pageContent.find(Input).prop('placeholder')).toBeTruthy()
      expect(pageContent.find(Input).prop('error')).toBeFalsy()
    })

    test('a button', () => {
      expect(pageContent.find(Button)).toHaveLength(1)
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

    test('password long enough should update state on change', () => {
      wrapper.setState({ isPasswordLengthError: true })

      expect(wrapper.state('isPasswordLengthError')).toBeTruthy()

      pageContent.find(Input).prop('onChange')('8charact')

      expect(wrapper.state('isPasswordLengthError')).toBeFalsy()
    })

    test('password too short should not be submitted', () => {
      const authResetPasswordSpy = jest.fn()
      wrapper = shallow(<ResetPassword authResetPassword={authResetPasswordSpy} />)
      wrapper.find(PageContent).find(Input).prop('onChange')('7charac')
      wrapper.update()
      wrapper.find(PageContent).find(Button).prop('onClick')()

      expect(authResetPasswordSpy).not.toHaveBeenCalled()
    })

    test('password long enough should be submitted along with the token', () => {
      const authResetPasswordSpy = jest.fn()
      const location = { query: { token: 'someTokenValue' } }
      wrapper = shallow(<ResetPassword
        authResetPassword={authResetPasswordSpy}
        location={location}
      />)
      wrapper.find(PageContent).find(Input).prop('onChange')('8charact')
      wrapper.update()
      wrapper.find(PageContent).find(Button).prop('onClick')()

      expect(authResetPasswordSpy).toHaveBeenCalledTimes(1)
      expect(authResetPasswordSpy).toHaveBeenCalledWith('8charact', 'someTokenValue')
    })
  })
})
