import { connect } from 'react-redux'
import ExpiredBillingModal from './ExpiredBillingModal'
import actions from 'actions'

const mapStateToProps = (state) => ({
	expiredBillingModalOpen: state.expiredBillingModalVisibility,
})

export default connect(mapStateToProps, {
	closeExpiredBillingModal: actions.userToggleExpiredBillingModal,
})(ExpiredBillingModal)
