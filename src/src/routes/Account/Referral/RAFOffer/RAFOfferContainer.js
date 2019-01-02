import { connect } from 'react-redux'
import { RAFOffer } from './RAFOffer'

const mapStateToProps = () => ({
  youGet: '£15',
  yourFriendFirstBox: '50%',
  yourFriendFirstMonth: ' 30%',
  colorOffer: 'blue',
})

const RAFOfferContainer = connect(mapStateToProps, {})(RAFOffer)
export default RAFOfferContainer
