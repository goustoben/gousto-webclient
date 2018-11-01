import { connect } from 'react-redux'

import Referral from './Referral'

const mapStateToProps = (state) => ({
	referralCode: state.user.get('referral-code'),
})

const ReferralContainer = connect(mapStateToProps)(Referral)

export default ReferralContainer
