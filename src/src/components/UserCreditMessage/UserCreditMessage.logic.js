import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { UserCreditMessagePresentation } from './UserCreditMessage.presentation'

class UserCreditMessage extends Component {
  static propTypes = {
    shouldFetchUserCredit: PropTypes.bool.isRequired,
    showUserCredit: PropTypes.bool,
    userCredit: PropTypes.string,
    userFetchCredit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    showUserCredit: false,
    userCredit: false,
  }

  componentDidMount() {
    const {
      shouldFetchUserCredit,
      userFetchCredit,
    } = this.props

    if (shouldFetchUserCredit) {
      userFetchCredit()
    }
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

export {
  UserCreditMessage
}
