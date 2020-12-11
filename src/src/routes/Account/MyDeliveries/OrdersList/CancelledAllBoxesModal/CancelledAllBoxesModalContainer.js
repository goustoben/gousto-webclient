import { connect } from 'react-redux'
import orderActions from 'actions/order'
import { getIsNewSubscriptionPageEnabled } from 'selectors/features'

import CancelledAllBoxesModal from './CancelledAllBoxesModal'

const mapStateToProps = (state) => ({
  isModalOpen: state.user.getIn(['cancelledAllBoxesModal', 'visibility']),
  pendingOrdersDates: state.user.getIn(['cancelledAllBoxesModal', 'pendingOrdersDates']),
  isNewSubscriptionPageEnabled: getIsNewSubscriptionPageEnabled(state)
})

export default connect(mapStateToProps, {
  toggleModalVisibility: orderActions.cancelledAllBoxesModalToggleVisibility,
})(CancelledAllBoxesModal)
