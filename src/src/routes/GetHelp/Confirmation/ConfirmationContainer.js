import { connect } from 'react-redux'

import Confirmation from './Confirmation'

const mapStateToProps = (state) => ({
  content: {
    title: state.content.get('get-help_confirmation_pageheader_header')
    || 'Thanks for your feedback',
    confirmationBody: state.content.get('get-help_confirmation_pagecontent_confirmationbody')
    || `We really appreciate you letting us know about this issue.
    We’ve added the credit to your account (you can view it using the link below),
    and it will be automatically taken off your next order.`,
    button1: state.content.get('get-help_confirmation_pagecontent_button1')
    || 'View my credit',
    button2: state.content.get('get-help_confirmation_pagecontent_button2')
    || 'Done',
  }
})

const ConfirmationContainer = connect(mapStateToProps)(Confirmation)

export default ConfirmationContainer
