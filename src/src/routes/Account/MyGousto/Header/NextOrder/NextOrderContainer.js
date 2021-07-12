import { connect } from 'react-redux'
import { trackNextBoxTrackingClick } from 'actions/myGousto'
import { trackClickGetHelpWithThisBox } from '../../../../GetHelp/actions/getHelp'
import { NextOrder } from './NextOrder'

export const NextOrderContainer = connect(null, {
  trackClickGetHelpWithThisBox,
  trackNextBoxTrackingClick,
})(NextOrder)
