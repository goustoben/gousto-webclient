import { connect } from 'react-redux'
import ExpiredBillingModal from './ExpiredBillingModal'
import { userToggleExpiredBillingModal } from "actions/user/userToggleExpiredBillingModal"

const mapStateToProps = (state) => ({
  expiredBillingModalOpen: state.expiredBillingModalVisibility,
})

export default connect(mapStateToProps, {
  closeExpiredBillingModal: userToggleExpiredBillingModal,
})(ExpiredBillingModal)
