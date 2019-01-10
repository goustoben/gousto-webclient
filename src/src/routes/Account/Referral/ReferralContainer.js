import { connect } from 'react-redux'

import { userFetchReferralOffer, trackingReferFriendShareSheetOpened, trackingReferFriendShareSheetClosed, trackingReferFriendLinkCopied, trackingReferFriendLinkShare } from 'actions/user'
import { getReferralOffer, getReferralCode } from 'selectors/user'

import Referral from './Referral'

const mapStateToProps = (state) => ({
  referralCode: getReferralCode(state),
  rafOffer: getReferralOffer(state),
})

const ReferralContainer = connect(mapStateToProps, {
  userFetchReferralOffer, 
  trackingReferFriendShareSheetOpened,
  trackingReferFriendShareSheetClosed,
  trackingReferFriendLinkCopied,
  trackingReferFriendLinkShare
})(Referral)

export default ReferralContainer
