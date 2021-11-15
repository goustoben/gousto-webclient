import { connect } from 'react-redux'
import { PreviousOrder } from './PreviousOrder'
import { trackClickGetHelpWithThisBox } from "routes/GetHelp/actions/getHelp/trackClickGetHelpWithThisBox"

export const PreviousOrderContainer = connect(null, {
  trackClickGetHelpWithThisBox,
})(PreviousOrder)
