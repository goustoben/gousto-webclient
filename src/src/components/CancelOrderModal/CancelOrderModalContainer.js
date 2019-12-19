import { connect } from 'react-redux'
import CancelOrderModal from './CancelOrderModal'

const mapStateToProps = (state) => ({
  cancelOrderModalOpen: state.orderCancelledModalVisibility.get('visibility'),
})

export default connect(mapStateToProps, {})(CancelOrderModal)
