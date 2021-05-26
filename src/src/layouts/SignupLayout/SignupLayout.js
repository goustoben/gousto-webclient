import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Header } from 'Header'
import css from './SignupLayout.css'

class SignupLayout extends React.PureComponent {
  render() {
    const { hasWhiteBackground, children } = this.props

    return (
      <div
        className={classNames(css.pageContainer, { [css.hasWhiteBackground]: hasWhiteBackground })}
      >
        <div className={css.headerContainer}>
          <Header simple />
        </div>
        {children}
      </div>
    )
  }
}

SignupLayout.propTypes = {
  hasWhiteBackground: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

SignupLayout.defaultProps = {
  hasWhiteBackground: false,
}

export default SignupLayout
