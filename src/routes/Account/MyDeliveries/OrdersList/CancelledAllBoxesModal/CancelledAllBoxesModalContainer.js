import { connect } from 'react-redux'
import orderActions from 'actions/order'
import CancelledAllBoxesModal from './CancelledAllBoxesModal'

const mapStateToProps = (state) => ({
  isModalOpen: state.user.getIn(['cancelledAllBoxesModal', 'visibility']),
  pendingOrdersDates: state.user.getIn(['cancelledAllBoxesModal', 'pendingOrdersDates']),
})

export default connect(mapStateToProps, {
  toggleModalVisibility: orderActions.cancelledAllBoxesModalToggleVisibility,
})(CancelledAllBoxesModal)
