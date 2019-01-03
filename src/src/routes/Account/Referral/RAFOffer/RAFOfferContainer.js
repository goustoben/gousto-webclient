import { connect } from 'react-redux'
import { RAFOffer } from './RAFOffer'

import { userFetchReferralOffer } from 'actions/user'

const mapStateToProps = async (state) => {
  const referralOffer = await state.user.get('referralOffer')

  return {
    youGetOffer: referralOffer.credit_formatted,
    yourFriendFirstBoxOffer: referralOffer.first_box_discount_formatted,
    yourFriendFirstMonthOffer: referralOffer.first_month_discount_formatted,
    offerColour: 'blue',
  }
}

const RAFOfferContainer = connect(mapStateToProps, {userFetchReferralOffer})(RAFOffer)
export default RAFOfferContainer
