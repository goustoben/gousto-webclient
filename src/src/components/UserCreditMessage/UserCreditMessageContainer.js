import { connect } from 'react-redux'
import userActions from 'actions/user'
import { getShowUserCredit } from 'selectors/features'
import { getLoadingStateForUserCredit, getUserCredit } from 'selectors/user'

import { UserCreditMessage } from './UserCreditMessage.logic'

const mapStateToProps = (state) => {
  const userCredit = getUserCredit(state)
  const enableUserCreditFeature = getShowUserCredit(state)
  const showUserCredit = (Number(userCredit) > 0 && enableUserCreditFeature)

  return {
    shouldFetchUserCredit: !getLoadingStateForUserCredit(state) && enableUserCreditFeature,
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
