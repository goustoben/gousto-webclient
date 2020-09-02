import React from 'react'
import PropTypes from 'prop-types'
import { LoginForm } from './LoginForm'
import { LoginMobile } from './LoginMobile'
import { LoginDesktop } from './LoginDesktop'
import { HeadingWithSeparator } from './HeadingWithSeparator'

const defaultProps = {
  title: 'Log in',
}
const propTypes = {
  isMobileViewport: PropTypes.bool.isRequired,
  title: PropTypes.string,
}

const LoginWrapper = ({ isMobileViewport, title }) => (
  <div>
    <HeadingWithSeparator>
      {title}
    </HeadingWithSeparator>
    {isMobileViewport ? (
      <LoginMobile>
        <LoginForm />
      </LoginMobile>
    ) : (
      <LoginDesktop>
        <LoginForm />
      </LoginDesktop>
    )}
  </div>
)

LoginWrapper.defaultProps = defaultProps
LoginWrapper.propTypes = propTypes

export {
  LoginWrapper
}
