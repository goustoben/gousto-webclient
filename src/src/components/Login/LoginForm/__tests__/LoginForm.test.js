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

      const EXPECTED_CALL = {
        email: STATE_CONFIG.EMAIL,
        password: STATE_CONFIG.PASSWORD,
        recaptchaToken: null,
        rememberMe: STATE_CONFIG.REMEMBER,
      }

      const onSubmitSpy = jest.fn()

      beforeEach(() => {
        wrapper.setState({
          email: STATE_CONFIG.EMAIL,
          emailValid: true,
          password: STATE_CONFIG.PASSWORD,
          passwordValid: true,
          recaptchaToken: null,
          remember: STATE_CONFIG.REMEMBER
        })

        onSubmitSpy.mockClear()
      })

      describe('and the submit button is clicked', () => {
        const event = new global.Event('click')

        beforeEach(() => {
          wrapper.setProps({ onSubmit: onSubmitSpy })
          wrapper.instance().handleSubmit(event)
        })

        test('calls the onSubmit with the required parameters', () => {
          expect(onSubmitSpy).toHaveBeenCalledWith(EXPECTED_CALL)
        })
      })

      describe('and the user hits the ENTER key', () => {
        const event = new global.KeyboardEvent('keydown', {
          key: 'Enter',
        })

        beforeEach(() => {
          wrapper.setProps({ onSubmit: onSubmitSpy })
          wrapper.update()
        })

        test('calls the onSubmit with the required parameters', () => {
          const form = wrapper.find('form')

          form.simulate('submit', event)

          expect(onSubmitSpy).toHaveBeenCalledWith(EXPECTED_CALL)
        })
      })
    })
  })
})

