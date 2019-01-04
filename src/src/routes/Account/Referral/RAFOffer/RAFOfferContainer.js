import { connect } from 'react-redux'
import { RAFOffer } from './RAFOffer'

import { userFetchReferralOffer } from 'actions/user'

const mapStateToProps = (state) => {
  const referralOffer = state.user.get('referralOffer')

  if (referralOffer) {
    return {
      youGetOffer: referralOffer.get('creditFormatted'),
      yourFriendFirstBoxOffer: referralOffer.get('firstBoxDiscountFormatted'),
      yourFriendFirstMonthOffer: referralOffer.get('firstMonthDiscountFormatted'),
      offerColour: 'blue',
    }
  } else {
    return {}
  }
}

const RAFOfferContainer = connect(mapStateToProps, {userFetchReferralOffer})(RAFOffer)

export default RAFOfferContainer
