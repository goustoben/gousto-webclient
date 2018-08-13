import { connect } from 'react-redux'
import CancelledAllBoxesModal from './CancelledAllBoxesModal'
import orderActions from 'actions/order'

const mapStateToProps = (state) => ({
	isModalOpen: state.user.getIn(['cancelledAllBoxesModal', 'visibility']),
	pendingOrdersDates: state.user.getIn(['cancelledAllBoxesModal', 'pendingOrdersDates']),
})

export default connect(mapStateToProps, {
	toggleModalVisibility: orderActions.cancelledAllBoxesModalToggleVisibility,
})(CancelledAllBoxesModal)
