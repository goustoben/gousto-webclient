import { connect } from 'react-redux'
import { changeRecaptcha } from 'actions/auth'
import { getIsRecaptchaEnabled } from 'selectors/auth'
import { userReferAFriend, trackingReferFriendSocialSharing } from 'actions/user'

import { ReferAFriend } from './ReferAFriend.logic'

const mapStateToProps = (state) => ({
  isRecaptchaEnabled: getIsRecaptchaEnabled(state),
})

const ReferAFriendContainer = connect(mapStateToProps, {
  changeRecaptcha,
  userReferAFriend,
  trackingReferFriendSocialSharing,
})(ReferAFriend)

export default ReferAFriendContainer

