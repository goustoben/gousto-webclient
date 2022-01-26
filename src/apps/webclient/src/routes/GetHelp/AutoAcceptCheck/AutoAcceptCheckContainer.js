import { connect } from 'react-redux'
import { getIsAutoAccept } from '../selectors/selectors'
import { loadRefundAmount } from '../actions/loadRefundAmount'
import { createComplaint } from '../actions/createComplaint'
import { AutoAcceptCheck } from './AutoAcceptCheck'

const mapStateToProps = (state) => ({
  isAutoAccept: getIsAutoAccept(state),
})

const AutoAcceptCheckContainer = connect(mapStateToProps, {
  createComplaint,
  loadRefundAmount,
})(AutoAcceptCheck)

export {
  AutoAcceptCheckContainer
}
