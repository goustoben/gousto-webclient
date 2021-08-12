import { connect } from 'react-redux'

import { selectContactChannel } from 'actions/getHelp'
import { getUserId } from 'selectors/user'
import { getOrderId } from '../selectors/selectors'

import { Contact } from './Contact'

const mapStateToProps = (state) => ({
  content: {
    title: state.content.get('get-help_contact_pageheader_header')
    || 'Contact us',
    body: state.content.get('get-help_contact_pagecontent_copy')
    || 'Please get in touch so one of our customer care agents can help resolve your issue.',
    button1Copy: state.content.get('get-help_orderissues_pagecontent_button1copy')
    || 'Done',
    chatItem: state.content.get('get-help_orderissues_pagecontent_chatitem')
    || 'Start live chat',
    emailItem: state.content.get('get-help_orderissues_pagecontent_emailitem')
    || 'Contact us by email',
    phoneItem: state.content.get('get-help_orderissues_pagecontent_phoneitem')
    || 'Contact us by phone',
  },
  orderId: getOrderId(state),
  userId: getUserId(state),
})

const ContactContainer = connect(mapStateToProps, {
  selectContactChannel,
})(Contact)

export {
  ContactContainer
}
