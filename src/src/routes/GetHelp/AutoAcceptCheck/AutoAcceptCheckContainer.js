import { connect } from 'react-redux'
import { getIsAutoAccept } from '../selectors/selectors'
import { AutoAcceptCheck } from './AutoAcceptCheck'
import { createComplaint } from "routes/GetHelp/actions/createComplaint/createComplaint"
import { loadRefundAmount } from "routes/GetHelp/actions/loadRefundAmount/loadRefundAmount"

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
