import { connect } from 'react-redux'
import userActions from 'actions/user'
import { getUserCredit } from 'selectors/user'

import { UserCreditMessage } from './UserCreditMessage.logic'

const mapStateToProps = (state) => {
  const userCredit = getUserCredit(state)
  const showUserCredit = (Number(userCredit) > 0)

  return {
    showUserCredit,
    userCredit,
  }
}

const UserCreditMessageContainer = connect(mapStateToProps, {
  userFetchCredit: userActions.userFetchCredit,
})(UserCreditMessage)

export {
  UserCreditMessageContainer
}
