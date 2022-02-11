/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import ReCAPTCHA from 'components/Recaptcha'
import { RECAPTCHA_PUBLIC_KEY } from 'config/recaptcha'
import { isSecretPingdomEmail } from 'utils/recaptcha'
import configRoutes from 'config/routes'
import { useForm } from 'react-hook-form'
import {
  Box,
  InputField,
  Button,
  Checkbox,
  Icon,
  IconVariant,
  Link,
  Space,
  Join,
  FormFieldStatus,
  FieldValidationMessage,
  Grid,
  Col,
  JustifyContent,
  Display,
  Text,
  AlignItems,
} from '@gousto-internal/citrus-react'

export const validateEmail = (email: string) => {
  const regex = (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i)

  return regex.test(email)
}

type RecaptchaElement = {
  reset: () => void,
  execute: () => void
}

type UseRecaptcha = {
  changeRecaptcha: () => void
  statusText: string | boolean,
  isRecaptchaEnabled: boolean,
  email: string,
}

const useRecaptcha = ({
  changeRecaptcha,
  statusText,
  isRecaptchaEnabled,
  email,
}: UseRecaptcha) => {
  const [recaptchaToken, setRecaptchaToken] = React.useState<null | string>(null)
  const [recaptchaElement, setRecaptchaElement] = React.useState<null | RecaptchaElement>(null)

  React.useEffect(() => {
    changeRecaptcha()
  // Call on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  React.useEffect(() => {
    if (statusText) {
      setRecaptchaToken(null)
    }
  },[statusText])

  React.useEffect(() => {
    if (recaptchaElement) {
      recaptchaElement.reset()
    }
  },[recaptchaElement])

  const onRecaptchaChange = (value: null | string) => {
    setRecaptchaToken(value)
  }

  const setCaptchaRef = (el: RecaptchaElement) => {
    setRecaptchaElement(el)
  }

  const recaptchaNeedsExecuting = () => {
    const featureFlagIsOff = isRecaptchaEnabled === false
    const secretEmailEntered = isSecretPingdomEmail(email)
    // prevent errors from breaking the page if the captcha isn't loaded for whatever reason
    const captchaElementNotOnPage = !recaptchaElement

    if (featureFlagIsOff || secretEmailEntered || captchaElementNotOnPage) {
      return false
    }

    return recaptchaToken == null
  }

  const recaptchaExecute = () => {
    if (recaptchaElement) {
      recaptchaElement.execute()
    }
  }

  return {
    recaptchaToken,
    onRecaptchaChange,
    setCaptchaRef,
    recaptchaNeedsExecuting,
    recaptchaExecute,
  }
}

const LoggedInMessage = () => (
  <Box
    display="flex"
    justifyContent={JustifyContent.Center}
    alignItems={AlignItems.Center}
    paddingH={[10, 20]}
    paddingV={[10, 20]}
  >
    <Text>
      You are now Logged in
    </Text>
    <Space size={1} direction="horizontal" />
    <Icon
      name="checkbox_selected"
      variant={IconVariant.Confirmation}
    />
  </Box>
)

type FormProps = {
  email: string,
  password: string,
  rememberMe: boolean
}

type OnSubmitData = {
  email: string,
  password: string,
  rememberMe: boolean,
  recaptchaToken: string | null,
}

type LoginFormProps = {
  onSubmit: (_options: OnSubmitData) => void,
  isAuthenticated?: boolean,
  isAuthenticating?: boolean,
  isRecaptchaEnabled: boolean,
  statusText?: string | boolean,
  changeRecaptcha?: () => void,
  rememberMeDefault?: boolean,
}

const LoginForm = ({
  onSubmit,
  isAuthenticated = false,
  isAuthenticating = false,
  isRecaptchaEnabled,
  statusText = '',
  changeRecaptcha = () => {},
  rememberMeDefault = false,
}: LoginFormProps) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormProps>({
    defaultValues: {
      rememberMe: rememberMeDefault,
      email: '',
      password: '',
    },
    reValidateMode: 'onChange',
  })
  const {
    recaptchaToken,
    recaptchaNeedsExecuting,
    recaptchaExecute,
    setCaptchaRef,
    onRecaptchaChange,
  } = useRecaptcha({
    email: watch('email'),
    changeRecaptcha,
    statusText,
    isRecaptchaEnabled,
  })
  const localOnSubmit = ({
    email,
    password,
    rememberMe,
  }: FormProps) => {
    if (recaptchaNeedsExecuting()) {
      recaptchaExecute()

      return
    }

    onSubmit({
      email,
      password,
      rememberMe,
      recaptchaToken,
    })
  }
  React.useEffect(() => {
    if (recaptchaToken) {
      handleSubmit(localOnSubmit)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[recaptchaToken])

  if (isAuthenticated) return <LoggedInMessage />

  return (
    <Box data-testing="loginModal">
      <form
        onSubmit={handleSubmit(localOnSubmit)}
        method="post"
        data-testing="loginForm"
        noValidate
      >
        <Join with={<Space size={3} />} append>
          <InputField
            id="email"
            label="Email"
            placeholder="Your email"
            type="email"
            status={errors.email && FormFieldStatus.Error}
            validationMessage={(
              <>
                {errors.email?.type === 'required' && <FieldValidationMessage>This field is required</FieldValidationMessage>}
                {errors.email?.type === 'validate' && <FieldValidationMessage>Please enter a valid email</FieldValidationMessage>}
              </>
            )}
            {...register('email', {
              required: true,
              validate: validateEmail,
            })}
          />

          <InputField
            id="password"
            label="Password"
            placeholder="Your password"
            type="password"
            status={errors.password && FormFieldStatus.Error}
            validationMessage={errors.password && 'This field is required'}
            {...register('password', { required: true })}
          />
        </Join>

        <Grid wrap>
          <Col
            paddingV={[2, 0]}
            size={[12, 6]}
          >
            <Checkbox
              id="rememberMe"
              checked={watch('rememberMe')}
              {...register('rememberMe')}
            >
              Remember me
            </Checkbox>
          </Col>

          <Col
            paddingV={[2, 0]}
            size={[12, 6]}
            display={Display.Flex}
            justifyContent={[null, JustifyContent.FlexEnd]}
          >
            <Link href={configRoutes.client.resetForm}>Forgot your password?</Link>
          </Col>
        </Grid>
        {
          statusText
              && (
                <Box
                  display="flex"
                  justifyContent={JustifyContent.FlexStart}
                  alignItems={AlignItems.Center}
                  paddingV={2}
                  data-testing="loginErrMsg"
                >
                  <Icon
                    size={5}
                    name="warning"
                    variant={IconVariant.Error}
                  />

                  <Space size={2} direction="horizontal" />

                  <Text size={2}>
                    {statusText}
                  </Text>
                </Box>
              )
        }
        {
          isRecaptchaEnabled
              && (
                <div>
                  <ReCAPTCHA
                    ref={setCaptchaRef}
                    sitekey={RECAPTCHA_PUBLIC_KEY}
                    size="invisible"
                    onChange={onRecaptchaChange}
                  />
                </div>
              )
        }

        <Space size={3} />

        <Button
          data-testing="loginFormSubmit"
          disabled={isAuthenticating}
          width="100%"
          type="submit"
        >
          Log in
        </Button>
      </form>
    </Box>
  )
}

export {
  LoginForm
}
