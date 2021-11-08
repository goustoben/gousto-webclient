import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { UserCreditMessagePresentation } from './UserCreditMessage.presentation'

const propTypes = {
  showUserCredit: PropTypes.bool,
  userCredit: PropTypes.string,
  userFetchCredit: PropTypes.func.isRequired,
}

const defaultProps = {
  showUserCredit: false,
  userCredit: false,
}

class UserCreditMessage extends Component {
  componentDidMount() {
    const {
      userFetchCredit,
    } = this.props
    userFetchCredit()
  }

  render() {
    const {
      showUserCredit,
      userCredit,
    } = this.props

    return (
      (showUserCredit) && (
        <UserCreditMessagePresentation userCredit={userCredit} />
      )
    )
  }
}

UserCreditMessage.propTypes = propTypes
UserCreditMessage.defaultProps = defaultProps

export {
  UserCreditMessage
}
