import { connect } from 'react-redux'

import { userFetchReferralOffer } from 'actions/user'
import { referralOffer } from 'selectors/account'

import Referral from './Referral'

const mapStateToProps = (state) => ({
  referralCode: state.user.get('referral-code'),
  rafOffer: referralOffer(state),
})

const ReferralContainer = connect(mapStateToProps, {userFetchReferralOffer})(Referral)

export default ReferralContainer
