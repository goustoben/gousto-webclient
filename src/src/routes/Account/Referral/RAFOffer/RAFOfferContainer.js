import { connect } from 'react-redux'
import { RAFOffer } from './RAFOffer'
import { referralOffer } from 'selectors/account'
import { userFetchReferralOffer } from 'actions/user'

const mapStateToProps = (state) => {
  const offer = referralOffer(state)

  if (offer) {
    return {
      youGetOffer: offer.get('creditFormatted'),
      yourFriendFirstBoxOffer: offer.get('firstBoxDiscountFormatted'),
      yourFriendFirstMonthOffer: offer.get('firstMonthDiscountFormatted'),
      offerColour: 'blue',
    }
  } else {
    return {}
  }
}

const RAFOfferContainer = connect(mapStateToProps, {userFetchReferralOffer})(RAFOffer)

export default RAFOfferContainer
