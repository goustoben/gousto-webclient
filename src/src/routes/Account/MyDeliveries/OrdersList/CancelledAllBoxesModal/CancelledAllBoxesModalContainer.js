import { connect } from 'react-redux'

import CancelledAllBoxesModal from './CancelledAllBoxesModal'
import { cancelledAllBoxesModalToggleVisibility } from "actions/order/cancelledAllBoxesModalToggleVisibility"

const mapStateToProps = (state) => ({
  isModalOpen: state.user.getIn(['cancelledAllBoxesModal', 'visibility']),
  pendingOrdersDates: state.user.getIn(['cancelledAllBoxesModal', 'pendingOrdersDates']),
})

export default connect(mapStateToProps, {
  toggleModalVisibility: cancelledAllBoxesModalToggleVisibility,
})(CancelledAllBoxesModal)
