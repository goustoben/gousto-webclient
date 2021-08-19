import { connect } from 'react-redux'

import {
  getCompensation,
  getIsError,
  getPending,
} from '../selectors/selectors'
import { trackRejectRefund } from '../actions/getHelp'
import { loadRefundAmount } from '../actions/loadRefundAmount'
import { createComplaint } from '../actions/createComplaint'
import { actionTypes } from '../actions/actionTypes'

import { Refund } from './Refund'

const mapStateToProps = (state) => {
  const { auth, user } = state
  const compensation = getCompensation(state)

  return {
    compensation,
    user: {
      id: user.get('id'),
      accessToken: auth.get('accessToken'),
    },
    content: {
      title: state.content.get('get-help_refund_pageheader_header')
      || 'Get help with your box',
      infoBody: state.content.get('get-help_refund_pagecontent_infobody')
      || `Sorry about that disappointing box experience. Your feedback has been passed on to our team for investigation.
      As an apology, we'd like to give you £{{refundAmount}} credit on your next order.`,
      confirmationBody: state.content.get('get-help_refund_pagecontent_confirmationbody')
      || 'Would you like to accept this credit, or contact us for more help?',
      errorBody: state.content.get('get-help_refund_pagecontent_errorbody')
      || 'There was a problem in getting your refund. Please contact us below, or try again later.',
      button1: state.content.get('get-help_refund_pagecontent_button1')
      || 'Contact Us',
      button2: state.content.get('get-help_refund_pagecontent_button2')
      || 'Accept £{{refundAmount}} credit',
    },
    isAnyPending: getPending(state, actionTypes.GET_HELP_LOAD_REFUND_AMOUNT)
    || getPending(state, actionTypes.GET_HELP_CREATE_COMPLAINT),
    isAnyError: getIsError(state, actionTypes.GET_HELP_LOAD_REFUND_AMOUNT)
    || getIsError(state, actionTypes.GET_HELP_CREATE_COMPLAINT),
  }
}

const RefundContainer = connect(mapStateToProps, {
  createComplaint,
  loadRefundAmount,
  trackRejectRefund,
})(Refund)

export {
  RefundContainer
}
