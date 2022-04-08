import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'Header'
import css from './SignupLayout.css'

export class SignupLayout extends React.PureComponent {
  render() {
    const { children } = this.props

    return (
      <div
        className={css.pageContainer}
      >
        <div className={css.headerContainer}>
          <Header simple hasLoginModal />
        </div>
        {children}
      </div>
    )
  }
}

SignupLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
