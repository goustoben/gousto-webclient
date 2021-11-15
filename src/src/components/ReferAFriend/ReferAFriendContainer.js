import { connect } from 'react-redux'
import { getIsRecaptchaEnabled } from 'selectors/auth'

import { ReferAFriend } from './ReferAFriend.logic'
import { authChangeRecaptcha } from "actions/auth/authChangeRecaptcha"
import { userReferAFriend } from "actions/user/userReferAFriend"
import { trackingReferFriendSocialSharing } from "actions/user/trackingReferFriendSocialSharing"

const mapStateToProps = (state) => ({
  isRecaptchaEnabled: getIsRecaptchaEnabled(state),
})

const ReferAFriendContainer = connect(mapStateToProps, {
  changeRecaptcha: authChangeRecaptcha,
  userReferAFriend,
  trackingReferFriendSocialSharing,
})(ReferAFriend)

export default ReferAFriendContainer

