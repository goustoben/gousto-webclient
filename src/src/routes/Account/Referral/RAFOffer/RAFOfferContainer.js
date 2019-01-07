import { connect } from 'react-redux'
import actionTypes from 'actions/actionTypes'
import { RAFOffer } from './RAFOffer'

const mapStateToProps = (state, ownProps) => {
  const { offer } = ownProps
  const isLoading = state.pending.get(actionTypes.USER_LOAD_REFERRAL_OFFER, true)
  const color = isLoading ? 'white' : (offer.get('expiry') ? 'gold' : 'blue')
  
  return {
    youGetOffer: offer.get('creditFormatted'),
    yourFriendFirstBoxOffer: offer.get('firstBoxDiscountFormatted'),
    yourFriendFirstMonthOffer: offer.get('firstMonthDiscountFormatted'),
    offerColour: color,
  }

}

const RAFOfferContainer = connect(mapStateToProps)(RAFOffer)

export default RAFOfferContainer
