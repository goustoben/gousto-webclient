import { connect } from 'react-redux'
import { RAFOffer } from './RAFOffer'

const mapStateToProps = (state, ownProps) => {
  const { offer } = ownProps
  
  return {
    youGetOffer: offer.get('creditFormatted'),
    yourFriendFirstBoxOffer: offer.get('firstBoxDiscountFormatted'),
    yourFriendFirstMonthOffer: offer.get('firstMonthDiscountFormatted'),
    offerColour: offer.get('expiry') ? 'gold' : 'blue',
  }

}

const RAFOfferContainer = connect(mapStateToProps)(RAFOffer)

export default RAFOfferContainer
