import { connect } from 'react-redux'
import { RAFOffer } from './RAFOffer'

const mapStateToProps = (state, ownProps) => {
  const { offer } = ownProps
  const color = offer.get('expiry') ? 'gold' : 'blue'
  
  return {
    youGetOffer: offer.get('creditFormatted'),
    yourFriendFirstBoxOffer: offer.get('firstBoxDiscountFormatted'),
    yourFriendFirstMonthOffer: offer.get('firstMonthDiscountFormatted'),
    offerColour: color,
  }

}

const RAFOfferContainer = connect(mapStateToProps)(RAFOffer)

export default RAFOfferContainer
