import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'

import { LoginForm } from '../LoginForm'

describe('LoginForm', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <LoginForm
        isRecaptchaEnabled={false}
        onSubmit={jest.fn()}
      />,
      div
    )
  })

  describe('given the component is mounted', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(
        <LoginForm
          isRecaptchaEnabled={false}
          onSubmit={jest.fn()}
        />
      )
    })

    describe('when the email and password are valid', () => {
      const STATE_CONFIG = {
        EMAIL: 'test@test.test',
        PASSWORD: 'password',
        REMEMBER: false,
      }

      beforeEach(() => {
        wrapper.setState({
          email: STATE_CONFIG.EMAIL,
          emailValid: true,
          password: STATE_CONFIG.PASSWORD,
          passwordValid: true,
          recaptchaToken: null,
          remember: STATE_CONFIG.REMEMBER
        })
      })

      describe('and the submit button is clicked', () => {
        const onSubmitSpy = jest.fn()
        const event = new Event('click') // eslint-disable-line no-undef
        const EXPECTED_CALL = {
          email: STATE_CONFIG.EMAIL,
          password: STATE_CONFIG.PASSWORD,
          recaptchaToken: null,
          rememberMe: STATE_CONFIG.REMEMBER,
        }

        beforeEach(() => {
          wrapper.setProps({ onSubmit: onSubmitSpy })
          wrapper.instance().handleSubmit(event)
        })

        afterEach(() => {
          onSubmitSpy.mockClear()
        })

        test('calls the onSubmit with the required parameters', () => {
          expect(onSubmitSpy).toHaveBeenCalledWith({ ...EXPECTED_CALL })
        })
      })
    })
  })
})

