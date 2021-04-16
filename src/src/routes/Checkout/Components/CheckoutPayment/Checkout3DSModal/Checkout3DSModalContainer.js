import { connect } from 'react-redux'
import { checkPaymentAuth } from 'actions/checkout'
import { getChallengeUrl, isModalOpen } from 'selectors/payment'
import { Checkout3DSModal } from './Checkout3DSModal'

const mapStateToProps = (state) => ({
  isOpen: isModalOpen(state),
  challengeURL: getChallengeUrl(state),
})

const mapDispatchToProps = {
  onChallengeDone: checkPaymentAuth,
}

export const Checkout3DSModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout3DSModal)
