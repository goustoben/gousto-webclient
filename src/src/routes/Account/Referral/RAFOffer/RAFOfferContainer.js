import { connect } from 'react-redux'
import { RAFOffer } from './RAFOffer'

const mapStateToProps = () => ({
  youGetOffer: '£15',
  yourFriendFirstBoxOffer: '50%',
  yourFriendFirstMonthOffer: ' 30%',
  offerColour: 'blue',
})

const RAFOfferContainer = connect(mapStateToProps, {})(RAFOffer)
export default RAFOfferContainer
