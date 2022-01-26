import { connect } from 'react-redux'
import { CancelOrderModal } from './CancelOrderModal'

const mapStateToProps = (state) => ({
  cancelOrderModalOpen: state.orderCancelledModalVisibility.get('visibility'),
})

export const CancelOrderModalContainer = connect(mapStateToProps, {})(CancelOrderModal)
