import { connect } from 'react-redux'
import { trackClickGetHelpWithThisBox } from '../../../../GetHelp/actions/getHelp'
import { PreviousOrder } from './PreviousOrder'

export const PreviousOrderContainer = connect(null, {
  trackClickGetHelpWithThisBox,
})(PreviousOrder)
