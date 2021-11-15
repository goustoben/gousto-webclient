import { connect } from 'react-redux'
import { NextOrder } from './NextOrder'
import { trackNextBoxTrackingClick } from "actions/myGousto/trackNextBoxTrackingClick"
import { trackClickGetHelpWithThisBox } from "routes/GetHelp/actions/getHelp/trackClickGetHelpWithThisBox"

export const NextOrderContainer = connect(null, {
  trackClickGetHelpWithThisBox,
  trackNextBoxTrackingClick,
})(NextOrder)
