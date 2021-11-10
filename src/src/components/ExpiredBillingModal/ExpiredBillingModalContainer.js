import { connect } from 'react-redux'
import { actions } from 'actions'
import { ExpiredBillingModal } from './ExpiredBillingModal'

const mapStateToProps = (state) => ({
  expiredBillingModalOpen: state.expiredBillingModalVisibility,
})

export const ExpiredBillingModalContainer = connect(mapStateToProps, {
  closeExpiredBillingModal: actions.userToggleExpiredBillingModal,
})(ExpiredBillingModal)
