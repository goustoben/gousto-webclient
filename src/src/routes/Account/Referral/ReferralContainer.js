import { connect } from 'react-redux'

import { userFetchReferralOffer } from 'actions/user'
import { getReferralOffer, getReferralCode } from 'selectors/user'

import Referral from './Referral'

const mapStateToProps = (state) => ({
  referralCode: getReferralCode(state),
  rafOffer: getReferralOffer(state),
})

const ReferralContainer = connect(mapStateToProps, {userFetchReferralOffer})(Referral)

export default ReferralContainer
