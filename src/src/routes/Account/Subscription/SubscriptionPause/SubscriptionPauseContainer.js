import { connect } from 'react-redux'
import SubscriptionPause from './SubscriptionPause'

const mapStateToProps = state => ({
  dataLoaded: state.subscriptionPause.get('reasons').size > 0,
  showModal: state.subscriptionPause.get('inProgress'),
})

const SubscriptionContainer = connect(mapStateToProps)(SubscriptionPause)

export default SubscriptionContainer
