/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import { LoginForm } from '../LoginForm'

let recaptchaOnChange = (token: string) => {}

const reset = jest.fn()
const execute = jest.fn()

const recaptchaObject = ({
  reset,
  execute,
})

// eslint-disable-next-line react/display-name
jest.mock('components/Recaptcha', () => React.forwardRef(({
  onChange,
}: {
  onChange: (token: string) => void
}, ref) => {
  // eslint-disable-next-line no-param-reassign
  useEffect(() => {
    if (ref && typeof ref === 'function') ref(recaptchaObject)
  }, [ref])

  recaptchaOnChange = onChange

  return <div>Recaptcha</div>
}))

describe('LoginForm', () => {
  test('renders without crashing', () => {
    render(
      <LoginForm
        isRecaptchaEnabled={false}
        onSubmit={jest.fn()}
      />,
    )
  })

  describe('given the component is mounted', () => {
    const onSubmitSpy = jest.fn()
    const changeRecaptchaSpy = jest.fn()

    const renderLoginForm = (props: {
      statusText?: string,
      isRecaptchaEnabled?: boolean,
      isAuthenticated?: boolean,
      isAuthenticating?: boolean,
    } = {}) => render(
      <LoginForm
        isRecaptchaEnabled={false}
        onSubmit={onSubmitSpy}
        changeRecaptcha={changeRecaptchaSpy}
        {...props}
      />
    )

    beforeEach(() => {
      jest.clearAllMocks()
    })

    describe('when the email and password are valid', () => {
      const email = 'test@test.test'
      const password = 'password'

      describe('and the submit button is clicked', () => {
        test('calls the onSubmit with the required parameters', async () => {
          renderLoginForm()

          const emailInput = screen.getByLabelText('Email')
          const passwordInput = screen.getByLabelText('Password')
          const rememberMeInput = screen.getByLabelText('Remember me')

          fireEvent.change(emailInput, { target: { value: email } })
          fireEvent.change(passwordInput, { target: { value: password } })
          fireEvent.click(rememberMeInput)

          const submitButton = screen.getByRole('button', { name: 'Log in' })

          fireEvent.click(submitButton)

          await waitFor(() => {
            expect(onSubmitSpy).toHaveBeenCalledWith({
              email: 'test@test.test',
              password: 'password',
              recaptchaToken: null,
              rememberMe: true,
            })
          })
        })
      })

      describe('when recapture is on', () => {
        test('recapture is rendered', () => {
          renderLoginForm({ isRecaptchaEnabled: true })

          expect(screen.queryByText(/Recaptcha/)).toBeInTheDocument()
        })

        describe('and the submit button is clicked', () => {
          test('calls captcha execute', async () => {
            renderLoginForm({ isRecaptchaEnabled: true })

            const emailInput = screen.getByLabelText('Email')
            const passwordInput = screen.getByLabelText('Password')
            const rememberMeInput = screen.getByLabelText('Remember me')

            fireEvent.change(emailInput, { target: { value: email } })
            fireEvent.change(passwordInput, { target: { value: password } })
            fireEvent.click(rememberMeInput)

            const submitButton = screen.getByRole('button', { name: 'Log in' })

            act(() => {
              fireEvent.click(submitButton)
            })

            await waitFor(() => {
              expect(execute).toHaveBeenCalledTimes(1)
            })

            expect(onSubmitSpy).not.toHaveBeenCalled()
          })

          test('updates recaptcha token state on captchaChanges', async () => {
            const recaptchaValue = 'recaptcha-token'

            const { rerender } = renderLoginForm({ isRecaptchaEnabled: true })

            act(() => {
              recaptchaOnChange(recaptchaValue)
            })

            const emailInput = screen.getByLabelText('Email')
            const passwordInput = screen.getByLabelText('Password')
            const rememberMeInput = screen.getByLabelText('Remember me')

            fireEvent.change(emailInput, { target: { value: email } })
            fireEvent.change(passwordInput, { target: { value: password } })
            fireEvent.click(rememberMeInput)

            const submitButton = screen.getByRole('button', { name: 'Log in' })

            act(() => {
              fireEvent.click(submitButton)
            })

            await waitFor(() => {
              expect(onSubmitSpy).toHaveBeenCalled()
            })

            expect(onSubmitSpy).toHaveBeenCalledWith({
              email: 'test@test.test',
              password: 'password',
              recaptchaToken: 'recaptcha-token',
              rememberMe: true,
            })

            rerender(<LoginForm
              isRecaptchaEnabled
              onSubmit={onSubmitSpy}
              changeRecaptcha={changeRecaptchaSpy}
              statusText="something not empty"
            />)

            await waitFor(() => {
              expect(reset).toHaveBeenCalled()
            })
          })
        })
      })
    })

    describe('when a login attempt errors', () => {
      test('the should render the error to the user', () => {
        renderLoginForm({
          statusText: 'something not empty'
        })

        expect(screen.queryByText(/something not empty/)).toBeInTheDocument()
      })
    })

    describe('when authenticating', () => {
      test('the should button should be disabled', () => {
        renderLoginForm({
          isAuthenticating: true,
        })

        const submitButton = screen.queryByRole('button', { name: 'Log in' })

        expect(submitButton).toBeDisabled()
      })
    })

    describe('when user is logged in', () => {
      test('the should render that the user is logged in', () => {
        renderLoginForm({
          isAuthenticated: true,
        })

        expect(screen.queryByText(/You are now Logged in/)).toBeInTheDocument()
      })
    })
  })
})

